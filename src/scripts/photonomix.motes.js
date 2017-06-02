"use strict";
let {random, max, min} = Math;
import {TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, MOTE_BASE_SPEED,
				WEIGHT_PRED_B, MOTE_BASE_SIZE, MOTE_BASE_ALPHA, PREGNANT_THRESHOLD, 
				DEATH_THRESHOLD, GLOBAL_DRAG, PREGNANT_TIME} from "./photonomix.constants";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
import {avoid, accelerate, drag, twiddleVec, ratio, adjRand, posneg, limitVecMut} from "./photonomix.util";
const {vec2, vec4, times, mut_clamp, magnitude, distance} = vectrix.vectors;
const {plus, mut_plus} = vectrix.matrices;
import {Photon, COLOR_R, COLOR_B, COLOR_G} from "./photonomix.photons";
const clamp = mut_clamp;

const R = 0, G = 1, B = 2, A = 3, X = 0, Y = 1, FV = 3;
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
	let fv_strongest = 0.0, pa, pb, asize = 0.0, bsize = 0.0;
	const FV_SCRATCH = new Float32Array(4);
	return function foodValue(a, b) {
		pa = a.photons;
		pb = b.photons;
		asize = a.size;
		bsize = b.size;

		// size = 1 is a photon, so it doesn't eat
		if(asize === 1) return 0;
		// photons always have weight = 1
		if(bsize === 1) return 1;
		// find the strongest color; this helps determine behavior
		fv_strongest = max(pa[R], pa[G], pa[B]);
		FV_SCRATCH[R] = ratio(pb[R], pa[R]);
		FV_SCRATCH[G] = ratio(pb[G], pa[G]);
		FV_SCRATCH[B] = ratio(pb[B], pa[B]);
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
// int8 values =  dead, pregnant, stuck, scared, full, handedness, pulse
const	O_DEAD = 0,
	O_PREG = O_DEAD + I8,
	O_STUCK = O_PREG + I8,
	O_SCARED = O_STUCK + I8,
	O_FULL = O_SCARED + I8,
	O_HAND = O_FULL + I8,
	O_PULSE = O_HAND + I8;

const I8_VAL_LENGTH = O_PULSE + I8;

// float32 values = p[3], v[3], color[4], size, sizeMin, sizeMax, speed, sight, eat, flee
const VECS_BYTE_OFFSET = U8_VAL_LENGTH + I8_VAL_LENGTH + ((U8_VAL_LENGTH + I8_VAL_LENGTH) % 4), // float32 offsets must be multiples of 4
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
	O_EAT = O_SIGHT + 1,
	O_FLEE = O_EAT + 1;

const FLOAT_VAL_LENGTH = O_FLEE - O_SIZE + 1;
const B_LENGTH = O_FLOATS_BYTE_OFFSET + (O_FLEE + 1)*F32;
twiddleVec(POS_C);
console.log(POS_C);
let ud_sum = 0.0;



export function Mote(_photons = new Uint8Array(3), pos = new Float32Array(2), b_speed = MOTE_BASE_SPEED, b_sight = 0.1, b_eat = 1.0, b_flee = 1.0) {
	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	let buffer = new ArrayBuffer(B_LENGTH);
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
	this.transparent_string = "";

	floatVals[O_SIZE_MAX] = MOTE_BASE_SIZE*3;
	floatVals[O_SIZE_MIN] = MOTE_BASE_SIZE*0.25;
	b_speed = b_speed+adjRand(0.0005);
	b_sight = b_sight+adjRand(0.001); // vision distance
	b_eat = b_eat+adjRand(0.001);
	b_flee = b_flee+adjRand(0.001);

	function updateProperties(that) {
		ud_sum = photons[R] + photons[G] + photons[B];
		floatVals[O_SIZE] = clamp(ud_sum/64*MOTE_BASE_SIZE, floatVals[O_SIZE_MIN], floatVals[O_SIZE_MAX]);
		rat_r = ratio(photons[R], photons[G]+photons[B]);
		rat_g = ratio(photons[G], photons[R]+photons[B]);
		rat_b = ratio(photons[B], photons[G]+photons[R]);
		that.speed = b_speed*((1+rat_b+rat_r)-that.size);
		that.sight = b_sight*(1+rat_b);
		that.eat = b_eat*(1+rat_b);
		that.flee = b_flee*(1+rat_g);

		if(ud_sum > PREGNANT_THRESHOLD) that.pregnant = PREGNANT_TIME;
		if(ud_sum < DEATH_THRESHOLD) that.dead = true;

		color[R] = ~~(photons[R]/ud_sum*255);
		color[G] = ~~(photons[G]/ud_sum*255);
		color[B] = ~~(photons[B]/ud_sum*128);
		that.color_string = "rgba("+(color[R])+","+color[G]+","+color[B]+","+color[A]+")";
		that.transparent_string = "rgba("+(color[R])+","+color[G]+","+color[B]+",0.0)";
	}

	function setPhoton(v, n, that) {
		photons[n] = max(0, min(v, 255));
		updateProperties(that);
	}

	Object.defineProperties(this, {
		"x":{get: () => this.pos[X], set: (v) => this.pos[X] = v},
		"y":{get: () => this.pos[Y], set: (v) => this.pos[Y] = v},
		"velX":{get: () => this.vel[X], set: (v) => this.vel[X] = v},
		"velY": {get: () => this.vel[Y], set: (v) => this.vel[Y] = v},
		"photons":{get: () => photons},
		"r":{get: () => photons[R], set: (v) => setPhoton(v, R, this)},
		"g":{get: () => photons[G], set: (v) => setPhoton(v, G, this)},
		"b":{get: () => photons[B], set: (v) => setPhoton(v, B, this)},
		"dead":{get: () => intVals[O_DEAD], set: (v) => intVals[O_DEAD] = v},
		"pregnant":{get: () => intVals[O_PREG], set: (v) => intVals[O_PREG] = v},
		"stuck":{get: () => intVals[O_STUCK], set: (v) => intVals[O_STUCK] = v},
		"scared":{get: () => intVals[O_SCARED], set: (v) => intVals[O_SCARED] = v},
		"full":{get: () => intVals[O_FULL], set: (v) => intVals[O_FULL] = v},
		"pulse":{get: () => intVals[O_PULSE], set: (v) => intVals[O_PULSE] = v},
		"handedness":{get: () => intVals[O_HAND], set: (v) => intVals[O_HAND] = v},
		"speed":{get: () => floatVals[O_SPEED], set: (v) => floatVals[O_SPEED] = v},
		"sight":{get: () => floatVals[O_SIGHT], set: (v) => floatVals[O_SIGHT] = v},
		"eat":{get: () => floatVals[O_EAT], set: (v) => floatVals[O_EAT] = v},
		"flee":{get: () => floatVals[O_FLEE], set: (v) => floatVals[O_FLEE] = v},
		"base_speed":{get: () => b_speed},
		"base_sight":{get: () => b_sight},
		"base_eat":{get: () => b_eat},
		"base_flee":{get: () => b_flee},
		"size":{get: () => floatVals[O_SIZE]},
		"sizeMin":{get: () => floatVals[O_SIZE_MIN]},
		"sizeMax":{get: () => floatVals[O_SIZE_MAX]},
		/*
		 * DEBUG USE
		 */
		"intVals":{get: () => intVals},
		"floatVals":{get: () => floatVals},
	});

	// initialize weights for various activities
	this.dead = false;
	this.pregnant = 0;
	this.stuck = 0;
	this.scared = 0;
	this.full = 0;
	this.speed = b_speed;
	this.sight = b_sight;
	this.eat = b_eat;
	this.flee = b_flee;
	this.handedness = posneg();
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
let vel, size, sight, speed, eat, flee, tmp2 = vec2(),
	tmpvec = vec2(), weight, mainTarget, predicted = vec2(), 
	highestWeight, mainTargetDist, a_dist, food, scary, 
	a_i, a_len, current, handedness, pos, handling;
Mote.prototype.tick = function(surrounding, delta) {
	({pos, vel, size, sight, speed, eat, flee, handedness} = this);
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
				// move value is the weighted difference between food and flee values
				weight = a_dist*(food*eat - scary*flee);
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
				// multiplied by flee to give greens an advantage in eating
				if(a_dist < size*flee) this.eatPhoton(current);
				//else mut_plus(mainTarget.vel, accelerate(mainTarget.pos, pos, handling*flee, tmpvec)); 
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

Mote.prototype.bite = (function() {
	let i = 0, m = 5, bite_strongest;
	return function bite(mote) {
		for(i = 0; i < m; ++i) {
			bite_strongest = max(this.r, this.g, this.b);
			switch(bite_strongest) {
				case this.r: 
					if(mote.g > mote.b && mote.g) {
						mote.g--;
						this.g++;
					}
					else if(mote.b > mote.g && mote.b) {
						mote.b--;
						this.b++;
					}
					else if(mote.r) {
						mote.r--;
						this.r++;
					}
				break;
				case this.b: 
					if(mote.g > mote.r && mote.g) {
						mote.g--;
						this.g++;
					}
					else if(mote.r > mote.g && mote.r) {
						mote.r--;
						this.r++;
					}
					else if(mote.b) {
						mote.b--;
						this.b++;
					}
				break;
				case this.g: 
					if(mote.r > mote.b && mote.r) {
						mote.r--;
						this.r++;
					}
					else if(mote.b > mote.r && mote.b) {
						mote.b--;
						this.b++;
					}
					else if(mote.g) {
						mote.g--;
						this.g++;
					}
				break;
			}
		}
		mote.scared = ~~(TARGET_FPS*2*(1/mote.flee));
		this.full = ~~(TARGET_FPS*2*(1/this.eat));
		this.target = undefined;
		mote.target = this;
	}
})();

Mote.prototype.eatPhoton = function(photon) {
	photon.lifetime = 0;
	switch(photon.color) {
		case COLOR_R: this.r+=1; break;
		case COLOR_G: this.g+=1; break;
		case COLOR_B: this.b+=1; break;
	}
	this.full = ~~((TARGET_FPS/10)*(1/this.eat));
	this.target = undefined;
}

Mote.random = function() {
	let pos = [random()*posneg(), random()*posneg()];
	while(magnitude(pos) > 0.8) pos = [random()*posneg(), random()*posneg()];
	return new Mote([~~(random()*64), ~~(random()*64), ~~(random()*64)], pos);
}


