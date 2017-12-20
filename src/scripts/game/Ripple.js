"use strict";
import * as vectrix from  "@nphyx/vectrix";
import {gravitate} from "../photonomix.util";
let {vec2, mut_times, distance} = vectrix.vectors;
let {mut_plus} = vectrix.matrices;

/**
 * Ripples are small bursts that push objects away then expire. Usually spawned by player clicks.
 */
export default function Ripple(pos = vec2(), mass = 1) {
	this.pos = vec2(pos);
	this.vel = vec2(0,0);
	this.mass = mass;
	return this;
}

let scratchVec1 = vec2(), i = 0|0, len = 0|0, entity, a_dist = 0.0;
Ripple.prototype.tick = function(entities) {
	// last turn's move, has to happen first
	//mut_plus(this.pos, times(this.vel, delta, scratchVec1));
	// apply drag
	//mut_plus(this.vel, drag(this.vel, GLOBAL_DRAG));
	// avoid edge
	//mut_plus(this.vel, avoid(this.vel, this.pos, POS_C, 1.3, 0.001, scratchVec1));

	for(i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if(entity === this) continue;
		a_dist = distance(this.pos, entity.pos);
		if(!(entity instanceof Ripple)) {
				mut_plus(entity.vel, mut_times(
				gravitate(entity.pos, this.pos, -this.mass*entity.mass*10000, scratchVec1),
				1/entity.mass)
			);
		}
	}
	this.mass--;
}
