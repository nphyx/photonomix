"use strict";
import * as bokeh from "./bokeh";
import * as entities from "./entities";
import * as sprites from "./sprites";
import * as ui from "./ui";
export {bokeh, entities, sprites, ui};

let animating = false; // whether the game is currently running animation loop
let game; // game environment object
let props; // display properties

/**
 * Using this checks and avoids altering the canvas context state machine if unnecessary,
 * which theoretically saves a little time.
 */
export function updateCompositeOperation(ctx, op) {
  if(ctx.globalCompositeOperation !== op) ctx.globalCompositeOperation = op;
}

/**
 * Calculates the screenspace pixel offset of a coordinate from the [-1,1] coordinate
 * range used in game position vectors.
 */
export function screenSpace(x) {
  return ((x + 1) / 2) * props.minDimension;
}

/**
 * Finds the screen space equivalent of the game space vector v. Centering is handled
 * at a higher level so it's not accounted for here.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */

export function screenSpaceVec(v, out) {
  out[0] = ((v[0] + 1) / 2) * props.minDimension;
  out[1] = ((v[1] + 1) / 2) * props.minDimension;
  return out;
}

/**
 * Finds the game space equivalent of the sceen space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */
export function gameSpaceVec(v, out) {
  if(props.orientation === 0) {
    out[0] = (((v[0] - (props.width - props.height) / 2) / props.minDimension) * 2) - 1;
    out[1] = (((v[1]) / props.minDimension) * 2) - 1;
  }
  else {
    out[0] = (((v[0]) / props.minDimension) * 2) - 1;
    out[1] = (((v[1] - (props.height - props.width) / 2) / props.minDimension) * 2) - 1;
  }
  return out;
}

/**
 * Checks if entity is out of screen space by more than 50%.
 */
export function offscreen(x, y) {
  return (
    x < (props.width  * -0.5) || x > props.width   * 1.5 ||
		y < (props.height * -0.5) || y > props.height * 1.5
  )
}

/**
 * Draws a colored circle.
 */
export function drawCircle(ctx, x, y, size, fillStyle, lineWidth = 0, strokeStyle = undefined) {
  ctx.globalCompositeOperation = "source-over";
  ctx.beginPath();
  ctx.arc(x, y, size, 2 * Math.PI, false);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  if(strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.closePath();
}


/**
 * Main animation loop.
 */
export function tick() {
  if(!animating) animating = true;
  bokeh.draw();
  entities.draw(game);
  ui.draw(game);
}

/**
 * Initializes game environment.
 */
export function init(state, display) {
  game = state.game;
  props = display.props;
  bokeh.init(display);
  entities.init(display);
  ui.init(display);
}
