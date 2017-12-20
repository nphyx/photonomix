"use strict";
import * as vectrix from "@nphyx/vectrix";
import {BufferPool} from "../photonomix.bufferPools";
import {drag} from "../photonomix.util";
import {TARGET_FPS, GLOBAL_DRAG, PHOTON_LIFETIME, PHOTON_BASE_SIZE, MAX_PHOTONS} from "../photonomix.constants";
let {vec2, times} = vectrix.vectors;
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
const U8_LENGTH = O_MASS + I8;
export const BUFFER_LENGTH = (FLOAT_LENGTH + U8_LENGTH) + (F32 - (FLOAT_LENGTH + U8_LENGTH)%F32);
export const COLOR_R = 0, COLOR_G = 1, COLOR_B = 2;

const BUFFER_POOL = new BufferPool(BUFFER_LENGTH, MAX_PHOTONS);

export default function Photon(ipos, ivel, color) {
	let buffer = BUFFER_POOL.buffer;
	this.offset = BUFFER_POOL.allocate();
	this.pos = vec2(ipos[0], ipos[1], buffer, O_POS+this.offset);
	this.vel = vec2(ivel[0], ivel[1], buffer, O_VEL+this.offset);
	this.intVals = new Uint8ClampedArray(buffer, FLOAT_LENGTH+this.offset, U8_LENGTH);

	Object.defineProperties(this, {
		"color": {get:() => this.intVals[O_COLOR], set:(x) => this.intVals[O_COLOR] = x},
		"lifetime": {get:() => this.intVals[O_LIFE], set:(x) => this.intVals[O_LIFE] = x},
		"mass": {get:() => this.intVals[O_MASS], set:(x) => this.intVals[O_MASS] = x}
	});
	this.color = color;
	this.lifetime = PHOTON_LIFETIME;
	this.size = PHOTON_BASE_SIZE;
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

Photon.prototype.destroy = function() {
	BUFFER_POOL.free(this.offset);
}
