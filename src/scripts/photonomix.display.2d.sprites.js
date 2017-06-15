"use strict";
export const moteSprites = Array(4092);
export const colorStrings = Array(4092);
const MASK_R = 0xf00;
const MASK_G = 0x0f0;
const MASK_B = 0x00f;
var moteSpriteScale = 0;
var moteSpriteSize = 0;

export function setMoteSpriteDimensions(scale, size) {
	moteSpriteScale = scale;
	moteSpriteSize = size;
}

export function getMoteSprite(index) {
	if(moteSprites[index] === undefined) {
		let color = getColorString(index);
		moteSprites[index] = createMoteSprite();
		recolor(moteSprites[index], color);
	}
	return moteSprites[index];
}

export function getColorString(index) {
	if(colorStrings[index] === undefined) {
		colorStrings[index] = "rgb("+((index & MASK_R) >> 4)+
													","+(index & MASK_G)+
													","+((index & MASK_B) << 4)+")";	
	}
	return colorStrings[index];
}

export function colorIndex(r, g, b) {
	return (r >> 4 << 8) + (g >> 4 << 4) + (b >> 4);
}

export function createMoteCenterSprite(color) {
	let sprite = createMoteSprite();
	recolor(sprite, color);
	return sprite;
}

export function createMoteSprite() {
	let pixelSize = scaleSprite(moteSpriteScale, moteSpriteSize);
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
	g.addColorStop(0.8, "rgba(255,255,255,0.5)");
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

function scaleSprite(scale, spriteSize) {
	return ~~(scale*spriteSize);
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

export function createVoidSprite(scale, spriteSize) {
	let pixelSize = scaleSprite(scale, spriteSize);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let ctx = canvas.getContext("2d");	
	let g = ctx.createRadialGradient(
		pixelSize/2, pixelSize/2, pixelSize/2,
		pixelSize/2, pixelSize/2, 0
	);
	g.addColorStop(1, "rgba(0,0,0,1.0)");
	g.addColorStop(0.50, "rgba(0,0,0,1.0)");
	g.addColorStop(0.449, "rgba(0,0,0,0.8)");
	g.addColorStop(0.44, "rgba(192,192,192,0.6)");
	g.addColorStop(0.44, "rgba(192,192,192,0.6)");
	g.addColorStop(0.42, "rgba(128,128,128,0.4)");
	g.addColorStop(0.4, "rgba(92,92,92,0.2)");
	g.addColorStop(0.37, "rgba(128,128,128,0.2)");
	g.addColorStop(0.25, "rgba(0,0,0,0.2)");
	g.addColorStop(0.0, "rgba(0,0,0,0.0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas:canvas,
		context:ctx,
		w:pixelSize,
		h:pixelSize,
		pixelSize:pixelSize
	}
}

export function createEmitterSprite(scale, spriteSize) {
	let pixelSize = scaleSprite(scale, spriteSize);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let ctx = canvas.getContext("2d");	
	let g = ctx.createRadialGradient(
		pixelSize/2, pixelSize/2, pixelSize/2,
		pixelSize/2, pixelSize/2, 0
	);
	g.addColorStop(1, "rgba(255,255,255,0.25");
	g.addColorStop(0.9, "rgba(255,255,255,0.25)");
	g.addColorStop(0.0, "rgba(255,255,255,0.0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas:canvas,
		context:ctx,
		w:pixelSize,
		h:pixelSize,
		pixelSize:pixelSize
	}
}
