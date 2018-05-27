"use strict";
import {MOTE_BASE_SIZE} from "../../constants";
import {scaleSprite} from "./util";
var moteSprites, moteMaskCanvas, moteCenter, moteSpriteSheetContext, 
    moteMaskContext, moteTmpCanvas, moteTmpContext, spriteScale, moteSpriteSize,
		motePixelSize, moteSpriteSheetCanvas;
const MASK_R = 0xf00;
const MASK_G = 0x0f0;
const MASK_B = 0x00f;
const colorStrings = Array(4096);

export function getColorString(index) {
	return colorStrings[index];
}

export function get(index) {
	return moteSprites[index];
}

export function getCenter() {
	return moteCenter;
}

export function init(props) {
	spriteScale = props.minDimension;
	moteSpriteSize = MOTE_BASE_SIZE*4;
	motePixelSize = scaleSprite(spriteScale, moteSpriteSize);

	initMask();
	initCenterSprite();
	initSpriteSheet();
}

function initCenterSprite() {
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
	context.fillStyle = "rgba(255,255,255,0.15)";
	context.fillRect(0, 0, w, h);
	moteCenter = {
		canvas:canvas,
		context:context,
		pixelSize:motePixelSize,
		sw:motePixelSize,
		sh:motePixelSize,
		sx:px,
		sy:py
	}
}

function initMask() {
	moteMaskCanvas = document.createElement("canvas");
	moteMaskCanvas.width = moteMaskCanvas.height = motePixelSize;
	moteMaskContext = moteMaskCanvas.getContext("2d");	
	let g = moteMaskContext.createRadialGradient(
		motePixelSize/2, motePixelSize/2, motePixelSize/2,
		motePixelSize/2, motePixelSize/2, 0
	);
	g.addColorStop(1, "rgba(255,255,255,1.0");
	g.addColorStop(0.8, "rgba(255,255,255,0.5)");
	g.addColorStop(0.1, "rgba(255,255,255,0.0)");
	moteMaskContext.fillStyle = g;
	moteMaskContext.fillRect(0, 0, motePixelSize, motePixelSize);
}

function initSpriteSheet() {
	moteTmpCanvas = document.createElement("canvas");
	moteTmpCanvas.width = moteTmpCanvas.height = motePixelSize;
	moteTmpContext = moteTmpCanvas.getContext("2d");

	moteSpriteSheetCanvas = document.createElement("canvas");
	moteSpriteSheetCanvas.width = moteSpriteSheetCanvas.height = motePixelSize*64;
	moteSpriteSheetContext = moteSpriteSheetCanvas.getContext("2d");	

	moteSprites = Array(4096);
	for(let i = 0; i < 4096; ++i) {
		colorStrings[i] = "rgb(" +((i & MASK_R) >> 4)+
													","+(i  & MASK_G)+
													","+((i & MASK_B) << 4)+")";	
		moteSprites[i] = createMoteSprite(i, colorStrings[i]);
	}
}

function createMoteSprite(index, color) {
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
		pixelSize:motePixelSize,
		sw:motePixelSize,
		sh:motePixelSize,
		sx:px,
		sy:py
	}
}
