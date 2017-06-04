export const TARGET_FPS = 30;
export const WEIGHT_PRED_R = 1.3;
export const WEIGHT_PRED_G = 0.7;
export const WEIGHT_PRED_B = 1;
export const START_POP = 20;
export const MAX_POP = 300;
export const MOTE_BASE_SIZE = 0.025;
export const MOTE_BASE_ALPHA = 1;
export const MOTE_BASE_SPEED = 0.0005;
export const PREGNANT_THRESHOLD = 172;
export const PREGNANT_TIME = 30;
export const DEATH_THRESHOLD = 18;
export const GRAVITY = 6.67408e-11;
export const GLOBAL_DRAG = 0.1;
export const PHOTON_BASE_SIZE = 0.01;
export const PHOTON_LIFETIME = TARGET_FPS*5;
// general debug switch
export const DEBUG = false;
// toggles vector validation in various functions that tend to produce
// infinite or NaN results; when enabled, vectors are checked and if invalid
// the function is rerun step by step and logged to identify trouble spots
export const VALIDATE_VECTORS = DEBUG || false; 

