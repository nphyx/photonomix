"use strict"
import {TARGET_FPS, MOTE_BASE_SPEED, MOTE_BASE_SIZE, MOTE_BASE_SIGHT,
  DEATH_THRESHOLD, PREGNANT_TIME, DEBUG, MAX_MOTES, TYPE_PHOTON, TYPE_MOTE} from "../constants"
import * as vectrix from "@nphyx/vectrix"
import * as valloc from "@nphyx/valloc"
import VanderPool from "@nphyx/vanderpool/src"
import {offsetter, accelerate, twiddleVec, adjRand, posneg, rotate} from "../util"
import {updateProperties, runMaintenance, discharge, split, search, eatPhoton, bleed, die} from "./motes.actions"
import {ACT_IDLE, ACT_SEARCH, ACT_CHASE, ACT_AVOID, ACT_ATTACK, ACT_LINK} from "./motes.actions"

const {vec2, times, magnitude, mut_copy} = vectrix.vectors
const {plus, mut_plus} = vectrix.matrices
let {random, sin} = Math

// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
const POS_C  = vec2(0.0, 0.0)

// twiddle to slightly offset the values, avoids divide by zero and other errors
// inherent to acceleration, friction, drag and gravity equations
twiddleVec(POS_C)
// relative color values derived from a Mote's photons, used to produce color string
// for rendering

let sum = (array) => array.reduce((p, c) => p + c, 0)

/*
// uint8 values = photons[3]
const U8_PHO  = 0,
  U8_COL  = U8_PHO        + I8 * 3,
  U8_VAL_LENGTH = U8_COL  + I8 * 3,
  I8_BYTE_OFFSET = U8_VAL_LENGTH
// int8 values =  dying, pregnant, injured, lastMeal, pulse
const	I8_DYING       = 0,
  I8_PREG        = I8_DYING       + I8,
  I8_INJURED     = I8_PREG        + I8,
  I8_LAST_INJURY = I8_INJURED     + I8,
  I8_MEAL        = I8_LAST_INJURY + I8,
  I8_UPD         = I8_MEAL        + I8,
  I8_PULSE       = I8_UPD         + I8,
  I8_ACT         = I8_PULSE       + I8,
  I8_VAL_LENGTH  = I8_ACT         + I8,
  INT_VAL_LENGTH = U8_VAL_LENGTH  + I8_VAL_LENGTH
*/

// float32 values = p[3], v[3], color[4], size, sizeMin, sizeMax, speed, sight, agro, fear, potential, resistance
// from here on, increments of value * 4
// vectors
/*
const VEC_BYTE_OFFSET = INT_VAL_LENGTH + (F32 - (INT_VAL_LENGTH % F32)), // float32 offsets must be multiples of 4
  F32_POS  = 0,
  F32_VEL  = F32_POS + 2,
  F32_RAT  = F32_VEL + 2,
  F32_PREF = F32_RAT + 3,
  VEC_VAL_LENGTH = F32_PREF + 3
*/

/*
const F32_BYTE_OFFSET = VEC_BYTE_OFFSET + (VEC_VAL_LENGTH * F32),
  // scalars
  F32_SIZE         = 0,
  F32_SIZE_MIN     = F32_SIZE       + 1,
  F32_SIZE_MAX     = F32_SIZE_MIN   + 1,
  F32_SPEED        = F32_SIZE_MAX   + 1,
  F32_SIGHT        = F32_SPEED      + 1,
  F32_AGRO         = F32_SIGHT      + 1,
  F32_FEAR         = F32_AGRO       + 1,
  F32_BASE_SPEED   = F32_FEAR       + 1,
  F32_BASE_SIGHT   = F32_BASE_SPEED + 1,
  F32_BASE_AGRO    = F32_BASE_SIGHT + 1,
  F32_BASE_FEAR    = F32_BASE_AGRO  + 1,
  F32_POTENTIAL    = F32_BASE_FEAR  + 1,
  F32_RESISTANCE   = F32_POTENTIAL  + 1,
  F32_MASS         = F32_RESISTANCE + 1,
  FLOAT_VAL_LENGTH = F32_MASS       + 1

export const BUFFER_LENGTH = F32_BYTE_OFFSET + (FLOAT_VAL_LENGTH * F32)
*/

// various consts below are indexes and byte counts for mote data
// byte length of these value types
const U8_VEC_OFFSET = 0
const int_vec_lengths = new Array(2).fill(3)
const [U8_PHO, U8_COL] = int_vec_lengths.map(offsetter.i8)
const U8_VEC_LENGTH = sum(int_vec_lengths)

const I8_VAL_OFFSET = offsetter.offset
const int_val_lengths = new Array(8).fill(1)
const [I8_PREG, I8_INJURED, I8_LAST_INJURY, I8_MEAL, I8_UPD , I8_PULSE, I8_ACT, I8_DYING] =
  int_val_lengths.map(offsetter.i8)
const I8_VAL_LENGTH = sum(int_val_lengths)

offsetter.round32()
const float_vec_lengths = [2,2,3,3]
const F32_VEC_OFFSET = offsetter.offset
const [F32_POS, F32_VEL, F32_RAT, F32_PREF] = float_vec_lengths.map(offsetter.f32)
const F32_VEC_LENGTH = sum(float_vec_lengths)

const F32_VAL_OFFSET = offsetter.offset
const float_val_lengths = new Array(14).fill(1)
const [F32_SIZE, F32_SIZE_MIN, F32_SIZE_MAX, F32_SPEED, F32_SIGHT, F32_AGRO,
  F32_FEAR, F32_BASE_SPEED, F32_BASE_SIGHT, F32_BASE_AGRO, F32_BASE_FEAR,
  F32_POTENTIAL, F32_RESISTANCE, F32_MASS] = float_val_lengths.map(offsetter.f32)
const F32_VAL_LENGTH = sum(float_val_lengths)

// scratch vectors used in various functions
const scratch1 = vec2(), scratch2 = vec2()

console.log('item length', offsetter.offset, 'max motes', MAX_MOTES)
console.log('           ', 'U8', 'I8', 'VEC', 'VAL')
console.log('offsets    ', U8_VEC_OFFSET, I8_VAL_OFFSET, F32_VEC_OFFSET, F32_VAL_OFFSET)
console.log('first item ', U8_PHO, I8_PREG, F32_POS, F32_SIZE)
console.log('lengths    ', U8_VEC_LENGTH, I8_VAL_LENGTH, F32_VEC_LENGTH, F32_VAL_LENGTH)
console.log('pool length', offsetter.offset)
const BUFFER_POOL = new VanderPool(offsetter.offset, MAX_MOTES)
export var current_population = 0

/**
 * @object mote
 * @property {vec2} pos position vector
 * @property {vec2} vel velocity vector
 * @property {Uint8} r red photon value (setter updates values and derived props)
 * @property {Uint8} g green photon value (setter updates value and derived props)
 * @property {Uint8} b blue photon value (setter updates value and derived props)
 * @property {Int8} dying counter from 1 to DEATH_THRESHOLD when a mote is dying
 * @property {Int8} pregnant coundown from PREGNANT_DURATION when a mote is pregnant
 * @property {Int8} injured injury counter, counts down in mote.bleed
 * @property {Int8} lastInjury strength of most recent injury taken
 * @property {Int8} pulse frame offset for pulse animation
 * @property {Int8} lastMeal color value for last meal (see R, G, B constants)
 * @property {Int8} action action choice in relation to target
 * @property {Float32} speed derived acceleration speed based on Mote properties
 * @property {Float32} sight derived vision radius based on Mote properties
 * @property {Float32} agro derived aggression factor based on Mote properties
 * @property {Float32} fear derived fearfulness factor based on Mote properties
 * @property {Float32} potential accumulated charge potential
 * @property {Float32} resistance accumulated resistance to charge
 * @property {Float32} size derived size radius as fraction of screen size
 * @property {Float32} sizeMin minimum size the mote can reach as it shrinks
 * @property {Float32} sizeMax maximum size the mote can reach as it grows
 * @property {UintClamped8Array} photons current photon values (R, G, B)
 * @property {UintClamped8Array} color current mote color (R, G, B)
 * @property {Int8Array} intVals direct access to integer value array
 * @property {Float32Array} ratios current photon ratios (R, G, B)
 * @property {Float32Array} prefs preferred photon ratios
 * @property {Float32Array} floatVals direct access to float value array
 * @return {Mote}
 */
function factory(poolIndex) {
  console.log('count')
  let buffer, offset
  BUFFER_POOL.allocate((b, o) => {buffer = b; offset = o;})

  // "private" properties
  // use a single buffer for properties so that they're guaranteed to be contiguous
  // in memory and typed
  let intVals = new Int8Array(buffer, I8_VAL_OFFSET + offset, I8_VAL_LENGTH)
  let floatVals =  new Float32Array(buffer, F32_VAL_OFFSET + offset, F32_VAL_LENGTH)
  let photons = new Uint8ClampedArray(buffer, U8_PHO + offset, 3)
  let color =  new Uint8ClampedArray(buffer, U8_COL + offset, 3)
  let ratios = new Float32Array(buffer, F32_RAT + offset, 3)
  let prefs = new Float32Array(buffer, F32_PREF + offset, 3)
  let active = false
  let mote = {
    pos: vec2(0.0, 0.0, buffer, F32_POS + offset),
    vel: vec2(0.0, 0.0, buffer, F32_VEL + offset),
    target: undefined
  }

  Object.defineProperties(mote, {
    photons:{get: () => photons},
    color:{get: () => color},
    dying:{get: () => intVals[I8_DYING], set: (v) => intVals[I8_DYING] = v},
    action:{get: () => intVals[I8_ACT], set: (v) => intVals[I8_ACT] = v},
    pregnant:{get: () => intVals[I8_PREG], set: (v) => intVals[I8_PREG] = v},
    injured:{get: () => intVals[I8_INJURED], set: (v) => intVals[I8_INJURED] = v},
    lastInjury:{get: () => intVals[I8_LAST_INJURY], set: (v) => intVals[I8_LAST_INJURY] = v},
    needsUpdate:{get: () => intVals[I8_UPD], set: (v) => intVals[I8_UPD] = v},
    pulse:{get: () => intVals[I8_PULSE], set: (v) => intVals[I8_PULSE] = v},
    lastMeal:{get: () => intVals[I8_MEAL], set: (v) => intVals[I8_MEAL] = v},
    size:{get: () => floatVals[F32_SIZE], set: (v) => floatVals[F32_SIZE] = v},
    sizeMin:{get: () => floatVals[F32_SIZE_MIN], set: (v) => floatVals[F32_SIZE_MIN] = v},
    sizeMax:{get: () => floatVals[F32_SIZE_MAX], set: (v) => floatVals[F32_SIZE_MAX] = v},
    base_speed:{get: () => floatVals[F32_BASE_SPEED], set: (v) => floatVals[F32_BASE_SPEED] = v},
    base_sight:{get: () => floatVals[F32_BASE_SIGHT], set: (v) => floatVals[F32_BASE_SIGHT] = v},
    base_agro:{get: () => floatVals[F32_BASE_AGRO], set: (v) => floatVals[F32_BASE_AGRO] = v},
    base_fear:{get: () => floatVals[F32_BASE_FEAR], set: (v) => floatVals[F32_BASE_FEAR] = v},
    speed:{get: () => floatVals[F32_SPEED], set: (v) => floatVals[F32_SPEED] = v},
    sight:{get: () => floatVals[F32_SIGHT], set: (v) => floatVals[F32_SIGHT] = v},
    agro:{get: () => floatVals[F32_AGRO], set: (v) => floatVals[F32_AGRO] = v},
    fear:{get: () => floatVals[F32_FEAR], set: (v) => floatVals[F32_FEAR] = v},
    potential:{get: () => floatVals[F32_POTENTIAL], set: (v) => floatVals[F32_POTENTIAL] = v},
    resistance:{get: () => floatVals[F32_RESISTANCE], set: (v) => floatVals[F32_RESISTANCE] = v},
    mass:{get: () => floatVals[F32_MASS], set: (v) => floatVals[F32_MASS] = v},
    offset:{get: () => offset},
    ratios:{get: () => ratios},
    prefs:{get: () => prefs},
    type: {get: () => TYPE_MOTE},
    poolIndex: {get: () => poolIndex},
    active: {get: () => active, set: (v) => !!v}
  })

  /*
   * Debug access only.
   */
  if(DEBUG) Object.defineProperties(mote, {
    intVals:{get: () => intVals},
    floatVals:{get: () => floatVals}
  })

  return mote
}

/**
 * Cleans up a mote's values, readying it to reuse.
 */
function clean(mote) {
  mote.pos.fill(0.0)
  mote.vel.fill(0.0)
  mote.intVals.fill(0)
  mote.floatVals.fill(0)
  mote.active = false
  current_population--
}

/**
 * Factory for initializing a new Mote from the buffer pool.
 * @param {Float32Array(3)} photons initial photons (0-255, R, G, B)
 * @param {vec2} pos initial position
 * @param {Float} bSpeed (optional) base acceleration: inheritance and predesigned motes
 * @param {Float} bSight (optional) base vision radius: inheritance and predesigned motes
 * @param {Float} bAgro (optional) base aggressiveness: inheritance and predesigned motes
 * @param {Float} bFear (optional) base fearfulness: inheritance and predesigned motes
 * @return {Mote}
 */
function init(mote, photons = new Uint8Array(3), pos = new Float32Array(2), bSpeed = MOTE_BASE_SPEED, bSight = MOTE_BASE_SIGHT, bAgro = 1.0, bFear = 1.0) {
  mut_copy(mote.pos, pos)
  mut_copy(mote.photons, photons)

  // set up initial and derived values
  mote.base_speed = bSpeed + adjRand(0.0005)
  mote.base_sight = bSight + adjRand(0.001)
  mote.base_agro = bAgro + adjRand(0.001)
  mote.base_fear = bFear + adjRand(0.001)
  mote.potential = mote.agro * 2
  mote.resistance = mote.fear * 2
  mote.lastMeal = ~~(random() * 3)
  mote.pulse = ~~(TARGET_FPS * random())
  mote.size = MOTE_BASE_SIZE
  mote.sizeMin = MOTE_BASE_SIZE * 0.5
  mote.sizeMax = MOTE_BASE_SIZE * 3
  mote.active = true

  updateProperties(mote)

  // only set the preferred color ratios once, since we want them to persist from birth
  mut_copy(mote.prefs, mote.ratios)
}

export const pool = valloc.create(MAX_MOTES, {factory, init, clean})

/**
 * Generates mote with randomized position and photon values.
 */
export const createRandom = (function () {
  const rpos = new Float32Array(2)
  const rphotons = new Uint8ClampedArray(3)
  return function createRandom() {
    console.log('creating random mote')
    do {
      rpos[0] = random() * posneg()
      rpos[1] = random() * posneg()
    }
    while(magnitude(rpos) > 0.8)
    rphotons[0] = ~~(random() * 64)
    rphotons[1] = ~~(random() * 64)
    rphotons[2] = ~~(random() * 64)
    pool.next(rphotons, rpos)
  }
}())

/**
 * Decide how to act each tick based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float delta time delta
 */
export const tick = function(entities, delta, frameCount) {
  let dist
  pool.eachActive(mote => {
    let {pos, vel, sight, speed, fear, target} = mote
    runMaintenance(mote, delta)

    // validate current target
    if(target && (dist = mote.validateTarget(target)) === -1) {
      mote.action = ACT_IDLE
    }

    switch(mote.action) {
      case ACT_IDLE: // lost target, gave up, or completed task
        mote.target = undefined
        if(magnitude(vel) < 0.001) { // not going anywhere, so pick a random direction
          scratch1[0] = random() * 2 - 1
          scratch1[1] = random() * 2 - 1
        }
        else {
          mut_copy(scratch1, pos)
          mut_plus(scratch1, times(vel, delta, scratch2))
          mut_plus(scratch1, rotate(scratch1, pos, sin((frameCount + mote.pulse) * speed), scratch2))
        }
        mut_plus(vel, accelerate(pos, scratch1, speed, scratch2))
        mote.action = ACT_SEARCH
        break
      case ACT_CHASE: // chasing a target
        // predict target's next move
        plus(target.pos, times(target.vel, delta, scratch1), scratch2)
        mut_plus(vel, accelerate(pos, scratch2, speed, scratch1))
        if(dist < sight) {
          if(target.type === TYPE_MOTE  && mote.potential > mote.agro * 3)
            mote.action = ACT_ATTACK
          else mote.action = ACT_ATTACK
        }
        break
      case ACT_AVOID: // avoiding a target
        // predict target's next move
        plus(target.pos, times(target.vel, delta, scratch1), scratch2)
        mut_plus(vel, accelerate(scratch2, pos, speed, scratch1))
        if(mote.resistance > fear * 3) mote.action = ACT_IDLE
        break
      case ACT_ATTACK: // attacking a target
        if(target.type ===  TYPE_MOTE) discharge(mote, target)
        else if(target.type === TYPE_PHOTON) eatPhoton(mote, target)
        break
      case ACT_LINK: // linking with a target
        break
      case ACT_SEARCH:
        if(!search(mote, pool)) mote.action = ACT_IDLE
        break
      default:
        break
    } // end action switch

    if(mote.injured) {
      if(frameCount % ~~(TARGET_FPS * 0.1) === 0) {
        bleed(mote)
      }
    }
    // mark dead for removal
    if(mote.dying === DEATH_THRESHOLD) {
      die(mote)
    }
    else if(mote.pregnant === PREGNANT_TIME) {
      split(mote, pool)
    }
  }) // end eachActive mote
}

export const eachActive = pool.eachActive
