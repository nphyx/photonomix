"use strict";

export function scaleSprite(scale, spriteSize) {
	return ~~(scale*spriteSize);
}

export function colorIndex(r, g, b) {
	return (r >> 4 << 8) + (g >> 4 << 4) + (b >> 4);
}

