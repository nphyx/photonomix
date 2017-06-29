"use strict";
export const colorStrings = Array(4096);
export var moteSpriteSheetCanvas;
const MASK_R = 0xf00;
const MASK_G = 0x0f0;
const MASK_B = 0x00f;

var moteSprites;
var moteMaskCanvas;
var moteSpriteSheetContext;
var moteMaskContext;
var moteSpriteScale = 0;
var moteSpriteSize = 0;
var motePixelSize = 0;
var moteTmpCanvas;
var moteTmpContext;

export function initMoteSpriteSheet(scale, size) {
	moteSpriteScale = scale;
	moteSpriteSize = size;
	motePixelSize = scaleSprite(moteSpriteScale, moteSpriteSize);

	moteTmpCanvas = document.createElement("canvas");
	moteTmpCanvas.width = moteTmpCanvas.height = motePixelSize;
	moteTmpContext = moteTmpCanvas.getContext("2d");

	moteSpriteSheetCanvas = document.createElement("canvas");
	moteSpriteSheetCanvas.width = moteSpriteSheetCanvas.height = motePixelSize*64;
	moteSpriteSheetContext = moteSpriteSheetCanvas.getContext("2d");	

	moteMaskCanvas = document.createElement("canvas");
	moteMaskCanvas.width = moteMaskCanvas.height = motePixelSize;
	moteMaskContext = moteMaskCanvas.getContext("2d");	

	moteSprites = Array(4096);
	let g = moteMaskContext.createRadialGradient(
		motePixelSize/2, motePixelSize/2, motePixelSize/2,
		motePixelSize/2, motePixelSize/2, 0
	);
	g.addColorStop(1, "rgba(255,255,255,1.0");
	g.addColorStop(0.7, "rgba(255,255,255,0.5)");
	g.addColorStop(0.1, "rgba(255,255,255,0.0)");
	moteMaskContext.fillStyle = g;
	moteMaskContext.fillRect(0, 0, motePixelSize, motePixelSize);
	for(let i = 0; i < 4096; ++i) {
		colorStrings[i] = "rgb(" +((i & MASK_R) >> 4)+
													","+(i  & MASK_G)+
													","+((i & MASK_B) << 4)+")";	
		moteSprites[i] = createMoteSprite(i, colorStrings[i]);
	}
}

export function createMoteCenterSprite() {
	let pixelSize = motePixelSize;
	let w = motePixelSize;
	let h = motePixelSize;
	let px = 0;
	let py = 0;
	let canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	let context = canvas.getContext("2d");
	context.globalCompositeOperation = "copy";
	context.drawImage(moteMaskCanvas, 0, 0, w, h);
	context.globalCompositeOperation = "source-in";
	context.fillStyle = "rgba(255,255,255,0.25)";
	context.fillRect(0, 0, w, h);
	return {
		canvas:canvas,
		context:context,
		pixelSize:pixelSize,
		sw:pixelSize,
		sh:pixelSize,
		sx:px,
		sy:py
	}

}


export function getMoteSprite(index) {
	return moteSprites[index];
}

export function getColorString(index) {
	return colorStrings[index];
}

export function colorIndex(r, g, b) {
	return (r >> 4 << 8) + (g >> 4 << 4) + (b >> 4);
}

export function createMoteSprite(index, color) {
	let pixelSize = motePixelSize;
	let w = motePixelSize;
	let h = motePixelSize;
	let y = (index%64);
	let x = (index-y)/64;
	let py = y*motePixelSize;
	let px = x*motePixelSize;
	moteTmpContext.globalCompositeOperation = "copy";
	moteTmpContext.drawImage(moteMaskCanvas, 0, 0, w, h);
	moteTmpContext.globalCompositeOperation = "source-in";
	moteTmpContext.fillStyle = color;
	moteTmpContext.fillRect(0, 0, w, h);
	moteSpriteSheetContext.drawImage(moteTmpCanvas, px, py, w, h);
	return {
		canvas:moteSpriteSheetCanvas,
		context:moteSpriteSheetContext,
		pixelSize:pixelSize,
		sw:pixelSize,
		sh:pixelSize,
		sx:px,
		sy:py
	}
}

function scaleSprite(scale, spriteSize) {
	return ~~(scale*spriteSize);
}

/**
 * Creates a photon sprite.
 */
export function createPhotonSprite(scale, spriteSize, color) {
	let pixelSize = 17; //scaleSprite(scale, spriteSize);
	let hps = ~~(pixelSize/2);
	let qps = ~~(pixelSize/4);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let context = canvas.getContext("2d");
	let g;
	/*
	let mask = document.createElement("canvas");
	mask.width = mask.height = pixelSize; 
	let maskCtx = mask.getContext("2d");
	*/
	/*
	g = maskCtx.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.0, "rgba(255,255,255,0.0)");
	g.addColorStop(0.09, "rgba(255,255,255,1.0)");
	maskCtx.fillStyle = g;
	maskCtx.fillRect(0, 0, pixelSize, pixelSize);
	context.drawImage(mask, -hps, -hps, pixelSize, pixelSize);
	context.drawImage(mask, hps, hps, pixelSize, pixelSize);
	context.drawImage(mask, hps, -hps, pixelSize, pixelSize);
	context.drawImage(mask, -hps, hps, pixelSize, pixelSize);
	*/
	g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.7, color);
	g.addColorStop(1.0, "white");
	context.globalCompositeOperation = "source-over";
	context.beginPath();
	context.moveTo(hps, 0);
	context.quadraticCurveTo(hps, hps, 0, hps);
	context.quadraticCurveTo(hps, hps, hps, pixelSize);
	context.quadraticCurveTo(hps, hps, pixelSize, hps);
	context.quadraticCurveTo(hps, hps, hps, 0);
	context.fillStyle = g;
	context.fill();
	context.closePath();
	context.beginPath();
	context.moveTo(hps, qps);
	context.lineTo(hps, pixelSize-qps);
	context.moveTo(qps, hps);
	context.lineTo(pixelSize-qps, hps);
	context.strokeStyle = "white";
	context.lineWidth = 1;
	context.stroke();
	context.closePath();
	//context.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas:canvas,
		context:context,
		pixelSize:pixelSize,
		w:pixelSize,
		h:pixelSize
	}
}

/**
 * Creates a hit marker sprite.
 */
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

/**
 * Creates a void sprite.
 */
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
	g.addColorStop(0.479, "rgba(0,0,0,0.99)");
	g.addColorStop(0.442, "rgba(0,0,0,0.98)");
	g.addColorStop(0.44, "rgba(255,255,255,0.95)");
	g.addColorStop(0.43, "rgba(255,255,255,0.95)");
	g.addColorStop(0.41, "rgba(255,255,255,0.39)");
	g.addColorStop(0.37, "rgba(255,255,255,0.29)");
	g.addColorStop(0.36, "rgba(255,255,255,0.32)");
	g.addColorStop(0.34, "rgba(255,255,255,0.31)");
	g.addColorStop(0.30, "rgba(255,255,255,0.35)");
	g.addColorStop(0.28, "rgba(255,255,255,0.39)");
	g.addColorStop(0.26, "rgba(255,255,255,0.35)");
	g.addColorStop(0.23, "rgba(255,255,255,0.30)");
	g.addColorStop(0.21, "rgba(255,255,255,0.26)");
	g.addColorStop(0.20, "rgba(255,255,255,0.31)");
	g.addColorStop(0.19, "rgba(255,255,255,0.34)");
	g.addColorStop(0.17, "rgba(255,255,255,0.29)");
	g.addColorStop(0.16, "rgba(255,255,255,0.21)");
	g.addColorStop(0.15, "rgba(255,255,255,0.19)");
	g.addColorStop(0.14, "rgba(255,255,255,0.15)");
	g.addColorStop(0.10, "rgba(255,255,255,0.09)");
	g.addColorStop(0.09, "rgba(255,255,255,0.15)");
	g.addColorStop(0.07, "rgba(255,255,255,0.12)");
	g.addColorStop(0.05, "rgba(255,255,255,0.09)");
	/*
	g.addColorStop(0.43, "rgba(128,128,128,0.4)");
	g.addColorStop(0.41, "rgba(192,192,192,0.6)");
	g.addColorStop(0.4, "rgba(192,192,192,0.4)");
	g.addColorStop(0.37, "rgba(192,192,192,0.3)");
	g.addColorStop(0.15, "rgba(0,0,0,0.2)");
	*/
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

/**
 * Creates an emitter sprite.
 */
export function createEmitterSprite(scale, spriteSize) {
	let pixelSize = scaleSprite(scale, spriteSize);
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
	return {
		canvas:canvas,
		context:ctx,
		w:pixelSize,
		h:pixelSize,
		pixelSize:pixelSize
	}
}

export function createGameSpaceMask() {
	let pixelSize = 1000;
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let ctx = canvas.getContext("2d");	
	let g = ctx.createRadialGradient(
		pixelSize/2, pixelSize/2, pixelSize/2,
		pixelSize/2, pixelSize/2, 0
	);
	g.addColorStop(1, "rgba(0,0,0,0.0)");
	g.addColorStop(0.05, "rgba(0,0,0,0.0)");
	g.addColorStop(0.0, "rgba(255,255,255,1.0)");
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
