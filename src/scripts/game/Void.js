"use strict";
import * as vectrix from  "@nphyx/vectrix";
import {gravitate, drag, outOfBounds, limitVecMut, avoid} from  "../util";
import {Emitter, AntiGravitonCluster} from "./";
import * as Photons from "./photons";
import * as Motes from "./motes";
const {vec2, times, mut_times, distance} = vectrix.vectors;
const {mut_plus} = vectrix.matrices;
import {VOID_SIZE, GLOBAL_DRAG} from "../constants";
const {random, sqrt, PI, ceil, min} = Math;
const POS_C = vec2(0,0);

export default function Void(ipos = vec2(), ivel = vec2(), mass = 1) {
  this.pos = vec2(ipos);
  this.vel = vec2(ivel);
  this.size = 0;
  this.birthMass = mass;
  this.mass = 1;
  this.lastMeal = -1;
  this.eatTime = 0;
  return this;
}

let scratchVec1 = vec2(), entity, i = 0 | 0, len = 0 | 0, a_dist = 0.0, consume = 0 | 0;
Void.prototype.tick = function(entities, delta) {
  if(this.birthMass > 0) {
    consume = min(this.birthMass, ceil(this.mass / 100));
    this.birthMass -= consume;
    this.mass += consume;
  }
  if(this.eatTime > 30) this.eatTime--;
  else this.lastMeal = -1;
  if(outOfBounds(this.pos, 1.3)) {
    this.mass = this.mass - 1;
  }
  this.size = sqrt(this.mass / PI) * VOID_SIZE;
  // last turn's move, has to happen first
  mut_plus(this.pos, times(this.vel, delta, scratchVec1));

  // apply basic forces
  // don't go off the screen
  mut_plus(this.vel, avoid(this.vel, this.pos, POS_C, 1.3, 0.01, scratchVec1));
  // apply drag
  mut_plus(this.vel, drag(this.vel, GLOBAL_DRAG));
  limitVecMut(this.vel, 0, 1);

  Photons.forEach((photon) => {
    a_dist = distance(this.pos, photon.pos);
    if(a_dist < this.size) {
      photon.lifetime = photon.lifetime - 1;
      if(photon.lifetime === 0 || a_dist < this.size * 0.6) {
        this.mass = this.mass + 1;
        this.lastMeal = photon.color;
        this.eatTime = 15;
        photon.lifetime = 0;
      }
    }
    if(photon.lifetime > 0) mut_plus(photon.vel, mut_times(
      gravitate(photon.pos, this.pos, photon.mass * this.mass, scratchVec1),
      (1 / photon.mass))
    );
  });

  Motes.forEach((mote) => {
    a_dist = distance(this.pos, mote.pos);
    if(a_dist < this.size * 0.6) {
      // probablistic injury, so they don't get shredded instantly
      if((random() * 30 * a_dist) < 1) mote.injured = mote.injured + 1;
    }
    mut_plus(mote.vel, mut_times(
      gravitate(mote.pos, this.pos, mote.mass * this.mass, scratchVec1),
      (1 / mote.mass))
    );
  });

  for(i = 0, len = entities.length; i < len; ++i) {
    entity = entities[i];
    if(entity === this) continue;
    a_dist = distance(this.pos, entity.pos);
    if(entity instanceof Void) {
      if(a_dist < (entity.size + this.size) * 0.44) { // bigger ones eat smaller ones
        if(this.mass > entity.mass) {
          consume = min(entity.mass, ceil(this.birthMass + this.mass / 100));
          this.birthMass += consume;
          entity.mass -= consume;
        }
      }
    }
    if(!entity.mass) continue; // zero mass means gravity bugs
    // apply gravity
    if(entity instanceof Emitter) { // emitters have negative & repelling mass
      mut_plus(entity.vel, mut_times(
        gravitate(entity.pos, this.pos, (this.mass / entity.mass), scratchVec1),
        (1 / entity.mass))
      );
    }
    else if(!(entity instanceof AntiGravitonCluster)) {
      mut_plus(entity.vel, mut_times(
        gravitate(entity.pos, this.pos, entity.mass * this.mass, scratchVec1),
        (1 / entity.mass))
      );
    }
  }
}
