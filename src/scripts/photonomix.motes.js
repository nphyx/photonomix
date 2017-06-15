"use strict";
let {random, max, min, floor, ceil, sin} = Math;
import {TARGET_FPS, MOTE_BASE_SPEED, MOTE_BASE_SIZE, PREGNANT_THRESHOLD, 
				DEATH_THRESHOLD, GLOBAL_DRAG, PREGNANT_TIME, DEBUG} from "./photonomix.constants";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
import {avoid, accelerate, drag, twiddleVec, ratio, adjRand, posneg, outOfBounds, rotate} from "./photonomix.util";
const {vec2, times, mut_clamp, magnitude, distance, mut_copy, mut_times} = vectrix.vectors;
const {plus, mut_plus} = vectrix.matrices;
import {Photon, COLOR_R, COLOR_G, COLOR_B} from "./photonomix.photons";
import {Void} from "./photonomix.voids";
const clamp = mut_clamp;
// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
const POS_C  = vec2(0.0, 0.0);
// twiddle to slightly offset the values, avoids divide by zero and other errors
// inherent to acceleration, friction, drag and gravity equations
twiddleVec(POS_C);
// relative color values derived from a Mote's photons, used to produce color string
// for rendering

/**
 * Determines the food value of object b to mote a. Roughly, a mote prefers to eat 
 * photons and other motes unlike itself, and prefers objects smaller than itself
 * than those that are larger. Red motes are weighted to be the most predatory,
 * and green motes are weighted to be the least.
 */
const targetValue = (function() {
	return function targetValue(a, b) {
		let rat_argb = ratio(a.r, a.g+a.b);
		let rat_agrb = ratio(a.g, a.r+a.b);
		let rat_abrg = ratio(a.b, a.r+a.g);
		let rat_brgb = ratio(b.r, b.g+b.b);
		let rat_bgrb = ratio(b.g, b.r+b.b);
		let rat_bbrg = ratio(b.b, b.r+b.g);
		let deltaA = rat_argb - rat_brgb;
		let deltaB = rat_agrb - rat_bgrb;
		let deltaC = rat_abrg - rat_bbrg;
		let maxr = max(deltaA, deltaB, deltaC);
		let minr = min(deltaA, deltaB, deltaC);
		return maxr - minr;
	}
})();

// various consts below are indexes and byte counts for mote data
// byte length of these value types
const I8 = 1;
const F32 = 4;

// uint8 values = photons[3]
const U8_PHO = 0; 
const U8_RAT = U8_PHO + I8*3; 
const U8_COL = U8_RAT + I8*3; 
const U8_PREF = U8_COL + I8*3; 
const U8_VAL_LENGTH = U8_PREF + I8*3;
const I8_BYTE_OFFSET = U8_VAL_LENGTH;
// int8 values =  dying, pregnant, injured, lastMeal, pulse
const	I8_DYING = 0,
	I8_PREG = I8_DYING + I8,
	I8_INJURED = I8_PREG + I8,
	I8_LAST_INJURY = I8_INJURED + I8,
	I8_MEAL = I8_LAST_INJURY + I8,
	I8_UPD = I8_MEAL + I8,
	I8_PULSE = I8_UPD + I8;

const I8_VAL_LENGTH = I8_PULSE + I8;

const INT_VAL_LENGTH = U8_VAL_LENGTH + I8_VAL_LENGTH;

// float32 values = p[3], v[3], color[4], size, sizeMin, sizeMax, speed, sight, agro, fear, potential, resistance
const VEC_BYTE_OFFSET = INT_VAL_LENGTH + (F32-(INT_VAL_LENGTH % F32)), // float32 offsets must be multiples of 4
	// from here on, increments of value * 4
	// vectors
	F32_POS = 0,
	F32_VEL = F32_POS + 2;
const VEC_VAL_LENGTH = F32_VEL + 2,
	F32_BYTE_OFFSET = VEC_BYTE_OFFSET + (VEC_VAL_LENGTH*F32),
	// scalars
	F32_SIZE = 0,
	F32_SIZE_MIN = F32_SIZE + 1,
	F32_SIZE_MAX = F32_SIZE_MIN + 1,
	F32_SPEED = F32_SIZE_MAX + 1,
	F32_SIGHT = F32_SPEED + 1,
	F32_AGRO = F32_SIGHT + 1,
	F32_FEAR = F32_AGRO + 1,
	F32_POTENTIAL = F32_FEAR + 1,
	F32_RESISTANCE = F32_POTENTIAL + 1,
	F32_MASS = F32_RESISTANCE + 1;

const FLOAT_VAL_LENGTH = F32_MASS + 1;
export const BUFFER_LENGTH = F32_BYTE_OFFSET + (FLOAT_VAL_LENGTH*F32);


/**
 * Constructor for Motes.
 * @param {Float32Array(3)} photons initial photons (0-255, R, G, B)
 * @param {vec2} pos initial position
 * @param {Float} bSpeed (optional) base acceleration: inheritance and predesigned motes 
 * @param {Float} bSight (optional) base vision radius: inheritance and predesigned motes 
 * @param {Float} bAgro (optional) base aggressiveness: inheritance and predesigned motes 
 * @param {Float} bFear (optional) base fearfulness: inheritance and predesigned motes 
 * @param {BufferPool} pool (optional) buffer pool to build the mote on
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
 * @property {UintClamped8Array} ratios current photon ratios (R, G, B)
 * @property {UintClamped8Array} color current mote color (R, G, B)
 * @property {Int8Array} intVals direct access to integer value array (for debug)
 * @property {Float32Array} floatVals direct access to float value array (for debug)
 * @return {Mote}
 */
export function Mote(_photons = new Uint8Array(3), pos = new Float32Array(2), pool = undefined, bSpeed = MOTE_BASE_SPEED, bSight = 0.1, bAgro = 1.0, bFear = 1.0) {
	let buffer, offset = 0|0;
	if(pool) {
		buffer = pool.buffer;
		offset = pool.allocate();
	}
 	else {
		buffer = new ArrayBuffer(BUFFER_LENGTH);
		offset = 0;
	}

	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	let photons = new Uint8ClampedArray(buffer, U8_PHO+offset, I8*3);
	let ratios  = new Uint8ClampedArray(buffer, U8_RAT+offset, I8*3);
	let prefs   = new Uint8ClampedArray(buffer, U8_PREF+offset, I8*3);
	let color = new Uint8ClampedArray(buffer, U8_COL+offset, I8*3);
	photons[COLOR_R] = _photons[COLOR_R];
	photons[COLOR_G] = _photons[COLOR_G];
	photons[COLOR_B] = _photons[COLOR_B];
	let intVals = new Int8Array(buffer, I8_BYTE_OFFSET+offset, I8_VAL_LENGTH - U8_PHO);
	let floatVals = new Float32Array(buffer, F32_BYTE_OFFSET+offset, FLOAT_VAL_LENGTH);
	this.pos = vec2(pos, buffer, F32_POS*F32+VEC_BYTE_OFFSET+offset);
	this.vel = vec2(0.0, 0.0, buffer, F32_VEL*F32+VEC_BYTE_OFFSET+offset);
	this.target = undefined;
	this.color_string = "";
	bSpeed = bSpeed+adjRand(0.0005);
	bSight = bSight+adjRand(0.001); // vision distance
	bAgro = bAgro+adjRand(0.001);
	bFear = bFear+adjRand(0.001);

	Object.defineProperties(this, {
		"photons":{get: () => photons},
		"ratios":{get: () => ratios},
		"prefs":{get: () => prefs},
		"color":{get: () => color},
		"dying":{get: () => intVals[I8_DYING], set: (v) => intVals[I8_DYING] = v},
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
		"pool":{get: () => pool},
		"offset":{get: () => offset}
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
		g = photons[COLOR_B];
		b = photons[COLOR_G];
		this.mass = r + g + b;
		if(this.mass > 0) { // otherwise skip this stuff since the mote is dead anyway
		this.size = clamp(this.mass/(PREGNANT_THRESHOLD/3)*MOTE_BASE_SIZE, this.sizeMin, this.sizeMax);
			ratios[COLOR_R] = ratio(r, g+b);
			ratios[COLOR_G] = ratio(g, r+b);
			ratios[COLOR_B] = ratio(b, g+r);
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

		color[COLOR_R] = ~~(r/this.mass*255);
		color[COLOR_G] = ~~(g/this.mass*255);
		color[COLOR_B] = ~~(b/this.mass*255);
		this.needsUpdate = 0;
	}
})();

/**
 * Decide how to act each tick based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float delta time delta
 */
let vel, size, sight, speed, agro, fear, scratchVec2 = vec2(),
	scratchVec1 = vec2(), weight, mainTarget, predicted = vec2(), 
	highestWeight, mainTargetDist, a_dist, value, 
	a_i, a_len, entity, pos, handling, tmpPot = 0.0, tmpRes = 0.0, 
	potential = 0.0, resistance = 0.0, pregnant = 0|0, dying = 0|0,
	epos;
Mote.prototype.tick = function(surrounding, delta, frameCount) {
	/* jshint unused:false */
	({pregnant, dying} = this);
	if(pregnant > 0) this.pregnant = pregnant - 1;
	if(dying > 0) this.dying = dying + 1; // start counting up
	if(this.needsUpdate) this.updateProperties();
	({pos, vel, size, sight, speed, agro, fear, resistance, potential} = this);
	// decrement counters
	handling = (1/size)*sight*speed;
	// build potential and resistance each tick
	tmpPot = agro * (size*100);
	tmpRes = fear * (size*100);
	this.potential = clamp(potential + agro*delta, -tmpPot, tmpPot);
	this.resistance = clamp(resistance + fear*delta, -tmpRes, tmpRes);

	// last turn's move, has to happen first to avoid prediction inaccuracy
	// during chases
	mut_plus(pos, times(vel, delta, scratchVec1));

	// apply basic forces
	mut_plus(vel, avoid(vel, pos, POS_C, 1.1, speed, handling, scratchVec1)); // don't go off the screen
	// apply drag
	mut_plus(vel, drag(vel, GLOBAL_DRAG));
	// put an absolute limit on velocity
	//limitVecMut(vel, 0, 2);
	// drop target if invalid, too far away or out of bounds
	mainTarget = this.target;
	if(mainTarget && (
			outOfBounds(mainTarget, 0.7) ||
			(distance(pos, mainTarget.pos) > sight) ||
			(mainTarget instanceof Photon && mainTarget.lifetime < 1)
		)) this.target = mainTarget = undefined; 
	else if(mainTarget instanceof Photon) this.eatPhoton(mainTarget);
	else if(mainTarget instanceof Mote) {
		plus(mainTarget.pos, times(mainTarget.vel, delta, scratchVec1), predicted);
		if(this.resistance < (fear*3)) { // run away
			mut_plus(vel, accelerate(predicted, pos, handling, scratchVec1));
			mut_plus(vel, accelerate(pos, predicted, -speed, scratchVec1));
		}
		else { // chase target
			if(distance(pos, mainTarget.pos) < sight &&
				this.potential > agro*3) this.discharge(mainTarget);
			mut_plus(vel, accelerate(predicted, pos, -handling, scratchVec1));
			mut_plus(vel, accelerate(pos, predicted, speed, scratchVec1));
		}
	} // end what to do if target is mote 
	// reset scratch memory that may not be initialized
	//weightCount = 0; 
	highestWeight = -Infinity;
	mainTargetDist = 0;
	for(a_i = 0, a_len = surrounding.length; a_i < a_len; ++a_i) {
		entity = surrounding[a_i];
		dying = entity.dying; // safe to reuse here since we're done with this.dying
		epos = entity.pos;
		if(entity === this) continue;
		if(dying !== undefined && dying > 0) continue; // leave dying motes alone, avoids bugs
		// ignore things outside sight range
		if((a_dist = distance(pos, epos)) > (sight+(entity.size*0.5))) continue;
		// don't get too close
		if(entity instanceof Mote && a_dist < (size+entity.size)*0.5) {
				mut_copy(scratchVec1, pos);
				mut_plus(vel, rotate(scratchVec1, epos, handling, scratchVec1)); 
				mut_plus(vel, accelerate(pos, scratchVec1, speed, scratchVec2));
		} // end stuff to do if void
		else if(entity instanceof Void) {
				mut_copy(scratchVec1, pos);
				//mut_plus(vel, rotate(epos, scratchVec1, 0.1, scratchVec1)); 
				mut_plus(vel, accelerate(epos, pos, speed, scratchVec2));
		}
		if(highestWeight < Infinity && this.injured === 0) { // else a hard choice has been made
			if(entity instanceof Photon && entity.lifetime > 2) {
				// need some energy to eat, and can't eat while injured
				mainTarget = entity;
				highestWeight = Infinity;
			} // end stuff to do if photon
			else if(entity instanceof Mote &&
					this.potential > agro*3) { // save up a good charge
				value = targetValue(this, entity)||0;
				// target value is the weighted difference between food and fear values
				weight = a_dist*(value*agro + value*fear);
				if(weight > highestWeight) {
					highestWeight = weight;
					mainTarget = entity;
					mainTargetDist = a_dist;
				}
			} // end stuff to do if mote
		} // end if highest weight < Infinity
	} // end surrounding entities loop
	// new target acquired?
	if(mainTarget) this.target = mainTarget;
	else { // wander
		if(magnitude(vel) < 0.001) { // not going anywhere, so pick a random direction
			scratchVec1[0] = random()*2-1;
			scratchVec1[1] = random()*2-1;
		}
		else {
			mut_copy(scratchVec1, pos);
			mut_plus(scratchVec1, times(vel, delta, scratchVec2));
			mut_plus(scratchVec1, rotate(scratchVec1, pos, sin((frameCount+this.pulse)*handling), scratchVec2));
		}
		mut_plus(vel, accelerate(pos, scratchVec1, speed, scratchVec2));
	}
}

let delta = 0.0;
Mote.prototype.discharge = function(target) {
	delta = this.potential - target.resistance;
	target.resistance -= max(this.agro, delta*this.agro);
	this.potential -= max(this.fear, delta*this.fear);
	target.injure(this, max(0, ~~(delta)));
	if(this.potential < (this.fear*3) ||
		target.injured > this.agro
	) this.target = undefined;
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
	return function bleed(photonPool) {
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
		return new Photon(this.pos, pvel, choice, photonPool);
		//return choice;
	}
})();

Mote.prototype.split = (function() {
	let baby, photons;
	return function() {
		photons = this.photons;
		baby = new Mote(
			[floor(photons[COLOR_R]/2), floor(photons[COLOR_G]/2), floor(photons[COLOR_B]/2)],
			this.pos, this.pool, this.base_speed, this.base_sight, this.base_agro, 
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
		photons = this.photons;
		if(photon.lifetime > 0) {
			photon.lifetime = 0;
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
		this.target = undefined;
	}
})();

const rpos = new Float32Array(2);
const rphotons = new Uint8ClampedArray(3);
/**
 * Generates mote with randomized position and photon values.
 * @param {BufferPool} pool storage pool
 * @return {Mote}
 */
Mote.random = function(pool) {
	do {
		rpos[0] = random()*posneg();
		rpos[1] = random()*posneg();
	}
	while(magnitude(rpos) > 0.8); 
	rphotons[0] = ~~(random()*64);
	rphotons[1] = ~~(random()*64);
	rphotons[2] = ~~(random()*64);
	return new Mote(rphotons, rpos, pool);
}

Mote.prototype.destroy = function() {
	this.pool.free(this.offset);
}
