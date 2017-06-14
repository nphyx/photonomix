"use strict";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import {TARGET_FPS, GLOBAL_DRAG, EMITTER_SIZE, DEATH_THRESHOLD} from "./photonomix.constants";
import {rotate, limitVecMut, drag, gravitate, avoid} from "./photonomix.util";
import {Photon} from "./photonomix.photons";
import {Mote} from "./photonomix.motes";
import {Void} from "./photonomix.voids";
let {vec2, times, mut_times, distance} = vectrix.vectors;
let {mut_plus} = vectrix.matrices;
let {random, sqrt, ceil, PI} = Math;
const MASS_FACTOR = 1e+5;
const POS_C = vec2(0,0);

/**
 * Emitters are "white holes" that spit out photons on a fixed schedule until depleted.
 */
export function Emitter(ipos = vec2(), ivel = vec2(), mass = 1, photonPool = undefined, arms = undefined) {
	this.pos = vec2(ipos);
	this.vel = vec2(ivel);
	this.mass = mass;
	this.initialMass = mass;
	this.photonPool = photonPool;
	this.arms = arms||1+~~(random()*6);
	this.size = 0;
	this.next = ~~(random()*3);
	return this;
}

let scratchVec1 = vec2(), emissionsPerSecond = 0|0, emissionsPerFrame = 0|0, 
		targetFrame = 0|0, i = 0|0, len = 0|0, entity, a_dist = 0.0;
Emitter.prototype.tick = function(entities, delta, frameCount) {
	/* jshint unused:false */
	this.size = sqrt(this.mass/PI) * EMITTER_SIZE;
	emissionsPerSecond = this.mass/10;
	targetFrame = ceil(TARGET_FPS/emissionsPerSecond);
	emissionsPerFrame = emissionsPerSecond/TARGET_FPS;
	if(frameCount % targetFrame === 0) {
		while((emissionsPerFrame-- > 0) && this.mass > 0) {
			this.mass--;
			entities.push(this.emitPhoton());
		}
	}
	// last turn's move, has to happen first
	mut_plus(this.pos, times(this.vel, delta, scratchVec1));
	// apply drag
	mut_plus(this.vel, drag(this.vel, GLOBAL_DRAG));
	// avoid edge
	mut_plus(this.vel, avoid(this.vel, this.pos, POS_C, 1.1, this.size, this.size, scratchVec1)); // don't go off the screen
	limitVecMut(this.vel, 0, 1);

	for(i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if(entity === this) continue;
		a_dist = distance(this.pos, entity.pos);
		if(this.mass > DEATH_THRESHOLD) { // don't need tons of tiny emitters screwing with things
			if(entity instanceof Photon || entity instanceof Mote) {
				mut_plus(entity.vel, mut_times(
					gravitate(entity.pos, this.pos, -this.mass*MASS_FACTOR, scratchVec1),
					delta)
				);
			}
			else if(entity instanceof Void) {
				mut_plus(entity.vel, mut_times(
					gravitate(entity.pos, this.pos, -(this.mass/entity.mass)*MASS_FACTOR, scratchVec1),
					delta)
				);
			}
			else if(entity instanceof Emitter) {
				mut_plus(entity.vel, mut_times(
					gravitate(entity.pos, this.pos, -(this.mass*entity.mass)*MASS_FACTOR, scratchVec1),
					delta)
				);
			}
		}
	}
}

Emitter.prototype.emitPhoton = (function() {
	let pos = vec2(), radians = 0.0, mmi = 0.0, color = 0|0;
	return function emitPhoton() {
		color = this.next;
		pos[0] = this.size/5;
		pos[1] = this.size/5;
		mut_plus(pos, this.pos);
		mmi = (this.mass%this.initialMass);
		radians = (mmi/(this.initialMass/2));
		radians = radians + (mmi%this.arms)*(2/this.arms); // split across arms
		mut_plus(rotate(pos, this.pos, radians, pos), this.pos);
		this.next = ~~(random()*3);
		// introduce some jitter
		return(new Photon(pos, vec2(0,0), color, this.photonPool));
	}
})();
