"use strict";
//import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import {evenNumber} from "./photonomix.util";
//let {vec2} = vectrix.vectors.vec2;
let {min, max} = Math;

let W = 0; // screen width
let H = 0; // screen height
let OR = 0; // screen orientation (0 = landscape, 1 = portrait);
let MIN_D = 0; // size of minimum dimension
let OFFSET_MAX_D = 0; // offset for the larger dimension
let PX = 1; // pixel size multiplier
let game; // game state

function gameSpaceX(x) {
	return 2*(x/MIN_D)-1;
}

function gameSpaceY(y) {
	return 2*(y/MIN_D)-1;
}

function updateRatio() {
	W = evenNumber(document.body.clientWidth);
	H = evenNumber(document.body.clientHeight);
	OR = W > H?0:1;
	W = W - (W%PX);
	H = H - (H%PX);
	MIN_D = min(W, H);
	OFFSET_MAX_D = (max(W, H)-MIN_D)/2;
}

function mouseDown(event) {
	game.player.mouseDown[0] = gameSpaceX(event.clientX);
	game.player.mouseDown[1] = gameSpaceY(event.clientY);
	game.player.mouseIsDown = 1;
}

function mouseUp(event) {
	game.player.mouseDown[0] = gameSpaceX(event.clientX);
	game.player.mouseDown[1] = gameSpaceY(event.clientY);
	game.player.mouseIsDown = 0;
}

function mouseMove(event) {
	game.player.pointerPos[0] = gameSpaceX(event.clientX);
	game.player.pointerPos[1] = gameSpaceY(event.clientY);
}

export function init(env) {
	game = env;
	window.addEventListener("resize", updateRatio);
	window.addEventListener("mousedown", mouseDown);
	window.addEventListener("mouseup", mouseUp);
	window.addEventListener("mousemove", mouseMove);
	updateRatio();
}
