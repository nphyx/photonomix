"use strict";
import {Mote} from "./photonomix.motes";
import {Photon} from "./photonomix.photons";
import {rotate} from "./photonomix.util";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
const vec2 = vectrix.vectors.vec2;
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
	this.stats.pop = entities.length;
	let tick_delta = delta/TARGET_FPS;
	if(frameCount % (TARGET_FPS/10) === 0) {
		this.emitPhoton(null, ~~(random()*3));
	}
	for(let i = 0, len = entities.length, entity, baby; i < len; ++i) {
		entity = entities[i];
		entity.tick(this.entities, tick_delta);
		// do mote-specific stuff
		if(entity instanceof Mote) {
			if(!entity.full) this.stats.hungry++;
			if(entity.scared) this.stats.scared++;
			if(entity.target) this.stats.target++;
			// mark dead for removal
			if(entity.dead) {
				marks[markpos] = i;
				this.stats.died++;
				markpos++;
			}
			else if(entity.pregnant === PREGNANT_TIME) {
				baby = new Mote([floor(entity.r/2), floor(entity.g/2), floor(entity.b/2)], [entity.x, entity.y], entity.base_speed, entity.base_sight, entity.base_eat, entity.base_flee);
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

let pos = vec2(), vel = vec2(), center = vec2(), p_c = 0;
State.prototype.emitPhoton = function(ipos, color, count = p_c, max = 12) {
	ipos = ipos||[random()*1.8-0.9, random()*1.8-0.9];
	color = color||~~(random()*3);
	pos.set(ipos);
	vel.set([0.05, 0.05]);
	rotate(vel, center, ((p_c%max)/(max/2))*Math.PI, vel);
	this.entities.push(new Photon(pos, vel, color));
	p_c++;
}

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
