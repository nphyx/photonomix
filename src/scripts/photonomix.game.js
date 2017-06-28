"use strict";
import * as motes from "./photonomix.game.motes";
import * as voids from "./photonomix.game.voids";
import * as emitters from "./photonomix.game.emitters";
import * as markers from "./photonomix.game.markers";
import * as photons from "./photonomix.game.photons";
import * as antigravitons from "./photonomix.game.antigravitons";
export {motes, voids, emitters, markers, photons, antigravitons};

import {shuffle, rotate, outOfBounds} from "./photonomix.util";
import {BufferPool} from "./photonomix.bufferPools";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
const {minus} = vectrix.matrices;
const {vec2, mut_copy} = vectrix.vectors;
import {TARGET_FPS, START_POP, MAX_MOTES, MAX_PHOTONS, PREGNANT_TIME, DEATH_THRESHOLD,
	POSITIVE_ENERGY, NEGATIVE_ENERGY} from "./photonomix.constants";
let {random} = Math;
const Marker = markers.Marker;
const Photon = photons.Photon;
const Mote = motes.Mote;
const Void = voids.Void;
const Emitter = emitters.Emitter;
const AntiGravitonCluster = antigravitons.AntiGravitonCluster;

const marks = new Uint16Array(MAX_MOTES+MAX_PHOTONS+100);
let markpos = 0;
let mark = 0;

export function Game() {
	this.entities = [];
	this.photonBuffer = null;
	this.stats = {
		pop:0,
		born:0,
		died:0,
		target:0
	}
	this.actions = {};
	this.registerActions();
	return this;
}

Game.prototype.start = function() {
	this.motePool = new BufferPool(motes.BUFFER_LENGTH, MAX_MOTES);
	this.photonPool = new BufferPool(photons.BUFFER_LENGTH, MAX_PHOTONS);
	for(let i = 0; i < START_POP; ++i) {
		this.entities.push(new Mote.random(this.motePool))
	}
}

Game.prototype.tick = (function() {
	let entities, entity, i = 0|0, len = 0|0, tick_delta = 0.0;
	return function tick(delta, frameCount) {
		entities = this.entities;
		this.stats.target = 0;
		this.stats.pop = 0;
		tick_delta = delta/TARGET_FPS;
		for(i = 0, len = entities.length; i < len; ++i) {
			entity = entities[i];
			entity.tick(this.entities, tick_delta, frameCount);
			// do mote-specific stuff
			if(entity instanceof Mote) {
				this.stats.pop++;
				if(entity.target) this.stats.target++;
				if(entity.injured) {
					if(frameCount % ~~(TARGET_FPS*0.1) === 0) {
						this.entities.push(entity.bleed(this.photonPool));
					}
				}
				// mark dead for removal
				if(entity.dying === DEATH_THRESHOLD) {
					this.killMote(entity);
					marks[markpos] = i;
					this.stats.died++;
					markpos++;
				}
				else if(entity.pregnant === PREGNANT_TIME) {
					this.entities.push(entity.split());
					this.stats.born++;
				}
			}
			else if(entity instanceof Photon || entity instanceof Marker) {
				if(entity.lifetime <= 0) {
					marks[markpos] = i;
					markpos++;
				}
			}
			else if(entity.mass <= 0) {
				marks[markpos] = i;
				markpos++;
			}
			// physics effects sometimes chuck things way out of bounds
			// just delete them, they ain't comin' back
			if(outOfBounds(entity.pos, 20)) {
				marks[markpos] = i;
				markpos++;
			}
		}

		// sweep dead
		while(markpos > 0) {
			markpos--;
			mark = marks[markpos];
			entity = entities[mark];
			if(entity && (entity.pool !== undefined)) {
				entity.destroy();
			}
			entities.splice(mark, 1);
			marks[markpos] = 0;
		}

		// shuffling helps action lock issues and reduces first in list advantage
		//shuffle(entities);
	}
})();

Game.prototype.emitPhoton = (function() {
	let pos = vec2(), vel = vec2(), center = vec2(), p_c = 0, 
		base_vel = vec2(0.05, 0.05);
	return function emitPhoton(ipos, ivel, color, count = p_c, max = 12) {
		ipos = ipos||[random()*1.8-0.9, random()*1.8-0.9];
		if(ivel) {
			mut_copy(vel, ivel);
		}
		else {
			mut_copy(vel, base_vel);
			rotate(vel, center, ((p_c%max)/(max/2)), vel);
		}
		color = color||~~(random()*3);
		mut_copy(pos, ipos);
		this.entities.push(new Photon(pos, vel, color, this.photonPool));
		p_c++;
		return color;
	}
})();

Game.prototype.killMote = (function() {
	let sum = 0|0, c = 0|0, i = 0|0, pos = vec2(), r = 0|0, g = 0|0, b = 0|0;
	return function killMote(mote) {
		if(random() < POSITIVE_ENERGY) {
			this.entities.push(new Emitter(mote.pos, mote.vel, ~~(DEATH_THRESHOLD*10*random()), this.photonPool));
		}
		if(random() < NEGATIVE_ENERGY) {
			this.entities.push(new Void(mote.pos, mote.vel, ~~(DEATH_THRESHOLD*10*random())));
		}
		mut_copy(pos, mote.pos);
		r = mote.photons[0];
		g = mote.photons[1];
		b = mote.photons[2];
		sum = r+b+g;
		c = 0;
		for(i = 0; i < sum; ++i) {
			if(r === i) c = 1;
			if(r+g === i) c = 2;
			this.emitPhoton(pos, undefined, c, i, sum);
		}
	}
})();

/**
 * Actions are callbacks accepting the following parameters:
 * @param {vec2} center center of the click region for the action (i.e. the UI element)
 * @param {float} dist the distance from region center to mouseUp position
 */
Game.prototype.registerAction = function(name, callback) {
	this.actions[name] = callback.bind(this);
}

let delta = vec2();
Game.prototype.registerActions = function() {
	this.registerAction("launchAntiGravitonCluster", function(center) {
		minus(this.player.mouseUp, center, delta);
		this.entities.push(new AntiGravitonCluster(center, delta, 148));
	});
}
