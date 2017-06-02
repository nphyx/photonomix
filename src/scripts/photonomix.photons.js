"use strict";
import * as vectrix from "../../node_modules/@nphyx/vectrix/src/vectrix";
import {drag} from "./photonomix.util";
import {TARGET_FPS, GLOBAL_DRAG} from "./photonomix.constants";
let {vec2, times} = vectrix.vectors;
let {mut_plus} = vectrix.matrices;

const F32 = 4;
const O_POS = 0;
const O_VEL = F32*3;
const BUFFER_LENGTH = O_VEL + F32*3;

export const COLOR_R = 0, COLOR_G = 1, COLOR_B = 2;
export function Photon(ipos, ivel, color, buffer, offset = 0) {
 	buffer = buffer||new ArrayBuffer(BUFFER_LENGTH);
	let pos = this.pos = vec2(ipos, buffer, O_POS+offset);
	let vel = this.vel = vec2(ivel, buffer, O_VEL+offset);
	pos.set(ipos);
	vel.set(ivel);
	let lifetime = TARGET_FPS*5;

	Object.defineProperties(this, {
		"x": {get:() => pos[0], set:(x) => pos[0] = x},
		"y": {get:() => pos[1], set:(x) => pos[1] = x},
		"toX": {get:() => vel[0], set:(x) => vel[0] = x},
		"toY": {get:() => vel[1], set:(x) => vel[1] = x},
		"color": {get:() => color},
		"lifetime": {get:() => lifetime, set:(x) => lifetime = x}
	});
}

let tmpvec = vec2(), pos, vel;
Photon.prototype.tick = function(surrounding, delta) {
	pos = this.pos; vel = this.vel;	
	mut_plus(pos, times(vel, delta, tmpvec));
	mut_plus(vel, drag(vel, GLOBAL_DRAG));
}
