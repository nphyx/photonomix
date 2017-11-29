"use strict";
import {drawCircle} from "./";
import {DEBUG} from "../photonomix.constants";
import * as controls from "../photonomix.controls";
const {max} = Math;

let ctx, uiBuffer;
let displayProps;

/**
 * Creates debug markers on screen to show the center, top, left, bottom, right, topleft
 * and topright extremes of the main game area.
 */
const drawDebugMarkers = (function() {
	let w, h, wh, hh;
	return function drawDebugMarkers() {
		w = displayProps.width;
		h = displayProps.height;
		wh = w/2; 
		hh = h/2;
		drawCircle(ctx,  0,  0, 4, "yellow", 1, "white");
		drawCircle(ctx, wh,  0, 4, "orange", 1, "white");
		drawCircle(ctx,  w,  0, 4, "red", 1, "white");
		drawCircle(ctx,  0, hh, 4, "white", 1, "white");
		drawCircle(ctx, wh, hh, 4, "gray", 1, "white");
		drawCircle(ctx,  w, hh, 4, "black", 1, "white");
		drawCircle(ctx,  0,  h, 4, "blue", 1, "white");
		drawCircle(ctx, wh,  h, 4, "cyan", 1, "white");
		drawCircle(ctx,  w,  h, 4, "green", 1, "white");
	}
})();

/**
 * Draws an edge button.
 */
function drawEdgeButton(ctx, x, y, w, h) {
	let halfButtonWidth = w*0.5;
	let buttonHeight = h;
	let cpXScale = w*0.122;
	let beginX = x-halfButtonWidth;
	let beginY = y;
	let topX = x;
	let topY = y-buttonHeight;
	let endX = x+halfButtonWidth;
	let endY = y;
	let aCPX = beginX + cpXScale;
	let aCPY = beginY - cpXScale;
	let bCPX = beginX + cpXScale;
	let bCPY = topY;
	let cCPX = endX - cpXScale;
	let cCPY = topY;
	let dCPX = endX - cpXScale;
	let dCPY = endY - cpXScale;
	let color = "rgba(255,255,255,0.1)";

	ctx.beginPath();
	ctx.moveTo(beginX, beginY);
	ctx.bezierCurveTo(aCPX, aCPY, bCPX, bCPY, topX, topY);
	ctx.bezierCurveTo(cCPX, cCPY, dCPX, dCPY, endX, endY);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = 4;
	ctx.fill();
	ctx.closePath();
}

/**
 * Draws necessary text based on game state.
 */
export function drawUIText(game) {
	let alpha, delta, color;
	let w = displayProps.width;
	let h = displayProps.height;
	let err = true;
	let size = 90;
	let curTime = Date.now();
	if(game.started < 0 || game.started > curTime - 1000) {
		delta = game.started > 0?curTime - game.started:0;
		alpha = (1000 - delta)/1000;
		color = "rgba(255,255,255,"+alpha+")";
		while(err) {
			try {
				ctx.font = size + "px RightBankFLF";
				ctx.fillStyle = color;
				writeCentered(ctx, "PHOTONOMIX", w/2, h/2 + size/2);
				err = false;
			}
			catch(e) {
				err = true;
				size -= 10;
			}
		}
		ctx.font = (size / 3) + "px RightBankFLF";
		ctx.fillStyle = color;
		writeCentered(ctx, "click to start", w/2, h/2 + size);
	}
}

function drawPointer() {
	let {move, down} = controls.pointer;
	drawCircle(ctx, move[0], move[1], 5, "white");
	if(controls.buttons[0]) {
		ctx.beginPath();
		ctx.moveTo(down[0], down[1]);
		ctx.lineTo(move[0], move[1]);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}
}

/**
 * Draws UI elements.
 */
export function draw(game) {
	let w = displayProps.width;
	let h = displayProps.height;
	ctx.clearRect(0, 0, w, h);
	if(DEBUG) drawDebugMarkers();
	drawUIText(game);
	drawPointer();
}

export function writeCentered(ctx, text, x, y) {
	let metrics = ctx.measureText(text);
	if(metrics.width > displayProps.width) throw new Error("text is wider than body");
	ctx.fillText(text, x - metrics.width/2, y);
}

/**
 * Initializes the UI submodule.
 * @param {Object} display pxene display object initialized with a ui buffer
 */
export function init(display) {
	displayProps = display.props;
	uiBuffer = display.buffersByLabel.ui;
	ctx = uiBuffer.context;
}
