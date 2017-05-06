"use strict";
import {Mote} from "./photonomix.motes";
import {TARGET_FPS, START_POP, MAX_POP} from "./photonomix.constants";
let {floor, ceil} = Math;

const marks = new Int32Array(MAX_POP);
let markpos = 0;

export function State() {
	this.motes = [];
	this.stats = {
		population:0,
		births:0,
		deaths:0,
		hungry:0,
		scared:0
	}
	return this;
}

State.prototype.start = function() {
	for(let i = 0; i < START_POP; ++i) {
		this.motes.push(new Mote.random())
	}
}

State.prototype.tick = function(delta) {
	let motes = this.motes;
	this.stats.hungry = 0;
	this.stats.scared = 0;
	this.stats.population = motes.length;
	let that = this;
	for(let i = 0, len = motes.length, mote, baby; i < len; ++i) {
		mote = motes[i];
		mote.act(that.motes);
		if(!mote.full) this.stats.hungry++;
		if(mote.scared) this.stats.scared++;
		// mark dead for removal
		if(mote.dead) {
			marks[markpos] = i;
			markpos++;
		}
		else if(mote.pregnant && motes.length <= MAX_POP) {
			mote.pregnant = false;
			baby = new Mote([floor(mote.r/2), floor(mote.g/2), floor(mote.b/2)], [mote.y, mote.y], mote.speed, mote.sight, mote.eat, mote.flee);
			mote.scared = TARGET_FPS*2;
			baby.scared = TARGET_FPS*2;
			mote.r = ceil(mote.r/2);
			mote.g = ceil(mote.g/2);
			mote.b = ceil(mote.b/2);
			this.motes.push(baby);
			this.stats.births++;
		}
	}

	// sweep dead
	while(markpos > 0) {
		markpos--;
		motes.splice(marks[markpos], 1);
		this.stats.deaths++;
		marks[markpos] = 0;
	}

	// shuffling helps action lock issues
	shuffle(motes);
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
