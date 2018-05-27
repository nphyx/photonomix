"use strict";
import Void from "./Void";
import Emitter from "./Emitter";
import Marker from "./Marker";
import * as Motes from "./motes";
import * as photons from "./photons";
import Ripple from "./Ripple";
import {gameSpaceVec} from "../draw";
import AntiGravitonCluster from "./AntiGravitonCluster";
const Mote = Motes.Mote;

import {rotate, outOfBounds} from "../util";
import * as vectrix from  "@nphyx/vectrix";
import {controls} from "@nphyx/pxene";
import {TARGET_FPS, START_POP, MAX_MOTES, MAX_PHOTONS} from "../constants";
const {minus} = vectrix.matrices;
const {vec2, mut_copy} = vectrix.vectors;
const marks = new Uint16Array(MAX_MOTES+MAX_PHOTONS+100);
let {random} = Math;
let markpos = 0;
let mark = 0;

const ENTITY_TYPES = {};

export {Mote, Void, Emitter, Marker, photons, AntiGravitonCluster, Ripple};

/**
 * TODO: change these functions out with proper factories.
 */
export function registerType(name, constructor) {
	ENTITY_TYPES[name] = function() {
		return new (Function.prototype.bind.apply(constructor, arguments))();
	}
}

registerType("void", Void);
registerType("emitter", Emitter);
registerType("marker", Marker);
registerType("ripple", Ripple);
registerType("antiGravitonCluster", AntiGravitonCluster);

export function Game() {
	this.motes = Motes;
	this.motes.init();
	controls.map("ripple", "mouse0");
	this.entities = [];
	this.stats = {
		pop:0,
		born:0,
		died:0,
		target:0
	}
	this.actions = {};
	this.registerActions();
	this.started = -1;
	this.clickCooldown = 0;
	return this;
}

Game.prototype.start = function() {
	for(let i = 0; i < START_POP; ++i) {
		Motes.createRandom();
	}
	this.started = Date.now();
}

Game.prototype.tick = (function() {
	let entities, entity, i = 0|0, len = 0|0, tick_delta = 0.0, cursorPos = vec2();
	return function tick(timing) {
		if(this.clickCooldown === 0) {
		 	if(controls.lookupMap("ripple").isDown()) {
				gameSpaceVec(controls.getCursorPosition(), cursorPos);
				this.spawn("ripple", cursorPos);
				this.clickCooldown = 3;
			}
		}
		else this.clickCooldown--;
		let delta = timing.interval/timing.elapsed;
		let frameCount = timing.frameCount;
		entities = this.entities;
		this.stats.target = 0;
		this.stats.pop = 0;
		tick_delta = delta/TARGET_FPS;
    try {
      photons.tick(this.entities, tick_delta, frameCount);
      this.motes.tick(this.entities, tick_delta, frameCount);
    }
    catch(e) {
      console.error(e)
      return
    }
		for(i = 0, len = entities.length; i < len; ++i) {
			entity = entities[i];
			entity.tick(this.entities, tick_delta, frameCount);
			// do mote-specific stuff
			if(entity instanceof Motes.Mote) {
				/*
				this.stats.pop++;
				if(entity.target) this.stats.target++;
				if(entity.injured) {
					if(frameCount % ~~(TARGET_FPS*0.1) === 0) {
						//this.entities.push(entity.bleed());
						entity.bleed();
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
				*/
				throw new Error("Motes should no longer end up in the general entity pool");
			}
			else if(entity instanceof Ripple) {
				if(entity.mass > 250) {
					this.spawn("void", entity.pos, [0,0], 100);
					entity.mass = 0;
				}
				if(entity.mass <= 0) {
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

export const emitPhoton = (function() {
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
		photons.pool.next(pos, vel, color);
		p_c++;
		return color;
	}
})();

Game.prototype.spawn = function() {
	let args = Array.prototype.slice.apply(arguments);
	let type = args.shift();
	if(ENTITY_TYPES[type]) {
		this.entities.push(ENTITY_TYPES[type].apply(null, arguments));
	}
}

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
