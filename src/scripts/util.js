"use strict";
import * as vectrix from "@nphyx/vectrix";
import {VALIDATE_VECTORS, VALIDATE_VECTORS_DEBUG, GRAVITY} from "./constants";
const {vec2, magnitude, mut_normalize, distance, mut_times, mut_copy, mut_clamp} = vectrix.vectors;
const {minus} = vectrix.matrices;
const {sqrt, abs, E, pow, cos, sin, random, PI, max, min} = Math;
const X = 0, Y = 1;
const MIN_F = 1e-11;
const MAX_F = 1e+11;

/**
 * Twiddles a value by a small amount to avoid zeroes
 */
export function twiddle(x) {
  return x + (1e-11 * posneg());
}

export const twiddleVec = (function() {
  let i = 0 | 0, l = 0 | 0;
  return function twiddleVec(v) {
    for(i = 0, l = v.length; i < l; ++i) {
      v[i] = twiddle(v[i]);
    }
    return v;
  }
}());


export const validate = (function() {
  let i, l;
  return function validate(v) {
    for(i = 0, l = v.length; i < l; i++) {
      if(isNaN(v[i])) throw new Error("NaN vector");
      if(v[i] === Infinity) throw new Error("Infinite vector");
      if(v[i] === -Infinity) throw new Error("-Infinite vector");
    }
  }
}());

export const dist = (function () {
  let dist_diff = vec2();
  return function dist(a, b) {
    return magnitude(minus(a, b, dist_diff));
  }
}());

function limit(v, min_v = 0, max_v = Infinity) {
  if(abs(v) < abs(min_v)) {
    if(v < 0) v = -min_v;
    else v = min_v;
  }
  else if(abs(v) > abs(max_v)) {
    if(v < 0) v = -max_v;
    else v = max_v;
  }
  return v;
}

export const limitVecMut = (function() {
  let i = 0 | 0, l = 0 | 0;
  /**
	 * Limits absolute values of vectors within a range.
	 */
  return function limitVecMut(v, min_v = 0, max_v = Infinity) {
    for(i = 0, l = v.length; i < l; ++i) {
      v[i] = limit(v[i], min_v, max_v);
    }
  }
}());

/**
 * Gravitate toward target.
 */
export const gravitate = (function() {
  let g_v = vec2();
  let mag = 0.0, x = 0.0, y = 0.0, scale = 0.0;
  return function gravitate(p1, p2, strength, out) {
    out = out || g_v;
    minus(p1, p2, out);
    mag = magnitude(out);
    // inline normalize for speed, since this happens a lot
    x = out[0];
    y = out[1];
    if((x === 0 && y === 0) || mag === 0) return out;
    scale = mut_clamp(1 / sqrt((x * x) + (y * y)), MIN_F, MAX_F);
    strength = mut_clamp(strength, -MAX_F, MAX_F);
    out[0] = x * scale;
    out[1] = y * scale;
    //mut_normalize(out);
    mut_times(out, -strength * GRAVITY / (mag * mag));
    if(VALIDATE_VECTORS) {
      try {
        validate(out);
      }
      catch(e) {
        if(VALIDATE_VECTORS_DEBUG) {
          console.log("gravitation error", e);
          console.log(strength);
          minus(p1, p2, out);
          console.log("minus", out);
          limitVecMut(out, 0.00001, 10); // put a cap on it to avoid infinite acceleration
          console.log("limit", out);
          mag = magnitude(out);
          console.log("magnitude", mag);
          mut_normalize(out);
          console.log("normalize", out);
          mut_times(out, -strength / (mag * mag));
          console.log("scale", out);
        }
        out.fill(0.0);
      }
    }
    return out;
  }
}());

/**
 * Accelerate toward a target.
 */
export const accelerate = (function() {
  let v = vec2();
  let scale = 0.0, x = 0.0, y = 0.0;
  return function accelerate(p1, p2, strength, out) {
    out = out || v;
    minus(p1, p2, out);
    x = out[0];
    y = out[1];
    if(x === 0 && y === 0) return out;
    scale = mut_clamp(1 / sqrt((x * x) + (y * y)), MIN_F, MAX_F);
    strength = mut_clamp(strength, -MAX_F, MAX_F);
    // inline normalize for speed, since this happens a lot
    out[0] = x * scale;
    out[1] = y * scale;
    //mut_normalize(out);
    mut_times(out, -strength);
    if(VALIDATE_VECTORS) {
      try {
        validate(out);
      }
      catch(e) {
        if(VALIDATE_VECTORS_DEBUG) {
          console.log("acceleration error", e);
          console.log("strength", strength);
          minus(p1, p2, out);
          console.log("minus", out);
          mut_normalize(out);
          console.log("normalize", out);
          mut_times(out, -strength);
          console.log("scale", out);
        }
        out.fill(0.0);
      }
    }
    return out;
  }
}());


export const drag = (function() {
  let delta = vec2(), dragStrength = 0.0, dragSpeed = 0.0;
  let scale = 0.0, x = 0.0, y = 0.0;
  /**
	 * Apply drag.
	 */
  return function drag(vel, c, out) {
    out = out || delta;
    dragSpeed = magnitude(vel);
    // null small values
    dragSpeed = limit(dragSpeed, 0, 1e+11); // avoid infinite dragSpeeds
    dragStrength = mut_clamp(c * dragSpeed * dragSpeed, 1e-11, 1e+11);
    mut_copy(out, vel);
    x = out[0];
    y = out[1];
    if((x === 0 && y === 0) || dragStrength === 0) return out;
    // inline normalize for speed, since this happens a lot
    scale = mut_clamp(1 / sqrt((x * x) + (y * y)), MIN_F, MAX_F);
    dragStrength = mut_clamp(dragStrength, MIN_F, MAX_F);
    out[0] = x * scale;
    out[1] = y * scale;
    // mut_normalize(out)
    mut_times(out, -1);
    mut_times(out, dragStrength);
    if(VALIDATE_VECTORS) {
      try {
        validate(out);
      }
      catch(e) {
        if(VALIDATE_VECTORS_DEBUG) {
          console.log("drag error", e);
          console.log(c, dragSpeed, dragStrength);
          console.log("magnitude", magnitude(vel));
          mut_copy(out, vel);
          console.log("copied", out);
          mut_normalize(out);
          console.log("normalized", out);
          mut_times(out, -1);
          console.log("inverted", out);
          mut_times(out, dragStrength);
          console.log("scaled", out);
        }
        out.fill(0.0);
      }
    }
    return out;
  }
}());

export const avoid = (function() {
  let aev = vec2(), dist = 0.0;
  return function avoid(vel, pos, opposite, maxDist, speed, out) {
    dist = distance(pos, opposite) * maxDist;
    out = out || aev;
    out[0] = 0.0;
    out[1] = 0.0;
    if(dist > 1) {
      accelerate(pos, opposite, speed * dist * dist, out);
    }
    return out;
  }
}());

/**
 * absolute value of vector
 */
export const absVec = (function() {
  let i = 0 | 0, l = 0 | 0;
  return function absVec(v) {
    for(i = 0, l = v.length; i < l; ++i) {
      v[i] = abs(v[i]);
    }
    return v;
  }
}());

export const outOfBounds = (function() {
  return function outOfBounds(v, n) {
    let x = v[0];
    let y = v[1];
    if(x > n || x < -n) return true;
    else if(y > n || y < -n) return true;
    else return false;
  }
}());

/**
 * Smoothing using a sigmoid (logistic function) curve.
 * @param {float} x input value
 * @param {float} x0 midpoint of curve
 * @param {float} L limit of curve
 * @param {float} k slope of curve
 */
export function logisticSmooth(x, x0, L = x * 2, k = 1) {
  return L / (1 + pow(E, k * x - x0))
}

/**
 * A random function adjusted to a range of -1 to 1 and multiplied by a
 * scaling value
 */
export function adjRand(scale = 1) {
  return ((random() * 2) - 1) * scale
}

/**
 * Returns a delta velocity vector of the vector p rotated around center point c by
 * r radians.
 */
export const rotate = (function() {
  let cosr = 0.0, sinr = 0.0, rdx = 0.0, rdy = 0.0, rvec = vec2(), rdelta = vec2();
  return function rotate(p, c, r, out) {
    out = out || rvec;
    cosr = cos(r * PI);
    sinr = sin(r * PI);
    minus(p, c, rdelta);
    rdx = rdelta[X];
    rdy = rdelta[Y];
    out[X] = (rdx * cosr - rdy * sinr);
    out[Y] = (rdx * sinr + rdy * cosr);
    return out;
  }
}());

export function posneg() {
  return random() > 0.5 ? 1 : -1;
}

export function clamp(v, minv, maxv) {
  return max(min(v, maxv), minv);
}

export function ratio(a, b) { return a / (abs(a) + abs(b)) }
export function rat_vec2(v) { return ratio(v[X], v[Y]) }

export function norm_ratio(v, out) {
  let i = 0, len = v.length;
  out = out || new Float32Array(len);
  let sum = v.reduce((p, c) => p + c, 0);
  for(; i < len; ++i) out[i] = (v[i] !== 0 ? v[i] / sum : 0);
  return out;
}

/**
* Shuffles array in place. ES6 version
* @param {Array} a items The array containing the items.
*/
export const shuffle = (function() {
  let i = 0 | 0, j = 0 | 0;
  return function shuffle(a) {
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
}());

/**
 * Round to nearest even number.
 */
export function evenNumber(n) {
  return n >> 1 << 1;
}
/**
 * Tool for generating byte offsets.
 */
export const offsetter = (() => {
  const I8 = 1
  const F32 = 4
  let offset = 0
  let tmp = 0
  let obj = {
    i8: (length) => {
      tmp = offset
      offset += length * I8
      return tmp
    },
    f32: (length) => {
      tmp = offset
      offset += length * F32
      return tmp
    },
    round32: () => {
      return offset += (F32 - (offset % F32))
    }
  }
  Object.defineProperties(obj, {
    offset: {get: () => offset},
    I8_LENGTH: {get: () => I8},
    F32_LENGTH: {get: () => F32}
  })
  Object.freeze(obj)
  return obj
})()
