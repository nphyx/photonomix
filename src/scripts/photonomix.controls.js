"use strict";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import {gameSpaceVec} from "./photonomix.display.js";
import {Events} from "./photonomix.events.js";
const {vec2} = vectrix.vectors;

let game; // game state
let controlEvents = new Events();
let clickRegions = [];

export const pointer = {
	down:vec2(),
	up:vec2(),
	move:vec2(),
}
export const keys = Array(256);
export const buttons = Array(5);

function updateCursorState(event, v) {
	gameSpaceVec([event.clientX, event.clientY], v);
}

function registerClickRegion(center, radius, callback) {
	clickRegions.push({center:vec2(center), radius:radius, callback:callback});
}

export function init(env) {
	game = env;
	window.addEventListener("mousedown", function mouseDown(event) {
		updateCursorState(event, pointer.down);
		buttons[event.button] = 1;
		controlEvents.fire("mousedown");
	});
	window.addEventListener("mouseup", function mouseUp(event) {
		updateCursorState(event, pointer.up);
		buttons[event.button] = 0;
		controlEvents.fire("mouseup");
	});
	window.addEventListener("mousemove", function mouseMove(event) {
		updateCursorState(event, pointer.move);
	});
	window.addEventListener("keydown", function keyDown(event) {
		keys[event.keyCode] = 1;
	});
	window.addEventListener("keyup", function keyDown(event) {
		keys[event.keyCode] = 0;
	});

	/*
	controlEvents.on("mouseup", function(position) {
		dist = distance(position, game.player.mouseDown);
		if(dist < region.radius) region.callback(region.center, dist);
	});

	controlEvents.on("mousedown", function() {
	});

	controlEvents.on("mousemove", function() {
	});
	*/

	//registerClickRegion([0.0, 0.95], 0.1, game.actions.launchAntiGravitonCluster);
}
