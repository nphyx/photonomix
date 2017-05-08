"use strict";
let {random, abs, max, min, pow, sin, cos} = Math;
import {TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, 
	WEIGHT_PRED_B, MOTE_BASE_SIZE, PREGNANT_THRESHOLD, DEATH_THRESHOLD} from "./photonomix.constants";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
const {vec2, vec4, mut_times, mut_clamp, mut_copy, magnitude} = vectrix.vectors;
const {minus} = vectrix.matrices;
const clamp = mut_clamp;

const R = 0, G = 1, B = 2, A = 3, X = 0, Y = 1, FV = 3;
const POS_C  = vec2(0.5, 0.5);
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



export function Mote(_photons = new Uint8Array(3), pos = new Float32Array(2), b_speed = 0.0025, b_sight = 0.1, b_eat = 1.0, b_flee = 1.0) {
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
	let color = vec4(0,0,0,0.7, buffer, O_COL*F32+O_VECS_BYTE_OFFSET); // color is precalculated so it doesn't have to be calculated each frame, since it only changes when photons change
	this.pos = vec2(pos, buffer, O_POS*F32+O_VECS_BYTE_OFFSET);
	this.toPos = vec2(random(), random(), buffer, O_VEL*F32+O_VECS_BYTE_OFFSET);
	this.target = undefined;

	floatVals[O_SIZE_MAX] = MOTE_BASE_SIZE*4;
	floatVals[O_SIZE_MIN] = MOTE_BASE_SIZE*0.25;
	b_speed = b_speed+adjrand(0.0025);
	b_sight = b_sight+adjrand(0.1); // vision distance
	b_eat = b_eat+adjrand(0.1);
	b_flee = b_flee+adjrand(0.1);

	var updateProperties = () => {
		let sum = photons[R] + photons[G] + photons[B];
		floatVals[O_SIZE] = clamp(sum/92*MOTE_BASE_SIZE, floatVals[O_SIZE_MIN], floatVals[O_SIZE_MAX]);
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
		color[B] = ~~(photons[B]/sum*255);
	}

	var setPhoton = (v, n) => {
		photons[n] = max(0, min(v, 255));
		updateProperties();
	}

	Object.defineProperties(this, {
		"x":{get: () => this.pos[X], set: (v) => this.pos[X] = v},
		"y":{get: () => this.pos[Y], set: (v) => this.pos[Y] = v},
		"toX":{get: () => this.toPos[X], set: (v) => this.toPos[X] = v},
		"toY": {get: () => this.toPos[Y], set: (v) => this.toPos[Y] = v},
		"photons":{get: () => photons},
		"color":{get: () => "rgba("+(color[R])+","+color[G]+","+color[B]+","+color[A]+")"},
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
 * @param Float interval interval as ratio of turn length:elapsed time in seconds
 */
let toPos, size, sight, speed, eat, flee, sizex2, 
	newToPos = vec2(), weightp = vec2(), weight, mainTarget, 
	weightCount, highestWeight, mainTargetDist, ctoX, ctoY, a_dist, food, scary, 
	a_i, a_len, current, handedness, pos;
Mote.prototype.act = function(surrounding) {
	// do last turn's movement
	this.move();
	({pos, toPos, size, sight, speed, eat, flee, handedness} = this);
	sizex2 = size*2;
	// kludge to fix motes stuck on edges
	if(this.stuck > 60 || this.stuck < 0) {
		if(this.stuck > 0) this.stuck = -8*TARGET_FPS;
		mut_clamp(this.pos, 1e-16, 1-1e-16);
		gravitate(this.toPos, POS_C, 1);
		rotate(this.toPos, POS_C, speed*handedness);
		this.stuck++;
		this.scared = 0;
		this.full = 0;
		return;
	}

	mut_copy(newToPos, toPos);
	validate(newToPos);

	// basic wandering movement
	rotate(newToPos, POS_C, speed*handedness);
	// drop target if too far away, if hungry, or if scared
	if(this.target && 
		dist(pos, this.target.pos) > sight*1.5 || 
		this.hungry || this.scared) this.target = undefined; 

	// hungry or fleeing, so consider targets
	if(!this.full || this.scared) {
		// reset scratch memory that may not be initialized
		weightp[X] = 0;
		weightp[Y] = 0;
		weightCount = 0; 
		highestWeight = -Infinity;
		mainTargetDist = 0;
		mainTarget = this.target;
		for(a_i = 0, a_len = surrounding.length; a_i < a_len && a_i < 20; ++a_i) {
			current = surrounding[a_i];
			if(current === this) continue;
			ctoX = current.toX;
			ctoY = current.toY;
			a_dist = dist(pos, current.pos);
			if(a_dist  > sight) continue;
			food = foodValue(this, current)||0;
			scary = foodValue(current, this)||0;
			// move value is the weighted difference between food and flee values
			weight = a_dist*(food*eat - scary*flee);
			if(!this.target && weight > highestWeight) {
				highestWeight = weight;
				mainTarget = current;
				mainTargetDist = a_dist;
			}
			// new target acquired!
			if(!this.target && mainTarget) {
				this.target = mainTarget;
				mainTargetDist = dist(pos, this.target.pos);
			}

			weightp[X] += weight*ctoX; 
			weightp[Y] += weight*ctoY; 
			weightCount++;
		}


/*
		weightp[X] = clamp(weightp[X]/weightCount, -2, 2);
		weightp[Y] = clamp(weightp[Y]/weightCount, -2, 2);
		*/

		if(weightCount) {
			mut_clamp(mut_times(weightp, 1/weightCount), -2, 2);
			if(this.scared) {
				gravitate(newToPos, weightp, speed, null, null, true);
				rotate(newToPos, weightp, speed*handedness);
				validate(newToPos);
				this.scared--;
			}

			// if there are appropriate targets and hungry
			else if(!this.full && mainTarget) {
				gravitate(newToPos, weightp, speed);
				validate(newToPos);
				rotate(newToPos, weightp, speed*handedness);
				gravitate(newToPos, mainTarget.toPos, highestWeight);
				validate(newToPos);
				rotate(newToPos, mainTarget.toPos, speed*handedness);
				if(mainTargetDist < mainTarget.size+size*1.2) this.bite(mainTarget);
				validate(newToPos);
			}
		} // end if weights.length
	} // end if hungry or scared
	else {this.target = undefined} // drop target if hungry or scared

	if(this.full > 0) this.full--;
	

	// gravitate toward the center
	gravitate(newToPos, POS_C, 0.0003);
	validate(newToPos);
		
	// clamp move directions to game space
	mut_clamp(newToPos, sizex2, 1-sizex2);

	mut_copy(this.toPos, newToPos);
}


let m_speed, m_speedmin, m_speedmax, m_pos, m_newPos = Array(2);
Mote.prototype.move = function() {
	m_speed = this.speed;
	m_speedmin = this.speed / 2;
	m_speedmax  = this.speed * 1.5;
	m_pos = this.pos;
	mut_copy(m_newPos, m_pos);
	// for some reason this bugs out sometimes and sticks them
	// in the corner, so we just abort
	// FIXME
	gravitate(m_newPos, this.toPos, m_speed, m_speedmin, m_speedmax);
	if(m_newPos[X] < 0 || m_newPos[X] > 1 || m_newPos[Y] < 0 || m_newPos[Y] > 1) {
		this.stuck++;
	}
	clamp(this.stuck, -70, 70);
	mut_clamp(m_newPos, 1e-16, 1-1e-16);
	mut_copy(m_pos, m_newPos);
}

Mote.prototype.bite = function(mote) {
	let strongest = max(this.r, this.g, this.b);
	switch(strongest) {
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
	mote.scared = ~~(TARGET_FPS*2*this.flee);
	this.full = ~~(TARGET_FPS*2*(1/this.eat));
}

Mote.random = function() {
	return new Mote([~~(random()*64), ~~(random()*64), ~~(random()*64)], [random(), random()]);
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

let grav = 0;
let g_d = vec2(0.0, 0.0);
let g = vec2(0.0, 0.0);
/**
 * Shitty approximation of gravitation.
 * "Gravitates" p0 toward p1 by strength. Mutates p0.
 * TODO: better approach
 */
function gravitate(p0, p1, strength, min = 0, max = Infinity, away = false) {
	g_d[X] = abs(twiddle(p0[X] - p1[X]));
	g_d[Y] = abs(twiddle(p0[Y] - p1[Y]));
	grav = clamp(1/pow(magnitude(g_d), 2)*strength, min, max);
	g[X] = grav * ratio(g_d[X], g_d[Y])*(away?-1:1);
	g[Y] = grav * ratio(g_d[Y], g_d[X])*(away?-1:1);

	p0[X] += (p0[X] < p1[X])?g[X]:-g[X];
	p0[Y] += (p0[Y] < p1[Y])?g[Y]:-g[Y];
}

/**
 * Twiddles a value by a small amount to avoid zeroes
 */
function twiddle(x) {
	return x + (1e-16*posneg());
}




/**
 * A quadratic smoothing function for weights (e.g. dist over speed). Returns a 
 * smoothed ratio of a:b.
 *
function smooth(a, b) {return b === 0?b:(1 / sqrt(a / b*b))}
*/



/**
 * Smoothing using a sigmoid (logistic function) curve.
 * @param {float} x input value
 * @param {float} x0 midpoint of curve
 * @param {float} L limit of curve
 * @param {float} k slope of curve
 *
function logistic_smooth(x, x0, L = x * 2, k = 1) {return L / (1 + pow(E, k * x-x0))}

/**
 * Linear interpolation
 *
function lerp(a, b, t) {
	return a+t*(b-a);
}
*/

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
		if(isNaN(v[v_i])) throw new Error("invalid vector");
	}
}
