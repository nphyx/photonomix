"use strict";
function scaleSprite(scale, spriteSize) {
	return ~~(scale*spriteSize);
}
export function createMoteSprite(scale, spriteSize) {
	let pixelSize = scaleSprite(scale, spriteSize);
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

export function createPhotonSprite(scale, spriteSize, color) {
	let pixelSize = scaleSprite(scale, spriteSize);
	let hps = ~~(pixelSize/2);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let context = canvas.getContext("2d");
	let mask = document.createElement("canvas");
	mask.width = mask.height = pixelSize; 
	let maskCtx = mask.getContext("2d");
	let g;
	g = maskCtx.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.0, "rgba(255,255,255,0.0)");
	g.addColorStop(0.09, "rgba(255,255,255,1.0)");
	maskCtx.fillStyle = g;
	maskCtx.fillRect(0, 0, pixelSize, pixelSize);
	context.drawImage(mask, -hps, -hps, pixelSize, pixelSize);
	context.drawImage(mask, hps, hps, pixelSize, pixelSize);
	context.drawImage(mask, hps, -hps, pixelSize, pixelSize);
	context.drawImage(mask, -hps, hps, pixelSize, pixelSize);
	g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.7, color);
	g.addColorStop(1.0, "white");
	context.globalCompositeOperation = "source-out";
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

export function createMarkerHitSprite(scale, spriteSize) {
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
