"use strict";
import {drawCircle, screenSpace, getProperties} from "./photonomix.display";
import * as controls from "./photonomix.controls";
const {max} = Math;

let ctx;
let properties;
let OFFSET_X = 0;
let OFFSET_Y = 0;

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
 * Draws UI elements.
 */
export function draw() {
	properties = getProperties();
	ctx.clearRect(0, 0, properties.width, properties.height);
	let bw = max(100, properties.width*0.1);
	let bh = max(47,  properties.width*0.047);
	drawEdgeButton(ctx, screenSpace(0.00)+OFFSET_X,  
	                    screenSpace(1.00)+OFFSET_Y, bw, bh);
	//drawAntiGravitonCluster(agClusterIcon, ctx);
	drawEdgeButton(ctx, screenSpace(-0.3)+OFFSET_X, 
	                    screenSpace(1.05)+OFFSET_Y, bw, bh);
	drawEdgeButton(ctx, screenSpace(0.30)+OFFSET_X,  
	                    screenSpace(1.05)+OFFSET_Y, bw, bh);
	drawCircle(ctx, 
		screenSpace(controls.pointer.move[0]),
		screenSpace(controls.pointer.move[1]),
		5,
		"white"
	);
	if(controls.buttons[0]) {
		ctx.beginPath();
		ctx.moveTo(screenSpace(controls.pointer.down[0]),
		           screenSpace(controls.pointer.down[1]));
		ctx.lineTo(screenSpace(controls.pointer.move[0]),
		           screenSpace(controls.pointer.move[1]));
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();

	}
}

/**
 * Initializes the UI submodule.
 * @param {DrawBuffer} buffer
 */
export function init(buffer) {
	ctx = buffer.context;
}
