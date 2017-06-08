"use strict";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
import {drag} from "./photonomix.util";
import {GLOBAL_DRAG, PHOTON_LIFETIME} from "./photonomix.constants";
let {vec2, times} = vectrix.vectors;
let {mut_plus} = vectrix.matrices;

const I8 = 1;
const F32 = 4;
const O_POS = 0;
const O_VEL = F32*2;
const FLOAT_LENGTH = O_VEL + F32*2;
const O_COLOR = 0;
const O_LIFE = O_COLOR + I8;
const U8_LENGTH = O_LIFE + I8;
export const BUFFER_LENGTH = (FLOAT_LENGTH + U8_LENGTH) + (F32 - (FLOAT_LENGTH + U8_LENGTH)%F32);

export const COLOR_R = 0, COLOR_G = 1, COLOR_B = 2;
export function Photon(ipos, ivel, color, pool = undefined) {
	let buffer, offset;
	if(pool) {
		buffer = pool.buffer;
		offset = pool.allocate();
	}
 	else {
		buffer = new ArrayBuffer(BUFFER_LENGTH);
		offset = 0;
	}
	this.pos = vec2(ipos, buffer, O_POS+offset);
	this.vel = vec2(ivel, buffer, O_VEL+offset);
	this.intVals = new Uint8ClampedArray(buffer, FLOAT_LENGTH+offset, U8_LENGTH);
	this.pos.set(ipos);
	this.vel.set(ivel);

	Object.defineProperties(this, {
		"x": {get:() => this.pos[0], set:(x) => this.pos[0] = x},
		"y": {get:() => this.pos[1], set:(x) => this.pos[1] = x},
		"toX": {get:() => this.vel[0], set:(x) => this.vel[0] = x},
		"toY": {get:() => this.vel[1], set:(x) => this.vel[1] = x},
		"color": {get:() => this.intVals[O_COLOR], set:(x) => this.intVals[O_COLOR] = x},
		"lifetime": {get:() => this.intVals[O_LIFE], set:(x) => this.intVals[O_LIFE] = x},
		"pool": {get:() => pool},
		"offset": {get:() => offset}
	});
	this.color = color;
	this.lifetime = PHOTON_LIFETIME;
}

let tmpvec = vec2(), pos, vel;
Photon.prototype.tick = function(surrounding, delta) {
	if(this.lifetime > 0) this.lifetime--;
	pos = this.pos; vel = this.vel;	
	mut_plus(pos, times(vel, delta, tmpvec));
	mut_plus(vel, drag(vel, GLOBAL_DRAG));
}

Photon.prototype.destroy = function() {
	if(this.pool) this.pool.free(this.offset);
	else throw new Error("called photon.destroy, but photon has no pool");
}
