import {emitPhoton} from "./"
import * as vectrix from "@nphyx/vectrix"
import {GLOBAL_DRAG, PREGNANT_TIME, PREGNANT_THRESHOLD, MOTE_BASE_SIZE, DEBUG, DEATH_THRESHOLD, MAX_MOTES} from "../constants"
import {drag, avoid, outOfBounds, norm_ratio} from "../util"
import * as photons from "./photons"
import {COLOR_R, COLOR_G, COLOR_B} from "./photons"
import {current_population} from "./motes"

const {vec2, times, mut_clamp, distance, mut_copy, mut_times} = vectrix.vectors
const {mut_plus} = vectrix.matrices
const {random, max, min, floor, ceil} = Math
const scratch1 = vec2()

// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
const POS_C  = vec2(0.0, 0.0)

// activity type constants
export const ACT_IDLE   = 0
export const ACT_SEARCH = 1
export const ACT_CHASE  = 2
export const ACT_AVOID  = 3
export const ACT_ATTACK = 4
export const ACT_LINK   = 5
export var death_count = 0
export var birth_count = 0

/**
 * Updates derived properties for mote.
 */
export const updateProperties = (() => {
  let  photons, color, ratios
  return function updateProperties(mote) {
    ({photons, ratios, color} = mote)
    mote.mass = photons[COLOR_R]  +  photons[COLOR_G]  +  photons[COLOR_B]
    mote.size = mut_clamp(mote.mass / (PREGNANT_THRESHOLD / 3) * MOTE_BASE_SIZE, mote.sizeMin, mote.sizeMax)
    norm_ratio(photons, ratios)
    mote.speed = mote.base_speed * (1 - mote.size) * (1 + ratios[COLOR_B])
    mote.sight = mote.base_sight + (mote.size * 0.5)  // see from edge onward
    mote.agro = mote.base_agro * (1 + ratios[COLOR_R])
    mote.fear = mote.base_fear * (1 + ratios[COLOR_G])
    if(DEBUG) {
      if(isNaN(mote.speed)) throw new Error("updateProperties: NaN speed")
      if(isNaN(mote.sight)) throw new Error("updateProperties: NaN sight")
      if(isNaN(mote.size)) throw new Error("updateProperties: NaN size")
      if(isNaN(mote.agro)) throw new Error("updateProperties: NaN agro")
      if(isNaN(mote.fear)) throw new Error("updateProperties: NaN fear")
    }

    if((mote.mass > PREGNANT_THRESHOLD) && mote.pregnant === 0) mote.pregnant = PREGNANT_TIME
    if((mote.mass < DEATH_THRESHOLD) && mote.dying === 0) mote.dying = 1
    if(current_population >= MAX_MOTES) mote.pregnant = 0 // can't have a baby, dang population controls!

    color[COLOR_R] = ~~(ratios[COLOR_R] * 255)
    color[COLOR_G] = ~~(ratios[COLOR_G] * 255)
    color[COLOR_B] = ~~(ratios[COLOR_B] * 255)
    mote.needsUpdate = 0
  }
})()

/**
 * Maintenance tasks to be done each tick
 */
export const runMaintenance = (function() {
  let pregnant = 0 | 0, dying = 0 | 0, tmpPot = 0.0, tmpRes = 0.0,
    agro = 0.0, fear = 0.0, size = 0.0, speed = 0.0, pos, vel
  return function runMaintenance(mote, delta) {
    ({pos, vel, pregnant, dying, agro, fear, size, speed} = mote)
    if(pregnant > 0) mote.pregnant = pregnant - 1
    if(dying > 0) mote.dying = dying + 1 // start counting up
    if(mote.needsUpdate) updateProperties(mote)
    // build potential and resistance each tick
    tmpPot = agro  *  (size * 100)
    tmpRes = fear  *  (size * 100)
    mote.potential = mut_clamp(mote.potential + agro * delta, -tmpPot, tmpPot)
    mote.resistance = mut_clamp(mote.resistance + fear * delta, -tmpRes, tmpRes)

    // last turn's move, has to happen first to avoid prediction inaccuracy
    // during chases
    mut_plus(pos, times(vel, delta, scratch1))

    // don't go off the screen
    mut_plus(vel, avoid(vel, pos, POS_C, 1.3, speed, scratch1))
    // apply drag
    mut_plus(vel, drag(vel, GLOBAL_DRAG))
  }
}())

/**
 * Checks if a target is valid.
 * @param {Object} entity any game object that can be targeted
 * @return {float} distance if valid, otherwise -1
 */
export const validateTarget = (function() {
  let dist = 0.0, sight = 0.0, pos
  return function(entity) {
    ({pos, sight} = this)
    dist = distance(pos, entity.pos)
    // these targets are invalid
    if(entity === this) return -1
    if(entity.dying) return -1
    if(entity.lifetime && entity.lifetime < 3) return -1
    if(entity.mass < 1) return -1
    if(dist > (sight + entity.size * 0.5)) return -1
    if(outOfBounds(entity, 0.7)) return -1
    return dist
  }
}())

/**
 * Search for a target and decide how to act toward it.
 */
export const search = (function() {
  let cur = 0.0, highest, deltar = 0.0, deltag = 0.0, deltab = 0.0, mind = 0.0,
    maxd = 0.0, weight = 0.0
  return function search(mote, pool) {
    highest = -Infinity
    if(mote.pregnant || mote.dying) {
      mote.action = ACT_IDLE
      highest = Infinity
    }

    // check out photons
    photons.eachActive((photon) => {
      let dist = mote.validateTarget(photon)
      if(dist === -1) return
      if(photon.lifetime < 4) return
      deltar = (mote.prefs[COLOR_R] - mote.ratios[COLOR_R])
      deltag = (mote.prefs[COLOR_G] - mote.ratios[COLOR_G])
      deltab = (mote.prefs[COLOR_B] - mote.ratios[COLOR_B])
      maxd = max(deltar, deltag, deltab)
      mind = min(deltar, deltag, deltab)
      if((maxd == deltar && photon.color == COLOR_R) ||
         (maxd == deltag && photon.color == COLOR_G) ||
         (maxd == deltab && photon.color == COLOR_B)) weight = 30
      if((mind == deltar && photon.color == COLOR_R) ||
         (mind == deltag && photon.color == COLOR_G) ||
         (mind == deltab && photon.color == COLOR_B)) weight = 10
      else weight = 20
      cur = weight * (1 / dist)
      if(cur > highest) {
        mote.target = photon
        mote.action = ACT_CHASE
        highest = cur
      }
    })

    pool.eachActive((target) => {
      let dist = mote.validateTarget(target)
      if(dist === -1) return
      cur = 3 * (1 / dist)
      if(cur > highest) {
        mote.target = target
        if(target.target === mote || dist < (mote.size + target.size) * 0.5) {
          mote.action = ACT_AVOID
        }
        else mote.action = ACT_CHASE
        highest = cur
      }
    })

    /* TODO update me
    for(i = 0, len = entities.length; (i < len) && (highest < Infinity); ++i) {
      entity = entities[i]
      let dist = this.validateTarget(entity)
      if(dist === -1) continue
      // ignore things outside sight range
      else if(entity instanceof Void) {
        this.target = entity
        this.action = ACT_AVOID
        highest = Infinity
      }
    }
    */
    if(highest < 0) return false
    return true
  }
}())

/**
 * Causes a mote to take damage, increasing its injury counter by the strength parameter.
 * @param {mote} mote the mote to be injured
 * @param {entity} attacker the attacker causing the injury
 * @param {Int} strength the strength of the injury
 */
export const injure = function(mote, attacker, strength) {
  mote.injured += strength
  mote.lastInjury = mote.injured
  if(mote.resistance < (mote.agro * 3) ||
    mote.injured < mote.fear
  ) mote.mote = attacker
}

/**
 * Discharges a bolt of plasma at a target.
 */
export const discharge = function(mote, target) {
  let delta = mote.potential - target.resistance
  target.resistance -= max(mote.agro, delta * mote.agro)
  mote.potential -= max(mote.fear, delta * mote.fear)
  injure(target, mote, max(0, ~~(delta)))
  if(mote.potential < 0) mote.action = ACT_IDLE
}

/**
 * When motes are damaged they bleed out photons until the damage equalizes.
 */
export const bleed = (function() {
  let choice = 0 | 0, choiceVal = 0 | 0, pvel = vec2(), colors
  return function bleed(mote) {
    colors = mote.photons
    do {
      choice = ~~(random() * 3)
      switch(choice) {
        case COLOR_R: choiceVal = colors[COLOR_R]; break
        case COLOR_G: choiceVal = colors[COLOR_G]; break
        case COLOR_B: choiceVal = colors[COLOR_B]; break
      }
    } while (choiceVal === 0)
    switch(choice) {
      case COLOR_R: colors[COLOR_R] = colors[COLOR_R] - 1; break
      case COLOR_G: colors[COLOR_G] = colors[COLOR_G] - 1; break
      case COLOR_B: colors[COLOR_B] = colors[COLOR_B] - 1; break
    }
    mote.injured--
    mut_times(mote.vel, 1 + mote.speed)
    mut_copy(pvel, mote.vel)
    mut_times(pvel, -1)
    mote.needsUpdate = 1
    photons.pool.next(mote.pos, pvel, choice)
    //return choice
  }
}())

/**
 * A mote that reaches the pregnancy threshold will split into two semi-identical motes.
 * @param {mote} mote to be split
 */
export const split = (function() {
  let baby, photons
  return function split(mote, pool) {
    photons = mote.photons
    baby = pool.allocate(
      [floor(photons[COLOR_R] / 2), floor(photons[COLOR_G] / 2), floor(photons[COLOR_B] / 2)],
      mote.pos, mote.base_speed, mote.base_sight, mote.base_agro,
      mote.base_fear)
    photons[COLOR_R] = ceil(photons[COLOR_R] / 2)
    photons[COLOR_G] = ceil(photons[COLOR_G] / 2)
    photons[COLOR_B] = ceil(photons[COLOR_B] / 2)
    mote.pregnant = PREGNANT_TIME - 1
    baby.pregnant = PREGNANT_TIME - 1
    mote.target = baby
    baby.target = mote
    baby.needsUpdate = 1
    mote.needsUpdate = 1
    birth_count++
  }
}())

/**
 * Consumes a photon, adding its value to the internal photon list.
 * @param {Photon} photon the photon to be consumed
 */
export const eatPhoton = (function() {
  let photons
  return function eatPhoton(mote, photon) {
    if(photon.lifetime > 2 && distance(mote.pos, photon.pos) < mote.sight) {
      photons = mote.photons
      photon.lifetime = 2
      switch(photon.color) {
        case COLOR_R: photons[COLOR_R] += 1; break
        case COLOR_G: photons[COLOR_G] += 1; break
        case COLOR_B: photons[COLOR_B] += 1; break
      }
      mote.lastMeal = photon.color
      mote.potential -= mote.agro * 0.5
      mote.resistance -= mote.fear * 0.5
      mote.needsUpdate = 1
    }
    mote.action = ACT_IDLE
  }
}())

/**
 * When a mote is ready to die, it sets loose its remaining photons in a ring.
 * @param {mote} mote to kill
 */
export const die = function(mote, pool) {
  let r, g, b, c, i, sum
  /*
     if(random() < POSITIVE_ENERGY) {
     Emitters.create(mote.pos, mote.vel, ~~(DEATH_THRESHOLD*10*random()), undefined, mote.ratios))
     }
  /*
  else if(random() < NEGATIVE_ENERGY) {
  Voids.create(mote.pos, mote.vel, ~~(DEATH_THRESHOLD*10*random())))
  }
  */
  r = mote.photons[0]
  g = mote.photons[1]
  b = mote.photons[2]
  sum = r + b + g
  c = 0
  for(i = 0; i < sum; ++i) {
    if(r === i) c = 1
    if(r + g === i) c = 2
    emitPhoton(mote.pos, undefined, c, i, sum)
  }
  pool.freeIndex(mote.poolIndex)
  death_count++
}
