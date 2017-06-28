export const TARGET_FPS = 30;
export const WEIGHT_PRED_R = 1.3;
export const WEIGHT_PRED_G = 0.7;
export const WEIGHT_PRED_B = 1;
export const START_POP = 20;
export const MOTE_BASE_SIZE = 0.025;
export const MOTE_BASE_ALPHA = 1;
export const MOTE_BASE_SPEED = 0.0005;
export const MOTE_BASE_SIGHT = 0.15;
export const PREGNANT_THRESHOLD = 172;
export const PREGNANT_TIME = 30;
export const DEATH_THRESHOLD = 18;
export const GRAVITY = 6.67408e-8;
export const GLOBAL_DRAG = 0.1;
export const PHOTON_BASE_SIZE = 0.01;
export const PHOTON_LIFETIME = TARGET_FPS*10;
export const MARKER_HIT_LIFETIME = ~~(TARGET_FPS);
export const MARKER_HIT_SIZE = 0.1;
export const VOID_SIZE = 0.01;
export const EMITTER_SIZE = 0.01;
export const MAX_MOTES = 300;
export const MAX_PHOTONS = ~~(MAX_MOTES * PREGNANT_THRESHOLD)/2;
export const MAX_VOIDS = 7;
export const POSITIVE_ENERGY = 0.01; // chance a dead mote will produce an emitter
export const NEGATIVE_ENERGY = 0.01; // chance a dead mote will produce a void
// general debug switch
export const DEBUG = true;
// toggles vector validation in various functions that tend to produce
// infinite or NaN results; when enabled, vectors are checked and if invalid
// the function is rerun step by step and logged to identify trouble spots
export const VALIDATE_VECTORS = DEBUG || true;

