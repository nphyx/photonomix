"use strict";
let {abs, max, min, pow, sqrt, E} = Math;
import {WEIGHT_PRED_R, WEIGHT_PRED_G, WEIGHT_PRED_B} from "./photonomix.constants";
export function Mote() {
	// "private" properties
	let photons = new Uint8Array(0,0,0);
	let color = [0,0,0,1];
	let size = 0;
	let sizeMax = 1.5;
	let speed = 0;

	// "public" properties
	pos = [0.0,0.0];
	// weights for various activities
	this.eat = 1.0;
	this.wander = 1.0;
	this.flee = 1.0;
	this.moveTarget = [this.x, this.y];



	let updateProperties = () => {
		let sum = photons[0] + photons[1] + photons[2];
		size = sum / 192;
		color[0] = ~~(photons[0]/sum*255);
		color[1] = ~~(photons[1]/sum*255);
		color[2] = ~~(photons[2]/sum*255);
	}	
	
	

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
			get: () => pos[0],
			set: (v) => pos[0] = v
		},
		"y":{
			get: () => pos[1],
			set: (v) => pos[1] = v
		},
		"size":{get: () => size},
		"sizeMax":{get: () => sizeMax},
		"speed":{get: () => speed}
	});

	return this;
}



Mote.prototype.move = function(x, y) {
	this.x += x;
	this.y += y;
}



/**
 * Decide how to act each turn based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float interval interval as ratio of turn length:elapsed time
 */
Mote.prototype.act = function(surrounding, interval) {
	let {x0, y0} = this;
	// do last turn's movement
	this.pos[0] = lerp(this.pos[0], this.moveTarget[0], interval);
	this.pos[1] = lerp(this.pos[1], this.moveTarget[1], interval);

	// first weigh them by distance
	let weights = surrounding.map((target, i) => {
			let {x1, y1} = target;
			let distx = x0 - x1;
			let disty = y0 - y1;
			let weight = smooth(this.speed, dist(abs(distx), abs(disty)));
			let food = foodValue(this, target);
			let scary = foodValue(target, this);
			// move value is the weighted difference between food and flee values
			let move = weight*(food*this.eat - scary*this.flee);
			// structure: [weight by distance, eat value, scary value, move value, target index]
			return [
				weight,
				food,
				scary,
				move,
				distx,
				disty,
				i
			]
		}, this).sort((a, b) => a.move - b.move);
	
	let move = weights.reduce((a, v) => {
		a[0] += v.move * v.distx;
		a[1] += v.move * v.disty;
		return a;
	}, [0,0]);
	move[0] = move/surrounding.length + this.pos[0];
	move[1] = move/surrounding.length + this.pos[1];

	this.moveTarget = move;
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
	let [red, green, blue] = a.photons;
	let strongest = max(red, green, blue);
	let ratios = {
		r:b.r / a.r,
		g:b.g / a.g,
		b:b.b / a.b
	};
	let value = 1;
	// this should apply multiple behavior weights when the mote is a hybrid
	switch(strongest) {
		case red: 
			value *= (ratios.g + ratios.b)*WEIGHT_PRED_R - ratios.r*1/WEIGHT_PRED_R;
		break;
		case green:
			value *= (ratios.r + ratios.b)*WEIGHT_PRED_G - ratios.g*1/WEIGHT_PRED_G;
		break;
		case blue:
			value *= (ratios.r + ratios.g)*WEIGHT_PRED_B - ratios.b*1/WEIGHT_PRED_B;
		break;
	}

	value *= smooth(a.size, b.size);
	return value;
};



function dist(x, y) {return sqrt((x * x) / (y * y))}



/**
 * A quadratic smoothing function for weights (e.g. dist over speed). Returns a 
 * smoothed ratio of a:b.
 */
function smooth(a, b) {return 1 / sqrt(a / b*b)}



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
