"use strict";
import {Mote} from "./photonomix.motes";
import {Photon} from "./photonomix.photons";
import {shuffle, rotate} from "./photonomix.util";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
const {vec2, mut_copy} = vectrix.vectors;
import {TARGET_FPS, START_POP, MAX_POP, PREGNANT_TIME, DEATH_THRESHOLD} 
	from "./photonomix.constants";
let {random} = Math;

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

State.prototype.tick = (function() {
	let entities, entity, i = 0|0, len = 0|0, tick_delta = 0.0;	
	return function(delta, frameCount) {
		entities = this.entities;
		this.stats.hungry = 0;
		this.stats.scared = 0;
		this.stats.target = 0;
		this.stats.pop = 0;
		tick_delta = delta/TARGET_FPS;
		for(i = 0, len = entities.length; i < len; ++i) {
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
				if(entity.dying === DEATH_THRESHOLD) {
					this.killMote(entity);
					marks[markpos] = i;
					this.stats.died++;
					markpos++;
				}
				else if(entity.dying) {
				}
				else if(entity.pregnant === PREGNANT_TIME) {
					this.entities.push(entity.split());
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
})();

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
