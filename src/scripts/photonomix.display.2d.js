"use strict";
import * as constants from "./photonomix.constants";
let {abs} = Math;
//const {floor, random, max} = Math;
const AUTO_FULLSCREEN = false;
//const FPS = 60;

let GAME_STARTED = false; //  whether the game has started
let startTime; // time game started
let interval = 0;
let frameCount = 0; // running total of drawn frames
let animating = false; // whether the game is currently running animation loop
let body; // html document body
let gameScreen; // game screen canvas
let screenCtx; // current rendering context
let fullscreen = false; // whether the game is in fullscreen mode
let game; // game environment object
let lastFrame = 0;


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
	gameScreen.width = W;
	gameScreen.height = H;
	/*
	makeTextures();
	createBuffers();
	*/
}

/**
 * Fills a buffer with the given style.
 * @param CanvasRenderingContext2D ctx framebuffer being drawn to
 * @param {int} w width of framebuffer
 * @param {int} h height of framebuffer
 * @param {string} operation composite operation type (default source-over)
 */
function drawFill(ctx, w, h, style, operation="source-over") {
	ctx.globalCompositeOperation = operation;
	ctx.fillStyle = style;
	ctx.fillRect(0, 0, w, h);
}

function pressEnter(event) {
	if(event.keyCode === 13) {
		document.removeEventListener("keyup", pressEnter);
		startGame();
	}
}

function drawMotes() {
	for(let i in game.motes) {
		let mote = game.motes[i];
		let px = mote.x * W;
		let py = mote.y * H;
		let size = mote.size * W;
		let tf = constants.TARGET_FPS;
		let pw = abs((((frameCount+mote.pulse) % tf)-(tf/2)) / tf);

		let g = screenCtx.createRadialGradient(
			px, py, 3*pw,
			px, py, size*2
		);
		g.addColorStop(0, "white");
		g.addColorStop(0.1+(0.2*pw), mote.color);
		g.addColorStop(0.3+(0.6*pw), "rgba(0,0,0,-1)");
		screenCtx.fillStyle = g;
		screenCtx.fillRect(px-size*1.5, py-size*1.5, size*3, size*3); 

		/*
		screenCtx.fillStyle = mote.color;
		screenCtx.beginPath();
		screenCtx.arc(mote.x * W, mote.y * H, mote.size * W, 0, 2*Math.PI);
		screenCtx.fill();
		*/
	}
}

function animate() {
	requestAnimationFrame(animate);
	let now = Date.now();
	let elapsed = now - lastFrame;
	if(elapsed > interval) {
		lastFrame = now - (elapsed % interval);
		frameCount++;
		game.tick(0);
		drawFill(screenCtx, W, H, "rgba(0,0,0,.2)");
		drawMotes();
	}
}

export function setup() {
	body.innerHTML = "";
	body.appendChild(gameScreen);
	startTime = Date.now();
	lastFrame = startTime;
	interval = 1000 / constants.TARGET_FPS;
	if(!animating) requestAnimationFrame(animate);
	animating = true;
}

export function init(env) {
	game = env;
	body = document.getElementsByTagName("body")[0];
	body.classList.add("2d");
	gameScreen = document.createElement("canvas");
	gameScreen.id = "game-screen";
	screenCtx = gameScreen.getContext("2d");
	body.addEventListener("click", startGame);
	document.addEventListener("keyup", pressEnter);
	window.addEventListener("resize", updateRatio);
	updateRatio();
	drawFill(screenCtx, W, H, "#000000");
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
