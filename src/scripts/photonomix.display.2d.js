"use strict";
import * as constants from "./photonomix.constants";
import * as vectrix from  "../../node_modules/@nphyx/vectrix/src/vectrix";
import * as bokeh from "./photonomix.display.2d.bokeh";
import * as sprites from "./photonomix.display.2d.sprites";
import * as markers from "./photonomix.markers";
import * as motes from "./photonomix.motes";
import {rotate, evenNumber} from "./photonomix.util";
//const Marker = markers.Marker;
const {vec2, lerp} = vectrix.vectors;
const {mut_plus} = vectrix.matrices;
import {Photon, COLOR_R, COLOR_G, COLOR_B} from "./photonomix.photons";
import {Void} from "./photonomix.voids";
import {Emitter} from "./photonomix.emitters";
import {AntiGravitonCluster} from "./photonomix.antigravitons";
let {min, max, cos, sin, sqrt, tan, round, PI} = Math;
const clamp = vectrix.vectors.mut_clamp;
const AUTO_FULLSCREEN = false;
const DEBUG_DRAW = false;
const Mote = motes.Mote;

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
let bgCtx, bokehCtx, gameCtx, displayCtx, invertCtx, uiCtx;
let bgCanvas, bokehCanvas, gameCanvas, displayCanvas, invertCanvas, uiCanvas;
let voidSprite;
let emitterSprite;
let markerSprites = Array(1);
let photonSprites = Array(3);
let moteCenterSprite;
let tf = constants.TARGET_FPS;

let PX = 1; // pixel size
let W = 0; // screen width
let H = 0; // screen height
let OR = 0; // orientation (0 = landscape, 1 = portrait)
let MIN_D = 0; // lesser of width or height
let OFFSET_MAX_D = 0; // greater of width or height
let OFFSET_X = 0; // offset for X positions to center game space 
let OFFSET_Y = 0; // offset for Y positions to center game space 

const agClusterIcon = new AntiGravitonCluster([0.0,0.96],[0,0],1);
agClusterIcon.mass = 100;
agClusterIcon.tick([], 0, 0);

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
 * Updates screen ratio.
 */
function updateRatio() {
	W = evenNumber(document.body.clientWidth);
	H = evenNumber(document.body.clientHeight);
	OR = W > H?0:1;
	W = W - (W%PX);
	H = H - (H%PX);
	MIN_D = min(W, H);
	OFFSET_MAX_D = (max(W, H)-MIN_D)/2;
	if(OR) OFFSET_Y = OFFSET_MAX_D;
	else   OFFSET_X = OFFSET_MAX_D;
	for(let i = 0, len = buffers.length; i < len; ++i) {
		buffers[i].canvas.width = W;
		buffers[i].canvas.height = H;
	}
	bokeh.create(buffers[0], buffers[1], W, H);
	voidSprite = sprites.createVoidSprite(MIN_D, 1);
	emitterSprite = sprites.createEmitterSprite(MIN_D, 1);
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
	return ((x+1)/2) * MIN_D;
}

/**
 * Checks if entity is out of screen space by more than 50%.
 */
function offscreen(x, y) {
	return (
		x < (W*-0.5) || x > W*1.5 ||
		y < (H*-0.5) || y > H*1.5
	)
}

/**
 * Draws plasma lines between a mote and its target.
 */
const drawPlasmaLine = (function() {
	let a  = vec2(), b  = vec2(), c  = vec2(), d  = vec2(),
			ra = vec2(), rb = vec2(), 
			rax = 0|0, ray = 0|0, speeda = 0.0, ta = 0.0, tc = 0.0,
			rbx = 0|0, rby = 0|0, speedb = 0.0, tb = 0.0, td = 0.0,
			sx = 0|0, sy = 0|0, tx = 0|0, ty = 0|0;
	return function drawPlasmaLine(ctx, source, target, outerColor, innerColor, lineSize = 4, frameOffset = 0) {
		// only these acts get lines
		ta = 0.6;
		tc = 0.9;
		tb = 0.7;
		td = 0.9;
		speeda = 0.57121;
		speedb = 0.71213;
		lerp(source, target, ta, a);
		lerp(source, target, tb, b);
		lerp(source, target, tc, c);
		lerp(source, target, td, d);
		
		mut_plus(rotate(a, c, tan(cos((frameCount+frameOffset)*speeda)), ra), a);
		mut_plus(rotate(b, d, tan(sin((frameCount+frameOffset)*speedb)), rb), b);

		sx = source[0]; sy = source[1];
		tx = target[0]; ty = target[1];
		rax = ra[0]; ray = ra[1];
		rbx = rb[0]; rby = rb[1];
		if(W > H) {
			sx = sx;
			tx = tx;
			rax = rax;
			rbx = rbx;
		}
		else {
			sy = sy;
			ty = ty;
			ray = ray;
			rby = rby;
		}
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty);
		ctx.strokeStyle = outerColor;
		ctx.lineWidth = round(cos((frameCount+frameOffset)*speeda)*lineSize);
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty);
		ctx.strokeStyle = innerColor;
		ctx.lineWidth = round(cos((frameCount+frameOffset)*speeda)*~~(lineSize/4));
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.closePath();
	}
})();

/**
 * Draw a mote.
 */
const drawMote = (function() {
	let pulse = 0|0, pregnant = 0|0, injured = 0|0, lastMeal = 0|0, size = 0.0,
	plasmaSource = vec2(), plasmaTarget = vec2(), sc = 0.0, sw = 0.0, sch = 0.0, 
	swh = 0.0, colorIndex = 0|0, px = 0.0, py = 0.0, sprite;
	return function drawMote(entity, ctx) {
		px = screenSpace(entity.pos[0])+OFFSET_X;
		py = screenSpace(entity.pos[1])+OFFSET_Y;

		({pulse, pregnant, injured, lastMeal} = entity);
		size = entity.size * clamp(MIN_D, 300, 1200);
		if(pregnant) {
			sc = size * cos((frameCount+pulse) * 0.2) * (sqrt(pregnant)+1);
			sw = size * sin((frameCount+pulse+tf) * 0.2) * (sqrt(pregnant)+1)*0.1;
		}
		else if(injured) {
			sc = size * cos((frameCount+pulse) * (0.2+(1-1/injured)));
			sw = size * sin((frameCount+pulse+tf) * 0.2)*0.1; //* (0.2+(1-1/injured)))*0.25;
		}
		else {
			sc = size * cos((frameCount+pulse) * 0.2);
			sw = size * sin((frameCount+pulse+tf) * 0.2)*0.1;
		}
		sch = sc*0.5;
		swh = sw*0.5;
		colorIndex = sprites.colorIndex(entity.color[COLOR_R], entity.color[COLOR_G], entity.color[COLOR_B]);
		sprite = sprites.getMoteSprite(colorIndex);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-sch, py-sch, sc, sc);
		sprite = moteCenterSprite; 
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-sch, py-sch, sc, sc);
		if(entity.target && entity.action == motes.ACT_ATTACK) {
			// need vectors but in screen space, not absolute space
			plasmaSource[0] = px;
			plasmaSource[1] = py;
			plasmaTarget[0] = screenSpace(entity.target.pos[0]);
			plasmaTarget[1] = screenSpace(entity.target.pos[1]);
			if(W > H) plasmaTarget[0] += OFFSET_MAX_D;
			else      plasmaTarget[1] += OFFSET_MAX_D;
	drawPlasmaLine(ctx, plasmaSource, plasmaTarget, sprites.getColorString(colorIndex), "white", 5, pulse);
		}
	}
})();

/**
 * Draws a photon.
 */
const drawPhoton = (function() {
	let sc = 0.0, sch = 0.0, px = 0.0, py = 0.0, sprite;
	return function drawPhoton(entity, ctx) {
		px = screenSpace(entity.pos[0])+OFFSET_X;
		py = screenSpace(entity.pos[1])+OFFSET_Y;

		sprite = photonSprites[entity.color];
		sc = sprite.pixelSize * cos(frameCount*0.2);
		sch = sc*0.5;
		ctx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);
	}
})();

/**
 * Draws a void.
 */
const drawVoid = (function() {
	let sc = 0.0, sch = 0.0, px = 0.0, py = 0.0, ox = 0.0, oy = 0.0, sprite, 
	    sw = 0.0, swh = 0.0, colorIndex = 0|0;
	return function drawVoid(entity, ctx) {
		px = screenSpace(entity.pos[0])+OFFSET_X;
		py = screenSpace(entity.pos[1])+OFFSET_Y;

		sc = entity.size * MIN_D * 1+(sin(frameCount*0.2));
		sch = sc*0.5;
		sprite = voidSprite;

		ctx.globalCompositeOperation = "source-over";
		ctx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);
		switch(entity.lastMeal) {
			case -1:colorIndex = 0x888; break;
			case COLOR_R:colorIndex = 0xf44; break;
			case COLOR_G:colorIndex = 0x4f4; break;
			case COLOR_B:colorIndex = 0x44f; break;
		}
		// light patch
		ctx.globalCompositeOperation = "soft-light";
		sw = sc*1.5;
		swh = sw*0.5;
		ox = sin(frameCount*0.0127)*sc*0.1;
		oy = cos(frameCount*0.0127)*sc*0.1;
		sprite = sprites.getMoteSprite(0xfff);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
		// smaller light patch
		sw = sc*1.2;
		swh = sw*0.5;
		ox = cos(frameCount*0.023)*sc*0.13;
		oy = sin(frameCount*0.023)*sc*0.13;
		sprite = sprites.getMoteSprite(colorIndex);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
		// dark patch
		ctx.globalCompositeOperation = "multiply";
		sprite = sprites.getMoteSprite(0x000);
		sw = sc*1.4;
		swh = sw*0.5;
		ox = sin(frameCount*0.0122)*sc*0.17;
		oy = cos(frameCount*0.0122)*sc*0.17;
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
	}
})();

/**
 * Draws an emitter.
 */
const drawEmitter = (function() {
	let sc = 0.0, sch = 0.0, px = 0.0, py = 0.0, ox = 0.0, oy = 0.0, sprite, 
	    sw = 0.0, swh = 0.0;
	return function drawEmitter(entity, ctx) {
		px = screenSpace(entity.pos[0])+OFFSET_X;
		py = screenSpace(entity.pos[1])+OFFSET_Y;

		sc = entity.size * MIN_D;
		//sc = sc + (sc*(sin(frameCount*0.05))/100);
		sch = sc*0.5;

		sprite = emitterSprite;
		ctx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);

		sw = cos((frameCount)*0.2)*sc*1.7;
		swh = sw*0.5;

		sprite = sprites.getMoteSprite(0x333);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-swh, py-swh, sw, sw);

		sw = sc*1.3;
		swh = sw*0.5;
		ox = sin(frameCount*0.08)*sc*0.1;
		oy = cos(frameCount*0.08)*sc*0.1;
		sprite = sprites.getMoteSprite(0x500);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);

		ox = sin(frameCount*0.08+2.094394)*sc*0.1;
		oy = cos(frameCount*0.08+2.094394)*sc*0.1;
		sprite = sprites.getMoteSprite(0x050);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);

		ox = sin(frameCount*0.08+4.188789)*sc*0.1;
		oy = cos(frameCount*0.08+4.188789)*sc*0.1;
		sprite = sprites.getMoteSprite(0x005);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
	}
})();

/**
 * Draws an antigraviton cluster.
 */
const drawAntiGravitonCluster = (function() {
	let size = 0.0, plasmaSource = vec2(), plasmaTarget = vec2(), lw = 4,
			outerColor = "rgba(0,0,0,0.3)", innerColor = "rgba(0,0,0,0.7)",
			pi3rd = PI*(1/3), px = 0.0, py = 0.0, ox = 0.0, oy = 0.0,
			sc = 0.0, sch = 0.0, sprite;
	function drawAntiPlasma(ctx, offset, length) {
		ox = sin(frameCount*0.08+offset)*sc*length;
		oy = cos(frameCount*0.08+offset)*sc*length;
		plasmaTarget[0] = px+ox;
		plasmaTarget[1] = py+oy;
		drawPlasmaLine(ctx, plasmaSource, plasmaTarget, outerColor, innerColor, lw);
	}
	return function drawAntiGravitonCluster(entity, ctx) {
		px = screenSpace(entity.pos[0])+OFFSET_X;
		py = screenSpace(entity.pos[1])+OFFSET_Y;

		size = entity.size * clamp(MIN_D, 300, 1200);
		sc = size;
		lw = min(4, ~~(sc/2));
		sch = sc*0.5;
		plasmaSource[0] = px;
		plasmaSource[1] = py;

		drawAntiPlasma(ctx, 0, 0.5);
		drawAntiPlasma(ctx, pi3rd*2, 0.5);
		drawAntiPlasma(ctx, pi3rd*4, 0.5);
		drawAntiPlasma(ctx, pi3rd, 0.25);
		drawAntiPlasma(ctx, pi3rd*3, 0.25);
		drawAntiPlasma(ctx, pi3rd*5, 0.25);

		sprite = sprites.getMoteSprite(0x000);
		ctx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-sch, py-sch, sc, sc);
	}
})();

/**
 * Draw call for all entities. Loops through game entities and draws them according
 * to kind and properties.
 */
const drawEntities = (function() {
	// these variables are shared by draw calls below
	let i, l, entity, px, py;

	return function drawEntities(ctx) {
		for(i = 0, l = game.entities.length; i < l; ++i) {
			entity = game.entities[i];
			px = screenSpace(entity.pos[0])+OFFSET_X;
			py = screenSpace(entity.pos[1])+OFFSET_Y;
			if(offscreen(px, py)) continue;
			if(entity instanceof Mote) drawMote(entity, gameCtx);
			else if(entity instanceof Photon) drawPhoton(entity, gameCtx);
			else if(entity instanceof Void) drawVoid(entity, invertCtx);
			else if(entity instanceof Emitter) drawEmitter(entity, gameCtx);
			else if(entity instanceof AntiGravitonCluster) 
				drawAntiGravitonCluster(entity, invertCtx);
		}
		ctx.globalCompositeOperation = "source-over";
	}
})();

function drawEdgeButton(ctx, x, y, w, h) {
	let halfButtonWidth = w*0.5; //*0.5;
	let buttonHeight = h; //buttonWidth*0.47;
	let cpXScale = w*0.122;
	let beginX = x-halfButtonWidth;
	let beginY = y;
	let topX = x;
	let topY = y-buttonHeight;
	let endX = x+halfButtonWidth;
	let endY = y;
	let aCPX = beginX + cpXScale;
	let aCPY = beginY - cpXScale;
	let bCPX = beginX + cpXScale;
	let bCPY = topY;
	let cCPX = endX - cpXScale;
	let cCPY = topY;
	let dCPX = endX - cpXScale;
	let dCPY = endY - cpXScale;
	let color = "rgba(255,255,255,0.1)";

	ctx.beginPath();
	ctx.moveTo(beginX, beginY);
	ctx.bezierCurveTo(aCPX, aCPY, bCPX, bCPY, topX, topY);
	ctx.bezierCurveTo(cCPX, cCPY, dCPX, dCPY, endX, endY);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = 4;
	//ctx.stroke();
	ctx.fill();
	ctx.closePath();

}
/**
 * Draws UI elements.
 */
function drawUI(ctx) {
	drawEdgeButton(ctx, screenSpace(0.00)+OFFSET_X,  
	                    screenSpace(1.00)+OFFSET_Y, W*0.1, W*0.047);
	drawAntiGravitonCluster(agClusterIcon, ctx);
	drawEdgeButton(ctx, screenSpace(-0.3)+OFFSET_X, 
	                    screenSpace(1.05)+OFFSET_Y, W*0.1, W*0.047);
	drawEdgeButton(ctx, screenSpace(0.30)+OFFSET_X,  
	                    screenSpace(1.05)+OFFSET_Y, W*0.1, W*0.047);
	drawCircle(ctx, 
		screenSpace(game.player.pointerPos[0]), 
		screenSpace(game.player.pointerPos[1]),
		5,
		"white"
	);
	if(game.player.mouseIsDown) {
		ctx.beginPath();
		ctx.moveTo(screenSpace(game.player.mouseDown[0]),
		           screenSpace(game.player.mouseDown[1]));
		ctx.lineTo(screenSpace(game.player.pointerPos[0]),
		           screenSpace(game.player.pointerPos[1]));
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();

	}
}
/**
 * Apply pre-draw effects to canvases and set composite modes before drawing entities.
 */
const prepareCanvases = (function() {
	let fadeFillStyle = "rgba(0,0,0,0.3)";
	let invFillStyle = "rgba(255,255,255,0.1)";

	return function prepareCanvases() {
		gameCtx.globalCompositeOperation = "source-atop";
		gameCtx.fillStyle = fadeFillStyle;
		gameCtx.fillRect(0, 0, W, H);
		gameCtx.globalCompositeOperation = "lighter";
		invertCtx.globalCompositeOperation = "source-in";
		invertCtx.fillStyle = invFillStyle;
		invertCtx.fillRect(0, 0, W, H);
		invertCtx.globalCompositeOperation = "source-over";
		uiCtx.clearRect(0, 0, W, H);
	}
})();

/**
 * Draws a colored circle.
 */
function drawCircle(ctx, x, y, size, color) {
	ctx.globalCompositeOperation = "source-over";
	ctx.beginPath();
	ctx.arc(x, y, size, 2 * Math.PI, false);
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
	displayCtx.drawImage(gameCanvas, 0, 0);
	displayCtx.globalCompositeOperation = "hard-light";
	displayCtx.drawImage(invertCanvas, 0, 0);
	displayCtx.globalCompositeOperation = "source-over";
	displayCtx.drawImage(uiCanvas, 0, 0);
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
		prepareCanvases();
		drawEntities(gameCtx);
		drawUI(uiCtx);
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
	buffers[5] = initCtx("ui"); 
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
	uiCtx = buffers[5].context;
	uiCanvas = buffers[5].canvas;
	displayCanvas.style.display = "block";
	body.addEventListener("click", startGame);
	document.addEventListener("keyup", pressEnter);
	window.addEventListener("resize", updateRatio);
	updateRatio();
	// do these here so they only get created once; they don't need to update with res
	sprites.initMoteSpriteSheet(MIN_D, constants.MOTE_BASE_SIZE*4);
	moteCenterSprite = sprites.createMoteCenterSprite();
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
