"use strict";
import * as constants from "./photonomix.constants";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import * as bokeh from "./photonomix.display.2d.bokeh";
import * as sprites from "./photonomix.display.2d.sprites";
import * as markers from "./photonomix.markers";
import {rotate} from "./photonomix.util";
//const Marker = markers.Marker;
const {vec2, lerp} = vectrix.vectors;
const {mut_plus} = vectrix.matrices;
import {Photon, COLOR_R, COLOR_G, COLOR_B} from "./photonomix.photons";
import {Mote} from "./photonomix.motes";
import {Void} from "./photonomix.voids";
import {Emitter} from "./photonomix.emitters";
let {min, max, cos, sin, sqrt} = Math;
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
let bgCtx, bokehCtx, gameCtx, displayCtx, invertCtx;
let bgCanvas, bokehCanvas, gameCanvas, displayCanvas, invertCanvas;
let moteCenterSprite;
let voidSprite;
let emitterSprite;
let markerSprites = Array(1);
let photonSprites = Array(3);
let moteCenterFillStyle = "rgba(255,255,255,0.7)";

let PX = 1; // pixel size
let W = 0; // screen width
let H = 0; // screen height
let OR = 0; // orientation (0 = landscape, 1 = portrait)
let MIN_D = 0; // lesser of width or height
let OFFSET_MAX_D = 0; // greater of width or height

/**
 * Toggles fullscreen on.
 * Code from Mozilla Developer Network.
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
	MIN_D = min(W, H);
	OFFSET_MAX_D = ~~((max(W, H)-MIN_D)/2);
	OR = W > H?0:1;
	W = W - (W%PX);
	H = H - (H%PX);
	for(let i = 0, len = buffers.length; i < len; ++i) {
		buffers[i].canvas.width = W;
		buffers[i].canvas.height = H;
	}
	bokeh.create(buffers[0], buffers[1], W, H);
	sprites.setMoteSpriteDimensions(MIN_D, constants.MOTE_BASE_SIZE*4);
	//moteSprite = sprites.createMoteSprite(MIN_D, constants.MOTE_BASE_SIZE*4);
	voidSprite = sprites.createVoidSprite(MIN_D, 1);
	emitterSprite = sprites.createEmitterSprite(MIN_D, constants.EMITTER_SIZE*10);
	moteCenterSprite = sprites.createMoteCenterSprite(moteCenterFillStyle);
	photonSprites[COLOR_R] = sprites.createPhotonSprite(MIN_D, constants.PHOTON_BASE_SIZE, "red");
	photonSprites[COLOR_G] = sprites.createPhotonSprite(MIN_D, constants.PHOTON_BASE_SIZE, "green");
	photonSprites[COLOR_B] = sprites.createPhotonSprite(MIN_D, constants.PHOTON_BASE_SIZE, "blue");
	markerSprites[markers.MARKER_HIT] = sprites.createMarkerHitSprite(MIN_D, constants.MARKER_HIT_SIZE);
}

/**
 * Event handler for starting the game by pressing the enter key. Removes its own
 * binding after firing.
 */
function pressEnter(event) {
	if(event.keyCode === 13) {
		document.removeEventListener("keyup", pressEnter);
		startGame();
	}
}

/**
 * Calculates the screenspace pixel offset of a coordinate from the [-1,1] coordinate
 * range used in game position vectors.
 */
function screenSpace(x) {
	return ~~(((x+1)/2) * MIN_D);
}

/**
 * Draws plasma lines between a mote and its target.
 */
const drawAttackLine = (function() {
	let a = vec2(), b = vec2(), ra = vec2(), rb = vec2();
	let sx = 0|0, sy = 0|0, rax = 0|0, ray = 0|0, rbx = 0|0, rby = 0|0, tx = 0|0, ty = 0|0;
	return function drawAttackLine(ctx, entity, color) {
		// nothing special about the constants used below, they just looked nice
		lerp(entity.pos, entity.target.pos, 0.331, a);
		lerp(entity.pos, entity.target.pos, 0.692, b);
		rotate(a, entity.pos, cos((frameCount+entity.pulse)*0.772), ra);
		mut_plus(ra, a);
		rotate(b, entity.target.pos, sin((frameCount+entity.pulse)*0.373), rb);
		mut_plus(rb, b);

		sx = screenSpace(entity.pos[0]);
		sy = screenSpace(entity.pos[1]);
		rax = screenSpace(ra[0]);
		ray = screenSpace(ra[1]);
		rbx = screenSpace(rb[0]);
		rby = screenSpace(rb[1]);
		tx = screenSpace(entity.target.pos[0]);
		ty = screenSpace(entity.target.pos[1]);
		if(W > H) {
			sx = sx + OFFSET_MAX_D;
			rax = rax + OFFSET_MAX_D;
			rbx = rbx + OFFSET_MAX_D;
			tx = tx + OFFSET_MAX_D;
		}
		else {
			sy = sy + OFFSET_MAX_D;
			ray = ray + OFFSET_MAX_D;
			rby = rby + OFFSET_MAX_D;
			ty = ty + OFFSET_MAX_D;
		}
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty);
		ctx.strokeStyle = color;
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.moveTo(sx, sy);
		ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 0.5;
		ctx.stroke();
	}
})();

/**
 * Draw call for all entities. Loops through game entities and draws them according
 * to kind and properties.
 */
const drawEntities = (function() {
	let i, l, entity, px, py, tf = constants.TARGET_FPS, sc, sch, sw, swh, x, y, sprite;
	let ox, oy;
	let pulse = 0|0, pregnant = 0|0, injured = 0|0, lastMeal = 0|0, size = 0.0, index = 0|0; 
	let fadeFillStyle = "rgba(0,0,0,0.3)";
	let invFillStyle = "rgba(255,255,255,0.1)";
	return function drawEntities(ctx) {
		ctx.globalCompositeOperation = "source-atop";
		ctx.fillStyle = fadeFillStyle;
		ctx.fillRect(0, 0, W, H);
		invertCtx.globalCompositeOperation = "source-in";
		//invertCtx.clearRect(0,0,W,H);
		invertCtx.fillStyle = invFillStyle;
		invertCtx.fillRect(0, 0, W, H);

		ctx.globalCompositeOperation = "lighter";
		for(i = 0, l = game.entities.length; i < l; ++i) {
			entity = game.entities[i];
			x = entity.pos[0];
			y = entity.pos[1];
			px = screenSpace(x);
			py = screenSpace(y);
			if(W > H) px = px + OFFSET_MAX_D;
			else py = py + OFFSET_MAX_D;
			if(entity instanceof Mote) {
				({pulse, pregnant, injured, lastMeal} = entity);
				size = entity.size * clamp(MIN_D, 300, 1200);
				if(pregnant) {
					sc = size * cos((frameCount+pulse) * 0.2) * (sqrt(pregnant)+1);
					sw = size * sin((frameCount+pulse+tf) * 0.2) * (sqrt(pregnant)+1)*0.25;
				}
				else if(injured) {
					sc = size * cos((frameCount+pulse) * (0.2+(1-1/injured)));
					sw = size * sin((frameCount+pulse+tf) * 0.2) * 0.25; //* (0.2+(1-1/injured)))*0.25;
				}
				else {
					sc = size * cos((frameCount+pulse) * 0.2);
					sw = size * sin((frameCount+pulse+tf) * 0.2)*0.25;
				}
				sch = sc*0.5;
				swh = sw*0.5;
				index = sprites.colorIndex(entity.color[COLOR_R], entity.color[COLOR_G], entity.color[COLOR_B]);
				sprite = sprites.getMoteSprite(index);
				ctx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);
				ctx.drawImage(moteCenterSprite.canvas, px-swh, py-swh, sw, sw);
				if(entity.target !== undefined && (entity.potential > 1 || entity.target.lifetime > 0)) drawAttackLine(ctx, entity, sprites.getColorString(index));
			} // end mote draw
			else if(entity instanceof Photon) {
				sprite = photonSprites[entity.color];
				sc = sprite.pixelSize * cos(frameCount*0.2);
				sch = sc*0.5;
				ctx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);
			} // end photon draw
			else if(entity instanceof Void) {
				sc = entity.size * MIN_D * 1+(sin(frameCount*0.2));
				sch = sc*0.5;
				invertCtx.globalCompositeOperation = "source-over";
				sprite = voidSprite;
				invertCtx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);
				if(entity.mass > 500) { // smaller than this and effects look janky
					switch(entity.lastMeal) {
						case -1:index = 0x888; break;
						case COLOR_R:index = 0xf44; break;
						case COLOR_G:index = 0x4f4; break;
						case COLOR_B:index = 0x44f; break;
					}
					// light patch
					invertCtx.globalCompositeOperation = "soft-light";
					sw = sc*0.8;
					swh = sw*0.5;
					ox = sin(frameCount*0.05)*sc*entity.size*0.3;
					oy = cos(frameCount*0.05)*sc*entity.size*0.3;
					sprite = sprites.getMoteSprite(0xfff);
					invertCtx.drawImage(sprite.canvas, px+ox-swh, py+oy-swh, sw, sw);
					// smaller light patch
					sw = sc*0.8;
					swh = sw*0.5;
					ox = sin(frameCount*0.1)*sc*entity.size*0.26;
					oy = cos(frameCount*0.1)*sc*entity.size*0.26;
					sprite = sprites.getMoteSprite(index);
					invertCtx.drawImage(sprite.canvas, px+ox-swh, py+oy-swh, sw, sw);
					// dark patch
					invertCtx.globalCompositeOperation = "multiply";
					sprite = sprites.getMoteSprite(0x000);
					sw = sc*0.9;
					swh = sw*0.5;
					ox = cos(frameCount*0.09)*sc*entity.size*0.2;
					oy = sin(frameCount*0.09)*sc*entity.size*0.2;
					invertCtx.drawImage(sprite.canvas, px+ox-swh, py+oy-swh, sw, sw);
				}
			}
			else if(entity instanceof Emitter) {
				sc = entity.size * MIN_D * 0.9;
				sc = sc + (sc*(sin(frameCount*0.05))/100);
				sch = sc*0.5;
				sw = sc*1.3;
				swh = sw*0.5;
				switch(entity.next) {
					case COLOR_R:index = 0xf88; break;
					case COLOR_G:index = 0x8f8; break;
					case COLOR_B:index = 0x88f; break;
				}
				sprite = emitterSprite;
				ctx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);
				sprite = sprites.getMoteSprite(index);
				ctx.drawImage(sprite.canvas, px-swh, py-swh, sw, sw);
			}

		}
		ctx.globalCompositeOperation = "source-over";
	}
})();

/**
 * Draws a colored circle.
 */
function drawCircle(ctx, x, y, size, color) {
	ctx.globalCompositeOperation = "source-over";
	ctx.beginPath();
	ctx.arc(screenSpace(x), screenSpace(y), size, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

/**
 * Composites game layers onto the display canvas.
 */
function composite() {
	displayCtx.clearRect(0, 0, W, H);
	displayCtx.globalCompositeOperation = "source-over";
	displayCtx.drawImage(bgCanvas, 0, 0, W, H);
	displayCtx.globalCompositeOperation = "lighter";
	displayCtx.drawImage(bokehCanvas, 0, 0);
	displayCtx.globalCompositeOperation = "lighter";
	displayCtx.drawImage(gameCanvas, 0, 0);
	displayCtx.globalCompositeOperation = "hard-light";
	displayCtx.drawImage(invertCanvas, 0, 0);
}

/**
 * Creates debug markers on screen to show the center, top, left, bottom, right, topleft
 * and topright extremes of the main game area.
 */
function debugMarkers(ctx) {
	drawCircle(ctx, 0.0, 0.0, 10, "gray");
	drawCircle(ctx, -1.0, 0.0, 10, "green");
	drawCircle(ctx, 1.0, 0.0, 10, "red");
	drawCircle(ctx, 0.0, -1.0, 10, "yellow");
	drawCircle(ctx, 0.0, 1.0, 10, "blue");
	drawCircle(ctx, 1.0, 1.0, 10, "orange");
	drawCircle(ctx, -1.0, -1.0, 10, "brown");
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
		bokeh.draw();
		if(DEBUG_DRAW) debugMarkers(bokehCtx);
		drawEntities(gameCtx);
		composite();
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
 * Sets up a canvas draw buffer Defaults to offscreen unless a container is supplied.
 */
export function initCtx(id, container) {
	let canvas = document.createElement("canvas");
	canvas.id = id;
	canvas.width = W;
	canvas.height = H;
	let context = canvas.getContext("2d"/*, {alpha:false}*/);
	if(container) container.appendChild(canvas);
	return {
		id:id,
		canvas:canvas,
		context:context
	}
}

/**
 * Initializes game environment.
 */
export function init(env) {
	game = env;
	body = document.getElementsByTagName("body")[0];
	body.classList.add("2d");
	buffers[0] = initCtx("background");
	buffers[1] = initCtx("bokeh"); 
	buffers[2] = initCtx("game"); 
	buffers[3] = initCtx("display", body); 
	buffers[4] = initCtx("inverted"); 
	bgCtx = buffers[0].context;
	bgCanvas = buffers[0].canvas;
	bokehCtx = buffers[1].context;
	bokehCanvas = buffers[1].canvas;
	gameCtx = buffers[2].context;
	gameCanvas = buffers[2].canvas;
	displayCtx = buffers[3].context;
	displayCanvas = buffers[3].canvas;
	invertCtx = buffers[4].context;
	invertCanvas = buffers[4].canvas;
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

/**
 * Starts up the game.
 */
function startGame() {
	GAME_STARTED = true;
	game.start();
	body.removeEventListener("click", startGame);
	body.classList.remove("start");
	if(AUTO_FULLSCREEN) toggleFullScreen();
	console.log("game started");
}
