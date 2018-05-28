"use strict";
import * as vectrix from "@nphyx/vectrix";
import * as valloc from "@nphyx/valloc";
import {BufferPool} from "../bufferPools";
import {drag} from "../util";
import {TARGET_FPS, GLOBAL_DRAG, PHOTON_LIFETIME, PHOTON_BASE_SIZE, MAX_PHOTONS, TYPE_PHOTON} from "../constants";
let {vec2, times, mut_copy} = vectrix.vectors;
let {mut_plus} = vectrix.matrices;
const {random} = Math;

const I8 = 1;
const F32 = 4;
const O_POS = 0;
const O_VEL = F32 * 2;
const FLOAT_LENGTH = O_VEL + F32 * 2;
const O_COLOR = 0;
const O_LIFE = O_COLOR + I8;
const O_MASS = O_LIFE + I8;
const O_PULSE = O_MASS + I8;
const U8_LENGTH = O_PULSE + I8;
export const BUFFER_LENGTH = (FLOAT_LENGTH + U8_LENGTH) + (F32 - (FLOAT_LENGTH + U8_LENGTH) % F32);
export const COLOR_R = 0, COLOR_G = 1, COLOR_B = 2;

const BUFFER_POOL = new BufferPool(BUFFER_LENGTH, MAX_PHOTONS);

export const pool = valloc.create(MAX_PHOTONS, {
  factory:(i) => create(i),
  init:(photon, ipos, ivel, color) => {
    mut_copy(photon.pos, ipos)
    mut_copy(photon.vel, ivel)
    photon.lifetime = PHOTON_LIFETIME
    photon.size = PHOTON_BASE_SIZE
    photon.color = color
    photon.mass = 1
    photon.pulse = ~~(TARGET_FPS * random())
    photon.active = true
  },
  clean:(photon) => {
    photon.pos.fill(0.0)
    photon.vel.fill(0.0)
    photon.intVals.fill(0)
    photon.active = false
  }
})

export const eachActive = pool.eachActive

export function tick(surrounding, delta) {
  let tmpvec = vec2()
  pool.eachActive((photon, i) => {
    if(photon.lifetime > 0) photon.lifetime--
    mut_plus(photon.pos, times(photon.vel, delta, tmpvec))
    mut_plus(photon.vel, drag(photon.vel, GLOBAL_DRAG))
    if(photon.lifetime <= 0) pool.freeIndex(i)
  })
}

export function create(index) {
  const buffer = BUFFER_POOL.buffer
  const offset = BUFFER_POOL.allocate()
  const photon = {}
  const intVals = new Uint8ClampedArray(buffer, FLOAT_LENGTH + offset, U8_LENGTH)
  let active = false

  Object.defineProperties(photon, {
    index: {get: () => index},
    type: {get:() => TYPE_PHOTON},
    intVals: {value: intVals},
    pos: {value: vec2(0.0, 0.0, buffer, O_POS + offset)},
    vel: {value: vec2(0.0, 0.0, buffer, O_VEL + offset)},
    color: {get:() => intVals[O_COLOR], set:(x) => intVals[O_COLOR] = x},
    lifetime: {get:() => intVals[O_LIFE], set:(x) => intVals[O_LIFE] = x},
    mass: {get:() => intVals[O_MASS], set:(x) => intVals[O_MASS] = x},
    pulse: {get:() => intVals[O_PULSE], set:(x) => intVals[O_PULSE] = x},
    active: {get:() => active, set:(bool) => active = !!bool}
  })

  return photon
}
