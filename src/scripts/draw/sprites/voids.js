"use strict";
import {scaleSprite} from "./util";

var sprite;

/**
 * Creates a void sprite.
 */
export function init(props) {
  let pixelSize = scaleSprite(props.minDimension, 1);
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let ctx = canvas.getContext("2d");
  let g = ctx.createRadialGradient(
    pixelSize / 2, pixelSize / 2, pixelSize / 2,
    pixelSize / 2, pixelSize / 2, 0
  );
  g.addColorStop(1, "rgba(0,0,0,1.0)");
  g.addColorStop(0.50, "rgba(0,0,0,1.0)");
  g.addColorStop(0.479, "rgba(0,0,0,0.99)");
  g.addColorStop(0.442, "rgba(0,0,0,0.98)");
  g.addColorStop(0.44, "rgba(255,255,255,0.95)");
  g.addColorStop(0.43, "rgba(255,255,255,0.95)");
  g.addColorStop(0.41, "rgba(255,255,255,0.39)");
  g.addColorStop(0.37, "rgba(255,255,255,0.29)");
  g.addColorStop(0.36, "rgba(255,255,255,0.32)");
  g.addColorStop(0.34, "rgba(255,255,255,0.31)");
  g.addColorStop(0.30, "rgba(255,255,255,0.35)");
  g.addColorStop(0.28, "rgba(255,255,255,0.39)");
  g.addColorStop(0.26, "rgba(255,255,255,0.35)");
  g.addColorStop(0.23, "rgba(255,255,255,0.30)");
  g.addColorStop(0.21, "rgba(255,255,255,0.26)");
  g.addColorStop(0.20, "rgba(255,255,255,0.31)");
  g.addColorStop(0.19, "rgba(255,255,255,0.34)");
  g.addColorStop(0.17, "rgba(255,255,255,0.29)");
  g.addColorStop(0.16, "rgba(255,255,255,0.21)");
  g.addColorStop(0.15, "rgba(255,255,255,0.19)");
  g.addColorStop(0.14, "rgba(255,255,255,0.15)");
  g.addColorStop(0.10, "rgba(255,255,255,0.09)");
  g.addColorStop(0.09, "rgba(255,255,255,0.15)");
  g.addColorStop(0.07, "rgba(255,255,255,0.12)");
  g.addColorStop(0.05, "rgba(255,255,255,0.09)");
  g.addColorStop(0.0, "rgba(0,0,0,0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, pixelSize, pixelSize);
  sprite = {
    canvas:canvas,
    context:ctx,
    w:pixelSize,
    h:pixelSize,
    pixelSize:pixelSize
  }
}

export function get() {
  return sprite;
}
