"use strict";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import {gravitate, drag, outOfBounds, limitVecMut, avoid} from  "./photonomix.util";
import {Mote} from "./photonomix.motes";
import {Photon} from "./photonomix.photons";
import {Emitter} from "./photonomix.emitters";
const {vec2, times, mut_times, distance} = vectrix.vectors;
const {mut_plus} = vectrix.matrices;
import {VOID_SIZE, GLOBAL_DRAG} from "./photonomix.constants";
const {random, sqrt, PI, ceil, min} = Math;
const POS_C = vec2(0,0);

export function Void(ipos = vec2(), ivel = vec2(), mass = 1) {
	this.pos = vec2(ipos);
	this.vel = vec2(ivel);
	this.size = 0;
	this.birthMass = mass;
	this.mass = 1;
	this.lastMeal = -1;
	this.eatTime = 0;
	return this;
}

let scratchVec1 = vec2(), entity, i = 0|0, len = 0|0, a_dist = 0.0, consume = 0|0;
Void.prototype.tick = function(entities, delta) {
	if(this.birthMass > 0) {
		consume = min(this.birthMass, ceil(this.mass/100));
		this.birthMass -= consume;
		this.mass += consume;
	}
	if(this.eatTime > 30) this.eatTime--;
	else this.lastMeal = -1;
	if(outOfBounds(this.pos, 1.3)) {
		this.mass = this.mass - 1;
	}
	this.size = sqrt(this.mass/PI) * VOID_SIZE;
	// last turn's move, has to happen first
	mut_plus(this.pos, times(this.vel, delta, scratchVec1));

	// apply basic forces
	mut_plus(this.vel, avoid(this.vel, this.pos, POS_C, 1.3, 0.01, 0.01, scratchVec1)); // don't go off the screen
	// apply drag
	mut_plus(this.vel, drag(this.vel, GLOBAL_DRAG));
	limitVecMut(this.vel, 0, 1);

	for(i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if(entity === this) continue;
		a_dist = distance(this.pos, entity.pos);

		if(entity instanceof Photon && a_dist < this.size) {
			entity.lifetime = entity.lifetime - 1;
			if(entity.lifetime === 0 || a_dist < this.size*0.6) {
				this.mass = this.mass + 1;
				this.lastMeal = entity.color;
				this.eatTime = 15;
				entity.lifetime = 0;
			}
		}
		if(entity instanceof Mote && a_dist < this.size*0.6) {
			// probablistic injury, so they don't get shredded instantly
			if((random()*30*a_dist) < 1) entity.injured = entity.injured + 1;
		}
		if(entity instanceof Void) {
			if(a_dist < (entity.size+this.size)*0.44) { // bigger ones eat smaller ones
				if(this.mass > entity.mass) {
					consume = min(entity.mass, ceil(this.birthMass + this.mass / 100));
					this.birthMass += consume;
					entity.mass -= consume;
				}
			}
		}
		// apply gravity
		if(entity instanceof Emitter) { // emitters have negative & repelling mass
			mut_plus(entity.vel, mut_times(
				gravitate(entity.pos, this.pos, (this.mass/entity.mass), scratchVec1),
				(1/entity.mass))
			);
		}
		else {
			mut_plus(entity.vel, mut_times(
				gravitate(entity.pos, this.pos, entity.mass*this.mass, scratchVec1), 
				(1/entity.mass))
			);
		}
	}
}
