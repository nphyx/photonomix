/**
 * Derived from bokeh generator by Jack Rugile at [CodePen](http://codepen.io/jackrugile/pen/gaFub)
 */
"use strict";
import {shuffle} from "../photonomix.util.js";
let bgBuffer, bokehBuffer, bgCtx, bokehCtx, tau = Math.PI * 2, parts = [], displayProps;

function rand( min, max ) {
	return Math.random() * (max - min) + min;
}

function hsla( h, s, l, a ) {
	return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
}
	
export function init(display) {
	displayProps = display.props;
	bgBuffer = display.buffersByLabel.bokehBack;//buffer1;
	bgCtx = bgBuffer.context;
	bokehBuffer = display.buffersByLabel.bokehFront; //buffer2;
	bokehCtx = bokehBuffer.context;

	let sizeBase = bgBuffer.width + bgBuffer.height;
	let w = bokehBuffer.width;
	let h = bokehBuffer.height;


	parts.length = 0;
	for( var i = 0; i < Math.floor( ( w + h ) * 0.01 ); i++ ) {
		parts.push({
			radius: rand( sizeBase * 0.005, sizeBase * 0.02 ),
			x: rand( 0, w ),
			y: rand( 0, h ),
			angle: rand( 0, tau ),
			vel: rand( 0.05, 0.2 ),
			tick: rand( 0, 10000 )
		});
	}

	generateBackground();
	displayProps.events.on("resize", generateBackground);
}

export function generateBackground() {
	let w = bokehBuffer.width;
	let h = bokehBuffer.height;
	let mind = Math.min(w, h);
	let maxd = Math.max(w, h);
	bgCtx.fillStyle = "black";
	bgCtx.fillRect(0, 0, w, h);
	let g = bgCtx.createLinearGradient(0, 0, w, h);
	let colors = [
		"rgba(255,64,64,1.0)",
		"rgba(64,255,64,1.0)",
		"rgba(64,64,255,1.0)"
	];
	shuffle(colors);
	g.addColorStop(0.0, colors[0]);
	g.addColorStop(0.5, colors[1]);
	g.addColorStop(1.0, colors[2]);
	bgCtx.fillStyle = g;
	bgCtx.fillRect(0, 0, w, h);
	g = bgCtx.createLinearGradient(0, h, w, 0);
	colors = [
		"rgba(255,64,64,0.8)",
		"rgba(64,255,64,0.8)",
		"rgba(64,64,255,0.8)"
	];
	shuffle(colors);
	g.addColorStop(0.0, colors[0]);
	g.addColorStop(0.5, colors[1]);
	g.addColorStop(1.0, colors[2]);
	bgCtx.fillStyle = g;
	bgCtx.fillRect(0, 0, w, h);

	g = bgCtx.createRadialGradient(w/2, h/2, maxd/2, w/2, h/2, 0);
	let rad = ((maxd - mind) / maxd);
	console.log(rad);
	g.addColorStop(1, "rgba(64,64,64,0.6)");
	g.addColorStop(rad + 0.06, "rgba(0,0,0,0.8)");
	g.addColorStop(rad + 0.05, "rgba(128,128,128,1.0)");
	g.addColorStop(rad + 0.04, "rgba(255,255,255,0.6)");
	g.addColorStop(rad + 0.03, "rgba(255,255,255,0.8)");
	g.addColorStop(rad + 0.025, "rgba(255,255,255,0.8)");
	g.addColorStop(rad + 0.005, "rgba(255,255,255,0.5)");
	/*
	g.addColorStop(rad + 0.07, "rgba(0,0,0,0.8)");
	g.addColorStop(rad + 0.085, "rgba(128,128,128,1.0)");
	g.addColorStop(rad + 0.10, "rgba(255,255,255,0.6)");
	g.addColorStop(rad + 0.11, "rgba(255,255,255,0.8)");
	g.addColorStop(rad + 0.13, "rgba(255,255,255,0.8)");
	g.addColorStop(rad + 0.16, "rgba(255,255,255,0.5)");
	*/
	g.addColorStop(0, "rgba(255,255,255,0.01)");
	bgCtx.fillStyle = g;
	bgCtx.globalCompositeOperation = "luminosity";
	bgCtx.fillRect(0, 0, w, h);
	bgCtx.globalCompositeOperation = "source-in";
}

export function draw() {
	var i = parts.length;
	let w = bokehBuffer.width;
	let h = bokehBuffer.height;
	bokehCtx.fillStyle = "rgba(0,0,0,0)";
	bokehCtx.globalCompositeOperation = "source-over";
	bokehCtx.clearRect(0, 0, w, h);
	bokehCtx.shadowBlur = 15;
	bokehCtx.shadowColor = "#fff";
	while(i--) {
		var part = parts[i];
		
		part.x += Math.cos(part.angle) * part.vel;
		part.y += Math.sin(part.angle) * part.vel;
		part.angle += rand(-0.05, 0.05);
		
		bokehCtx.beginPath();
		bokehCtx.arc(part.x, part.y, part.radius, 0, tau);
		bokehCtx.fillStyle = hsla(0, 0, 100, 0.03 + Math.cos( part.tick * 0.02 ) * 0.01);
		bokehCtx.fill();
		
		if(part.x - part.radius > w) part.x = -part.radius;
		if(part.x + part.radius < 0) part.x = w + part.radius;
		if(part.y - part.radius > h) part.y = -part.radius;
		if(part.y + part.radius < 0) part.y = h + part.radius;
		
		part.tick++;
	}
}
