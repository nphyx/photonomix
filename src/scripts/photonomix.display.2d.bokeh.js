/**
 * Derived from bokeh generator by Jack Rugile at [CodePen](http://codepen.io/jackrugile/pen/gaFub)
 */
"use strict";
import * as sprites from "./photonomix.display.2d.sprites";
let c1, c2, ctx1, ctx2,
	tau = Math.PI * 2,
	parts = [],
	sizeBase,
	cw,
	ch,
	hue,
	opt,
	count;

function rand( min, max ) {
	return Math.random() * (max - min) + min;
}

function hsla( h, s, l, a ) {
	return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
}
	
export function create(screen1, screen2, w, h) {
	c1 = screen1.canvas;
	ctx1 = screen1.context;
	c2 = screen2.canvas;
	ctx2 = screen2.context;
	cw = w;
	ch = h;

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
	ctx1.fillStyle = "#000000";
	ctx1.fillRect(0, 0, cw, ch);
	ctx1.globalCompositeOperation = "lighter";
	while(count--) {
		let radius = rand(opt.radiusMin, opt.radiusMax),
			blur = rand(opt.blurMin, opt.blurMax),
			x = rand(0, cw),
			y = rand(0, ch),
			hue = rand(opt.hueMin, opt.hueMax),
			saturation = rand(opt.saturationMin, opt.saturationMax),
			lightness = rand(opt.lightnessMin, opt.lightnessMax),
			alpha = rand(opt.alphaMin, opt.alphaMax);

		ctx1.shadowColor = hsla(hue, saturation, lightness, alpha);
		ctx1.shadowBlur = blur;
		ctx1.beginPath();
		ctx1.arc(x, y, radius, 0, tau);
		ctx1.closePath();
		ctx1.fill();
	}
	
	parts.length = 0;
	for( var i = 0; i < Math.floor( ( cw + ch ) * 0.01 ); i++ ) {
		parts.push({
			radius: rand( sizeBase * 0.01, sizeBase * 0.04 ),
			x: rand( 0, cw ),
			y: rand( 0, ch ),
			angle: rand( 0, tau ),
			vel: rand( 0.05, 0.2 ),
			tick: rand( 0, 10000 )
		});
	}
}

export function draw() {
	var i = parts.length;
	ctx2.fillStyle = "rgba(0,0,0,0)";
	ctx2.globalCompositeOperation = "source-over";
	ctx2.clearRect(0,0,cw,ch);
	ctx2.shadowBlur = 15;
	ctx2.shadowColor = "#fff";
	while(i--) {
		var part = parts[i];
		
		part.x += Math.cos(part.angle) * part.vel;
		part.y += Math.sin(part.angle) * part.vel;
		part.angle += rand(-0.05, 0.05);
		
		ctx2.beginPath();
		ctx2.arc(part.x, part.y, part.radius, 0, tau);
		ctx2.fillStyle = hsla(0, 0, 100, 0.03 + Math.cos( part.tick * 0.02 ) * 0.01);
		ctx2.fill();
		
		if(part.x - part.radius > cw) part.x = -part.radius;
		if(part.x + part.radius < 0) part.x = cw + part.radius;
		if(part.y - part.radius > ch) part.y = -part.radius;
		if(part.y + part.radius < 0) part.y = ch + part.radius;
		
		part.tick++;
	}
}
