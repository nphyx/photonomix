"use strict";
import {scaleSprite} from "./util";

var sprite;

/**
 * Creates an emitter sprite.
 */
export function init(props) {
	let pixelSize = scaleSprite(props.minDimension, 1);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let ctx = canvas.getContext("2d");	
	let g = ctx.createRadialGradient(
		pixelSize/2, pixelSize/2, pixelSize/2,
		pixelSize/2, pixelSize/2, 0
	);
	g.addColorStop(1, "rgba(255,255,255,0.3)");
	g.addColorStop(0.78, "rgba(255,255,255,0.3)");
	g.addColorStop(0.58, "rgba(255,255,255,0.22)");
	g.addColorStop(0.48, "rgba(255,255,255,0.17)");
	g.addColorStop(0.44, "rgba(255,255,255,0.22)");
	g.addColorStop(0.40, "rgba(255,255,255,0.19)");
	g.addColorStop(0.2, "rgba(255,255,255,0.09)");
	g.addColorStop(0.1, "rgba(255,255,255,0.0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, pixelSize, pixelSize);
	sprite = {
		canvas:canvas,
		context:ctx,
		w:pixelSize,
		h:pixelSize,
		pixelSize:pixelSize
	}
}

export function get() {
	return sprite;
}
