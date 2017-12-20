"use strict";
/**
 * Module for drawing entity layer.
 */
import * as vectrix from  "@nphyx/vectrix";
import * as sprites from "./sprites";
import * as constants from "../photonomix.constants";
import {rotate} from "../photonomix.util";
import {offscreen, screenSpace, updateCompositeOperation} from "./";
const {vec2, lerp} = vectrix.vectors;
const {mut_plus} = vectrix.matrices;
import {Photon, Mote, Void, Emitter, AntiGravitonCluster, Ripple} from "../game";
import {COLOR_R, COLOR_G, COLOR_B} from "../game/photons";
import {ACT_ATTACK} from "../game/Mote";

let {min, cos, sin, sqrt, tan, round, PI} = Math;
const tf = constants.TARGET_FPS;

let lightBuffer, darkBuffer, lightCtx, darkCtx, frameCount, timing, displayProps;

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
		if(lightBuffer.width > lightBuffer.height) {
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
	return function drawMote(entity) {
		lightCtx.globalCompositeOperation = "lighter";
		px = screenSpace(entity.pos[0]);
		py = screenSpace(entity.pos[1]);

		({pulse, pregnant, injured, lastMeal} = entity);
		size = entity.size * displayProps.minDimension;
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
		colorIndex = sprites.util.colorIndex(entity.color[COLOR_R], entity.color[COLOR_G], entity.color[COLOR_B]);
		sprite = sprites.motes.get(colorIndex);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-sch, py-sch, sc, sc);
		sprite = sprites.motes.getCenter();
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-sch, py-sch, sc, sc);
		if(entity.target && entity.action == ACT_ATTACK) {
			// need vectors but in screen space, not absolute space
			plasmaSource[0] = px;
			plasmaSource[1] = py;
			plasmaTarget[0] = screenSpace(entity.target.pos[0]);
			plasmaTarget[1] = screenSpace(entity.target.pos[1]);
	drawPlasmaLine(lightCtx, plasmaSource, plasmaTarget, sprites.motes.getColorString(colorIndex), "white", 5, pulse);
		}
	}
})();

/**
 * Draws a photon.
 */
const drawPhoton = (function() {
	let sw = 0.0, swh = 0.0, px = 0.0, py = 0.0, ps = 0.0, pulse = 0|0, sprite;
	return function drawPhoton(entity) {
		updateCompositeOperation(lightCtx, "lighter");
		px = screenSpace(entity.pos[0]);
		py = screenSpace(entity.pos[1]);
		sprite = sprites.photons.get(entity.color);
		ps = constants.PHOTON_BASE_SIZE * displayProps.minDimension; //sprite.pixelSize;
		pulse = entity.pulse;
		sw = (ps * 0.75 * (cos((frameCount+pulse)*0.3) * sin((frameCount+pulse)*0.1))) + 
		     (ps * 0.25);
		swh = sw*0.5;
		lightCtx.drawImage(sprite.canvas, 0, 0, sprite.pixelSize, sprite.pixelSize, px-swh, py-swh, sw, sw);
	}
})();

/**
 * Draws a marker.
 */
const drawMarker = (function() {
	let sw = 0.0, swh = 0.0, px = 0.0, py = 0.0, ps = 0.0, sprite;
	return function drawMarker(entity) {
		updateCompositeOperation(lightCtx, "lighter");
		px = screenSpace(entity.pos[0]);
		py = screenSpace(entity.pos[1]);
		sprite = sprites.markers.get();
		ps = Math.pow(100 - entity.mass, 1.5)*0.5;

		sw = ps;// * 0.55 * sin((frameCount)*0.3) + (ps * 0.45);
		swh = sw*0.5;
		lightCtx.drawImage(sprite.canvas, 0, 0, sprite.pixelSize, sprite.pixelSize, px-swh, py-swh, sw, sw);

		sw = ps * cos(frameCount*10);
		swh = sw*0.5;
		lightCtx.drawImage(sprite.canvas, 0, 0, sprite.pixelSize, sprite.pixelSize, px-swh, py-swh, sw, sw);
	}
})();


/**
 * Draws a void.
 */
const drawVoid = (function() {
	let sc = 0.0, sch = 0.0, px = 0.0, py = 0.0, ox = 0.0, oy = 0.0, sprite, 
	    sw = 0.0, swh = 0.0, colorIndex = 0|0;
	return function drawVoid(entity) {
		px = screenSpace(entity.pos[0]);
		py = screenSpace(entity.pos[1]);

		sc = entity.size * displayProps.minDimension * 1+(sin(frameCount*0.2));
		sch = sc*0.5;

		sprite = sprites.voids.get();
		updateCompositeOperation(darkCtx, "source-over");
		darkCtx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);
		switch(entity.lastMeal) {
			case -1:colorIndex = 0x888; break;
			case COLOR_R:colorIndex = 0xf44; break;
			case COLOR_G:colorIndex = 0x4f4; break;
			case COLOR_B:colorIndex = 0x44f; break;
		}
		// white patch
		sw = sc*1.7;
		swh = sw*0.5;
		ox = sin(frameCount*0.0127)*sc*0.1;
		oy = cos(frameCount*0.0127)*sc*0.1;
		sprite = sprites.motes.get(0xfff);
		updateCompositeOperation(darkCtx, "soft-light");
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
		// color patch
		sw = sc*1.2;
		swh = sw*0.5;
		ox = cos(frameCount*0.023)*sc*0.13;
		oy = sin(frameCount*0.023)*sc*0.13;
		sprite = sprites.motes.get(colorIndex);
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
		// dark patch
		sprite = sprites.motes.get(0x000);
		sw = sc*1.65;
		swh = sw*0.5;
		ox = sin(frameCount*0.0122)*sc*0.15;
		oy = cos(frameCount*0.0122)*sc*0.15;
		updateCompositeOperation(darkCtx, "multiply");
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
	}
})();

/**
 * Draws an emitter.
 */
const drawEmitter = (function() {
	let sc = 0.0, sch = 0.0, px = 0.0, py = 0.0, ox = 0.0, oy = 0.0, sprite, 
	    sw = 0.0, swh = 0.0;
	return function drawEmitter(entity) {
		updateCompositeOperation(lightCtx, "lighter");
		px = screenSpace(entity.pos[0]);
		py = screenSpace(entity.pos[1]);

		sc = entity.size * displayProps.minDimension;
		//sc = sc + (sc*(sin(frameCount*0.05))/100);
		sch = sc*0.5;

		sprite = sprites.emitters.get();
		lightCtx.drawImage(sprite.canvas, px-sch, py-sch, sc, sc);

		sw = cos((frameCount)*0.2)*sc*1.7;
		swh = sw*0.5;

		sprite = sprites.motes.get(0x333);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-swh, py-swh, sw, sw);

		try {
		sw = sc*1.3;
		swh = sw*0.5;
		ox = sin(frameCount*0.08)*sc*(0.1 - (entity.ratios[0]*0.1));
		oy = cos(frameCount*0.08)*sc*(0.1 - (entity.ratios[0]*0.1));
		sprite = sprites.motes.get(entity.ratios[0]*15.9 << 8);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);

		sw = sc*1.3;
		swh = sw*0.5;
		ox = sin(frameCount*0.08+2.094394)*sc*(0.1 - (entity.ratios[1]*0.1));
		oy = cos(frameCount*0.08+2.094394)*sc*(0.1 - (entity.ratios[1]*0.1));
		sprite = sprites.motes.get(entity.ratios[1]*15.9 << 4);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);

		sw = sc*1.3;
		swh = sw*0.5;
		ox = sin(frameCount*0.08+4.188789)*sc*(0.1 - (entity.ratios[2]*0.1));
		oy = cos(frameCount*0.08+4.188789)*sc*(0.1 - (entity.ratios[2]*0.1));
		sprite = sprites.motes.get(~~(entity.ratios[2]*15.9));
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px+ox-swh, py+oy-swh, sw, sw);
		} catch (e) {console.log(e.message)}
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
	function drawAntiPlasma(offset, length) {
		ox = sin(frameCount*0.08+offset)*sc*length;
		oy = cos(frameCount*0.08+offset)*sc*length;
		plasmaTarget[0] = px+ox;
		plasmaTarget[1] = py+oy;
		drawPlasmaLine(darkCtx, plasmaSource, plasmaTarget, outerColor, innerColor, lw);
	}
	return function drawAntiGravitonCluster(entity) {
		updateCompositeOperation(darkCtx, "multiply");
		px = screenSpace(entity.pos[0]);
		py = screenSpace(entity.pos[1]);

		size = entity.size * displayProps.minDimension;
		sc = size;
		lw = min(4, ~~(sc/2));
		sch = sc*0.5;
		plasmaSource[0] = px;
		plasmaSource[1] = py;

		drawAntiPlasma(0, 0.5);
		drawAntiPlasma(pi3rd*2, 0.5);
		drawAntiPlasma(pi3rd*4, 0.5);
		drawAntiPlasma(pi3rd, 0.25);
		drawAntiPlasma(pi3rd*3, 0.25);
		drawAntiPlasma(pi3rd*5, 0.25);

		sprite = sprites.motes.get(0x000);
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px-sch, py-sch, sc, sc);
	}
})();

export const init = function(display) {
	displayProps = display.props;
	timing = display.timing;
	lightBuffer = display.buffersByLabel.entitiesLight;
	darkBuffer = display.buffersByLabel.entitiesDark;
	lightCtx = lightBuffer.context;
	darkCtx = darkBuffer.context;
	updateProps();
	displayProps.events.on("resize", updateProps);
	sprites.init(displayProps);
}

/**
 * Draw call for all entities. Loops through game entities and draws them according
 * to kind and displayProps.
 */
export const draw = (function() {
	// these variables are shared by draw calls below
	let i, l, entity, px, py;
	let lightClearStyle = "rgba(0,0,0,0.2)";
	let darkClearStyle  = "rgba(0,0,0,0.1)";

	return function draw(state) {
		updateCompositeOperation(lightCtx, "destination-out"); //"source-over");
		lightCtx.fillStyle = lightClearStyle;
		lightCtx.fillRect(0, 0, lightBuffer.width, lightBuffer.height);
		updateCompositeOperation(darkCtx, "destination-out");
		darkCtx.fillStyle = darkClearStyle;
		darkCtx.clearRect(0, 0, darkBuffer.width, darkBuffer.height);
		frameCount = timing.frameCount;
		let mask = sprites.ui.get("mask");
		for(i = 0, l = state.entities.length; i < l; ++i) {
			entity = state.entities[i];
			px = screenSpace(entity.pos[0]);
			py = screenSpace(entity.pos[1]);
			if(offscreen(px, py)) continue;
			if(entity instanceof Mote) drawMote(entity);
			else if(entity instanceof Photon) drawPhoton(entity);
			else if(entity instanceof Void) drawVoid(entity);
			else if(entity instanceof Emitter) drawEmitter(entity);
			else if(entity instanceof AntiGravitonCluster) drawAntiGravitonCluster(entity);
			else if(entity instanceof Ripple) drawMarker(entity);
		}
		updateCompositeOperation(lightCtx, "destination-out");
		lightCtx.drawImage(mask.canvas, 0, 0, displayProps.minDimension, displayProps.minDimension);
		updateCompositeOperation(darkCtx, "destination-out");
		darkCtx.drawImage(mask.canvas, 0, 0, displayProps.minDimension, displayProps.minDimension);
	}
})();

function updateProps() {
	let {width, height, minDimension, orientation} = displayProps;
	let ox, oy;
	lightBuffer.width = darkBuffer.width = minDimension;
	lightBuffer.height = darkBuffer.height = minDimension;
	if(orientation) {
		ox = 0;
		oy = (height-width)/2;	
	}
	else {
		ox = (width-height)/2;
		oy = 0;
	}
	lightBuffer.offsetX = darkBuffer.offsetX = ox;
	lightBuffer.offsetY = darkBuffer.offsetY = oy;
}
