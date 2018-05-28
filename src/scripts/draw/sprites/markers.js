"use strict";
import {scaleSprite} from "./util";

var sprite;

export function init(props) {
  let pixelSize = scaleSprite(props.minDimension, 1);
  let hps = ~~(pixelSize / 2);
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let context = canvas.getContext("2d");
  let g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
  g.addColorStop(0.0, "rgba(255,255,255,0.0)");
  g.addColorStop(0.75, "rgba(255,255,255,0.0)");
  g.addColorStop(0.8, "rgba(255,255,255,0.007)");
  g.addColorStop(0.85, "rgba(255,255,255,0.007)");
  g.addColorStop(0.9, "rgba(255,255,255,0.0)");
  context.fillStyle = g;
  context.fillRect(0, 0, pixelSize, pixelSize);
  sprite = {
    canvas:canvas,
    context:context,
    pixelSize:pixelSize,
    w:pixelSize,
    h:pixelSize
  }
}

export function get() {return sprite;}
