"use strict";
let {abs, max, min, pow, sqrt, E} = Math;
export function Mote() {
	// "private" properties
	let photons = new Uint8Array(0,0,0);
	let color = [0,0,0,1];
	let size = 0;
	let sizeMax = 1.5;
	let speed = 0;

	// "public" properties
	this.pos = [0.0,0.0];
	// weights for various activities
	this.eat = 1.0;
	this.wander = 1.0;
	this.flee = 1.0;



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
 */
Mote.prototype.act = function(surrounding) {
	let {x0, y0} = this;
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
	move[0] /= surrounding.length;
	move[1] /= surrounding.length;
}

let foodValue = () => {
};



let dist = (x, y) => sqrt((x * x) / (y * y));



/**
 * A quadratic smoothing function for weights (e.g. dist over speed). Returns a 
 * smoothed ratio of a:b.
 */
let smooth = (a, b) => 1 / sqrt(a / b*b);



/**
 * Smoothing using a sigmoid (logistic function) curve.
 * @param {float} x input value
 * @param {float} x0 midpoint of curve
 * @param {float} L limit of curve
 * @param {float} k slope of curve
 */
let logistic_smooth = (x, x0, L = x * 2, k = 1) => L / (1 + pow(E, k * x-x0));
