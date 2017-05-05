"use strict";
let {random, abs, max, min, pow, sqrt, E} = Math;
import {TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, WEIGHT_PRED_B, MOTE_BASE_SIZE} from "./photonomix.constants";
export function Mote(photons = [0,0,0], pos = [0,0], speed = 0.005, sight = 0.1, eat = 1.2, flee = 0.9) {
	// "private" properties
	photons = Uint8Array.from(photons);
	let color = [0,0,0,0.5];
	this.pos = pos;
	this.toPos = [random(), random()];
	let sizeMax = MOTE_BASE_SIZE*4;
	let sizeMin = MOTE_BASE_SIZE*0.25;

	// "public" properties
	// weights for various activities
	this.dead = false;
	this.pregnant = false;
	this.fleeing = 0;
	this.full = 0;
	this.speed = speed+adjrand(0.005);
	this.sight = sight+adjrand(0.1); // vision distance
	this.eat = eat+adjrand(0.1);
	this.flee = flee+adjrand(0.1);
	this.wander = 1.0+adjrand(0.1);
	this.pulse = ~~(TARGET_FPS*random());
	this.size = MOTE_BASE_SIZE;



	let updateProperties = () => {
		let sum = photons[0] + photons[1] + photons[2];
		this.size = clamp(sum/92*MOTE_BASE_SIZE, sizeMin, sizeMax);
		if(sum > 128) this.pregnant = true;
		if(photons[0] <= 0 || photons[1] <= 0 || photons[2] <= 0) this.dead = true;
		
		color[0] = ~~(photons[0]/sum*255);
		color[1] = ~~(photons[1]/sum*255);
		color[2] = ~~(photons[2]/sum*255);
	}

	updateProperties();
	
	

	let setPhoton = (v, n) => {
		photons[n] = max(0, min(v, 255));
		updateProperties();
	}



	Object.defineProperties(this, {
		"color":{get: () => "rgba("+(color[0])+","+color[1]+","+color[2]+","+color[3]+")"},
		"r":{
			get: () => photons[0],
			set: (v) => setPhoton(v, 0)
		},
		"g":{
			get: () => photons[1],
			set: (v) => setPhoton(v, 1)
		},
		"b":{
			get: () => photons[2],
			set: (v) => setPhoton(v, 2)
		},
		"x":{
			get: () => this.pos[0],
			set: (v) => this.pos[0] = v
		},
		"y":{
			get: () => this.pos[1],
			set: (v) => this.pos[1] = v
		},
		"toX":{
			get: () => this.toPos[0],
			set: (v) => this.toPos[0] = v
		},
		"toY":{
			get: () => this.toPos[1],
			set: (v) => this.toPos[1] = v
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
Mote.prototype.act = function(surrounding) {
	// do last turn's movement

	let {speed, x, y, toX, toY, sight} = this, halfspeed = speed/2, maxspeed = speed*1.5;
	let toDistX = x - toX;
	let toDistY = y - toY;
	let movedist = clamp(halfspeed+(speed*hyp(toDistX, toDistY)||0), halfspeed, maxspeed);
	this.x = x + (movedist * ratio(toDistX, toDistY))||0;
	this.y = y + (movedist * ratio(toDistY, toDistX))||0;
	this.pos = limitPos(this.pos); // todo: reflection instead of bounceback

	// first weigh them by distance
	let weights = surrounding.filter((target) => {
			return hyp(x - target.x, y - target.y) < sight;
	}).map((obj, i) => {
			let toX = obj.toX;
			let toY = obj.toY;
			let dist = hyp(x - obj.x, y - obj.y);
			let food = foodValue(this, obj);
			let scary = foodValue(obj, this);
			// move value is the weighted difference between food and flee values
			let move = dist*(food*this.eat - scary*this.flee);
			// structure: [weight by distance, eat value, scary value, move value, obj index]
			return [
				dist, // 0
				food,   // 1
				scary,  // 2
				move,   // 3
				toX,// 4
				toY,// 5
				obj       // 6
			]
		}, this).sort((a, b) => a.weight - b.weight);

	let move;
	if(weights.length && !this.full) {
		if(this.fleeing) {
			move = weights.reduce((a, v) => {
				a[0] += v[4];
				a[1] += v[5];
				return a;
			}, [0,0]);
			move[0] = this.x + (((move[0]/weights.length)||0) + 1e-26)*posneg();
			move[1] = this.y + (((move[1]/weights.length)||0) - 1e-26)*posneg();
			this.fleeing--;
		}
		else { // aggressive behavior
			move = weights.reduce((a, v) => {
				a[0] += v[3] * v[4];
				a[1] += v[3] * v[5];
				return a;
			}, [0,0]);
			move[0] = (((move[0]/weights.length)||0) - 1e-26)*0.1;
			move[1] = (((move[1]/weights.length)||0) + 1e-26)*0.1;
			let target = weights[0];
			move[0] += target[3] * target[4] + this.x;
			move[1] += target[3] * target[5] + this.y;
			if(target[0] < this.size*2) this.bite(target[6]);
		}
	}
	else {
		if(this.full > 0) this.full--;
		move = [toX-adjrand(speed*0.2), toY-adjrand(speed*0.2)];
	}

	// tend toward middle with moves, "gravity"
	move[0] = clamp(move[0], MOTE_BASE_SIZE, 1-MOTE_BASE_SIZE);
	move[1] = clamp(move[1], MOTE_BASE_SIZE, 1-MOTE_BASE_SIZE);
	move[0] += (x < 0.15)?-0.025:(x >= 0.75)?0.035:0;
	move[1] += (y < 0.15)?-0.025:(y >= 0.75)?0.035:0;

	this.toPos = move;
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
	mote.toX = adjrand(-3*this.toX);
	mote.toY = adjrand(-3*this.toY);
	mote.fleeing = TARGET_FPS/3;
	mote.full = TARGET_FPS*3;
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
	// size = 1 is a photon, so it doesn't eat
	if(a.size === 1) return 0;
	// find the strongest color; this helps determine behavior
	let strongest = max(a.r, a.g, a.b);
	let ratios = {
		r:ratio(b.r, a.r),
		g:ratio(b.g, a.g),
		b:ratio(b.g, a.g)
	};
	let value = 1;
	// this should apply multiple behavior weights when the mote is a hybrid
	switch(strongest) {
		case a.r: 
			value *= (ratios.g + ratios.b)*WEIGHT_PRED_R - ratios.r*(1/WEIGHT_PRED_R);
		break;
		case a.g:
			value *= (ratios.r + ratios.b)*WEIGHT_PRED_G - ratios.g*(1/WEIGHT_PRED_G);
		break;
		case a.b:
			value *= (ratios.r + ratios.g)*WEIGHT_PRED_B - ratios.b*(1/WEIGHT_PRED_B);
		break;
	}

	return value * (ratio(a.size, b.size)*2)-1;
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



/**
 * A quadratic smoothing function for weights (e.g. dist over speed). Returns a 
 * smoothed ratio of a:b.
 */
function smooth(a, b) {return b === 0?b:(1 / sqrt(a / b*b))}



/**
 * Smoothing using a sigmoid (logistic function) curve.
 * @param {float} x input value
 * @param {float} x0 midpoint of curve
 * @param {float} L limit of curve
 * @param {float} k slope of curve
 */
function logistic_smooth(x, x0, L = x * 2, k = 1) {return L / (1 + pow(E, k * x-x0))}

/**
 * Linear interpolation
 */
function lerp(a, b, t) {
	return a+t*(b-a);
}

function limitPos(pos) {
	for(let i = 0; i < 2; ++i) {
		if(pos[i] < 0) pos[i] = -(pos[i] % 1);
		if(pos[i] > 1) pos[i] = 1 - (pos[i] % 1);
	}
	return pos;
}

/**
 * A random function adjusted to a range of -1 to 1 and multiplied by a
 * scaling value
 */
function adjrand(scale = 1) {
	return ((random()*2)-1)*scale
}

function posneg() {
	return random() > 0.5?1:-1;
}

export function clamp(v, minv, maxv) {
	return max(min(v, maxv), minv);
}

export function ratio(a, b) { return a/(abs(a)+abs(b)) }
