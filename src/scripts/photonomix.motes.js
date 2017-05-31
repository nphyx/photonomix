"use strict";
let {random, abs, max, min, sin, cos, atan2} = Math;
import {TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, MOTE_BASE_SPEED, GRAVITY,
	WEIGHT_PRED_B, MOTE_BASE_SIZE, MOTE_BASE_ALPHA, PREGNANT_THRESHOLD, DEATH_THRESHOLD} from "./photonomix.constants";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
const {vec2, vec4, times, mut_times, mut_clamp, normalize, mut_normalize, 
			magnitude, distance, mut_lerp, mut_copy, mut_cubic, cross} = vectrix.vectors;
const {minus, plus, mut_plus, mut_minus} = vectrix.matrices;
const clamp = mut_clamp;

const R = 0, G = 1, B = 2, A = 3, X = 0, Y = 1, FV = 3;
const POS_C  = vec2(0.0, 0.0); //vec2(0.5, 0.5);
const FV_SCRATCH = new Float32Array(4); // saves memory allocations for foodValue
let rat_r, rat_g, rat_b;

const I8 = 1;
const F32 = 4;

// int8 values = photons[3], dead, pregnant, stuck, scared, full, handedness, pulse
const O_PHO = 0, 
	O_DEAD = O_PHO + I8*3,
	O_PREG = O_DEAD + I8,
	O_STUCK = O_PREG + I8,
	O_SCARED = O_STUCK + I8,
	O_FULL = O_SCARED + I8,
	O_HAND = O_FULL + I8,
	O_PULSE = O_HAND + I8;

const I8_VAL_LENGTH = O_PULSE + I8;

// float32 values = p[3], v[3], color[4], size, sizeMin, sizeMax, speed, sight, eat, flee
const O_VECS_BYTE_OFFSET = I8_VAL_LENGTH + (I8_VAL_LENGTH % 4), // float32 offsets must be multiples of 4
	// from here on, increments of value * 4
	// vectors
	O_POS = 0,
	O_VEL = O_POS + 2,
	O_COL = O_VEL + 2;
const O_VEC_VAL_LENGTH = O_COL + 4,
	O_FLOATS_BYTE_OFFSET = O_VECS_BYTE_OFFSET + O_VEC_VAL_LENGTH*F32,
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
twiddle_vec(POS_C);
console.log(POS_C);



export function Mote(_photons = new Uint8Array(3), pos = new Float32Array(2), b_speed = MOTE_BASE_SPEED, b_sight = 0.1, b_eat = 1.0, b_flee = 1.0) {
	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	let buffer = new ArrayBuffer(B_LENGTH);
	let photons = new Uint8Array(buffer, O_PHO, I8*3);
	photons[R] = _photons[R];
	photons[G] = _photons[G];
	photons[B] = _photons[B];
	let intVals = new Int8Array(buffer, O_DEAD, I8_VAL_LENGTH - O_PHO);
	let floatVals = new Float32Array(buffer, O_FLOATS_BYTE_OFFSET, FLOAT_VAL_LENGTH);
	let color = vec4(0,0,0,MOTE_BASE_ALPHA, buffer, O_COL*F32+O_VECS_BYTE_OFFSET); // color is precalculated so it doesn't have to be calculated each frame, since it only changes when photons change
	this.pos = vec2(pos, buffer, O_POS*F32+O_VECS_BYTE_OFFSET);
	this.vel = vec2(0.0, 0.0, buffer, O_VEL*F32+O_VECS_BYTE_OFFSET);
	this.target = undefined;
	this.color_string = "";
	this.transparent_string = "";

	floatVals[O_SIZE_MAX] = MOTE_BASE_SIZE*3;
	floatVals[O_SIZE_MIN] = MOTE_BASE_SIZE*0.25;
	b_speed = b_speed+adjrand(0.0005);
	b_sight = b_sight+adjrand(0.001); // vision distance
	b_eat = b_eat+adjrand(0.001);
	b_flee = b_flee+adjrand(0.001);

	var updateProperties = () => {
		let sum = photons[R] + photons[G] + photons[B];
		floatVals[O_SIZE] = clamp(sum/64*MOTE_BASE_SIZE, floatVals[O_SIZE_MIN], floatVals[O_SIZE_MAX]);
		rat_r = ratio(photons[R], photons[G]+photons[B]);
		rat_g = ratio(photons[G], photons[R]+photons[B]);
		rat_b = ratio(photons[B], photons[G]+photons[R]);
		this.speed = b_speed*((1+rat_b+rat_r)-this.size);
		this.sight = b_sight*(1+rat_b);
		this.eat = b_eat*(1+rat_b);
		this.flee = b_flee*(1+rat_g);

		if(sum > PREGNANT_THRESHOLD) this.pregnant = true;
		if(sum < DEATH_THRESHOLD) this.dead = true;

		color[R] = ~~(photons[R]/sum*255);
		color[G] = ~~(photons[G]/sum*255);
		color[B] = ~~(photons[B]/sum*128);
		this.color_string = "rgba("+(color[R])+","+color[G]+","+color[B]+","+color[A]+")";
		this.transparent_string = "rgba("+(color[R])+","+color[G]+","+color[B]+",0.0)";
	}

	var setPhoton = (v, n) => {
		photons[n] = max(0, min(v, 255));
		updateProperties();
	}

	Object.defineProperties(this, {
		"x":{get: () => this.pos[X], set: (v) => this.pos[X] = v},
		"y":{get: () => this.pos[Y], set: (v) => this.pos[Y] = v},
		"velX":{get: () => this.vel[X], set: (v) => this.vel[X] = v},
		"velY": {get: () => this.vel[Y], set: (v) => this.vel[Y] = v},
		"photons":{get: () => photons},
		"r":{get: () => photons[R], set: (v) => setPhoton(v, R)},
		"g":{get: () => photons[G], set: (v) => setPhoton(v, G)},
		"b":{get: () => photons[B], set: (v) => setPhoton(v, B)},
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
	this.pregnant = false;
	this.stuck = 0;
	this.scared = 0;
	this.full = 0;
	this.speed = b_speed;
	this.sight = b_sight;
	this.eat = b_eat;
	this.flee = b_flee;
	this.pulse = ~~(TARGET_FPS*random());
	this.handedness = posneg();
	floatVals[O_SIZE] = MOTE_BASE_SIZE;

	updateProperties();
	return this;
}

/**
 * Decide how to act each turn based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float delta time delta
 */
let vel, size, sight, speed, eat, flee, tmp2 = vec2(),
	tmpvec = vec2(), weight, mainTarget, predicted = vec2(), 
	weightCount, highestWeight, mainTargetDist, a_dist, food, scary, 
	a_i, a_len, current, handedness, pos, handling;
Mote.prototype.act = function(surrounding, delta) {
	({pos, vel, size, sight, speed, eat, flee, handedness} = this);
	// decrement counters
	if(this.full > 0) this.full--;
	if(this.scared > 0) this.scared--;
	handling = (1/size)*sight*speed;

	// last turn's move, has to happen first to avoid prediction inaccuracy
	// during chases
	mut_plus(pos, times(vel, delta, tmpvec));

	// apply basic forces
	mut_plus(vel, avoid_edge(vel, pos, speed, handling, tmpvec)); // don't go off the screen
	// apply drag
	mut_plus(vel, drag(vel, 0.1));
	// gravitate toward center
	mut_plus(vel, gravitate(pos, POS_C, GRAVITY, tmpvec));
	// put an absolute limit on velocity
	mut_limit_vec(vel, 0, 1);
	//check_bounds(pos);
	mainTarget = this.target;

	// drop target if too far away, if hungry, or if scared
	if(mainTarget && (distance(pos, mainTarget.pos) > sight)) this.target = mainTarget = undefined; 
	if(!mainTarget && !this.full && !this.scared) { // select a new target
		// reset scratch memory that may not be initialized
		//weightCount = 0; 
		highestWeight = -Infinity;
		mainTargetDist = 0;
		for(a_i = 0, a_len = surrounding.length; a_i < a_len && a_i < 20; ++a_i) {
			current = surrounding[a_i];
			if(current === this) continue;
			a_dist = dist(pos, current.pos);
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
			if(distance(pos, mainTarget.pos) < (size+mainTarget.size)/2) this.bite(mainTarget);
		}
	}
	else { // wander
		tmpvec[0] = ((random()*2)-1);
		tmpvec[1] = ((random()*2)-1);
		mut_plus(vel, accelerate(pos, tmpvec, speed, tmp2));
	}
}

let b_i = 0, b_m = 5, bite_strongest;
Mote.prototype.bite = function(mote) {
	for(b_i = 0; b_i < b_m; ++b_i) {
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

Mote.random = function() {
	let pos = [random()*posneg(), random()*posneg()];
	while(magnitude(pos) > 0.8) pos = [random()*posneg(), random()*posneg()];
	return new Mote([~~(random()*64), ~~(random()*64), ~~(random()*64)], pos);
}

/**
 * Determines the food value of object b to mote a. Roughly, a mote prefers to eat
 * photons and other motes unlike itself, and prefers objects smaller than itself
 * than those that are larger. Red motes are weighted to be the most predatory,
 * and green motes are weighted to be the least.
 */
export function foodValue(a, b) {
	const pa = a.photons;
	const pb = b.photons;
	const asize = a.size;
	const bsize = b.size;

	// size = 1 is a photon, so it doesn't eat
	if(asize === 1) return 0;
	// photons always have weight = 1
	if(bsize === 1) return 1;
	// find the strongest color; this helps determine behavior
	let strongest = max(pa[R], pa[G], pa[B]);
	FV_SCRATCH[R] = ratio(pb[R], pa[R]);
	FV_SCRATCH[G] = ratio(pb[G], pa[G]);
	FV_SCRATCH[B] = ratio(pb[B], pa[B]);
	FV_SCRATCH[FV] = 1;
	// this should apply multiple behavior weights when the mote is a hybrid
	switch(strongest) {
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

let dist_diff = vec2();
function dist(a, b) {
	return magnitude(minus(a, b, dist_diff));
}

let g_v = vec2();

/**
 * Gravitate toward target.
 */
function gravitate(p1, p2, strength, out) {
	out = out||g_v;
	minus(p1, p2, out);
	mut_limit_vec(out, 0.00001, 10); // put a cap on it to avoid infinite acceleration
	let mag = magnitude(out);
	mut_normalize(out);
	mut_times(out, -strength/(mag*mag));
	try {
		validate(out);
	}
	catch(e) {
		console.log("gravitation error", e);
		console.log(strength);
		minus(p1, p2, out);
		console.log("minus", out);
		mut_limit_vec(out, 0.00001, 10); // put a cap on it to avoid infinite acceleration
		console.log("limit", out);
		let mag = magnitude(out);
		console.log("magnitude", mag);
		mut_normalize(out);
		console.log("normalize", out);
		mut_times(out, -strength/(mag*mag));
		console.log("scale", out);
		out.fill(0.0);
	}
	return out;
}

let a_v = vec2();
/**
 * Accelerate toward a target.
 */
function accelerate(p1, p2, strength, out) {
	out = out||a_v;	
	minus(p1, p2, out);
	mut_normalize(out);
	mut_times(out, -strength);
	try {
		validate(out);
	}
	catch(e) {
		console.log("acceleration error", e);
		console.log(strength);
		minus(p1, p2, out);
		console.log("minus", out);
		mut_normalize(out);
		console.log("normalize", out);
		mut_times(out, -strength);
		console.log("scale", out);
		out.fill(0.0);
	}
	return out;
}

/**
 * Limits absolute values of vectors within a range.
 */
function mut_limit_vec(v, min_v = 0, max_v = Infinity) {	
	for(let i = 0, len = v.length; i < len; ++i) {
		v[i] = limit(v[i], min_v, max_v);
	}
}

function limit(v, min_v = 0, max_v = Infinity) {
	if(abs(v) < abs(min_v)) {
		if(v < 0) v = -min_v;
		else v = min_v;
	}
	else if(abs(v) > abs(max_v)) {
		if(v < 0) v = -max_v;
		else v = max_v;
	}
	return v;
}

let drag_v = vec2();
/**
 * Apply drag.
 */
function drag(vel, c, out) {
	out = out||drag_v;
	let speed = magnitude(vel);
	if(speed < 1e-11) return out.fill(0.0);
	speed = limit(speed, 0, 1e+11); // avoid infinite speeds
	let dragStrength = c * speed * speed;
	mut_copy(out, vel);
	mut_normalize(out);
	mut_times(out, -1);
	mut_times(out, dragStrength);
	try {
		validate(out);
	}
	catch(e) {
		console.log(c, speed, dragStrength);
		console.log("magnitude", magnitude(vel));
		mut_copy(out, vel);
		console.log("copied", out);
		mut_normalize(out);
		console.log("normalized", out);
		mut_times(out, -1);
		console.log("inverted", out);
		mut_times(out, dragStrength);
		console.log("scaled", out);
		out.fill(0.0);
	}
	return out;
}

let ae_v = vec2();
function avoid_edge(vel, pos, speed, handling, out) {
	let dist = distance(pos, POS_C)*1.3;
	out = out||ae_v;
	ae_v.fill(0.0);
	if(dist > 1) {
		accelerate(POS_C, pos, -handling, out);
		accelerate(pos, POS_C, speed*dist, out);
	}
	return out;
}

/**
 * Twiddles a value by a small amount to avoid zeroes
 */
function twiddle(x) {
	return x + (1e-11*posneg());
}

let t_i = 0|0, t_l = 0|0;
function twiddle_vec(v) {
	for(t_i = 0, t_l = v.length; t_i < t_l; ++t_i) {
		v[t_i] = twiddle(v[t_i]);
	}
	return v;
}

/**
 * absolute value of vector
 */
let abs_i = 0|0, abs_l = 0|0;
function abs_vec(v) {
	for(abs_i = 0, abs_l = v.length; abs_i < abs_l; ++abs_i) {
		v[abs_i] = abs(v[abs_i]);
	}
	return v;
}

function check_bounds(v) {
	let x = v[0];	
	let y = v[1];	
	if(x > 1 || x < -1) console.log("out of x bounds", x);
	if(y > 1 || y < -1) console.log("out of y bounds", y);
}

/**
 * Smoothing using a sigmoid (logistic function) curve.
 * @param {float} x input value
 * @param {float} x0 midpoint of curve
 * @param {float} L limit of curve
 * @param {float} k slope of curve
 *
function logistic_smooth(x, x0, L = x * 2, k = 1) {return L / (1 + pow(E, k * x-x0))}

/**
 * A random function adjusted to a range of -1 to 1 and multiplied by a
 * scaling value
 */
function adjrand(scale = 1) {
	return ((random()*2)-1)*scale
}

let r_c, r_s, r_pxt, r_pyt; 
/**
 * Rotate point p around center c by r radians. Mutates p.
 */
export function rotate(p, c, r) {
	r_c = cos(r);
	r_s = sin(r);
	p[X] -= c[X];
	p[Y] -= c[Y];
	r_pxt = (p[X] * r_c - p[Y] * r_s);
	r_pyt = (p[X] * r_s + p[Y] * r_c);
	p[X] = r_pxt + c[X];
	p[Y] = r_pyt + c[Y];
}

function posneg() {
	return random() > 0.5?1:-1;
}
/*
export function clamp(v, minv, maxv) {
	return max(min(v, maxv), minv);
}
*/

export function ratio(a, b) { return a/(abs(a)+abs(b)) }
export function rat_vec2(v) { return ratio(v[X], v[Y]) }

let v_i, v_l;
export function validate(v) {
	for(v_i = 0, v_l = v.length; v_i < v_l; v_i++) {
		if(isNaN(v[v_i])) throw new Error("NaN vector");
		if(v[v_i] === Infinity) throw new Error("Infinite vector");
		if(v[v_i] === -Infinity) throw new Error("-Infinite vector");
	}
}
