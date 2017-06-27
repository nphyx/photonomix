"use strict";
import * as bokeh from "./photonomix.display.bokeh";
import * as buffers from "./photonomix.display.buffers";
import * as entities from "./photonomix.display.entities";
import * as sprites from "./photonomix.display.sprites";
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

export const properties = {
	width:0,
	height:0,
	orientation:0,
	minDimension:0
}

export function getProperties() {
	return properties;
}

/**
 * Using this checks and avoids altering the canvas context state machine if unnecessary,
 * which theoretically saves a little time.
 */
export function updateCompositeOperation(ctx, op) {
	if(ctx.globalCompositeOperation !== op) ctx.globalCompositeOperation = op;
}

let OFFSET_MAX_D = 0; // greater of width or height
let OFFSET_X = 0; // offset for X positions to center game space 
let OFFSET_Y = 0; // offset for Y positions to center game space 

/*
const agClusterIcon = new AntiGravitonCluster([0.0,0.96],[0,0],1);
agClusterIcon.mass = 100;
agClusterIcon.tick([], 0, 0);
*/

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
  } 
	else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
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
	properties.width  = evenNumber(document.body.clientWidth);
	properties.height = evenNumber(document.body.clientHeight);
	properties.orientation = properties.width > properties.height?0:1;
	/*
	properties.width  = properties.width - (properties.width%properties.pixelRatio);
	propertiew.height = properties.height - (properties.height%properties.pixelRatio);
	*/
	properties.minDimension = min(properties.width, properties.height);
	OFFSET_MAX_D = (max(properties.height, properties.height)-properties.minDimension)/2;
	if(properties.orientation) OFFSET_Y = OFFSET_MAX_D;
	else OFFSET_X = OFFSET_MAX_D;
	for(let i = 0, len = fullscreenBuffers.length; i < len; ++i) {
		fullscreenBuffers[i].width = properties.width;
		fullscreenBuffers[i].height = properties.height;
	}
	bokeh.init(fullscreenBuffers[0], fullscreenBuffers[1],properties.width, properties.height);
}

/**
 * Calculates the screenspace pixel offset of a coordinate from the [-1,1] coordinate
 * range used in game position vectors.
 */
export function screenSpace(x) {
	return ((x+1)/2) * properties.minDimension;
}

/**
 * Finds the screen space equivalent of the game space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */

export function screenSpaceVec(v, out) {
	out[0] = (((v[0]+1)/2)*properties.minDimension)+OFFSET_X;
	out[1] = (((v[1]+1)/2)*properties.minDimension)+OFFSET_Y;
	return out;
}

/**
 * Finds the game space equivalent of the sceen space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */
export function gameSpaceVec(v, out) {
	out[0] = 2*((v[0]-OFFSET_X)/properties.minDimension)-1;
	out[1] = 2*((v[1]-OFFSET_Y)/properties.minDimension)-1;
}

/**
 * Checks if entity is out of screen space by more than 50%.
 */
export function offscreen(x, y) {
	return (
		x < (properties.width  * -0.5) || x >properties.width   * 1.5 ||
		y < (properties.height * -0.5) || y > properties.height * 1.5
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
		invertCtx.fillRect(0, 0,properties.width, properties.height);
		invertCtx.globalCompositeOperation = "source-over";
		*/
	}
})();

/**
 * Draws a colored circle.
 */
export function drawCircle(ctx, x, y, size, color) {
	ctx.globalCompositeOperation = "source-over";
	ctx.beginPath();
	ctx.arc(x, y, size, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

/**
 * Creates debug markers on screen to show the center, top, left, bottom, right, topleft
 * and topright extremes of the main game area.
 *
function debugMarkers(ctx) {
	drawCircle(ctx, 0.0, 0.0, 10, "gray");
	drawCircle(ctx, -1.0, 0.0, 10, "green");
	drawCircle(ctx, 1.0, 0.0, 10, "red");
	drawCircle(ctx, 0.0, -1.0, 10, "yellow");
	drawCircle(ctx, 0.0, 1.0, 10, "blue");
	drawCircle(ctx, 1.0, 1.0, 10, "orange");
	drawCircle(ctx, -1.0, -1.0, 10, "brown");
}
*/

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
		entities.draw(game); //drawEntities(entityLayer);
		ui.draw();
		buffers.composite(fullscreenBuffers, compositeBuffer);
	}
}

/**
 * Initializes a game session and starts animation.
 */
export function setup() {
	startTime = Date.now();
	lastFrame = startTime;
	interval = 1000 / constants.TARGET_FPS;
	if(!animating) requestAnimationFrame(animate);
	animating = true;
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
	fullscreenBuffers = [
		new buffers.DrawBuffer("source-over"), // background
		new buffers.DrawBuffer("lighter"),     // bokeh spots
		new buffers.DrawBuffer("lighter"),     // motes and other "light" objects
		new buffers.DrawBuffer("hard-light"),  // voids and other "dark" objects
		new buffers.DrawBuffer("source-over")      // UI layer
	]
	updateProperties();
	entities.init(fullscreenBuffers[2], fullscreenBuffers[3]);
	ui.init(fullscreenBuffers[4]);
	compositeBuffer.width  = properties.width;
	compositeBuffer.height = properties.height;
	// do these here so they only get created once; they don't need to update with res
	setup();
	window.addEventListener("resize", updateProperties);
	if(AUTO_FULLSCREEN) {
		body.addEventListener("click", toggleFullScreen);
		document.addEventListener("fullscreenchange", fullscreenOff);
		document.addEventListener("mozfullscreenchange", fullscreenOff);
		document.addEventListener("msfullscreenchange", fullscreenOff);
		document.addEventListener("webkitfullscreenchange", fullscreenOff);
	}
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
