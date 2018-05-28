"use strict"
/**
 * Manages the generic part of entities in one big buffer.
 */
import vectors from "@nphyx/vectrix"
import BufferPool from "../bufferPool"
const {vec2} = vectors

import {BUFFER_TYPE, MAX_ENTITIES} from "../constants"
const F32 = Float32Array.BYTES_PER_ELEMENT
const I8 = Uint8ClampedArray.BYTES_PER_ELEMENT
const I32 = Int32Array.BYTES_PER_ELEMENT
const O_POS = 0
const O_VEL = O_POS + 2 * F32
const O_TYPE = O_VEL + 2 * F32
const O_ID = O_TYPE + I8
export const BUFFER_LENGTH = O_ID + I32

const ENTITY_INVALID = 0
const zeroVec = vec2(0,0)

const pool = new BufferPool(MAX_ENTITIES, BUFFER_LENGTH)
const buffer = pool.buffer
const dv = new DataView(buffer)


export function allocateEntity() {
  let o = pool.allocate()
  /*
  setPos(entBuf, o, zeroVec)
  setVel(ent, o, zeroVec)
  setType(ent, o, ENTITY_INVALID)
  setId(Ent, o, id)
  */
  return o
}

export function getPos(o) {
  return vec2(buffer, o + O_POS)
}

export function getVel(o) {
  return vec2(buffer, o + O_VEL)
}

export function getType(o) {
  return dv.getUint8(buffer, o + O_TYPE)
}

export function setType(o) {
  dv.setUint8Clamped(o + O_TYPE)
}

export function getId(o) {
  return dv.getInt32(o + O_ID)
}

export function setId(o) {
  return dv.getInt32(o + O_ID)
}
