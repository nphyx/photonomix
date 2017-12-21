"use strict";
let {random, max, min, floor, ceil, sin} = Math;
import {TARGET_FPS, MOTE_BASE_SPEED, MOTE_BASE_SIZE, MOTE_BASE_SIGHT, PREGNANT_THRESHOLD, 
				DEATH_THRESHOLD, GLOBAL_DRAG, PREGNANT_TIME, DEBUG, MAX_MOTES/*, POSITIVE_ENERGY, NEGATIVE_ENERGY*/} from "../photonomix.constants";
import * as vectrix from "@nphyx/vectrix";
import {BooleanArray} from "@nphyx/pxene";
import {avoid, accelerate, drag, twiddleVec, adjRand, posneg, outOfBounds, rotate, norm_ratio} from "../photonomix.util";
const {vec2, times, mut_clamp, magnitude, distance, mut_copy, mut_times} = vectrix.vectors;
const {plus, mut_plus} = vectrix.matrices;
import {BufferPool} from "../photonomix.bufferPools";
import * as Photons from "./photons";
import {COLOR_R, COLOR_G, COLOR_B} from "./photons";
import {emitPhoton, Void} from "./";
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
			F32_BASE_SPEED   = F32_FEAR       + 1,
			F32_BASE_SIGHT   = F32_BASE_SPEED + 1,
			F32_BASE_AGRO    = F32_BASE_SIGHT + 1,
			F32_BASE_FEAR    = F32_BASE_AGRO  + 1,
			F32_POTENTIAL    = F32_BASE_FEAR  + 1,
			F32_RESISTANCE   = F32_POTENTIAL  + 1,
			F32_MASS         = F32_RESISTANCE + 1,
			FLOAT_VAL_LENGTH = F32_MASS       + 1;

export const BUFFER_LENGTH = F32_BYTE_OFFSET + (FLOAT_VAL_LENGTH*F32);

// scratch vectors used in various functions
const scratch1 = vec2(), scratch2 = vec2();

const BUFFER_POOL = new BufferPool(BUFFER_LENGTH, MAX_MOTES);

const ACTIVE_LIST = new BooleanArray(MAX_MOTES);
export const POOL = Array(MAX_MOTES);
export var death_count = 0;
export var birth_count = 0;
export var current_population = 0;

/**
 * @property {vec2} pos position vector
 * @property {vec2} vel velocity vector
 * @property {Uint8} r red photon value (setter updates values and derived props)
 * @property {Uint8} g green photon value (setter updates value and derived props)
 * @property {Uint8} b blue photon value (setter updates value and derived props)
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
 * @property {Int8Array} intVals direct access to integer value array
 * @property {Float32Array} ratios current photon ratios (R, G, B)
 * @property {Float32Array} prefs preferred photon ratios
 * @property {Float32Array} floatVals direct access to float value array
 * @return {Mote}
 */
export function Mote() {
	let buffer = BUFFER_POOL.buffer,
			offset = BUFFER_POOL.allocate();

	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	let photons = new Uint8ClampedArray(buffer, U8_PHO+offset, 3);
	let color = new Uint8ClampedArray(buffer, U8_COL+offset, 3);
	let intVals = this.intVals = new Int8Array(buffer, I8_BYTE_OFFSET+offset, I8_VAL_LENGTH - U8_PHO);
	let floatVals = this.floatVals = new Float32Array(buffer, F32_BYTE_OFFSET+offset, FLOAT_VAL_LENGTH);
	this.pos = vec2(0.0, 0.0, buffer, F32_POS*F32+VEC_BYTE_OFFSET+offset);
	this.vel = vec2(0.0, 0.0, buffer, F32_VEL*F32+VEC_BYTE_OFFSET+offset);
	let ratios  = new Float32Array(buffer, F32_RAT*F32+VEC_BYTE_OFFSET+offset, 3);
	let prefs   = new Float32Array(buffer, F32_PREF*F32+VEC_BYTE_OFFSET+offset, 3);
	this.target = undefined;

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
		"base_speed":{get: () => floatVals[F32_BASE_SPEED], set: (v) => floatVals[F32_BASE_SPEED] = v},
		"base_sight":{get: () => floatVals[F32_BASE_SIGHT], set: (v) => floatVals[F32_BASE_SIGHT] = v},
		"base_agro":{get: () => floatVals[F32_BASE_AGRO], set: (v) => floatVals[F32_BASE_AGRO] = v},
		"base_fear":{get: () => floatVals[F32_BASE_FEAR], set: (v) => floatVals[F32_BASE_FEAR] = v},
		"speed":{get: () => floatVals[F32_SPEED], set: (v) => floatVals[F32_SPEED] = v},
		"sight":{get: () => floatVals[F32_SIGHT], set: (v) => floatVals[F32_SIGHT] = v},
		"agro":{get: () => floatVals[F32_AGRO], set: (v) => floatVals[F32_AGRO] = v},
		"fear":{get: () => floatVals[F32_FEAR], set: (v) => floatVals[F32_FEAR] = v},
		"potential":{get: () => floatVals[F32_POTENTIAL], set: (v) => floatVals[F32_POTENTIAL] = v},
		"resistance":{get: () => floatVals[F32_RESISTANCE], set: (v) => floatVals[F32_RESISTANCE] = v},
		"mass":{get: () => floatVals[F32_MASS], set: (v) => floatVals[F32_MASS] = v},
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
}

/**
 * Factory for initializing a new Mote from the buffer pool.
 * @param {Float32Array(3)} photons initial photons (0-255, R, G, B)
 * @param {vec2} pos initial position
 * @param {Float} bSpeed (optional) base acceleration: inheritance and predesigned motes 
 * @param {Float} bSight (optional) base vision radius: inheritance and predesigned motes 
 * @param {Float} bAgro (optional) base aggressiveness: inheritance and predesigned motes 
 * @param {Float} bFear (optional) base fearfulness: inheritance and predesigned motes 
 * @return {Mote}
 */
Mote.prototype.init = function(_photons = new Uint8Array(3), pos = new Float32Array(2), bSpeed = MOTE_BASE_SPEED, bSight = MOTE_BASE_SIGHT, bAgro = 1.0, bFear = 1.0) {
	mut_copy(this.pos, pos);
	mut_copy(this.photons, _photons);

	// set up initial and derived values
	this.base_speed = bSpeed+adjRand(0.0005);
	this.base_sight = bSight+adjRand(0.001);
	this.base_agro = bAgro+adjRand(0.001);
	this.base_fear = bFear+adjRand(0.001);
	this.potential = this.agro*2;
	this.resistance = this.fear*2;
	this.lastMeal = ~~(random()*3);
	this.pulse = ~~(TARGET_FPS*random());
	this.size = MOTE_BASE_SIZE;
	this.sizeMin = MOTE_BASE_SIZE*0.5;
	this.sizeMax = MOTE_BASE_SIZE*3;

	this.updateProperties();

	// only set the preferred color ratios once, since we want them to persist from birth
	mut_copy(this.prefs, this.ratios);
	return this;
}

/**
 * Updates derived properties for mote.
 */
Mote.prototype.updateProperties = (function() {
	let  photons, color, ratios;
	return function updateProperties() {
		({photons, ratios, color} = this);
		this.mass = photons[COLOR_R] + photons[COLOR_G] + photons[COLOR_B];
		this.size = clamp(this.mass/(PREGNANT_THRESHOLD/3)*MOTE_BASE_SIZE, this.sizeMin, this.sizeMax);
		norm_ratio(photons, ratios);
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

		if((this.mass > PREGNANT_THRESHOLD) && this.pregnant === 0) this.pregnant = PREGNANT_TIME;
		if((this.mass < DEATH_THRESHOLD) && this.dying === 0) this.dying = 1;
		if(current_population >= MAX_MOTES) this.pregnant = 0; // can't have a baby, dang population controls!

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

		// check out photons
		Photons.forEach((photon) => {
			let dist = this.validateTarget(photon);
			if(dist === -1) return;
			if(photon.lifetime < 4) return;
			deltar = (this.prefs[COLOR_R] - this.ratios[COLOR_R]);	
			deltag = (this.prefs[COLOR_G] - this.ratios[COLOR_G]);	
			deltab = (this.prefs[COLOR_B] - this.ratios[COLOR_B]);	
			maxd = max(deltar, deltag, deltab);
			mind = min(deltar, deltag, deltab);
			if((maxd == deltar && photon.color == COLOR_R) ||
					(maxd == deltag && photon.color == COLOR_G) ||
					(maxd == deltab && photon.color == COLOR_B)) weight = 30;
			if((mind == deltar && photon.color == COLOR_R) ||
					(mind == deltag && photon.color == COLOR_G) ||
					(mind == deltab && photon.color == COLOR_B)) weight = 10;
			else weight = 20;
			cur = weight*(1/dist);
			if(cur > highest) {
				this.target = photon;
				this.action = ACT_CHASE;
				highest = cur;
			}
		});

		forEach((mote) => {
			let dist = this.validateTarget(mote);
			if(dist === -1) return;
			cur = 3*(1/dist);
			if(cur > highest) {
				this.target = mote;
				if(mote.target === this || dist < (this.size+mote.size)*0.5) {
					this.action = ACT_AVOID;
				}
				else this.action = ACT_CHASE;
				highest = cur;
			}
		});

		for(i = 0, len = entities.length; (i < len) && (highest < Infinity); ++i) {
			entity = entities[i];
			let dist = this.validateTarget(entity);
			if(dist === -1) continue;
			// ignore things outside sight range
			else if(entity instanceof Void) {
				this.target = entity;
				this.action = ACT_AVOID;
				highest = Infinity;
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
				else if(target instanceof Photons.Photon) this.eatPhoton(target);
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

/**
 * Discharges a bolt of plasma at a target.
 */
Mote.prototype.discharge = function(target) {
	let delta = this.potential - target.resistance;
	target.resistance -= max(this.agro, delta*this.agro);
	this.potential -= max(this.fear, delta*this.fear);
	target.injure(this, max(0, ~~(delta)));
	if(this.potential < 0) this.action = ACT_IDLE;
}

/**
 * Causes a mote to take damage, increasing its injury counter by the strength parameter.
 * @param {Entity} by the entity causing the injury
 * @param {Int} strength the strength of the injury
 */
Mote.prototype.injure = function(by, strength) {
	this.injured += strength;
	this.lastInjury = this.injured;
	if(this.resistance < (this.agro*3) ||
		this.injured < this.fear
	) this.target = by;
}

/**
 * When motes are damaged they bleed out photons until the damage equalizes.
 */
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
		Photons.create(this.pos, pvel, choice);
		//return choice;
	}
})();

/**
 * A mote that reaches the pregnancy threshold will split into two semi-identical motes.
 */
Mote.prototype.split = (function() {
	let baby, photons;
	return function() {
		photons = this.photons;
		baby = create(
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
		birth_count++;
	}
})();

/**
 * Consumes a photon, adding its value to the internal photon list.
 * @param {Photon} photon the photon to be consumed
 */
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

/**
 * When a mote is ready to die, it sets loose its remaining photons in a ring.
 */
Mote.prototype.die = function() {
	let r, g, b, c, i, sum;
	/*
	if(random() < POSITIVE_ENERGY) {
		Emitters.create(this.pos, this.vel, ~~(DEATH_THRESHOLD*10*random()), undefined, this.ratios));
	}
 /*
	else if(random() < NEGATIVE_ENERGY) {
		Voids.create(this.pos, this.vel, ~~(DEATH_THRESHOLD*10*random()))); 
	}
	*/
	r = this.photons[0];
	g = this.photons[1];
	b = this.photons[2];
	sum = r+b+g;
	c = 0;
	for(i = 0; i < sum; ++i) {
		if(r === i) c = 1;
		if(r+g === i) c = 2;
		emitPhoton(this.pos, undefined, c, i, sum);
	}
	this.clean();
	this.destroy();
	death_count++;
}

/**
 * Removes a mote from the active list.
 * @param {int} o pool index
 */
Mote.prototype.destroy = function() {
	ACTIVE_LIST.set(this.offset, false);
	current_population--;
}

/**
 * Cleans up a mote's values, readying it to reuse.
 */
Mote.prototype.clean = function() {
	this.pos.fill(0.0);
	this.vel.fill(0.0);
	this.intVals.fill(0);
	this.floatVals.fill(0);
}

/**
 * Looks up the next inactive mote object in the list.
 */
function nextInactive() {
	let i = 0, len = MAX_MOTES;
	for(; i < len; ++i) if(!ACTIVE_LIST.get(i)) return i;
	throw new Error("out of motes");
}

/**
 * Factory for initializing a new Mote from the buffer pool.
 * @param {Float32Array(3)} photons initial photons (0-255, R, G, B)
 * @param {vec2} pos initial position
 * @param {Float} bSpeed (optional) base acceleration: inheritance and predesigned motes 
 * @param {Float} bSight (optional) base vision radius: inheritance and predesigned motes 
 * @param {Float} bAgro (optional) base aggressiveness: inheritance and predesigned motes 
 * @param {Float} bFear (optional) base fearfulness: inheritance and predesigned motes 
 * @return {Mote}
 */
export function create(photons = new Uint8Array(3), pos = new Float32Array(2), bSpeed = MOTE_BASE_SPEED, bSight = MOTE_BASE_SIGHT, bAgro = 1.0, bFear = 1.0) {
	let o = nextInactive();
	ACTIVE_LIST.set(o, true);
	POOL[o].init(photons, pos, bSpeed, bSight, bAgro, bFear);
	current_population++;
	return POOL[o];
}

/**
 * Initialize the mote module, creating and filling the buffer pool in preparation for use.
 */
export function init() {
	for(let i = 0; i < MAX_MOTES; ++i) {
		POOL[i] = new Mote();
	}
}

/**
 * Module tick function.
 * @param {Array} surrounding DEPRECATED list of game entities
 * @param {float} delta frame time delta
 * @param {int} frameCount number of frames elapsed since game start
 */
export function tick(surrounding, delta, frameCount) {
	let i = 0, len = MAX_MOTES, mote;
	for(; i < len; ++i) if(ACTIVE_LIST.get(i)) {
		mote = POOL[i];	
		mote.tick(surrounding, delta, frameCount);
		if(mote.injured) {
			if(frameCount % ~~(TARGET_FPS*0.1) === 0) {
				mote.bleed();
			}
		}
		// mark dead for removal
		if(mote.dying === DEATH_THRESHOLD) {
			mote.die();
		}
		else if(mote.pregnant === PREGNANT_TIME) {
			mote.split();
		}
	}
}

/**
 * Loops through currently active motes, calling the callback function.
 * @param {function} cb callback in the standard Array.forEach form 
 */
export function forEach(cb) {
	let i = 0, len = MAX_MOTES;
	for(; i < len; ++i) if(ACTIVE_LIST.get(i)) {
		cb(POOL[i], i, POOL);
	}
}

/**
 * Generates mote with randomized position and photon values.
 */
export const createRandom = (function() {
	const rpos = new Float32Array(2);
	const rphotons = new Uint8ClampedArray(3);
	return function() {
		do {
			rpos[0] = random()*posneg();
			rpos[1] = random()*posneg();
		}
		while(magnitude(rpos) > 0.8); 
		rphotons[0] = ~~(random()*64);
		rphotons[1] = ~~(random()*64);
		rphotons[2] = ~~(random()*64);
		create(rphotons, rpos);
	}
})();
