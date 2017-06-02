"use strict";
export function createMoteSprite(scale, moteSize) {
	let pixelSize = ~~(scale*moteSize);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let mask = document.createElement("canvas");
	mask.width = canvas.height = pixelSize;
	let ctx = canvas.getContext("2d");	
	let maskCtx = mask.getContext("2d");	
	let g = maskCtx.createRadialGradient(
		pixelSize/2, pixelSize/2, pixelSize/2,
		pixelSize/2, pixelSize/2, 0
	);
	g.addColorStop(1, "rgba(255,255,255,1.0");
	g.addColorStop(0.8, "rgba(255,255,255,5.0)");
	g.addColorStop(0.3, "rgba(255,255,255,0.0)");
	maskCtx.fillStyle = g;
	maskCtx.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas:canvas,
		mask,
		context:ctx,
		maskContext:maskCtx,
		w:pixelSize,
		h:pixelSize
	}
}

export function recolor(sprite, color) {
	let {context, mask, w, h} = sprite;
	context.globalCompositeOperation = "copy";
	context.drawImage(mask, 0, 0);
	context.globalCompositeOperation = "source-in";
	context.fillStyle = color;
	context.fillRect(0, 0, w, h);
	return sprite;
}

export function createPhotonSprite(scale, photonSize, color) {
	let pixelSize = ~~(scale*photonSize);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let context = canvas.getContext("2d");
	let g = context.createRadialGradient(
		pixelSize/2, pixelSize/2, pixelSize/2,
		pixelSize/2, pixelSize/2, 0
	);
	g.addColorStop(1, color);
	g.addColorStop(0.3, "rgba(0,0,0,0.0)");
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
