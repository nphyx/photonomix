"use strict";
let {random, max, min} = Math;
import {TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, MOTE_BASE_SPEED,
				WEIGHT_PRED_B, MOTE_BASE_SIZE, MOTE_BASE_ALPHA, PREGNANT_THRESHOLD, 
				DEATH_THRESHOLD, GLOBAL_DRAG, PREGNANT_TIME, DEBUG} from "./photonomix.constants";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
import {avoid, accelerate, drag, twiddleVec, ratio, adjRand, posneg, limitVecMut} from "./photonomix.util";
const {vec2, vec4, times, mut_clamp, magnitude, distance, mut_copy, mut_times} = vectrix.vectors;
const {plus, mut_plus} = vectrix.matrices;
import {Photon, COLOR_R, COLOR_B, COLOR_G} from "./photonomix.photons";
const clamp = mut_clamp;

const R = 0, G = 1, B = 2, A = 3, FV = 3;
const POS_C  = vec2(0.0, 0.0); //vec2(0.5, 0.5);
let rat_r = 0.0, rat_g = 0.0, rat_b = 0.0;

const I8 = 1;
const F32 = 4;

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
		FV_SCRATCH[R] = ratio(b.r, a.r);
		FV_SCRATCH[G] = ratio(b.g, a.g);
		FV_SCRATCH[B] = ratio(b.b, a.b);
		FV_SCRATCH[FV] = 1;
		// this should apply multiple behavior weights when the mote is a hybrid
		switch(fv_strongest) {
			case a.r: 
				FV_SCRATCH[FV] *= (FV_SCRATCH[G] + FV_SCRATCH[B])*WEIGHT_PRED_R - FV_SCRATCH[R]*(1/WEIGHT_PRED_R);
			break;
			case a.g:
				FV_SCRATCH[FV] *= (FV_SCRATCH[R] + FV_SCRATCH[B])*WEIGHT_PRED_G - FV_SCRATCH[G]*(1/WEIGHT_PRED_G);
			break;
			case a.b:
				FV_SCRATCH[FV] *= (FV_SCRATCH[R] + FV_SCRATCH[G])*WEIGHT_PRED_B - FV_SCRATCH[B]*(1/WEIGHT_PRED_B);
			break;
		}

		return FV_SCRATCH[FV] * ((ratio(asize, bsize)*2)-1);
	}
})();

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
export const B_LENGTH = O_FLOATS_BYTE_OFFSET + (O_FEAR + 1)*F32;
twiddleVec(POS_C);
console.log(POS_C);
let ud_sum = 0.0;

/**
 * Constructor for Motes.
 * @param {Float32Array(3)} photons initial photons (0-255, R, G, B)
 * @param {vec2} pos initial position
 * @param {Float} bSpeed (optional) base acceleration: inheritance and predesigned motes 
 * @param {Float} bSight (optional) base vision radius: inheritance and predesigned motes 
 * @param {Float} bAgro (optional) base aggressiveness: inheritance and predesigned motes 
 * @param {Float} bFear (optional) base fearfulness: inheritance and predesigned motes 
 * @param {ArrayBuffer(Motes.B_LENGTH)} buffer (optional) pre-assigned buffer
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
 * @property {Uint8Array} photons current photon values (R, G, B) (for debug)
 * @property {Int8Array} intVals direct access to integer value array (for debug)
 * @property {Float32Array} floatVals direct access to float value array (for debug)
 * @return {Mote}
 */
export function Mote(_photons = new Uint8Array(3), pos = new Float32Array(2), bSpeed = MOTE_BASE_SPEED, bSight = 0.1, bAgro = 1.0, bFear = 1.0, buffer = undefined) {
	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	buffer = buffer||new ArrayBuffer(B_LENGTH);
	let photons = new Uint8Array(buffer, O_PHO, I8*3);
	photons[R] = _photons[R];
	photons[G] = _photons[G];
	photons[B] = _photons[B];
	let intVals = new Int8Array(buffer, I8_BYTE_OFFSET, I8_VAL_LENGTH - O_PHO);
	let floatVals = new Float32Array(buffer, O_FLOATS_BYTE_OFFSET, FLOAT_VAL_LENGTH);
	let color = vec4(0,0,0,MOTE_BASE_ALPHA, buffer, O_COL*F32+VECS_BYTE_OFFSET); // color is precalculated so it doesn't have to be calculated each frame, since it only changes when photons change
	this.pos = vec2(pos, buffer, O_POS*F32+VECS_BYTE_OFFSET);
	this.vel = vec2(0.0, 0.0, buffer, O_VEL*F32+VECS_BYTE_OFFSET);
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

	function updateProperties(that) {
		ud_sum = photons[R] + photons[G] + photons[B];
		floatVals[O_SIZE] = clamp(ud_sum/(PREGNANT_THRESHOLD/3)*MOTE_BASE_SIZE, floatVals[O_SIZE_MIN], floatVals[O_SIZE_MAX]);
		rat_r = ratio(photons[R], photons[G]+photons[B]);
		rat_g = ratio(photons[G], photons[R]+photons[B]);
		rat_b = ratio(photons[B], photons[G]+photons[R]);
		that.speed = bSpeed*((1+rat_b+rat_r)-that.size);
		that.sight = bSight*(1+rat_b);
		that.agro = bAgro*(1+rat_b);
		that.fear = bFear*(1+rat_g);
		switch(max(photons[R], photons[G], photons[B])) {
			case photons[R]:that.strongest = R; break;
			case photons[G]:that.strongest = G; break;
			case photons[B]:that.strongest = B; break;
		}
		if(photons[R] < photons[G]) {
			if(photons[R] < photons[B]) {
				if(photons[R] > 5) that.weakest = R;
				else if(photons[B] < photons[G]) {
					if(photons[B] > 5) that.weakest = B;
				}
				else if(photons[G] > 5) that.weakest = G;
			}
			else if(photons[B] > 5) that.weakest = B;
		}
		else if(photons[G] < photons[B]) {
			if(photons[G] > 5) that.weakest = G;
			else if(photons[B] < photons[R]) {
				if(photons[R] > 5) that.weakest = R;
				else that.weakest = B;
			}
		}
		else if(photons[B] > 5) that.weakest = B;
		else that.weakest = G;

		if(ud_sum > PREGNANT_THRESHOLD) that.pregnant = PREGNANT_TIME;
		if(ud_sum < DEATH_THRESHOLD) that.dying = 1;

		color[R] = ~~(photons[R]/ud_sum*255);
		color[G] = ~~(photons[G]/ud_sum*255);
		color[B] = ~~(photons[B]/ud_sum*255);
		that.color_string = "rgba("+(color[R])+","+color[G]+","+color[B]+","+color[A]+")";
	}

	function setPhoton(v, n, that) {
		photons[n] = max(0, min(v, 255));
		updateProperties(that);
	}

	Object.defineProperties(this, {
		"r":{get: () => photons[R], set: (v) => setPhoton(v, R, this)},
		"g":{get: () => photons[G], set: (v) => setPhoton(v, G, this)},
		"b":{get: () => photons[B], set: (v) => setPhoton(v, B, this)},
		"dying":{get: () => intVals[O_DYING], set: (v) => intVals[O_DYING] = v},
		"pregnant":{get: () => intVals[O_PREG], set: (v) => intVals[O_PREG] = v},
		"injured":{get: () => intVals[O_INJURED], set: (v) => intVals[O_INJURED] = v},
		"lastInjury":{get: () => intVals[O_LAST_INJURY], set: (v) => intVals[O_LAST_INJURY] = v},
		"scared":{get: () => intVals[O_SCARED], set: (v) => intVals[O_SCARED] = v},
		"full":{get: () => intVals[O_FULL], set: (v) => intVals[O_FULL] = v},
		"pulse":{get: () => intVals[O_PULSE], set: (v) => intVals[O_PULSE] = v},
		"lastMeal":{get: () => intVals[O_MEAL], set: (v) => intVals[O_MEAL] = v},
		"speed":{get: () => floatVals[O_SPEED], set: (v) => floatVals[O_SPEED] = v},
		"sight":{get: () => floatVals[O_SIGHT], set: (v) => floatVals[O_SIGHT] = v},
		"agro":{get: () => floatVals[O_AGRO], set: (v) => floatVals[O_AGRO] = v},
		"fear":{get: () => floatVals[O_FEAR], set: (v) => floatVals[O_FEAR] = v},
		"size":{get: () => floatVals[O_SIZE]},
		"sizeMin":{get: () => floatVals[O_SIZE_MIN]},
		"sizeMax":{get: () => floatVals[O_SIZE_MAX]},
		"base_speed":{get: () => bSpeed},
		"base_sight":{get: () => bSight},
		"base_agro":{get: () => bAgro},
		"base_fear":{get: () => bFear}
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
	this.lastMeal = R;
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
		(mainTarget instanceof Photon && (mainTarget.lifetime < 2)))) this.target = mainTarget = null; 
	if(!mainTarget && !this.full && !this.scared) { // select a new target
		// reset scratch memory that may not be initialized
		//weightCount = 0; 
		highestWeight = -Infinity;
		mainTargetDist = 0;
		for(a_i = 0, a_len = surrounding.length; a_i < a_len && a_i < 20; ++a_i) {
			current = surrounding[a_i];
			if(current === this) continue;
			a_dist = distance(pos, current.pos);
			if(current instanceof Photon) {
				if(a_dist > sight) continue;
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
				// multiplied by fear to give greens an advantage in agroing
				if(a_dist < size*fear) this.eatPhoton(current);
				//else mut_plus(mainTarget.vel, accelerate(mainTarget.pos, pos, handling*fear, tmpvec)); 
			}
			else if(mainTarget instanceof Mote) {
				if(distance(pos, mainTarget.pos) < (size+mainTarget.size)/2) this.bite(mainTarget);
			}
		}
	}
	else { // wander
		tmpvec[0] = ((random()*2)-1);
		tmpvec[1] = ((random()*2)-1);
		mut_plus(vel, accelerate(pos, tmpvec, speed, tmp2));
	}
}

Mote.prototype.bite = function(mote) {
	mote.injure(this, ~~(this.agro));
	this.target = undefined;
}

Mote.prototype.injure = function(by, strength) {
	this.injured += strength;
	this.lastInjury = strength;
	this.target = by;
	this.scared = ~~(TARGET_FPS*0.5*strength*this.fear);
}

/**
 * Decrements injury, returns a photon to be emitted. Time and max are used to
 * determine 
 */
Mote.prototype.bleed = (function() {
	let pos, pvel = vec2(0.0), choice = 0|0, choiceVal = 0|0;
	return function bleed() {
		({pos, vel} = this);
		this.injured--;
		// randomly select a photon to emit
		do {
			choice = ~~(random()*3);
			switch(choice) {
				case R: choiceVal = this.r; break;
				case G: choiceVal = this.g; break;
				case B: choiceVal = this.b; break;
			}
		} while (choiceVal === 0);
		
		switch(choice) {
			case R: this.r--; break;
			case G: this.g--; break;
			case B: this.b--; break;
		}
		mut_copy(pvel, vel);
		mut_times(pvel, 0.4);
		return new Photon(pos, pvel, choice);
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
		this.full = ~~((TARGET_FPS/5)*(1/this.agro));
	}
	this.target = undefined;
}

Mote.random = function() {
	let pos = [random()*posneg(), random()*posneg()];
	while(magnitude(pos) > 0.8) pos = [random()*posneg(), random()*posneg()];
	return new Mote([~~(random()*64), ~~(random()*64), ~~(random()*64)], pos);
}
