"use strict";
import {display} from "@nphyx/pxene";
import * as draw from "./draw";
import * as game from "./game";
import * as constants from "./photonomix.constants";
import * as util from "./photonomix.util";
import * as controls from "./photonomix.controls";

const displayConfig = {
	container:"body",
	bufferDescriptions:[
		{label:"bokehBack", compositeMethod:"source-over", scaleMethod:display.buffers.SCALE_KEEP_ASPECT},
		{label:"bokehFront", compositeMethod:"lighter", scaleMethod:display.buffers.SCALE_NONE},
		{label:"entitiesLight", compositeMethod:"lighter", scaleMethod:display.buffers.SCALE_NONE},
		{label:"entitiesDark", compositeMethod:"hard-light", scaleMethod:display.buffers.SCALE_NONE},
		{label:"ui", compositeMethod:"source-over", scaleMethod:display.buffers.SCALE_NONE}

	],
	pixelRatio:1,
	frameCallback:main
}

var photonomix = {
	util:util,
	constants:constants,
	display:display,
	game:game,
	draw:draw,
	state:{}
}

window.photonomix = photonomix;

window.addEventListener("load", function() {
	photonomix.state.game = new game.Game();
	display.init(displayConfig);
	draw.init(photonomix.state, display);
	controls.init(photonomix.state);
	photonomix.state.controls = controls.state;
	startGame();
});

function main() {
	//let tickSpeed = display.timing.interval/display.timing.elapsed;
	if(photonomix.state.game.started) photonomix.state.game.tick(display.timing);
	photonomix.draw.tick();
}

/**
 * Starts up the game.
 */
export function startGame() {
	photonomix.state.game.start();
	/*
	body.removeEventListener("click", startGame);
	body.classList.remove("start");
	if(AUTO_FULLSCREEN) toggleFullScreen();
	*/
	console.log("game started");
}
