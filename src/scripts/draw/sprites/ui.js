"use strict";

var sprites = {
  mask:undefined
}

export function get(which) {
  return sprites[which];
}

export function init(display) {
  let pixelSize = display.minDimension;
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let ctx = canvas.getContext("2d");
  let g = ctx.createRadialGradient(
    pixelSize / 2, pixelSize / 2, pixelSize / 2,
    pixelSize / 2, pixelSize / 2, 0
  );
  g.addColorStop(1, "rgba(0,0,0,0.0)");
  g.addColorStop(0.05, "rgba(0,0,0,0.0)");
  g.addColorStop(0.0, "rgba(255,255,255,1.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, pixelSize, pixelSize);
  sprites.mask = {
    canvas:canvas,
    context:ctx,
    w:pixelSize,
    h:pixelSize,
    pixelSize:pixelSize
  }
}
