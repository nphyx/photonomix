"use strict";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import {gravitate, drag, outOfBounds, limitVecMut, avoid} from  "./photonomix.util";
import {Mote} from "./photonomix.motes";
import {Photon} from "./photonomix.photons";
import {Emitter} from "./photonomix.emitters";
const {vec2, times, mut_times, distance} = vectrix.vectors;
const {mut_plus} = vectrix.matrices;
import {VOID_SIZE, GLOBAL_DRAG} from "./photonomix.constants";
const {sqrt, PI} = Math;
const POS_C = vec2(0,0);

export function Void(ipos = vec2(), ivel = vec2(), mass = 1) {
	this.pos = vec2(ipos);
	this.vel = vec2(ivel);
	this.size = 0;
	this.mass = mass;
	return this;
}

const MASS_FACTOR = 1e+5;

let scratchVec1 = vec2(), entity, i = 0|0, len = 0|0, a_dist = 0.0;
Void.prototype.tick = function(entities, delta) {
	if(outOfBounds(this.pos, 1.3)) {
		this.mass = this.mass - 1;
	}
	this.size = sqrt(this.mass/PI) * VOID_SIZE;
	// last turn's move, has to happen first
	mut_plus(this.pos, times(this.vel, delta, scratchVec1));

	// apply basic forces
	mut_plus(this.vel, avoid(this.vel, this.pos, POS_C, 1.1, this.size, this.size, scratchVec1)); // don't go off the screen
	// apply drag
	mut_plus(this.vel, drag(this.vel, GLOBAL_DRAG));
	limitVecMut(this.vel, 0, 1);

	for(i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if(entity === this) continue;
		a_dist = distance(this.pos, entity.pos);
		if(entity instanceof Photon || entity instanceof Mote) {
			mut_plus(entity.vel, mut_times(
				gravitate(entity.pos, this.pos, this.mass*MASS_FACTOR, scratchVec1),
				delta)
			);
		}
		if(entity instanceof Photon && a_dist < this.size) {
			entity.lifetime = entity.lifetime - 1;
			if(entity.lifetime === 0 || a_dist < this.size*0.6) {
				this.mass = this.mass + 1;
				entity.lifetime = 0;
			}
		}
		if(entity instanceof Mote && a_dist < this.size) {
			entity.injured = entity.injured + 1;
		}
		if(entity instanceof Void) {
			if(entity.mass > 0 && a_dist < this.size) { // bigger ones eat smaller ones
				if(this.mass > entity.mass) this.mass += entity.mass;
				entity.mass = 0;
			}
			mut_plus(entity.vel, mut_times(
				gravitate(entity.pos, this.pos, this.mass*entity.mass*MASS_FACTOR, scratchVec1),
				delta)
			);
		}
		if(entity instanceof Emitter) {
			mut_plus(entity.vel, mut_times(
				gravitate(entity.pos, this.pos, (this.mass/entity.mass)*MASS_FACTOR, scratchVec1),
				delta)
			);
		}
	}
}
