"use strict";
import {Mote} from "./photonomix.motes";
import {TARGET_FPS, START_POP, MAX_POP} from "./photonomix.constants";
let {floor, ceil} = Math;

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

State.prototype.tick = function(delta) {
	let entities = this.entities;
	this.stats.hungry = 0;
	this.stats.scared = 0;
	this.stats.target = 0;
	this.stats.pop = entities.length;
	let tick_delta = delta/TARGET_FPS;
	for(let i = 0, len = entities.length, entity, baby; i < len; ++i) {
		entity = entities[i];
		entity.tick(this.entities, tick_delta);
		if(entity instanceof Mote) {
			if(!entity.full) this.stats.hungry++;
			if(entity.scared) this.stats.scared++;
			if(entity.target) this.stats.target++;
			// mark dead for removal
			if(entity.dead) {
				marks[markpos] = i;
				markpos++;
			}
			else if(entity.pregnant && entities.length <= MAX_POP) {
				entity.pregnant = false;
				baby = new Mote([floor(entity.r/2), floor(entity.g/2), floor(entity.b/2)], [entity.y, entity.y], entity.base_speed, entity.base_sight, entity.base_eat, entity.base_flee);
				entity.scared = TARGET_FPS*2;
				baby.scared = TARGET_FPS*2;
				entity.r = ceil(entity.r/2);
				entity.g = ceil(entity.g/2);
				entity.b = ceil(entity.b/2);
				this.entities.push(baby);
				this.stats.born++;
			}
		}
	}

	// sweep dead
	while(markpos > 0) {
		markpos--;
		entities.splice(marks[markpos], 1);
		this.stats.died++;
		marks[markpos] = 0;
	}

	// shuffling helps action lock issues
	shuffle(entities);
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
