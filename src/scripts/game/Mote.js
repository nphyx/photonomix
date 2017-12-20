"use strict";
let {random, max, min, floor, ceil, sin} = Math;
import {TARGET_FPS, MOTE_BASE_SPEED, MOTE_BASE_SIZE, MOTE_BASE_SIGHT, PREGNANT_THRESHOLD, 
				DEATH_THRESHOLD, GLOBAL_DRAG, PREGNANT_TIME, DEBUG, MAX_MOTES} from "../photonomix.constants";
import * as vectrix from "@nphyx/vectrix";
import {avoid, accelerate, drag, twiddleVec, adjRand, posneg, outOfBounds, rotate, norm_ratio} from "../photonomix.util";
const {vec2, times, mut_clamp, magnitude, distance, mut_copy, mut_times} = vectrix.vectors;
const {plus, mut_plus} = vectrix.matrices;
import {BufferPool} from "../photonomix.bufferPools";
import Photon, {COLOR_R, COLOR_G, COLOR_B} from "./Photon";
import Void from "./Void";
const clamp = mut_clamp;
// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
const POS_C  = vec2(0.0, 0.0);
// activity type constants
export const ACT_IDLE   = 0;
export const ACT_SEARCH = 1;
export const ACT_CHASE  = 2;
export const ACT_AVOID  = 3;
export const ACT_ATTACK = 4;
export const ACT_LINK   = 5;

// twiddle to slightly offset the values, avoids divide by zero and other errors
// inherent to acceleration, friction, drag and gravity equations
twiddleVec(POS_C);
// relative color values derived from a Mote's photons, used to produce color string
// for rendering

// various consts below are indexes and byte counts for mote data
// byte length of these value types
const I8 = 1;
const F32 = 4;

// uint8 values = photons[3]
const U8_PHO  = 0,
			U8_COL  = U8_PHO        + I8*3, 
			U8_VAL_LENGTH = U8_COL  + I8*3,
			I8_BYTE_OFFSET = U8_VAL_LENGTH;
// int8 values =  dying, pregnant, injured, lastMeal, pulse
const	I8_DYING       = 0,
			I8_PREG        = I8_DYING       + I8,
			I8_INJURED     = I8_PREG        + I8,
			I8_LAST_INJURY = I8_INJURED     + I8,
			I8_MEAL        = I8_LAST_INJURY + I8,
			I8_UPD         = I8_MEAL        + I8,
			I8_PULSE       = I8_UPD         + I8,
			I8_ACT         = I8_PULSE       + I8,
			I8_VAL_LENGTH  = I8_ACT         + I8,
			INT_VAL_LENGTH = U8_VAL_LENGTH  + I8_VAL_LENGTH;

// float32 values = p[3], v[3], color[4], size, sizeMin, sizeMax, speed, sight, agro, fear, potential, resistance
// from here on, increments of value * 4
// vectors
const VEC_BYTE_OFFSET = INT_VAL_LENGTH + (F32-(INT_VAL_LENGTH % F32)), // float32 offsets must be multiples of 4
			F32_POS  = 0,
			F32_VEL  = F32_POS + 2,
			F32_RAT  = F32_VEL + 2,
			F32_PREF = F32_RAT + 3,
			VEC_VAL_LENGTH = F32_PREF + 3;

const F32_BYTE_OFFSET = VEC_BYTE_OFFSET + (VEC_VAL_LENGTH*F32),
			// scalars
			F32_SIZE         = 0,
			F32_SIZE_MIN     = F32_SIZE       + 1,
			F32_SIZE_MAX     = F32_SIZE_MIN   + 1,
			F32_SPEED        = F32_SIZE_MAX   + 1,
			F32_SIGHT        = F32_SPEED      + 1,
			F32_AGRO         = F32_SIGHT      + 1,
			F32_FEAR         = F32_AGRO       + 1,
			F32_POTENTIAL    = F32_FEAR       + 1,
			F32_RESISTANCE   = F32_POTENTIAL  + 1,
			F32_MASS         = F32_RESISTANCE + 1,
			FLOAT_VAL_LENGTH = F32_MASS       + 1;

export const BUFFER_LENGTH = F32_BYTE_OFFSET + (FLOAT_VAL_LENGTH*F32);

// scratch vectors used in various functions
const scratch1 = vec2(), scratch2 = vec2();

const BUFFER_POOL = new BufferPool(BUFFER_LENGTH, MAX_MOTES);


/**
 * Constructor for Motes.
 * @param {Float32Array(3)} photons initial photons (0-255, R, G, B)
 * @param {vec2} pos initial position
 * @param {Float} bSpeed (optional) base acceleration: inheritance and predesigned motes 
 * @param {Float} bSight (optional) base vision radius: inheritance and predesigned motes 
 * @param {Float} bAgro (optional) base aggressiveness: inheritance and predesigned motes 
 * @param {Float} bFear (optional) base fearfulness: inheritance and predesigned motes 
 * @property {vec2} pos position vector
 * @property {vec2} vel velocity vector
 * @property {Uint8} r red photon value (setter updates values and derived props)
 * @property {Uint8} g green photon value (setter updates value and derived props)
 * @property {Uint8} b blue photon value (setter updates value and derived props)
 * @property {string} color_string rgba color string, used for drawing in 2d
 * @property {Int8} dying counter from 1 to DEATH_THRESHOLD when a mote is dying
 * @property {Int8} pregnant coundown from PREGNANT_DURATION when a mote is pregnant
 * @property {Int8} injured injury counter, counts down in mote.bleed
 * @property {Int8} lastInjury strength of most recent injury taken
 * @property {Int8} pulse frame offset for pulse animation
 * @property {Int8} lastMeal color value for last meal (see R, G, B constants)
 * @property {Int8} action action choice in relation to target 
 * @property {Float32} speed derived acceleration speed based on Mote properties
 * @property {Float32} sight derived vision radius based on Mote properties 
 * @property {Float32} agro derived aggression factor based on Mote properties 
 * @property {Float32} fear derived fearfulness factor based on Mote properties 
 * @property {Float32} potential accumulated charge potential
 * @property {Float32} resistance accumulated resistance to charge
 * @property {Float32} size derived size radius as fraction of screen size
 * @property {Float32} sizeMin minimum size the mote can reach as it shrinks
 * @property {Float32} sizeMax maximum size the mote can reach as it grows
 * @property {UintClamped8Array} photons current photon values (R, G, B)
 * @property {UintClamped8Array} color current mote color (R, G, B)
 * @property {Int8Array} intVals direct access to integer value array (for debug)
 * @property {Float32Array} ratios current photon ratios (R, G, B)
 * @property {Float32Array} prefs preferred photon ratios
 * @property {Float32Array} floatVals direct access to float value array (for debug)
 * @return {Mote}
 */
export default function Mote(_photons = new Uint8Array(3), pos = new Float32Array(2), bSpeed = MOTE_BASE_SPEED, bSight = MOTE_BASE_SIGHT, bAgro = 1.0, bFear = 1.0) {
	let buffer = BUFFER_POOL.buffer,
			offset = BUFFER_POOL.allocate();

	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	let photons = new Uint8ClampedArray(buffer, U8_PHO+offset, 3);
	let color = new Uint8ClampedArray(buffer, U8_COL+offset, 3);
	photons[COLOR_R] = _photons[COLOR_R];
	photons[COLOR_G] = _photons[COLOR_G];
	photons[COLOR_B] = _photons[COLOR_B];
	let intVals = new Int8Array(buffer, I8_BYTE_OFFSET+offset, I8_VAL_LENGTH - U8_PHO);
	let floatVals = new Float32Array(buffer, F32_BYTE_OFFSET+offset, FLOAT_VAL_LENGTH);
	this.pos = vec2(pos, buffer, F32_POS*F32+VEC_BYTE_OFFSET+offset);
	this.vel = vec2(0.0, 0.0, buffer, F32_VEL*F32+VEC_BYTE_OFFSET+offset);
	let ratios  = new Float32Array(buffer, F32_RAT*F32+VEC_BYTE_OFFSET+offset, 3);
	let prefs   = new Float32Array(buffer, F32_PREF*F32+VEC_BYTE_OFFSET+offset, 3);
	this.target = undefined;
	this.color_string = "";
	bSpeed = bSpeed+adjRand(0.0005);
	bSight = bSight+adjRand(0.001); // vision distance
	bAgro = bAgro+adjRand(0.001);
	bFear = bFear+adjRand(0.001);

	Object.defineProperties(this, {
		"photons":{get: () => photons},
		"color":{get: () => color},
		"dying":{get: () => intVals[I8_DYING], set: (v) => intVals[I8_DYING] = v},
		"action":{get: () => intVals[I8_ACT], set: (v) => intVals[I8_ACT] = v},
		"pregnant":{get: () => intVals[I8_PREG], set: (v) => intVals[I8_PREG] = v},
		"injured":{get: () => intVals[I8_INJURED], set: (v) => intVals[I8_INJURED] = v},
		"lastInjury":{get: () => intVals[I8_LAST_INJURY], set: (v) => intVals[I8_LAST_INJURY] = v},
		"needsUpdate":{get: () => intVals[I8_UPD], set: (v) => intVals[I8_UPD] = v},
		"pulse":{get: () => intVals[I8_PULSE], set: (v) => intVals[I8_PULSE] = v},
		"lastMeal":{get: () => intVals[I8_MEAL], set: (v) => intVals[I8_MEAL] = v},
		"size":{get: () => floatVals[F32_SIZE], set: (v) => floatVals[F32_SIZE] = v},
		"sizeMin":{get: () => floatVals[F32_SIZE_MIN], set: (v) => floatVals[F32_SIZE_MIN] = v},
		"sizeMax":{get: () => floatVals[F32_SIZE_MAX], set: (v) => floatVals[F32_SIZE_MAX] = v},
		"speed":{get: () => floatVals[F32_SPEED], set: (v) => floatVals[F32_SPEED] = v},
		"sight":{get: () => floatVals[F32_SIGHT], set: (v) => floatVals[F32_SIGHT] = v},
		"agro":{get: () => floatVals[F32_AGRO], set: (v) => floatVals[F32_AGRO] = v},
		"fear":{get: () => floatVals[F32_FEAR], set: (v) => floatVals[F32_FEAR] = v},
		"potential":{get: () => floatVals[F32_POTENTIAL], set: (v) => floatVals[F32_POTENTIAL] = v},
		"resistance":{get: () => floatVals[F32_RESISTANCE], set: (v) => floatVals[F32_RESISTANCE] = v},
		"mass":{get: () => floatVals[F32_MASS], set: (v) => floatVals[F32_MASS] = v},
		"base_speed":{get: () => bSpeed},
		"base_sight":{get: () => bSight},
		"base_agro":{get: () => bAgro},
		"base_fear":{get: () => bFear},
		"offset":{get: () => offset},
		"ratios":{get: () => ratios},
		"prefs":{get: () => prefs}
	});

	/*
	 * Debug access only.
	 */
	if(DEBUG) Object.defineProperties(this, {
		"intVals":{get: () => intVals},
		"floatVals":{get: () => floatVals},
	});

	// initialize values, important to do since buffer may be reused
	this.dying = 0;
	this.pregnant = 0;
	this.injured = 0;
	this.lastInjury = 0;
	this.speed = bSpeed;
	this.sight = bSight;
	this.agro = bAgro;
	this.fear = bFear;
	this.potential = this.agro*2;
	this.resistance = this.fear*2;
	this.lastMeal = ~~(random()*3);
	this.pulse = ~~(TARGET_FPS*random());
	this.size = MOTE_BASE_SIZE;
	this.sizeMin = MOTE_BASE_SIZE*0.5;
	this.sizeMax = MOTE_BASE_SIZE*3;

	this.updateProperties();
	this.prefs[COLOR_R] = this.ratios[COLOR_R];
	this.prefs[COLOR_G] = this.ratios[COLOR_G];
	this.prefs[COLOR_B] = this.ratios[COLOR_B];
	return this;
}

/**
 * Updates derived properties for mote.
 */
Mote.prototype.updateProperties = (function() {
	let  r = 0|0, g = 0|0, b = 0|0, photons, color, ratios;
	return function updateProperties() {
		({photons, ratios, color} = this);
		r = photons[COLOR_R];
		g = photons[COLOR_G];
		b = photons[COLOR_B];
		this.mass = r + g + b;
		if(this.mass > 0) { // otherwise skip this stuff since the mote is dead anyway
		this.size = clamp(this.mass/(PREGNANT_THRESHOLD/3)*MOTE_BASE_SIZE, this.sizeMin, this.sizeMax);
			norm_ratio(photons, ratios);
			/*
			ratios[COLOR_R] = ratio(r, g+b);
			ratios[COLOR_G] = ratio(g, r+b);
			ratios[COLOR_B] = ratio(b, g+r);
			*/
			this.speed = this.base_speed*(1-this.size)*(1+ratios[COLOR_B]);
			this.sight = this.base_sight+(this.size*0.5); // see from edge onward
			this.agro = this.base_agro*(1+ratios[COLOR_R]);
			this.fear = this.base_fear*(1+ratios[COLOR_G]);
			if(DEBUG) {
				if(isNaN(this.speed)) throw new Error("Mote.updateProperties: NaN speed");
				if(isNaN(this.sight)) throw new Error("Mote.updateProperties: NaN sight");
				if(isNaN(this.size)) throw new Error("Mote.updateProperties: NaN size");
				if(isNaN(this.agro)) throw new Error("Mote.updateProperties: NaN agro");
				if(isNaN(this.fear)) throw new Error("Mote.updateProperties: NaN fear");
			}
		} // end of stuff to do only if sum > 0

		if((this.mass > PREGNANT_THRESHOLD) && this.pregnant === 0) this.pregnant = PREGNANT_TIME;
		if((this.mass < DEATH_THRESHOLD) && this.dying === 0) this.dying = 1;

		color[COLOR_R] = ~~(ratios[COLOR_R]*255);
		color[COLOR_G] = ~~(ratios[COLOR_G]*255);
		color[COLOR_B] = ~~(ratios[COLOR_B]*255);
		this.needsUpdate = 0;
	}
})();

/**
 * Maintenance tasks to be done each tick
 */
Mote.prototype.runMaintenance = (function() {
	let pregnant = 0|0, dying = 0|0, tmpPot = 0.0, tmpRes = 0.0,
			agro = 0.0, fear = 0.0, size = 0.0, speed = 0.0, sight = 0.0,
			pos, vel, target;
	return function runMaintenance(delta) {
		({pos, vel, pregnant, dying, agro, fear, size, speed, sight, target} = this);
		if(pregnant > 0) this.pregnant = pregnant - 1;
		if(dying > 0) this.dying = dying + 1; // start counting up
		if(this.needsUpdate) this.updateProperties();
		// build potential and resistance each tick
		tmpPot = agro * (size*100);
		tmpRes = fear * (size*100);
		this.potential = clamp(this.potential + agro*delta, -tmpPot, tmpPot);
		this.resistance = clamp(this.resistance + fear*delta, -tmpRes, tmpRes);

		// last turn's move, has to happen first to avoid prediction inaccuracy
		// during chases
		mut_plus(pos, times(vel, delta, scratch1));

		// don't go off the screen
		mut_plus(vel, avoid(vel, pos, POS_C, 1.3, speed, scratch1)); 
		// apply drag
		mut_plus(vel, drag(vel, GLOBAL_DRAG));
	}
})();

/**
 * Checks if a target is valid.
 * @param {Object} entity any game object that can be targeted
 * @return {float} distance if valid, otherwise -1
 */
Mote.prototype.validateTarget = (function() {
	let dist = 0.0, sight = 0.0, pos;
	return function(entity) {
		({pos, sight} = this);
		dist = distance(pos, entity.pos);
		// these targets are invalid
		if(entity === this) return -1;
		if(entity.dying) return -1;
		if(entity.lifetime && entity.lifetime < 3) return -1;
		if(entity.mass < 1) return -1;
		if(dist > (sight+entity.size*0.5)) return -1;
		if(outOfBounds(entity, 0.7)) return -1;
		return dist;
	}
})();

/**
 * Search for a target and decide how to act toward it.
 */
Mote.prototype.search = (function() {
	let i = 0|0, len = 0|0, sight = 0.0, cur = 0.0, pos, vel, highest, dist, entity,
			deltar = 0.0, deltag = 0.0, deltab = 0.0, mind = 0.0, maxd = 0.0, weight = 0.0;
	return function search(entities) {
		({pos, vel, sight} = this);
		highest = -Infinity;
		dist = 0;
		if(this.pregnant || this.dying) {
			this.action = ACT_IDLE;
			highest = Infinity;
		}

		for(i = 0, len = entities.length; (i < len) && (highest < Infinity); ++i) {
			entity = entities[i];
			let dist = this.validateTarget(entity);
			if(dist === -1) continue;
			// ignore things outside sight range
			if(entity instanceof Mote) {
				cur = 3*(1/dist);
				if(cur > highest) {
					this.target = entity;
					if(entity.target === this || dist < (this.size+entity.size)*0.5) {
						this.action = ACT_AVOID;
					}
					else this.action = ACT_CHASE;
					highest = cur;
				}
			}
			else if(entity instanceof Void) {
				this.target = entity;
				this.action = ACT_AVOID;
				highest = Infinity;
			}
			else if(entity instanceof Photon && entity.lifetime > 3) {
				deltar = (this.prefs[COLOR_R] - this.ratios[COLOR_R]);	
				deltag = (this.prefs[COLOR_G] - this.ratios[COLOR_G]);	
				deltab = (this.prefs[COLOR_B] - this.ratios[COLOR_B]);	
				maxd = max(deltar, deltag, deltab);
				mind = min(deltar, deltag, deltab);
				if((maxd == deltar && entity.color == COLOR_R) ||
						(maxd == deltag && entity.color == COLOR_G) ||
						(maxd == deltab && entity.color == COLOR_B)) weight = 30;
				if((mind == deltar && entity.color == COLOR_R) ||
						(mind == deltag && entity.color == COLOR_G) ||
						(mind == deltab && entity.color == COLOR_B)) weight = 10;
				else weight = 20;
				cur = weight*(1/dist);
				if(cur > highest) {
					this.target = entity;
					this.action = ACT_CHASE;
					highest = cur;
				}
			}
		}
		if(highest < 0) return false;
		return true;
	}
})();

/**
 * Decide how to act each tick based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float delta time delta
 */
Mote.prototype.tick = (function() {
	let pos, vel, size, sight, speed, agro, fear, resistance, potential, target, dist;
	return function tick(entities, delta, frameCount) {
		({pos, vel, size, sight, speed, agro, fear, resistance, potential, target} = this);
		this.runMaintenance(delta);

		// validate current target 
		if(target && (dist = this.validateTarget(target)) === -1) {
			this.action = ACT_IDLE;
		}

		switch(this.action) {
			case ACT_IDLE: // lost target, gave up, or completed task
				this.target = undefined;
				if(magnitude(vel) < 0.001) { // not going anywhere, so pick a random direction
					scratch1[0] = random()*2-1;
					scratch1[1] = random()*2-1;
				}
				else {
					mut_copy(scratch1, pos);
					mut_plus(scratch1, times(vel, delta, scratch2));
					mut_plus(scratch1, rotate(scratch1, pos, sin((frameCount+this.pulse)*speed), scratch2));
				}
				mut_plus(vel, accelerate(pos, scratch1, speed, scratch2));
				this.action = ACT_SEARCH;
			break;
			case ACT_CHASE: // chasing a target
				// predict target's next move
				plus(target.pos, times(target.vel, delta, scratch1), scratch2);
				mut_plus(vel, accelerate(pos, scratch2, speed, scratch1));
				if(dist < sight) {
					if(target instanceof Mote && this.potential > this.agro*3) 
						this.action = ACT_ATTACK;
					else this.action = ACT_ATTACK;
				}
			break;
			case ACT_AVOID: // avoiding a target
				// predict target's next move
				plus(target.pos, times(target.vel, delta, scratch1), scratch2);
				mut_plus(vel, accelerate(scratch2, pos, speed, scratch1));
				if(this.resistance > fear*3) this.action = ACT_IDLE;
			break;
			case ACT_ATTACK: // attacking a target
				if(target instanceof Mote) this.discharge(target);
				else if(target instanceof Photon) this.eatPhoton(target);
			break;
			case ACT_LINK: // linking with a target
			break;
			case ACT_SEARCH:
				if(!this.search(entities)) this.action = ACT_IDLE;
			break;
			default:
			break;
		}
	}
})();


let delta = 0.0;
Mote.prototype.discharge = function(target) {
	delta = this.potential - target.resistance;
	target.resistance -= max(this.agro, delta*this.agro);
	this.potential -= max(this.fear, delta*this.fear);
	target.injure(this, max(0, ~~(delta)));
	if(this.potential < 0) this.action = ACT_IDLE;
}

Mote.prototype.injure = function(by, strength) {
	this.injured += strength;
	this.lastInjury = this.injured;
	if(this.resistance < (this.agro*3) ||
		this.injured < this.fear
	) this.target = by;
}

Mote.prototype.bleed = (function() {
	let choice = 0|0, choiceVal = 0|0, pvel = vec2(), photons;
	return function bleed() {
		photons = this.photons;
		do {
			choice = ~~(random()*3);
			switch(choice) {
				case COLOR_R: choiceVal = photons[COLOR_R]; break;
				case COLOR_G: choiceVal = photons[COLOR_G]; break;
				case COLOR_B: choiceVal = photons[COLOR_B]; break;
			}
		} while (choiceVal === 0);
		switch(choice) {
			case COLOR_R: photons[COLOR_R] = photons[COLOR_R] - 1; break;
			case COLOR_G: photons[COLOR_G] = photons[COLOR_G] - 1; break;
			case COLOR_B: photons[COLOR_B] = photons[COLOR_B] - 1; break;
		}
		this.injured--;
		mut_times(this.vel, 1+this.speed);
		mut_copy(pvel, this.vel);
		mut_times(pvel, -1);
		this.needsUpdate = 1;
		return new Photon(this.pos, pvel, choice);
		//return choice;
	}
})();

Mote.prototype.split = (function() {
	let baby, photons;
	return function() {
		photons = this.photons;
		baby = new Mote(
			[floor(photons[COLOR_R]/2), floor(photons[COLOR_G]/2), floor(photons[COLOR_B]/2)],
			this.pos, this.base_speed, this.base_sight, this.base_agro, 
			this.base_fear);
		photons[COLOR_R] = ceil(photons[COLOR_R]/2);
		photons[COLOR_G] = ceil(photons[COLOR_G]/2);
		photons[COLOR_B] = ceil(photons[COLOR_B]/2);
		this.pregnant = PREGNANT_TIME-1;
		baby.pregnant = PREGNANT_TIME-1;
		this.target = baby;
		baby.target = this;
		baby.needsUpdate = 1;
		this.needsUpdate = 1;
		return baby;
	}
})();

Mote.prototype.eatPhoton = (function() {
	let photons;
	return function eatPhotons(photon) {
		if(photon.lifetime > 2 && distance(this.pos, photon.pos) < this.sight) {
			photons = this.photons;
			photon.lifetime = 2;
			switch(photon.color) {
				case COLOR_R: photons[COLOR_R]+=1; break;
				case COLOR_G: photons[COLOR_G]+=1; break;
				case COLOR_B: photons[COLOR_B]+=1; break;
			}
			this.lastMeal = photon.color;
			this.potential -= this.agro*0.5;
			this.resistance -= this.fear*0.5;
			this.needsUpdate = 1;
		}
		this.action = ACT_IDLE;
	}
})();

const rpos = new Float32Array(2);
const rphotons = new Uint8ClampedArray(3);
/**
 * Generates mote with randomized position and photon values.
 * @return {Mote}
 */
Mote.random = function() {
	do {
		rpos[0] = random()*posneg();
		rpos[1] = random()*posneg();
	}
	while(magnitude(rpos) > 0.8); 
	rphotons[0] = ~~(random()*64);
	rphotons[1] = ~~(random()*64);
	rphotons[2] = ~~(random()*64);
	return new Mote(rphotons, rpos);
}

Mote.prototype.destroy = function() {
	BUFFER_POOL.free(this.offset);
}
