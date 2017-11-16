"use strict";

export function get() {}
export function init() {}

/**
 * Creates a hit marker sprite.
 *
function createMarkerHitSprite(scale, spriteSize) {
	let pixelSize = scaleSprite(scale, spriteSize);
	let hps = ~~(pixelSize/2);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let context = canvas.getContext("2d");
	let g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.0, "rgba(255,255,255,0.0)");
	g.addColorStop(0.05, "rgba(255,255,255,0.4)");
	g.addColorStop(0.09, "rgba(255,255,255,0.35)");
	g.addColorStop(0.55, "rgba(255,255,255,0.0)");
	context.fillStyle = g;
	context.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas:canvas,
		context:context,
		pixelSize:pixelSize,
		w:pixelSize,
		h:pixelSize
	}
}
*/
