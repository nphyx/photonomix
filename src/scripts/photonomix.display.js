"use strict";
import * as bokeh from "./photonomix.display.bokeh";
import * as buffers from "./photonomix.display.buffers";
import * as entities from "./photonomix.display.entities";
import * as sprites from "./photonomix.display.sprites";
import * as events from "./photonomix.events";
import * as ui from "./photonomix.display.ui";
export {bokeh, buffers, entities, sprites, ui};
import * as constants from "./photonomix.constants";
import {evenNumber} from "./photonomix.util";
let {min, max} = Math;
const AUTO_FULLSCREEN = false;

let GAME_STARTED = false; //  whether the game has started
let startTime; // time game started
let interval = 0;
let frameCount = 0; // running total of drawn frames
let animating = false; // whether the game is currently running animation loop
let body; // html document body
let fullscreen = false; // whether the game is in fullscreen mode
let game; // game environment object
let controls; // control state object
let lastFrame = 0;
let fullscreenBuffers;
let compositeBuffer;

export const displayProps = {
	width:0,
	height:0,
	orientation:0,
	aspect:0,
	minDimension:0,
	maxDimension:0,
	events:new events.Events()
}

/**
 * Using this checks and avoids altering the canvas context state machine if unnecessary,
 * which theoretically saves a little time.
 */
export function updateCompositeOperation(ctx, op) {
	if(ctx.globalCompositeOperation !== op) ctx.globalCompositeOperation = op;
}

/**
 * Toggles fullscreen on.
 * Code from Mozilla Developer Network.
 */
function toggleFullScreen() {
	if(fullscreen) return;
	fullscreen = true;
  if(!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && 
			!document.webkitFullscreenElement && 
			!document.msFullscreenElement) {  // current working methods
    if(document.documentElement.requestFullscreen)
			document.documentElement.requestFullscreen();
    else if (document.documentElement.msRequestFullscreen)
      document.documentElement.msRequestFullscreen();
    else if (document.documentElement.mozRequestFullScreen)
      document.documentElement.mozRequestFullScreen();
    else if (document.documentElement.webkitRequestFullscreen)
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		displayProps.events.fire("fullscreen-on");
  } 
	else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
		displayProps.events.fire("fullscreen-off");
  }
}

/**
 * Turns fullscreen off.
 */
function fullscreenOff(ev) {
	ev.preventDefault();
	if(document.webkitIsFullScreen || 
	   document.mozIsFullScreen || 
		 document.msIsFullScreen) fullscreen = true;
	else fullscreen = false;
	return false;
}

export function getFrameCount() {
	return frameCount;
}

/**
 * Updates screen ratio.
 */
function updateProperties() {
	compositeBuffer.width  = displayProps.width  = evenNumber(document.body.clientWidth);
	compositeBuffer.height = displayProps.height = evenNumber(document.body.clientHeight);
	displayProps.orientation = displayProps.width > displayProps.height?0:1;
	displayProps.minDimension = min(displayProps.width, displayProps.height);
	displayProps.maxDimension = max(displayProps.width, displayProps.height);
	displayProps.events.fire("resize");
}

/**
 * Calculates the screenspace pixel offset of a coordinate from the [-1,1] coordinate
 * range used in game position vectors.
 */
export function screenSpace(x) {
	return ((x+1)/2) * displayProps.minDimension;
}

/**
 * Finds the screen space equivalent of the game space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */

export function screenSpaceVec(v, out) {
	out[0] = (((v[0]+1)/2)*displayProps.minDimension);
	out[1] = (((v[1]+1)/2)*displayProps.minDimension);
	return out;
}

/**
 * Finds the game space equivalent of the sceen space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */
export function gameSpaceVec(v, out) {
	out[0] = 2*((v[0])/displayProps.minDimension)-1;
	out[1] = 2*((v[1])/displayProps.minDimension)-1;
}

/**
 * Checks if entity is out of screen space by more than 50%.
 */
export function offscreen(x, y) {
	return (
		x < (displayProps.width  * -0.5) || x >displayProps.width   * 1.5 ||
		y < (displayProps.height * -0.5) || y > displayProps.height * 1.5
	)
}

/**
 * Apply pre-draw effects to canvases and set composite modes before drawing entities.
 */
const prepareCanvases = (function() {
	return function prepareCanvases() {
	/*
		invertCtx.globalCompositeOperation = "source-in";
		invertCtx.fillStyle = invFillStyle;
		invertCtx.fillRect(0, 0,displayProps.width, displayProps.height);
		invertCtx.globalCompositeOperation = "source-over";
		*/
	}
})();

/**
 * Draws a colored circle.
 */
export function drawCircle(ctx, x, y, size, fillStyle, lineWidth = 0, strokeStyle = undefined) {
	ctx.globalCompositeOperation = "source-over";
	ctx.beginPath();
	ctx.arc(x, y, size, 2 * Math.PI, false);
	ctx.fillStyle = fillStyle;
	ctx.fill();
	if(strokeStyle) {
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}
	ctx.closePath();
}


/**
 * Main animation loop.
 */
function animate() {
	requestAnimationFrame(animate);
	let now = Date.now();
	let elapsed = now - lastFrame;
	if(elapsed > interval) {
		lastFrame = now - (elapsed % interval);
		frameCount++;
		if(GAME_STARTED) game.tick(interval/elapsed, frameCount);
		prepareCanvases();
		bokeh.draw();
		entities.draw(game);
		ui.draw();
		buffers.composite(fullscreenBuffers, compositeBuffer, displayProps);
	}
}

/**
 * Initializes game environment.
 */
export function init(state) {
	game = state.game;
	controls = state.controls;
	body = document.getElementsByTagName("body")[0];
	body.classList.add("2d");
	compositeBuffer = new buffers.CompositeBuffer(body);
	body.width = compositeBuffer.width  = evenNumber(document.body.clientWidth);
	body.height = compositeBuffer.height = evenNumber(document.body.clientHeight);
	updateProperties();
	fullscreenBuffers = [
		new buffers.DrawBuffer("source-over", buffers.SCALE_KEEP_ASPECT),
		new buffers.DrawBuffer("lighter", buffers.SCALE_NONE),
		new buffers.DrawBuffer("lighter", buffers.SCALE_NONE),
		new buffers.DrawBuffer("hard-light", buffers.SCALE_NONE),
		new buffers.DrawBuffer("source-over", buffers.SCALE_NONE)
	]
	bokeh.init(fullscreenBuffers[0], fullscreenBuffers[1], displayProps);
	entities.init(fullscreenBuffers[2], fullscreenBuffers[3], displayProps);
	ui.init(fullscreenBuffers[4], displayProps);
	// do these here so they only get created once; they don't need to update with res
	window.addEventListener("resize", updateProperties);
	if(AUTO_FULLSCREEN) {
		body.addEventListener("click", toggleFullScreen);
		document.addEventListener("fullscreenchange", fullscreenOff);
		document.addEventListener("mozfullscreenchange", fullscreenOff);
		document.addEventListener("msfullscreenchange", fullscreenOff);
		document.addEventListener("webkitfullscreenchange", fullscreenOff);
	}
	startTime = Date.now();
	lastFrame = startTime;
	interval = 1000 / constants.TARGET_FPS;
	if(!animating) requestAnimationFrame(animate);
	animating = true;
}

/**
 * Starts up the game.
 */
export function startGame() {
	GAME_STARTED = true;
	game.start();
	body.removeEventListener("click", startGame);
	body.classList.remove("start");
	if(AUTO_FULLSCREEN) toggleFullScreen();
	console.log("game started");
}
