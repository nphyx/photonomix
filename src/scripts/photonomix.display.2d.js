"use strict";
import * as constants from "./photonomix.constants";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import * as bokeh from "./photonomix.bokeh";
import * as sprites from "./photonomix.display.2d.sprites";
let {min, cos, sin} = Math;
const clamp = vectrix.vectors.mut_clamp;
const AUTO_FULLSCREEN = false;
const DEBUG_DRAW = false;

let GAME_STARTED = false; //  whether the game has started
let startTime; // time game started
let interval = 0;
let frameCount = 0; // running total of drawn frames
let animating = false; // whether the game is currently running animation loop
let body; // html document body
let buffers = Array(3);
let fullscreen = false; // whether the game is in fullscreen mode
let game; // game environment object
let lastFrame = 0;
let bgCtx, bokehCtx, gameCtx, displayCtx;
let bgCanvas, bokehCanvas, gameCanvas, displayCanvas;
let moteSprite;


let PX = 1; // pixel size
let W = 0; // screen width
let H = 0; // screen height
let OR = 0; // orientation (0 = landscape, 1 = portrait)

// from MDN
/**
 * Toggles fullscreen on.
 */
function toggleFullScreen() {
	if(fullscreen) return;
	fullscreen = true;
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/**
 * Turns fullscreen off.
 */
function fullscreenOff(ev) {
	ev.preventDefault();
	if(document.webkitIsFullScreen || document.mozIsFullScreen || document.msIsFullScreen) fullscreen = true;
	else fullscreen = false;
	return false;
}

/**
 * Calculates FPS.
 *
function calcFPS() {
	var now = Date.now();
	return ((now - startTime)/frameCount).toPrecision(2);
}
*/

/**
 * Round to nearest even number.
 */
function evenNumber(n) {
return n >> 1 << 1;
}

/**
 * Updates screen ratio.
 */
function updateRatio() {
	W = evenNumber(document.body.clientWidth);
	H = evenNumber(document.body.clientHeight);
	OR = W > H?0:1;
	W = W - (W%PX);
	H = H - (H%PX);
	for(let i = 0, len = buffers.length; i < len; ++i) {
		buffers[i].canvas.width = W;
		buffers[i].canvas.height = H;
	}
	moteSprite = sprites.createMoteSprite(min(W, H), constants.MOTE_BASE_SIZE*4);
}

/**
 * Fills a buffer with the given style.
 * @param CanvasRenderingContext2D ctx framebuffer being drawn to
 * @param {int} w width of framebuffer
 * @param {int} h height of framebuffer
 * @param {string} operation composite operation type (default source-over)
 *
function drawFill(ctx, w, h, style, operation="source-over") {
	ctx.globalCompositeOperation = operation;
	ctx.fillStyle = style;
	ctx.fillRect(0, 0, w, h);
}
*/

function pressEnter(event) {
	if(event.keyCode === 13) {
		document.removeEventListener("keyup", pressEnter);
		startGame();
	}
}

function screenSpace(x) {
	return (x+1)/2;
}

const drawEntities = (function() {
	let i, l, mote, px, py, tx, ty, size, speed, tf = constants.TARGET_FPS, sc, sch, sw, swh, x, y, pulse;
	let fadeFillStyle = "rgba(0,0,0,0.3)";
	let moteCenterFillStyle = "rgba(255,255,255,0.7)";
	return function drawEntities(ctx) {
		ctx.globalCompositeOperation = "source-atop";
		ctx.fillStyle = fadeFillStyle;
		ctx.fillRect(0, 0, W, H);

		ctx.globalCompositeOperation = "lighter";
		for(i = 0, l = game.entities.length; i < l; ++i) {
			mote = game.entities[i];
			x = mote.x;
			y = mote.y;
			pulse = mote.pulse;
			px = screenSpace(x) * W;
			py = screenSpace(y) * H;
			size = mote.size * clamp(min(W, H), 300, 1200);
			sc = size * cos((frameCount+pulse) * 0.2);
			sch = sc*0.5;
			sw = size * sin((frameCount+pulse+tf) * 0.2)*0.25;
			swh = sw*0.5;
			ctx.drawImage(sprites.recolor(moteSprite, mote.color_string).canvas, px-sch, py-sch, sc, sc);
			ctx.drawImage(sprites.recolor(moteSprite, moteCenterFillStyle).canvas, px-swh, py-swh, sw, sw);
			if(DEBUG_DRAW && mote.target) {
				speed = mote.speed;
				tx = screenSpace(mote.target.x) * W;
				ty = screenSpace(mote.target.y) * H;
				ctx.beginPath();
				ctx.moveTo(px, py);
				ctx.strokeStyle = (mote.scared?"white":mote.full?"red":mote.color_string);
				ctx.strokeWidth = 1;
				ctx.lineTo(tx, ty);
				ctx.stroke();
			}
		}
		ctx.globalCompositeOperation = "source-over";
	}
})();

function drawCircle(ctx, x, y, size, color) {
	ctx.globalCompositeOperation = "source-over";
	ctx.beginPath();
	ctx.arc(screenSpace(x)*W, screenSpace(y)*H, size, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function composite() {
	displayCtx.clearRect(0, 0, W, H);
	displayCtx.globalCompositeOperation = "source-over";
	displayCtx.drawImage(bgCanvas, 0, 0);
	displayCtx.globalCompositeOperation = "lighter";
	displayCtx.drawImage(bokehCanvas, 0, 0);
	displayCtx.drawImage(gameCanvas, 0, 0);
}

function debugMarkers(ctx) {
	drawCircle(ctx, 0.0, 0.0, 10, "gray");
	drawCircle(ctx, -1.0, 0.0, 10, "green");
	drawCircle(ctx, 1.0, 0.0, 10, "red");
	drawCircle(ctx, 0.0, -1.0, 10, "yellow");
	drawCircle(ctx, 0.0, 1.0, 10, "blue");
	drawCircle(ctx, 1.0, 1.0, 10, "orange");
	drawCircle(ctx, -1.0, -1.0, 10, "brown");
}

function animate() {
	requestAnimationFrame(animate);
	let now = Date.now();
	let elapsed = now - lastFrame;
	if(elapsed > interval) {
		lastFrame = now - (elapsed % interval);
		frameCount++;
		game.tick(interval/elapsed);
		bokeh.draw();
		if(DEBUG_DRAW) debugMarkers(bokehCtx);
		drawEntities(gameCtx);
		composite();
	}
}

export function setup() {
	startTime = Date.now();
	lastFrame = startTime;
	interval = 1000 / constants.TARGET_FPS;
	if(!animating) requestAnimationFrame(animate);
	animating = true;
}

export function initCtx(id, container) {
	let canvas = document.createElement("canvas");
	canvas.id = id;
	canvas.width = W;
	canvas.height = H;
	let context = canvas.getContext("2d", {alpha:false});
	if(container) container.appendChild(canvas);
	return {
		id:id,
		canvas:canvas,
		context:context
	}
}

export function init(env) {
	game = env;
	body = document.getElementsByTagName("body")[0];
	body.classList.add("2d");
	buffers[0] = initCtx("background");
	buffers[1] = initCtx("bokeh"); 
	buffers[2] = initCtx("game"); 
	buffers[3] = initCtx("display", body); 
	bgCtx = buffers[0].context;
	bgCanvas = buffers[0].canvas;
	bokehCtx = buffers[1].context;
	bokehCanvas = buffers[1].canvas;
	gameCtx = buffers[2].context;
	gameCanvas = buffers[2].canvas;
	displayCtx = buffers[3].context;
	displayCanvas = buffers[3].canvas;
	displayCanvas.style.display = "block";
	body.addEventListener("click", startGame);
	document.addEventListener("keyup", pressEnter);
	window.addEventListener("resize", updateRatio);
	updateRatio();
	bokeh.create(buffers[0], buffers[1], W, H);
	setup();
	if(AUTO_FULLSCREEN) {
		body.addEventListener("click", toggleFullScreen);
		document.addEventListener("fullscreenchange", fullscreenOff);
		document.addEventListener("mozfullscreenchange", fullscreenOff);
		document.addEventListener("msfullscreenchange", fullscreenOff);
		document.addEventListener("webkitfullscreenchange", fullscreenOff);
	}
}

function startGame() {
	GAME_STARTED = true;
	game.start();
	body.removeEventListener("click", startGame);
	body.classList.remove("start");
	if(AUTO_FULLSCREEN) toggleFullScreen();
	console.log("game started");
}
