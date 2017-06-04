"use strict";
import {Mote} from "./photonomix.motes";
import {Photon} from "./photonomix.photons";
import {rotate} from "./photonomix.util";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
const {vec2, mut_copy} = vectrix.vectors;
import {TARGET_FPS, START_POP, MAX_POP, PREGNANT_TIME} from "./photonomix.constants";
let {random, floor, ceil} = Math;

const marks = new Int32Array(MAX_POP);
let markpos = 0;

export function State() {
	this.entities = [];
	this.stats = {
		pop:0,
		born:0,
		died:0,
		target:0,
		hungry:0,
		scared:0,
	}
	return this;
}

State.prototype.start = function() {
	for(let i = 0; i < START_POP; ++i) {
		this.entities.push(new Mote.random())
	}
}

State.prototype.tick = function(delta, frameCount) {
	let entities = this.entities;
	this.stats.hungry = 0;
	this.stats.scared = 0;
	this.stats.target = 0;
	this.stats.pop = 0;
	let tick_delta = delta/TARGET_FPS;
	for(let i = 0, len = entities.length, entity, baby; i < len; ++i) {
		entity = entities[i];
		entity.tick(this.entities, tick_delta);
		// do mote-specific stuff
		if(entity instanceof Mote) {
			this.stats.pop++;
			if(!entity.full) this.stats.hungry++;
			if(entity.scared) this.stats.scared++;
			if(entity.target) this.stats.target++;
			if(entity.injured && (frameCount % (TARGET_FPS*2) === 0)) {
				this.entities.push(entity.bleed());
			}
			// mark dead for removal
			if(entity.dying) {
				this.killMote(entity);
				marks[markpos] = i;
				this.stats.died++;
				markpos++;
			}
			else if(entity.pregnant === PREGNANT_TIME) {
				baby = new Mote([floor(entity.r/2), floor(entity.g/2), floor(entity.b/2)], entity.pos, entity.base_speed, entity.base_sight, entity.base_agro, entity.base_fear);
				entity.r = ceil(entity.r/2);
				entity.g = ceil(entity.g/2);
				entity.b = ceil(entity.b/2);
				entity.scared = TARGET_FPS*2;
				baby.scared = TARGET_FPS*2;
				entity.pregnant = PREGNANT_TIME-1;
				baby.pregnant = PREGNANT_TIME-1;
				entity.target = baby;
				baby.target = entity;
				this.entities.push(baby);
				this.stats.born++;
			}
		}
		else if(entity instanceof Photon) {
			if(entity.lifetime > 0) entity.lifetime--;
			else {
				marks[markpos] = i;
				markpos++;
			}
		}
	}

	// sweep dead
	while(markpos > 0) {
		markpos--;
		entities.splice(marks[markpos], 1);
		marks[markpos] = 0;
	}

	// shuffling helps action lock issues
	shuffle(entities);
}

State.prototype.emitPhoton = (function() {
	let pos = vec2(), vel = vec2(), center = vec2(), p_c = 0, 
		base_vel = vec2(0.05, 0.05);
	return function emitPhoton(ipos, color, count = p_c, max = 12) {
		ipos = ipos||[random()*1.8-0.9, random()*1.8-0.9];
		color = color||~~(random()*3);
		pos.set(ipos);
		mut_copy(vel, base_vel);
		rotate(vel, center, ((p_c%max)/(max/2))*Math.PI, vel);
		this.entities.push(new Photon(pos, vel, color));
		p_c++;
	}
})();

State.prototype.killMote = (function() {
	let sum = 0|0, c = 0|0, i = 0|0, pos, r = 0|0, g = 0|0, b = 0|0;
	return function killMote(mote) {
		({pos, r, g, b} = mote);
		sum = r+b+g;
		c = 0;
		for(i = 0; i < sum; ++i) {
			if(r === i) c = 1;
			if(r+g === i) c = 2;
			this.emitPhoton(pos, c, i, sum);
		}
	}
})();

/**
* Shuffles array in place. ES6 version
* @param {Array} a items The array containing the items.
*/
function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}
