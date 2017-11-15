"use strict";
import {TARGET_FPS} from "../photonomix.constants";
import * as vectrix from  "@nphyx/vectrix";

export const MARKER_HIT = 0;

export default function Marker(type, pos, lifetime = TARGET_FPS) {
	this.type = type;
	this.pos = vectrix.vectors.vec2(pos);
	this.start = lifetime;
	this.lifetime = lifetime;
}

Marker.prototype.tick = function() {
	this.lifetime--;
}
