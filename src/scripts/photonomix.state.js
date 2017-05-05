"use strict";
import {Mote} from "./photonomix.motes";
import * as constants from "./photonomix.constants";
let {floor, ceil} = Math;

export function State() {
	this.motes = [];
	return this;
}

State.prototype.start = function() {
	for(let i = 0; i < constants.START_COUNT; ++i) {
		this.motes.push(new Mote.random())
	}
}

State.prototype.tick = function(delta) {
	var that = this;
	// remove dead
	this.motes = this.motes.filter((mote) => {
		if(mote.dead) console.log("a mote died");
		return !mote.dead
	});
	// deal with births
	this.motes.forEach((mote) => {
		if(mote.pregnant) {
			mote.pregnant = false;
			mote.toX *= 3;
			mote.toY *= 3;
			let baby = new Mote([floor(mote.r/2), floor(mote.g/2), floor(mote.b/2)], [-mote.toX, -mote.toY], mote.speed, mote.sight, mote.eat, mote.flee);
			mote.fleeing = constants.TARGET_FPS/5;
			baby.fleeing = constants.TARGET_FPS/2;
			mote.r = ceil(mote.r/2);
			mote.g = ceil(mote.g/2);
			mote.b = ceil(mote.b/2);
			this.motes.push(baby);
			console.log("a mote was born");
		}
	});
	// shuffling helps action lock issues
	shuffle(this.motes);
	this.motes.forEach((mote) => {
		mote.act(that.motes.filter((m) => m !== mote))
	});
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
