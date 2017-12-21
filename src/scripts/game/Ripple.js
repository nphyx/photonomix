"use strict";
import * as vectrix from  "@nphyx/vectrix";
import {gravitate} from "../photonomix.util";
let {vec2, mut_times, distance} = vectrix.vectors;
let {mut_plus} = vectrix.matrices;
import * as Photons from "./photons";
import * as Motes from "./motes";
import Void from "./Void";

/**
 * Ripples are small bursts that push objects away then expire. Usually spawned by player clicks.
 */
export default function Ripple(pos = vec2(), mass = 100) {
	this.pos = vec2(pos);
	this.vel = vec2(0,0);
	this.storedMass = 0;
	this.mass = mass; 
	return this;
}

let scratchVec1 = vec2(), i = 0|0, len = 0|0, entity, a_dist = 0.0;
Ripple.prototype.tick = function(entities) {
	if(this.storedMass) {
		this.mass += this.storedMass;
		this.storedMass = 0;
	}
	else this.mass--;
	Photons.forEach((photon) => {
		a_dist = distance(this.pos, photon.pos);
		if(a_dist < 0.01) photon.lifetime = 0;
		else mut_plus(photon.vel, mut_times(
			gravitate(photon.pos, this.pos, this.mass*20, scratchVec1),
			1/photon.mass));
	});
	Motes.forEach((mote) => {
		mut_plus(mote.vel, mut_times(
			gravitate(mote.pos, this.pos, -this.mass*mote.mass, scratchVec1),
			1/mote.mass));
	});
	
	for(i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if(entity === this) continue;
		a_dist = distance(this.pos, entity.pos);
		// check for stored mass so they don't just swap back and forth forever
		if(entity instanceof Ripple && !entity.storedMass) {
			if(a_dist < 0.005 && a_dist > 0.001) {
				this.storedMass++;
				entity.mass--;
			}
		}
		else if(entity instanceof Void) {
			if(a_dist < 0.0025) {
				entity.birthMass += this.storedMass;
				this.storedMass = 0;
			}
			if((a_dist - entity.size) < 0.01 && this.mass > 90 && this.mass < 100) {
				entity.mass--;
			}
			this.storedMass = 0;
		}
		else {
			mut_plus(entity.vel, mut_times(
				gravitate(entity.pos, this.pos, -this.mass*entity.mass, scratchVec1),
				1/entity.mass));
		}
	}
}
