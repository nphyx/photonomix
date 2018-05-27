"use strict";
import {controls, display} from "@nphyx/pxene";
import * as draw from "./draw";
import * as game from "./game";
import * as constants from "./constants";
import * as util from "./util";

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
	frameCallback:main,
	fullscreen:constants.AUTO_FULLSCREEN
}

var photonomix = {
	util:util,
	constants:constants,
	controls:controls,
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
	controls.init();
	document.querySelector(displayConfig.container).addEventListener("click", startGame);
});

function main() {
	if(photonomix.state.game.started) photonomix.state.game.tick(display.timing);
	photonomix.draw.tick();
}

/**
 * Starts up the game.
 */
export function startGame() {
	let container = document.querySelector(displayConfig.container);
	photonomix.state.game.start();
	container.removeEventListener("click", startGame);
	container.classList.remove("start");
	console.log("game started");
}
