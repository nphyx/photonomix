"use strict";
let {random, max, min, floor, ceil} = Math;
import {TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, MOTE_BASE_SPEED,
				WEIGHT_PRED_B, MOTE_BASE_SIZE, PREGNANT_THRESHOLD, 
				DEATH_THRESHOLD, GLOBAL_DRAG, PREGNANT_TIME, DEBUG} from "./photonomix.constants";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
import {avoid, accelerate, drag, twiddleVec, ratio, adjRand, posneg, limitVecMut} from "./photonomix.util";
const {vec2, times, mut_clamp, magnitude, distance} = vectrix.vectors;
const {plus, mut_plus} = vectrix.matrices;
import {Photon, COLOR_R, COLOR_B, COLOR_G} from "./photonomix.photons";
const clamp = mut_clamp;
// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
const POS_C  = vec2(0.0, 0.0);
// twiddle to slightly offset the values, avoids divide by zero and other errors
// inherent to acceleration, friction, drag and gravity equations
twiddleVec(POS_C);
// these are used during Mote.updateProperties to store ratios between colors
let rat_r = 0.0, rat_g = 0.0, rat_b = 0.0;
// sum of photon values, used during Mote.updateProperties
let ud_sum = 0.0;
// relative color values derived from a Mote's photons, used to produce color string
// for rendering
const tmp_color = new Uint8ClampedArray(3);

const FV = 3;
/**
 * Determines the food value of object b to mote a. Roughly, a mote prefers to eat 
 * photons and other motes unlike itself, and prefers objects smaller than itself
 * than those that are larger. Red motes are weighted to be the most predatory,
 * and green motes are weighted to be the least.
 */
const foodValue = (function() {
	let fv_strongest = 0.0, asize = 0.0, bsize = 0.0;
	const FV_SCRATCH = new Float32Array(4);
	return function foodValue(a, b) {
		asize = a.size;
		bsize = b.size;
		// find the strongest color; this helps determine behavior
		fv_strongest = max(a.r, a.g, a.b);
		FV_SCRATCH[COLOR_R] = ratio(b.r, a.r);
		FV_SCRATCH[COLOR_G] = ratio(b.g, a.g);
		FV_SCRATCH[COLOR_B] = ratio(b.b, a.b);
		FV_SCRATCH[FV] = 1;
		// this should apply multiple behavior weights when the mote is a hybrid
		switch(fv_strongest) {
			case a.r: 
				FV_SCRATCH[FV] *= (FV_SCRATCH[COLOR_G] + FV_SCRATCH[COLOR_B]) * 
					WEIGHT_PRED_R - FV_SCRATCH[COLOR_R]*(1/WEIGHT_PRED_R);
			break;
			case a.g:
				FV_SCRATCH[FV] *= (FV_SCRATCH[COLOR_R] + FV_SCRATCH[COLOR_B]) * 
					WEIGHT_PRED_G - FV_SCRATCH[COLOR_G]*(1/WEIGHT_PRED_G);
			break;
			case a.b:
				FV_SCRATCH[FV] *= (FV_SCRATCH[COLOR_R] + FV_SCRATCH[COLOR_G]) * 
					WEIGHT_PRED_B - FV_SCRATCH[COLOR_B]*(1/WEIGHT_PRED_B);
			break;
		}

		return FV_SCRATCH[FV] * ((ratio(asize, bsize)*2)-1);
	}
})();

// various consts below are indexes and byte counts for mote data
// byte length of these value types
const I8 = 1;
const F32 = 4;

// uint8 values = photons[3]
const O_PHO = 0; 
const U8_VAL_LENGTH = O_PHO + I8*3;
const I8_BYTE_OFFSET = U8_VAL_LENGTH;
// int8 values =  dying, pregnant, injured, scared, full, lastMeal, pulse
const	O_DYING = 0,
	O_PREG = O_DYING + I8,
	O_INJURED = O_PREG + I8,
	O_LAST_INJURY = O_INJURED + I8,
	O_SCARED = O_LAST_INJURY + I8,
	O_FULL = O_SCARED + I8,
	O_MEAL = O_FULL + I8,
	O_PULSE = O_MEAL + I8;

const I8_VAL_LENGTH = O_PULSE + I8;

const I_VALS_LENGTH = U8_VAL_LENGTH + I8_VAL_LENGTH;

// float32 values = p[3], v[3], color[4], size, sizeMin, sizeMax, speed, sight, agro, fear
const VECS_BYTE_OFFSET = I_VALS_LENGTH + (F32-(I_VALS_LENGTH % F32)), // float32 offsets must be multiples of 4
	// from here on, increments of value * 4
	// vectors
	O_POS = 0,
	O_VEL = O_POS + 2,
	O_COL = O_VEL + 2;
const VEC_VAL_LENGTH = O_COL + 4,
	O_FLOATS_BYTE_OFFSET = VECS_BYTE_OFFSET + VEC_VAL_LENGTH*F32,
	// scalars
	O_SIZE = 0,
	O_SIZE_MIN = O_SIZE + 1,
	O_SIZE_MAX = O_SIZE_MIN + 1,
	O_SPEED = O_SIZE_MAX + 1,
	O_SIGHT = O_SPEED + 1,
	O_AGRO = O_SIGHT + 1,
	O_FEAR = O_AGRO + 1;

const FLOAT_VAL_LENGTH = O_FEAR - O_SIZE + 1;
export const BUFFER_LENGTH = O_FLOATS_BYTE_OFFSET + (O_FEAR + 1)*F32;

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
 * @property {Int8} scared timer for fleeing after injury
 * @property {Int8} full timer after eating before hungry again
 * @property {Int8} pulse frame offset for pulse animation
 * @property {Int8} lastMeal color value for last meal (see R, G, B constants)
 * @property {Float32} speed derived acceleration speed based on Mote properties
 * @property {Float32} sight derived vision radius based on Mote properties 
 * @property {Float32} agro derived aggression factor based on Mote properties 
 * @property {Float32} fear derived fearfulness factor based on Mote properties 
 * @property {Float32} size derived size radius as fraction of screen size
 * @property {Float32} sizeMin minimum size the mote can reach as it shrinks
 * @property {Float32} sizeMax maximum size the mote can reach as it grows
 * @property {UintClamped8Array} photons current photon values (R, G, B) (for debug)
 * @property {Int8Array} intVals direct access to integer value array (for debug)
 * @property {Float32Array} floatVals direct access to float value array (for debug)
 * @return {Mote}
 */
export function Mote(_photons = new Uint8Array(3), pos = new Float32Array(2), pool = undefined, bSpeed = MOTE_BASE_SPEED, bSight = 0.1, bAgro = 1.0, bFear = 1.0) {
	let buffer, offset;
	if(pool) {
		buffer = pool.buffer;
		offset = pool.allocate();
	}
 	else {
		buffer = new ArrayBuffer(BUFFER_LENGTH);
		offset = 0;
	}
	let that = this;

	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	let photons = new Uint8ClampedArray(buffer, O_PHO+offset, I8*3);
	photons[COLOR_R] = _photons[COLOR_R];
	photons[COLOR_G] = _photons[COLOR_G];
	photons[COLOR_B] = _photons[COLOR_B];
	let intVals = new Int8Array(buffer, I8_BYTE_OFFSET+offset, I8_VAL_LENGTH - O_PHO);
	let floatVals = new Float32Array(buffer, O_FLOATS_BYTE_OFFSET+offset, FLOAT_VAL_LENGTH);
	this.pos = vec2(pos, buffer, O_POS*F32+VECS_BYTE_OFFSET+offset);
	this.vel = vec2(0.0, 0.0, buffer, O_VEL*F32+VECS_BYTE_OFFSET+offset);
	this.target = undefined;
	this.color_string = "";
	this.strongest = 0;
	this.weakest = 0;

	floatVals[O_SIZE_MAX] = MOTE_BASE_SIZE*3;
	floatVals[O_SIZE_MIN] = MOTE_BASE_SIZE*0.5;
	bSpeed = bSpeed+adjRand(0.0005);
	bSight = bSight+adjRand(0.001); // vision distance
	bAgro = bAgro+adjRand(0.001);
	bFear = bFear+adjRand(0.001);

	function updateProperties() {
		/* jshint validthat:true */
		ud_sum = photons[COLOR_R] + photons[COLOR_G] + photons[COLOR_B];
		if(ud_sum > 0) { // skip that stuff since it'll glitch and the mote is dead anyway
		floatVals[O_SIZE] = clamp(ud_sum/(PREGNANT_THRESHOLD/3)*MOTE_BASE_SIZE, floatVals[O_SIZE_MIN], floatVals[O_SIZE_MAX]);
			rat_r = ratio(photons[COLOR_R], photons[COLOR_G]+photons[COLOR_B]);
			rat_g = ratio(photons[COLOR_G], photons[COLOR_R]+photons[COLOR_B]);
			rat_b = ratio(photons[COLOR_B], photons[COLOR_G]+photons[COLOR_R]);
			that.speed = bSpeed*((1+rat_b+rat_r)-that.size);
			that.sight = bSight*(1+rat_b);
			that.agro = bAgro*(1+rat_b);
			that.fear = bFear*(1+rat_g);
			if(DEBUG) {
				if(isNaN(that.speed)) throw new Error("Mote.updateProperties: NaN speed");
				if(isNaN(that.sight)) throw new Error("Mote.updateProperties: NaN sight");
				if(isNaN(that.size)) throw new Error("Mote.updateProperties: NaN size");
				if(isNaN(that.agro)) throw new Error("Mote.updateProperties: NaN agro");
				if(isNaN(that.fear)) throw new Error("Mote.updateProperties: NaN fear");
			}
			switch(max(photons[COLOR_R], photons[COLOR_G], photons[COLOR_B])) {
				case photons[COLOR_R]:that.strongest = COLOR_R; break;
				case photons[COLOR_G]:that.strongest = COLOR_G; break;
				case photons[COLOR_B]:that.strongest = COLOR_B; break;
			}
			if(photons[COLOR_R] < photons[COLOR_G]) {
				if(photons[COLOR_R] < photons[COLOR_B]) {
					if(photons[COLOR_R] > 5) that.weakest = COLOR_R;
					else if(photons[COLOR_B] < photons[COLOR_G]) {
						if(photons[COLOR_B] > 5) that.weakest = COLOR_B;
					}
					else if(photons[COLOR_G] > 5) that.weakest = COLOR_G;
				}
				else if(photons[COLOR_B] > 5) that.weakest = COLOR_B;
			}
			else if(photons[COLOR_G] < photons[COLOR_B]) {
				if(photons[COLOR_G] > 5) that.weakest = COLOR_G;
				else if(photons[COLOR_B] < photons[COLOR_R]) {
					if(photons[COLOR_R] > 5) that.weakest = COLOR_R;
					else that.weakest = COLOR_B;
				}
			}
			else if(photons[COLOR_B] > 5) that.weakest = COLOR_B;
			else that.weakest = COLOR_G;
		} // end of stuff to do only if sum > 0

		if(ud_sum > PREGNANT_THRESHOLD) that.pregnant = PREGNANT_TIME;
		if(ud_sum < DEATH_THRESHOLD && that.dying === 0) that.dying = 1;

		tmp_color[COLOR_R] = ~~(photons[COLOR_R]/ud_sum*255);
		tmp_color[COLOR_G] = ~~(photons[COLOR_G]/ud_sum*255);
		tmp_color[COLOR_B] = ~~(photons[COLOR_B]/ud_sum*255);
		that.color_string = "rgb("+tmp_color[COLOR_R]+","+tmp_color[COLOR_G]+","+tmp_color[COLOR_B]+")";
	}

	function setPhoton(v, n) {
		photons[n] = max(0, min(v, 255));
		updateProperties();
	}

	Object.defineProperties(this, {
		"r":{get: () => photons[COLOR_R], set: (v) => setPhoton(v, COLOR_R)},
		"g":{get: () => photons[COLOR_G], set: (v) => setPhoton(v, COLOR_G)},
		"b":{get: () => photons[COLOR_B], set: (v) => setPhoton(v, COLOR_B)},
		"dying":{get: () => intVals[O_DYING], set: (v) => intVals[O_DYING] = v},
		"pregnant":{get: () => intVals[O_PREG], set: (v) => intVals[O_PREG] = v},
		"injured":{get: () => intVals[O_INJURED], set: (v) => intVals[O_INJURED] = v},
		"lastInjury":{get: () => intVals[O_LAST_INJURY], set: (v) => intVals[O_LAST_INJURY] = v},
		"scared":{get: () => intVals[O_SCARED], set: (v) => intVals[O_SCARED] = v},
		"full":{get: () => intVals[O_FULL], set: (v) => intVals[O_FULL] = v},
		"pulse":{get: () => intVals[O_PULSE], set: (v) => intVals[O_PULSE] = v},
		"lastMeal":{get: () => intVals[O_MEAL], set: (v) => intVals[O_MEAL] = v},
		"size":{get: () => floatVals[O_SIZE]},
		"sizeMin":{get: () => floatVals[O_SIZE_MIN]},
		"sizeMax":{get: () => floatVals[O_SIZE_MAX]},
		"speed":{get: () => floatVals[O_SPEED], set: (v) => floatVals[O_SPEED] = v},
		"sight":{get: () => floatVals[O_SIGHT], set: (v) => floatVals[O_SIGHT] = v},
		"agro":{get: () => floatVals[O_AGRO], set: (v) => floatVals[O_AGRO] = v},
		"fear":{get: () => floatVals[O_FEAR], set: (v) => floatVals[O_FEAR] = v},
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
		"photons":{get: () => photons},
		"intVals":{get: () => intVals},
		"floatVals":{get: () => floatVals},
	});

	// initialize values, important to do since buffer may be reused
	this.dying = 0;
	this.pregnant = 0;
	this.injured = 0;
	this.lastInjury = 0;
	this.scared = 0;
	this.full = 0;
	this.speed = bSpeed;
	this.sight = bSight;
	this.agro = bAgro;
	this.fear = bFear;
	this.lastMeal = ~~(random()*3);
	this.pulse = ~~(TARGET_FPS*random());
	floatVals[O_SIZE] = MOTE_BASE_SIZE;

	updateProperties(this);
	return this;
}

/**
 * Decide how to act each tick based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float delta time delta
 */
let vel, size, sight, speed, agro, fear, tmp2 = vec2(),
	tmpvec = vec2(), weight, mainTarget, predicted = vec2(), 
	highestWeight, mainTargetDist, a_dist, food, scary, 
	a_i, a_len, current, pos, handling;
Mote.prototype.tick = function(surrounding, delta) {
	({pos, vel, size, sight, speed, agro, fear} = this);
	// decrement counters
	if(this.full > 0) this.full--;
	if(this.scared > 0) this.scared--;
	if(this.pregnant > 0) this.pregnant--;
	if(this.dying > 0) this.dying++; // start counting up
	handling = (1/size)*sight*speed;

	// last turn's move, has to happen first to avoid prediction inaccuracy
	// during chases
	mut_plus(pos, times(vel, delta, tmpvec));

	// apply basic forces
	mut_plus(vel, avoid(vel, pos, POS_C, speed, handling, tmpvec)); // don't go off the screen
	// apply drag
	mut_plus(vel, drag(vel, GLOBAL_DRAG));
	// gravitate toward center
	//mut_plus(vel, gravitate(pos, POS_C, GRAVITY, tmpvec));
	// put an absolute limit on velocity
	limitVecMut(vel, 0, 1);
	//check_bounds(pos);
	mainTarget = this.target;
	// drop target if too far away, if hungry, or if scared
	if(mainTarget && ((distance(pos, mainTarget.pos) > sight) ||
		(mainTarget instanceof Photon && (mainTarget.lifetime < 1)))) this.target = mainTarget = null; 
	if(!mainTarget && !this.full && !this.scared) { // select a new target
		// reset scratch memory that may not be initialized
		//weightCount = 0; 
		highestWeight = -Infinity;
		mainTargetDist = 0;
		for(a_i = 0, a_len = surrounding.length; a_i < a_len && a_i < 20; ++a_i) {
			current = surrounding[a_i];
			if(current === this) continue;
			if(current.injured > 0) continue; // leave hurt motes alone, avoids bugs
			a_dist = distance(pos, current.pos);
			if(current instanceof Photon) {
				if(a_dist > sight*fear) continue;
				else {
					mainTarget = current;
					break; // photons are always preferred target
				}
			}
			else if(current instanceof Mote) {
				if(a_dist  > sight) continue;
				food = foodValue(this, current)||0;
				scary = foodValue(current, this)||0;
				// move value is the weighted difference between food and fear values
				weight = a_dist*(food*agro - scary*fear);
				if(weight > highestWeight) {
					highestWeight = weight;
					mainTarget = current;
					mainTargetDist = a_dist;
				}
				//weightCount++;
			}
		}
	}
	// new target acquired?
	this.target = mainTarget;
	if(mainTarget) {
		plus(mainTarget.pos, times(mainTarget.vel, delta, tmpvec), predicted);
		if(this.scared) { // run away
			mut_plus(vel, accelerate(predicted, pos, handling, tmpvec));
			mut_plus(vel, accelerate(pos, predicted, -speed, tmpvec));
		}
		else if(!this.full) { // chase target
			mut_plus(vel, accelerate(predicted, pos, -handling, tmpvec));
			mut_plus(vel, accelerate(pos, predicted, speed, tmpvec));
			if(mainTarget instanceof Photon) {
				// multiplied by fear to give greens an advantage in eating photons
				if(a_dist < (sight*fear)) this.eatPhoton(current);
			}
			else if(mainTarget instanceof Mote) {
				if(distance(pos, mainTarget.pos) < (size+mainTarget.size)/3) this.bite(mainTarget);
			}
		}
	}
	else { // wander
		tmpvec[0] = ((random()*2)-1);
		tmpvec[1] = ((random()*2)-1);
		mut_plus(vel, accelerate(pos, tmpvec, speed, tmp2));
	}
}

Mote.prototype.bite = function(target) {
	target.injure(this, ~~(this.agro*5));
	//mut_plus(this.vel, cross(this.vel, target.vel, tmpvec));
	this.target = undefined;
}

Mote.prototype.injure = function(by, strength) {
	//mut_plus(this.vel, cross(this.vel, by.vel, tmpvec));
	this.injured += strength;
	this.lastInjury = this.injured;
	this.target = by;
	this.scared = ~~((TARGET_FPS/2)*strength*this.fear);
}

Mote.prototype.bleed = function() {
	do {
		choice = ~~(random()*3);
		switch(choice) {
			case COLOR_R: choiceVal = this.r; break;
			case COLOR_G: choiceVal = this.g; break;
			case COLOR_B: choiceVal = this.b; break;
		}
	} while (choiceVal === 0);
	switch(choice) {
		case COLOR_R: this.r = this.r - 1; break;
		case COLOR_G: this.g = this.g - 1; break;
		case COLOR_B: this.b = this.b - 1; break;
	}
	this.injured--;
	return choice;
}

Mote.prototype.split = (function() {
	let baby;
	return function() {
		baby = new Mote([floor(this.r/2), floor(this.g/2), floor(this.b/2)], this.pos, this.pool, this.base_speed, this.base_sight, this.base_agro, this.base_fear);
		this.r = ceil(this.r/2);
		this.g = ceil(this.g/2);
		this.b = ceil(this.b/2);
		this.scared = TARGET_FPS*2;
		baby.scared = TARGET_FPS*2;
		this.pregnant = PREGNANT_TIME-1;
		baby.pregnant = PREGNANT_TIME-1;
		this.target = baby;
		baby.target = this;
		return baby;
	}
})();

Mote.prototype.eatPhoton = function(photon) {
	if(photon.lifetime > 0) {
		photon.lifetime = 0;
		switch(photon.color) {
			case COLOR_R: this.r+=1; break;
			case COLOR_G: this.g+=1; break;
			case COLOR_B: this.b+=1; break;
		}
		this.lastMeal = photon.color;
		this.full = ~~((TARGET_FPS/5)*(1-1/this.agro));
	}
	//this.target = undefined;
}

Mote.random = function(pool) {
	let pos = [random()*posneg(), random()*posneg()];
	while(magnitude(pos) > 0.8) pos = [random()*posneg(), random()*posneg()];
	return new Mote([~~(random()*64), ~~(random()*64), ~~(random()*64)], pos, pool);
}

Mote.prototype.destroy = function() {
	this.pool.free(this.offset);
}

let choice = 0|0, choiceVal = 0|0;
export function chooseEmission(mote) {
}

