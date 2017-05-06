"use strict";
let {random, abs, max, min, sqrt, pow, sin, cos} = Math;
import {TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, 
	WEIGHT_PRED_B, MOTE_BASE_SIZE, PREGNANT_THRESHOLD, DEATH_THRESHOLD} from "./photonomix.constants";

const R = 0, G = 1, B = 2, A = 3, X = 0, Y = 1, FV = 3;
const POS_C  = [0.5, 0.5];
const FV_SCRATCH = new Float32Array(4); // saves memory allocations for foodValue
export function Mote(photons = new Uint8Array(3), pos = new Float32Array(2), speed = 0.0025, sight = 0.1, eat = 1.2, flee = 0.9) {
	// "private" properties
	let color = Float32Array.of(0,0,0,0.5);
	this.pos = pos;
	this.toPos = Float32Array.of(random(), random());
	let sizeMax = MOTE_BASE_SIZE*4;
	let sizeMin = MOTE_BASE_SIZE*0.25;

	// "public" properties
	// weights for various activities
	this.dead = false;
	this.pregnant = false;
	this.scared = 0;
	this.full = 0;
	this.speed = speed; //+adjrand(0.005);
	this.sight = sight+adjrand(0.1); // vision distance
	this.eat = eat+adjrand(0.1);
	this.flee = flee+adjrand(0.1);
	this.wander = 1.0+adjrand(0.1);
	this.pulse = ~~(TARGET_FPS*random());
	this.size = MOTE_BASE_SIZE;
	this.handedness = posneg();



	let updateProperties = () => {
		let sum = photons[R] + photons[G] + photons[B];
		this.size = clamp(sum/92*MOTE_BASE_SIZE, sizeMin, sizeMax);
		if(sum > PREGNANT_THRESHOLD) this.pregnant = true;
		if(sum < DEATH_THRESHOLD) this.dead = true;
		
		color[R] = ~~(photons[R]/sum*255);
		color[G] = ~~(photons[G]/sum*255);
		color[B] = ~~(photons[B]/sum*255);
	}

	updateProperties();
	
	

	let setPhoton = (v, n) => {
		photons[n] = max(0, min(v, 255));
		updateProperties();
	}



	Object.defineProperties(this, {
		"color":{get: () => "rgba("+(color[R])+","+color[G]+","+color[B]+","+color[A]+")"},
		"r":{
			get: () => photons[R],
			set: (v) => setPhoton(v, R)
		},
		"g":{
			get: () => photons[G],
			set: (v) => setPhoton(v, G)
		},
		"b":{
			get: () => photons[B],
			set: (v) => setPhoton(v, B)
		},
		"x":{
			get: () => this.pos[X],
			set: (v) => this.pos[X] = v
		},
		"y":{
			get: () => this.pos[Y],
			set: (v) => this.pos[Y] = v
		},
		"toX":{
			get: () => this.toPos[X],
			set: (v) => this.toPos[X] = v
		},
		"toY": {
			get: () => this.toPos[Y],
			set: (v) => this.toPos[Y] = v
		},
		"photons":{
			get: () => photons
		},
		"sizeMax":{get: () => sizeMax},
	});

	return this;
}

/**
 * Decide how to act each turn based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float interval interval as ratio of turn length:elapsed time in seconds
 */
let x, y, toX, toY, size, sight, speed, eat, flee, sizex2, 
	newToPos = new Float32Array(2), weightp = new Float32Array(2), weight, mainTarget, 
	weightCount, highestWeight, mainTargetDist, cx, cy, ctoX, ctoY, dist, food, scary, 
	a_i, a_len, current, handedness;
Mote.prototype.act = function(surrounding) {
	// do last turn's movement
	this.move();
	({x, y, toX, toY, size, sight, speed, eat, flee, handedness} = this);
	sizex2 = size*2;

	newToPos[X] = this.toPos[X];
	newToPos[Y] = this.toPos[Y];
	if(isNaN(newToPos[X]) || isNaN(newToPos[Y])) throw new Error("invalid movement");

	// basic wandering movement
	rotate(newToPos, POS_C, speed*handedness);

	// hungry or fleeing, so consider targets
	if(!this.full || this.scared) {
		// reset scratch memory that may not be initialized
		weightp[X] = 0; 
		weightp[Y] = 0;
		weightCount = 0; 
		highestWeight = -Infinity;
		mainTargetDist = 0;
		mainTarget = undefined;
		for(a_i = 0, a_len = surrounding.length; a_i < a_len && a_i < 20; ++a_i) {
			current = surrounding[a_i];
			cx = current.x;
			cy = current.y;
			ctoX = current.toX;
			ctoY = current.toY;
			dist = hyp(x - cx, y - cx);
			if(dist  > sight || current === this) continue;
			food = foodValue(this, current)||0;
			scary = foodValue(current, this)||0;
			// move value is the weighted difference between food and flee values
			weight = dist*(food*eat - scary*flee);
			if(weight > highestWeight) {
				highestWeight = weight;
				mainTarget = current;
				mainTargetDist = dist;
			}

			weightp[X] += weight*ctoX; 
			weightp[Y] += weight*ctoY; 
			weightCount++;
		}

		weightp[X] = clamp(weightp[X]/weightCount, -2, 2);
		weightp[Y] = clamp(weightp[Y]/weightCount, -2, 2);

		if(weightCount) {
			if(this.scared) {
				gravitate(newToPos, weightp, speed, null, null, true);
				rotate(newToPos, weightp, speed*handedness);
				if(isNaN(newToPos[X]) || isNaN(newToPos[Y])) throw new Error("invalid movement");
				this.scared--;
			}

			// if there are appropriate targets and hungry
			else if(!this.full && mainTarget) {
				gravitate(newToPos, weightp, speed);
				if(isNaN(newToPos[X]) || isNaN(newToPos[Y])) throw new Error("invalid movement");
				rotate(newToPos, weightp, speed*handedness);
				gravitate(newToPos, mainTarget.toPos, highestWeight);
				if(isNaN(newToPos[X]) || isNaN(newToPos[Y])) throw new Error("invalid movement");
				rotate(newToPos, mainTarget.pos, speed*handedness);
				if(mainTargetDist < size*2) this.bite(mainTarget);
				if(isNaN(newToPos[X]) || isNaN(newToPos[Y])) throw new Error("invalid movement");
			}
		} // end if weights.length
	} // end if hungry or scared

	if(this.full > 0) this.full--;
	

	// gravitate toward the center
	gravitate(newToPos, POS_C, 0.0001);
	if(isNaN(newToPos[X]) || isNaN(newToPos[Y])) throw new Error("invalid movement");
		
	// clamp move directions to game space
	newToPos[X] = clamp(newToPos[X], sizex2, 1-sizex2);
	newToPos[Y] = clamp(newToPos[Y], sizex2, 1-sizex2);

	this.toPos[X] = newToPos[X];
	this.toPos[Y] = newToPos[Y];
}


let m_speed, m_speedmin, m_speedmax, m_pos, m_newPos = Array(2);
Mote.prototype.move = function() {
	m_speed = this.speed;
	m_speedmin = this.speed / 2;
	m_speedmax  = this.speed * 1.5;
	m_pos = this.pos;
	// for some reason this bugs out sometimes and sticks them
	// in the corner, so we just abort
	// FIXME
	m_newPos[X] = m_pos[X];
	m_newPos[Y] = m_pos[Y];
	gravitate(m_newPos, this.toPos, m_speed, m_speedmin, m_speedmax);
	if(m_newPos[X] < 1e-16 || m_newPos[X] > 1-1e-16 || m_newPos[Y] < 1e-16 || m_newPos[Y] > 1-1e-16) return;
	m_newPos[X] = clamp(m_newPos[X], 1e-16, 1-1e-16);
	m_newPos[Y] = clamp(m_newPos[Y], 1e-16, 1-1e-16);
	m_pos[X] = m_newPos[X];
	m_pos[Y] = m_newPos[Y];
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
	mote.scared = TARGET_FPS*3;
	mote.full = TARGET_FPS*5;
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


/**
 * Find hypotenuse of triangle with legs x,y
 */
function hyp(x, y) {
	return (
		x === 0? y:
		y === 0? x:
		sqrt((x * x) + (y * y))
	)
}

let grav = 0;
let g_dx = 0;
let g_dy = 0;
let g_x = 0;
let g_y = 0;
/**
 * Shitty approximation of gravitation.
 * "Gravitates" p0 toward p1 by strength. Mutates p0.
 * TODO: better approach
 */
function gravitate(p0, p1, strength, min = 0, max = Infinity, away = false) {
	g_dx = abs(twiddle(p0[X] - p1[X]));
	g_dy = abs(twiddle(p0[Y] - p1[Y]));
	//movedist = clamp(halfspeed+speed*hyp(toDistX, toDistY), halfspeed, maxspeed);
	grav = clamp(1/pow(hyp(g_dx, g_dy), 2)*strength, min, max);
	g_x = grav * ratio(g_dx, g_dy)*(away?-1:1);
	g_y = grav * ratio(g_dy, g_dx)*(away?-1:1);

	p0[X] += (p0[X] < p1[X])?g_x:-g_x;
	p0[Y] += (p0[Y] < p1[Y])?g_y:-g_y;
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

export function clamp(v, minv, maxv) {
	return max(min(v, maxv), minv);
}

export function ratio(a, b) { return a/(abs(a)+abs(b)) }
