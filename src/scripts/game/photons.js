"use strict";
import * as vectrix from "@nphyx/vectrix";
import {BufferPool} from "../photonomix.bufferPools";
import {drag} from "../photonomix.util";
import {BooleanArray} from "@nphyx/pxene";
import {TARGET_FPS, GLOBAL_DRAG, PHOTON_LIFETIME, PHOTON_BASE_SIZE, MAX_PHOTONS} from "../photonomix.constants";
let {vec2, times, mut_copy} = vectrix.vectors;
let {mut_plus} = vectrix.matrices;
const {random} = Math;

const I8 = 1;
const F32 = 4;
const O_POS = 0;
const O_VEL = F32*2;
const FLOAT_LENGTH = O_VEL + F32*2;
const O_COLOR = 0;
const O_LIFE = O_COLOR + I8;
const O_MASS = O_LIFE + I8;
const O_PULSE = O_MASS + I8;
const U8_LENGTH = O_PULSE + I8;
export const BUFFER_LENGTH = (FLOAT_LENGTH + U8_LENGTH) + (F32 - (FLOAT_LENGTH + U8_LENGTH)%F32);
export const COLOR_R = 0, COLOR_G = 1, COLOR_B = 2;

const BUFFER_POOL = new BufferPool(BUFFER_LENGTH, MAX_PHOTONS);
const ACTIVE_LIST = new BooleanArray(MAX_PHOTONS);
const objectPool = Array(MAX_PHOTONS);

export const STORED_PHOTONS = new Uint32Array(3);

function nextInactive() {
	let i = 0, len = ACTIVE_LIST.length;
	for(; i < len; ++i) if(!ACTIVE_LIST.get(i)) return i;
	throw new Error("out of photons");
}

export function create(ipos, ivel, color) {
	let o = nextInactive();
	ACTIVE_LIST.set(o, true);
	objectPool[o].init(ipos, ivel, color);
	return objectPool[o];
}

export function destroy(o) {
	ACTIVE_LIST.set(o, false);
	clean(o);
}

export function tick(surrounding, delta) {
	let i = 0, len = ACTIVE_LIST.length;
	for(; i < len; ++i) if(ACTIVE_LIST.get(i)) {
		objectPool[i].tick(surrounding, delta);
		if(objectPool[i].lifetime <= 0) destroy(i);
	}
}

export function forEach(cb) {
	let i = 0, len = ACTIVE_LIST.length;
	for(; i < len; ++i) if(ACTIVE_LIST.get(i)) {
		cb(objectPool[i]);
	}
}

export function init() {
	for(let i = 0; i < MAX_PHOTONS; ++i) {
		objectPool[i] = new Photon();
	}
}

/**
 * This cannot be called externally without throwing an error. It's here for instanceof testing until
 * migration is finished.
 */
export function Photon() {
	let buffer = BUFFER_POOL.buffer;
	this.offset = BUFFER_POOL.allocate();
	this.pos = vec2(0.0, 0.0, buffer, O_POS+this.offset);
	this.vel = vec2(0.0, 0.0, buffer, O_VEL+this.offset);
	this.intVals = new Uint8ClampedArray(buffer, FLOAT_LENGTH+this.offset, U8_LENGTH);

	Object.defineProperties(this, {
		"color": {get:() => this.intVals[O_COLOR], set:(x) => this.intVals[O_COLOR] = x},
		"lifetime": {get:() => this.intVals[O_LIFE], set:(x) => this.intVals[O_LIFE] = x},
		"mass": {get:() => this.intVals[O_MASS], set:(x) => this.intVals[O_MASS] = x},
		"pulse": {get:() => this.intVals[O_PULSE], set:(x) => this.intVals[O_PULSE] = x}
	});
}

Photon.prototype.init = function(ipos, ivel, color) {
	mut_copy(this.pos, ipos);
	mut_copy(this.vel, ivel);
	this.lifetime = PHOTON_LIFETIME;
	this.size = PHOTON_BASE_SIZE;
	this.color = color;
	this.mass = 1;
	this.pulse = ~~(TARGET_FPS*random());
}

Photon.prototype.tick = (() => {
	let tmpvec = vec2(), pos, vel;
	return function(surrounding, delta) {
		if(this.lifetime > 0) this.lifetime--;
		pos = this.pos; vel = this.vel;	
		mut_plus(pos, times(vel, delta, tmpvec));
		mut_plus(vel, drag(vel, GLOBAL_DRAG));
	}
})();

function clean(o) {
	objectPool[o].pos.fill(0.0);
	objectPool[o].vel.fill(0.0);
	objectPool[o].intVals.fill(0);
}

Photon.prototype.destroy = function() {
	destroy(this.offset);
}
