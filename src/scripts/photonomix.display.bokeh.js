/**
 * Derived from bokeh generator by Jack Rugile at [CodePen](http://codepen.io/jackrugile/pen/gaFub)
 */
"use strict";
//import * as sprites from "./photonomix.display.sprites";
let bgBuffer, bokehBuffer, bgCtx, bokehCtx, cw, ch, w, h, tau = Math.PI * 2,
	parts = [], sizeBase, hue, opt, count, displayProps;

function rand( min, max ) {
	return Math.random() * (max - min) + min;
}

function hsla( h, s, l, a ) {
	return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
}
	
export function init(buffer1, buffer2, props) {
	displayProps = props;
	bgBuffer = buffer1;
	bgCtx = bgBuffer.context;
	bokehBuffer = buffer2;
	bokehCtx = bokehBuffer.context;
	updateProps();
	displayProps.events.on("resize", updateProps);
	// this can't get resized or we'd have to regenerate it, so set it up now
	cw = bgBuffer.width = 1920;
	ch = bgBuffer.height = 1920; 
	w = bokehBuffer.width;
	h = bokehBuffer.height;

	sizeBase = cw + ch;
	count = Math.floor(sizeBase * 0.1);
	hue = rand(0, 360);
	opt = {
		radiusMin: sizeBase * 0.02,
		radiusMax: sizeBase * 0.10,
		blurMin: sizeBase * 0.01,
		blurMax: sizeBase * 0.04,
		hueMin: hue,
		hueMax: hue + rand(25,75),
		saturationMin: 10,
		saturationMax: 70,
		lightnessMin: 1,
		lightnessMax: 5,
		alphaMin: 0.1,
		alphaMax: 0.4
	}
	bgCtx.fillStyle = "#000000";
	bgCtx.fillRect(0, 0, cw, ch);
	bgCtx.globalCompositeOperation = "lighter";
	while(count--) {
		let radius = rand(opt.radiusMin, opt.radiusMax),
			blur = rand(opt.blurMin, opt.blurMax),
			x = rand(0, cw),
			y = rand(0, ch),
			hue = rand(opt.hueMin, opt.hueMax),
			saturation = rand(opt.saturationMin, opt.saturationMax),
			lightness = rand(opt.lightnessMin, opt.lightnessMax),
			alpha = rand(opt.alphaMin, opt.alphaMax);

		bgCtx.shadowColor = hsla(hue, saturation, lightness, alpha);
		bgCtx.shadowBlur = blur;
		bgCtx.beginPath();
		bgCtx.arc(x, y, radius, 0, tau);
		bgCtx.fill();
		bgCtx.closePath();
	}
	
	parts.length = 0;
	for( var i = 0; i < Math.floor( ( w + h ) * 0.01 ); i++ ) {
		parts.push({
			radius: rand( sizeBase * 0.01, sizeBase * 0.04 ),
			x: rand( 0, w ),
			y: rand( 0, h ),
			angle: rand( 0, tau ),
			vel: rand( 0.05, 0.2 ),
			tick: rand( 0, 10000 )
		});
	}
}

export function draw() {
	var i = parts.length;
	bokehCtx.fillStyle = "rgba(0,0,0,0)";
	bokehCtx.globalCompositeOperation = "source-over";
	bokehCtx.clearRect(0,0,cw,ch);
	bokehCtx.shadowBlur = 15;
	bokehCtx.shadowColor = "#fff";
	w = bokehBuffer.width;
	h = bokehBuffer.height;
	while(i--) {
		var part = parts[i];
		
		part.x += Math.cos(part.angle) * part.vel;
		part.y += Math.sin(part.angle) * part.vel;
		part.angle += rand(-0.05, 0.05);
		
		bokehCtx.beginPath();
		bokehCtx.arc(part.x, part.y, part.radius, 0, tau);
		bokehCtx.fillStyle = hsla(0, 0, 100, 0.03 + Math.cos( part.tick * 0.02 ) * 0.01);
		bokehCtx.fill();
		
		if(part.x - part.radius > cw) part.x = -part.radius;
		if(part.x + part.radius < 0) part.x = w + part.radius;
		if(part.y - part.radius > ch) part.y = -part.radius;
		if(part.y + part.radius < 0) part.y = h + part.radius;
		
		part.tick++;
	}
}

function updateProps() {
	bokehBuffer.width = displayProps.width;
	bokehBuffer.height = displayProps.height;
}
