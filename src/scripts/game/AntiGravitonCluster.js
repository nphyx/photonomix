"use strict";
import * as vectrix from  "@nphyx/vectrix";
import {rotate, drag, avoid, accelerate} from  "../photonomix.util";
import {Void, Photon} from "./";
const {vec2, times, distance, mut_copy} = vectrix.vectors;
const {mut_plus} = vectrix.matrices;
import {TARGET_FPS, MOTE_BASE_SIZE, GLOBAL_DRAG} from "../photonomix.constants";
const {random, sqrt, PI, ceil, min, max} = Math;
const POS_C = vec2(0,0);

export default function AntiGravitonCluster(ipos = vec2(), ivel = vec2(), mass = 1, photonPool = undefined) {
	this.pos = vec2(ipos);
	this.vel = vec2(ivel);
	this.size = 0;
	this.birthMass = this.initialMass = mass;
	this.mass = 1;
	this.photonPool = photonPool;
	this.instability = 0;
	this.size = 0;
	return this;
}

let scratch = vec2(), entity, i = 0|0, len = 0|0, dist = 0.0, consume = 0|0;
AntiGravitonCluster.prototype.tick = function(entities, delta, frameCount) {
	if(this.birthMass > 0) {
		consume = min(this.birthMass, ceil(this.mass/10));
		this.birthMass -= consume;
		this.mass += consume;
	}
	this.size = sqrt(this.mass*0.05/PI) * MOTE_BASE_SIZE;
	// last turn's move, has to happen first
	mut_plus(this.pos, times(this.vel, delta, scratch));
	this.initialMass = max(this.mass, this.initialMass);

	// apply basic forces
	// don't go off the screen
	mut_plus(this.vel, avoid(this.vel, this.pos, POS_C, 1.3, 0.01, scratch));
	// apply drag
	mut_plus(this.vel, drag(this.vel, GLOBAL_DRAG));

	if(this.birthMass === 0) {
		this.instability += this.mass*0.003;
	}
	if((frameCount % ceil(TARGET_FPS*0.05)) === 0) {
		while((this.instability > 0) && (this.mass > 0)) {
			entities.push(this.emitPhoton());
			this.mass -= min(this.mass, 7);
			this.instability -= 0.9;
		}
	}

	for(i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if(entity === this) continue;
		dist = distance(this.pos, entity.pos);

		if(entity instanceof Void) {
			if((dist < (entity.size+this.size)*0.5)) {
				consume = min(entity.mass, ceil((entity.mass+entity.birthMass)/10));
				this.mass += consume;
				entity.mass -= consume;
				this.instability += consume*0.07;
			}
			if(dist < this.size*10) mut_plus(this.vel, accelerate(this.pos, entity.pos, this.size*dist*5, scratch));
			return;
		}
	}
}

AntiGravitonCluster.prototype.emitPhoton = (function() {
	let pos = vec2(), vel = vec2(), rot = vec2(), radians = 0.0, mim = 0.0, color = 0|0;
	return function emitPhoton() {
		color = ~~(random()*3);
		pos[0] = this.size*0.1;
		pos[1] = this.size*0.1;
		mut_plus(pos, this.pos);
		mut_copy(vel, this.vel);
		mim = (this.mass%this.initialMass);
		radians = (mim/(this.initialMass/2));
		radians = radians + (mim%100)*(2/100); // split across arms
		mut_copy(rot, rotate(pos, this.pos, radians, pos));
		mut_plus(rot, this.pos);
		mut_plus(pos, rot);
		// introduce some jitter
		mut_plus(vel, accelerate(this.pos, pos, this.size*2, scratch));
		return(new Photon(pos, vel, color, this.photonPool));
	}
})();
