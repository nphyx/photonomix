"use strict";
import * as constants from "./photonomix.constants";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import * as bokeh from "./photonomix.bokeh";
let {abs, min} = Math;
const clamp = vectrix.vectors.mut_clamp;
const AUTO_FULLSCREEN = false;
const DEBUG_DRAW = true;

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
}

const fade = (function() {
	let imgData, pixels, a;
	return function fade(ctx, w, h, alpha) {
		imgData = ctx.getImageData(0,0,w, h);
		pixels = imgData.data;
		a = ~~(alpha*255);
		for(let i = 0, len = pixels.length; i < len; i+=4) {
			pixels[i+3] = pixels[i+3]-a;
		}
		ctx.putImageData(imgData, 0, 0);
		imgData = null;
		pixels = null;
	}
})();

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

let d_m_i, d_m_l, mote, px, py, tx, ty, size, pw, cs_r, speed, tf = constants.TARGET_FPS;
let mote_center = "rgba(255,255,255,0.7)", fr, crg; 
function drawMotes(ctx) {
	fr = ctx.fillRect.bind(ctx);
	crg = ctx.createRadialGradient.bind(ctx);
	ctx.globalCompositeOperation = "lighter";
	for(d_m_i = 0, d_m_l = game.motes.length; d_m_i < d_m_l; ++d_m_i) {
		mote = game.motes[d_m_i];
		px = screenSpace(mote.x) * W;
		py = screenSpace(mote.y) * H;
		size = mote.size * clamp(min(W, H), 300, 1200);
		pw = abs((((frameCount+mote.pulse) % tf)-(tf/2)) / tf);
		cs_r = 0.015+(0.05*pw);

		let g = crg(px, py, 3*pw,
						px, py, size*2);

		g.addColorStop(0, mote_center);
		g.addColorStop(cs_r, mote.color_string);
		g.addColorStop(5*cs_r, mote.transparent_string);
		ctx.fillStyle = g;
		fr(px-size, py-size, size*2, size*2); 
		g = null;
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

function drawCircle(ctx, x, y, size, color) {
	ctx.globalCompositeOperation = "source-over";
	ctx.beginPath();
	ctx.arc(screenSpace(x)*W, screenSpace(y)*H, size, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function composite() {
	displayCtx.fillStyle = "#000000";
	displayCtx.fillRect(0, 0, W, H);
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
		fade(gameCtx, W, H, 0.3);
		bokeh.draw();
		if(DEBUG_DRAW) debugMarkers(bokehCtx);
		drawMotes(gameCtx);
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
	canvas.style.display = "none";
	let context = canvas.getContext("2d");
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
