"use strict";

import {PHOTON_BASE_SIZE} from "../../photonomix.constants.js";
import {COLOR_R, COLOR_G, COLOR_B} from "../../game/Photon.js";

const sprites = Array(3);

export function init(props) {
	sprites[COLOR_R] = createPhotonSprite(props.minDimension, PHOTON_BASE_SIZE, "red");
	sprites[COLOR_G] = createPhotonSprite(props.minDimension, PHOTON_BASE_SIZE, "green");
	sprites[COLOR_B] = createPhotonSprite(props.minDimension, PHOTON_BASE_SIZE, "blue");
}

export function get(color) {
	return sprites[color];
}

/**
 * Creates a photon sprite.
 */
function createPhotonSprite(scale, spriteSize, color) {
	let pixelSize = 17;
	let hps = ~~(pixelSize/2);
	let qps = ~~(pixelSize/4);
	let canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	let context = canvas.getContext("2d");
	let g;
	g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.7, color);
	g.addColorStop(1.0, "white");
	context.globalCompositeOperation = "source-over";
	context.beginPath();
	context.moveTo(hps, 0);
	context.quadraticCurveTo(hps, hps, 0, hps);
	context.quadraticCurveTo(hps, hps, hps, pixelSize);
	context.quadraticCurveTo(hps, hps, pixelSize, hps);
	context.quadraticCurveTo(hps, hps, hps, 0);
	context.fillStyle = g;
	context.fill();
	context.closePath();
	context.beginPath();
	context.moveTo(hps, qps);
	context.lineTo(hps, pixelSize-qps);
	context.moveTo(qps, hps);
	context.lineTo(pixelSize-qps, hps);
	context.strokeStyle = "white";
	context.lineWidth = 1;
	context.stroke();
	context.closePath();
	return {
		canvas:canvas,
		context:context,
		pixelSize:pixelSize,
		w:pixelSize,
		h:pixelSize
	}
}
