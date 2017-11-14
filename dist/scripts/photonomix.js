/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var TARGET_FPS = exports.TARGET_FPS = 30;
var WEIGHT_PRED_R = exports.WEIGHT_PRED_R = 1.3;
var WEIGHT_PRED_G = exports.WEIGHT_PRED_G = 0.7;
var WEIGHT_PRED_B = exports.WEIGHT_PRED_B = 1;
var START_POP = exports.START_POP = 20;
var MOTE_BASE_SIZE = exports.MOTE_BASE_SIZE = 0.015;
var MOTE_BASE_ALPHA = exports.MOTE_BASE_ALPHA = 1;
var MOTE_BASE_SPEED = exports.MOTE_BASE_SPEED = 0.0005;
var MOTE_BASE_SIGHT = exports.MOTE_BASE_SIGHT = 0.15;
var PREGNANT_THRESHOLD = exports.PREGNANT_THRESHOLD = 172;
var PREGNANT_TIME = exports.PREGNANT_TIME = 30;
var DEATH_THRESHOLD = exports.DEATH_THRESHOLD = 18;
var GRAVITY = exports.GRAVITY = 6.67408e-8;
var GLOBAL_DRAG = exports.GLOBAL_DRAG = 0.1;
var PHOTON_BASE_SIZE = exports.PHOTON_BASE_SIZE = 0.015;
var PHOTON_LIFETIME = exports.PHOTON_LIFETIME = TARGET_FPS * 10;
var MARKER_HIT_LIFETIME = exports.MARKER_HIT_LIFETIME = ~~TARGET_FPS;
var MARKER_HIT_SIZE = exports.MARKER_HIT_SIZE = 0.1;
var VOID_SIZE = exports.VOID_SIZE = 0.01;
var EMITTER_SIZE = exports.EMITTER_SIZE = 0.01;
var MAX_MOTES = exports.MAX_MOTES = 300;
var MAX_PHOTONS = exports.MAX_PHOTONS = ~~(MAX_MOTES * PREGNANT_THRESHOLD) / 2;
var MAX_VOIDS = exports.MAX_VOIDS = 5;
var MAX_EMITTERS = exports.MAX_EMITTERS = 5;
var MAX_ENTITIES = exports.MAX_ENTITIES = MAX_MOTES + MAX_PHOTONS + MAX_VOIDS + MAX_EMITTERS;
var POSITIVE_ENERGY = exports.POSITIVE_ENERGY = 0.01; // chance a dead mote will produce an emitter
var NEGATIVE_ENERGY = exports.NEGATIVE_ENERGY = 0.01; // chance a dead mote will produce a void

// general debug switch
var DEBUG = exports.DEBUG = false;
// toggles vector validation in various functions that tend to produce
// infinite or NaN results; when enabled, vectors are checked and if invalid
// the function is rerun step by step and logged to identify trouble spots
var VALIDATE_VECTORS = exports.VALIDATE_VECTORS = DEBUG || true;

var type = void 0;
if (typeof SharedArrayBuffer !== "undefined") {
	/* global SharedArrayBuffer */
	type = SharedArrayBuffer;
} else {
	type = ArrayBuffer;
}

var BUFFER_TYPE = exports.BUFFER_TYPE = type;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vectrix_matrices__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vectrix_quaternions__ = __webpack_require__(22);
/**
Master module for vectrix. See individual modules for documentation.
@module vectrix
 */





const vectors = __WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__;
/* harmony export (immutable) */ __webpack_exports__["vectors"] = vectors;

const matrices = __WEBPACK_IMPORTED_MODULE_1__vectrix_matrices__;
/* harmony export (immutable) */ __webpack_exports__["matrices"] = matrices;

const quaternions = __WEBPACK_IMPORTED_MODULE_2__vectrix_quaternions__;
/* harmony export (immutable) */ __webpack_exports__["quaternions"] = quaternions;




/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.shuffle = exports.rotate = exports.outOfBounds = exports.absVec = exports.avoid = exports.drag = exports.accelerate = exports.gravitate = exports.limitVecMut = exports.dist = exports.validate = exports.twiddleVec = undefined;
exports.twiddle = twiddle;
exports.logisticSmooth = logisticSmooth;
exports.adjRand = adjRand;
exports.posneg = posneg;
exports.ratio = ratio;
exports.rat_vec2 = rat_vec2;
exports.evenNumber = evenNumber;

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomix = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    magnitude = _vectrix$vectors.magnitude,
    mut_normalize = _vectrix$vectors.mut_normalize,
    distance = _vectrix$vectors.distance,
    mut_times = _vectrix$vectors.mut_times,
    mut_copy = _vectrix$vectors.mut_copy,
    mut_clamp = _vectrix$vectors.mut_clamp;
var minus = vectrix.matrices.minus;
var sqrt = Math.sqrt,
    abs = Math.abs,
    E = Math.E,
    pow = Math.pow,
    cos = Math.cos,
    sin = Math.sin,
    random = Math.random,
    PI = Math.PI;

var X = 0,
    Y = 1;
var MIN_F = 1e-11;
var MAX_F = 1e+11;

/**
 * Twiddles a value by a small amount to avoid zeroes
 */
function twiddle(x) {
	return x + 1e-11 * posneg();
}

var twiddleVec = exports.twiddleVec = function () {
	var i = 0 | 0,
	    l = 0 | 0;
	return function twiddleVec(v) {
		for (i = 0, l = v.length; i < l; ++i) {
			v[i] = twiddle(v[i]);
		}
		return v;
	};
}();

var validate = exports.validate = function () {
	var i = void 0,
	    l = void 0;
	return function validate(v) {
		for (i = 0, l = v.length; i < l; i++) {
			if (isNaN(v[i])) throw new Error("NaN vector");
			if (v[i] === Infinity) throw new Error("Infinite vector");
			if (v[i] === -Infinity) throw new Error("-Infinite vector");
		}
	};
}();

var dist = exports.dist = function () {
	var dist_diff = vec2();
	return function dist(a, b) {
		return magnitude(minus(a, b, dist_diff));
	};
}();

function limit(v) {
	var min_v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var max_v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

	if (abs(v) < abs(min_v)) {
		if (v < 0) v = -min_v;else v = min_v;
	} else if (abs(v) > abs(max_v)) {
		if (v < 0) v = -max_v;else v = max_v;
	}
	return v;
}

var limitVecMut = exports.limitVecMut = function () {
	var i = 0 | 0,
	    l = 0 | 0;
	/**
  * Limits absolute values of vectors within a range.
  */
	return function limitVecMut(v) {
		var min_v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var max_v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

		for (i = 0, l = v.length; i < l; ++i) {
			v[i] = limit(v[i], min_v, max_v);
		}
	};
}();

/**
 * Gravitate toward target.
 */
var gravitate = exports.gravitate = function () {
	var g_v = vec2();
	var mag = 0.0,
	    x = 0.0,
	    y = 0.0,
	    scale = 0.0;
	return function gravitate(p1, p2, strength, out) {
		out = out || g_v;
		minus(p1, p2, out);
		mag = magnitude(out);
		// inline normalize for speed, since this happens a lot
		x = out[0];
		y = out[1];
		if (x === 0 && y === 0 || mag === 0) return out;
		scale = mut_clamp(1 / sqrt(x * x + y * y), MIN_F, MAX_F);
		strength = mut_clamp(strength, -MAX_F, MAX_F);
		out[0] = x * scale;
		out[1] = y * scale;
		//mut_normalize(out);
		mut_times(out, -strength * _photonomix.GRAVITY / (mag * mag));
		if (_photonomix.VALIDATE_VECTORS) {
			try {
				validate(out);
			} catch (e) {
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
				out.fill(0.0);
			}
		}
		return out;
	};
}();

/**
 * Accelerate toward a target.
 */
var accelerate = exports.accelerate = function () {
	var v = vec2();
	var scale = 0.0,
	    x = 0.0,
	    y = 0.0;
	return function accelerate(p1, p2, strength, out) {
		out = out || v;
		minus(p1, p2, out);
		x = out[0];
		y = out[1];
		if (x === 0 && y === 0) return out;
		scale = mut_clamp(1 / sqrt(x * x + y * y), MIN_F, MAX_F);
		strength = mut_clamp(strength, -MAX_F, MAX_F);
		// inline normalize for speed, since this happens a lot
		out[0] = x * scale;
		out[1] = y * scale;
		//mut_normalize(out);
		mut_times(out, -strength);
		if (_photonomix.VALIDATE_VECTORS) {
			try {
				validate(out);
			} catch (e) {
				console.log("acceleration error", e);
				console.log("strength", strength);
				minus(p1, p2, out);
				console.log("minus", out);
				mut_normalize(out);
				console.log("normalize", out);
				mut_times(out, -strength);
				console.log("scale", out);
				out.fill(0.0);
			}
		}
		return out;
	};
}();

var drag = exports.drag = function () {
	var delta = vec2(),
	    dragStrength = 0.0,
	    dragSpeed = 0.0;
	var scale = 0.0,
	    x = 0.0,
	    y = 0.0;
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
		if (x === 0 && y === 0 || dragStrength === 0) return out;
		// inline normalize for speed, since this happens a lot
		scale = mut_clamp(1 / sqrt(x * x + y * y), MIN_F, MAX_F);
		dragStrength = mut_clamp(dragStrength, MIN_F, MAX_F);
		out[0] = x * scale;
		out[1] = y * scale;
		// mut_normalize(out)
		mut_times(out, -1);
		mut_times(out, dragStrength);
		if (_photonomix.VALIDATE_VECTORS) {
			try {
				validate(out);
			} catch (e) {
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
				out.fill(0.0);
			}
		}
		return out;
	};
}();

var avoid = exports.avoid = function () {
	var aev = vec2(),
	    dist = 0.0;
	return function avoid(vel, pos, opposite, maxDist, speed, out) {
		dist = distance(pos, opposite) * maxDist;
		out = out || aev;
		out[0] = 0.0;
		out[1] = 0.0;
		if (dist > 1) {
			accelerate(pos, opposite, speed * dist * dist, out);
		}
		return out;
	};
}();

/**
 * absolute value of vector
 */
var absVec = exports.absVec = function () {
	var i = 0 | 0,
	    l = 0 | 0;
	return function absVec(v) {
		for (i = 0, l = v.length; i < l; ++i) {
			v[i] = abs(v[i]);
		}
		return v;
	};
}();

var outOfBounds = exports.outOfBounds = function () {
	return function outOfBounds(v, n) {
		var x = v[0];
		var y = v[1];
		if (x > n || x < -n) return true;else if (y > n || y < -n) return true;else return false;
	};
}();

/**
 * Smoothing using a sigmoid (logistic function) curve.
 * @param {float} x input value
 * @param {float} x0 midpoint of curve
 * @param {float} L limit of curve
 * @param {float} k slope of curve
 */
function logisticSmooth(x, x0) {
	var L = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x * 2;
	var k = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

	return L / (1 + pow(E, k * x - x0));
}

/**
 * A random function adjusted to a range of -1 to 1 and multiplied by a
 * scaling value
 */
function adjRand() {
	var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

	return (random() * 2 - 1) * scale;
}

/**
 * Returns a delta velocity vector of the vector p rotated around center point c by
 * r radians.
 */
var rotate = exports.rotate = function () {
	var cosr = 0.0,
	    sinr = 0.0,
	    rdx = 0.0,
	    rdy = 0.0,
	    rvec = vec2(),
	    rdelta = vec2();
	return function rotate(p, c, r, out) {
		out = out || rvec;
		cosr = cos(r * PI);
		sinr = sin(r * PI);
		minus(p, c, rdelta);
		rdx = rdelta[X];
		rdy = rdelta[Y];
		out[X] = rdx * cosr - rdy * sinr;
		out[Y] = rdx * sinr + rdy * cosr;
		return out;
	};
}();

function posneg() {
	return random() > 0.5 ? 1 : -1;
}
/*
export function clamp(v, minv, maxv) {
	return max(min(v, maxv), minv);
}
*/

function ratio(a, b) {
	return a / (abs(a) + abs(b));
}
function rat_vec2(v) {
	return ratio(v[X], v[Y]);
}

/**
* Shuffles array in place. ES6 version
* @param {Array} a items The array containing the items.
*/
var shuffle = exports.shuffle = function () {
	var i = 0 | 0,
	    j = 0 | 0;
	return function shuffle(a) {
		for (i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			var _ref = [a[j], a[i - 1]];
			a[i - 1] = _ref[0];
			a[j] = _ref[1];
		}
	};
}();

/**
 * Round to nearest even number.
 */
function evenNumber(n) {
	return n >> 1 << 1;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.COLOR_B = exports.COLOR_G = exports.COLOR_R = exports.BUFFER_LENGTH = undefined;
exports.Photon = Photon;

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomix = __webpack_require__(2);

var _photonomix2 = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    times = _vectrix$vectors.times;
var mut_plus = vectrix.matrices.mut_plus;
var random = Math.random;


var I8 = 1;
var F32 = 4;
var O_POS = 0;
var O_VEL = F32 * 2;
var FLOAT_LENGTH = O_VEL + F32 * 2;
var O_COLOR = 0;
var O_LIFE = O_COLOR + I8;
var O_MASS = O_LIFE + I8;
var U8_LENGTH = O_MASS + I8;
var BUFFER_LENGTH = exports.BUFFER_LENGTH = FLOAT_LENGTH + U8_LENGTH + (F32 - (FLOAT_LENGTH + U8_LENGTH) % F32);

var COLOR_R = exports.COLOR_R = 0,
    COLOR_G = exports.COLOR_G = 1,
    COLOR_B = exports.COLOR_B = 2;
function Photon(ipos, ivel, color) {
	var _this = this;

	var pool = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

	var buffer = void 0;
	this.pool = pool;
	if (pool) {
		buffer = pool.buffer;
		this.offset = pool.allocate();
	} else {
		buffer = new ArrayBuffer(BUFFER_LENGTH);
		this.offset = 0;
	}
	this.pos = vec2(ipos[0], ipos[1], buffer, O_POS + this.offset);
	this.vel = vec2(ivel[0], ivel[1], buffer, O_VEL + this.offset);
	this.intVals = new Uint8ClampedArray(buffer, FLOAT_LENGTH + this.offset, U8_LENGTH);

	Object.defineProperties(this, {
		"color": { get: function get() {
				return _this.intVals[O_COLOR];
			}, set: function set(x) {
				return _this.intVals[O_COLOR] = x;
			} },
		"lifetime": { get: function get() {
				return _this.intVals[O_LIFE];
			}, set: function set(x) {
				return _this.intVals[O_LIFE] = x;
			} },
		"mass": { get: function get() {
				return _this.intVals[O_MASS];
			}, set: function set(x) {
				return _this.intVals[O_MASS] = x;
			} }
	});
	this.color = color;
	this.lifetime = _photonomix2.PHOTON_LIFETIME;
	this.size = _photonomix2.PHOTON_BASE_SIZE;
	this.mass = 1;
	this.pulse = ~~(_photonomix2.TARGET_FPS * random());
}

var tmpvec = vec2(),
    pos = void 0,
    vel = void 0;
Photon.prototype.tick = function (surrounding, delta) {
	if (this.lifetime > 0) this.lifetime--;
	pos = this.pos;vel = this.vel;
	mut_plus(pos, times(vel, delta, tmpvec));
	mut_plus(vel, (0, _photonomix.drag)(vel, _photonomix2.GLOBAL_DRAG));
};

Photon.prototype.destroy = function () {
	if (this.pool) this.pool.free(this.offset);else throw new Error("called photon.destroy, but photon has no pool");
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.displayProps = exports.ui = exports.sprites = exports.entities = exports.buffers = exports.bokeh = undefined;
exports.updateCompositeOperation = updateCompositeOperation;
exports.getFrameCount = getFrameCount;
exports.screenSpace = screenSpace;
exports.screenSpaceVec = screenSpaceVec;
exports.gameSpaceVec = gameSpaceVec;
exports.offscreen = offscreen;
exports.drawCircle = drawCircle;
exports.init = init;
exports.startGame = startGame;

var _photonomixDisplay = __webpack_require__(16);

var bokeh = _interopRequireWildcard(_photonomixDisplay);

var _photonomixDisplay2 = __webpack_require__(17);

var buffers = _interopRequireWildcard(_photonomixDisplay2);

var _photonomixDisplay3 = __webpack_require__(18);

var entities = _interopRequireWildcard(_photonomixDisplay3);

var _photonomixDisplay4 = __webpack_require__(12);

var sprites = _interopRequireWildcard(_photonomixDisplay4);

var _photonomix = __webpack_require__(13);

var events = _interopRequireWildcard(_photonomix);

var _photonomixDisplay5 = __webpack_require__(19);

var ui = _interopRequireWildcard(_photonomixDisplay5);

var _photonomix2 = __webpack_require__(0);

var constants = _interopRequireWildcard(_photonomix2);

var _photonomix3 = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.bokeh = bokeh;
exports.buffers = buffers;
exports.entities = entities;
exports.sprites = sprites;
exports.ui = ui;
var min = Math.min,
    max = Math.max;

var AUTO_FULLSCREEN = false;

var GAME_STARTED = false; //  whether the game has started
var startTime = void 0; // time game started
var interval = 0;
var frameCount = 0; // running total of drawn frames
var animating = false; // whether the game is currently running animation loop
var body = void 0; // html document body
var fullscreen = false; // whether the game is in fullscreen mode
var game = void 0; // game environment object
var controls = void 0; // control state object
var lastFrame = 0;
var fullscreenBuffers = void 0;
var compositeBuffer = void 0;

var displayProps = exports.displayProps = {
	width: 0,
	height: 0,
	orientation: 0,
	aspect: 0,
	minDimension: 0,
	maxDimension: 0,
	events: new events.Events()

	/**
  * Using this checks and avoids altering the canvas context state machine if unnecessary,
  * which theoretically saves a little time.
  */
};function updateCompositeOperation(ctx, op) {
	if (ctx.globalCompositeOperation !== op) ctx.globalCompositeOperation = op;
}

/**
 * Toggles fullscreen on.
 * Code from Mozilla Developer Network.
 */
function toggleFullScreen() {
	if (fullscreen) return;
	fullscreen = true;
	if (!document.fullscreenElement && // alternative standard method
	!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
		// current working methods
		if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();else if (document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen();else if (document.documentElement.mozRequestFullScreen) document.documentElement.mozRequestFullScreen();else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		displayProps.events.fire("fullscreen-on");
	} else {
		if (document.exitFullscreen) document.exitFullscreen();else if (document.msExitFullscreen) document.msExitFullscreen();else if (document.mozCancelFullScreen) document.mozCancelFullScreen();else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
		displayProps.events.fire("fullscreen-off");
	}
}

/**
 * Turns fullscreen off.
 */
function fullscreenOff(ev) {
	ev.preventDefault();
	if (document.webkitIsFullScreen || document.mozIsFullScreen || document.msIsFullScreen) fullscreen = true;else fullscreen = false;
	return false;
}

function getFrameCount() {
	return frameCount;
}

/**
 * Updates screen ratio.
 */
function updateProperties() {
	compositeBuffer.width = displayProps.width = (0, _photonomix3.evenNumber)(document.body.clientWidth);
	compositeBuffer.height = displayProps.height = (0, _photonomix3.evenNumber)(document.body.clientHeight);
	displayProps.orientation = displayProps.width > displayProps.height ? 0 : 1;
	displayProps.minDimension = min(displayProps.width, displayProps.height);
	displayProps.maxDimension = max(displayProps.width, displayProps.height);
	displayProps.events.fire("resize");
}

/**
 * Calculates the screenspace pixel offset of a coordinate from the [-1,1] coordinate
 * range used in game position vectors.
 */
function screenSpace(x) {
	return (x + 1) / 2 * displayProps.minDimension;
}

/**
 * Finds the screen space equivalent of the game space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */

function screenSpaceVec(v, out) {
	out[0] = (v[0] + 1) / 2 * displayProps.minDimension;
	out[1] = (v[1] + 1) / 2 * displayProps.minDimension;
	return out;
}

/**
 * Finds the game space equivalent of the sceen space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */
function gameSpaceVec(v, out) {
	out[0] = 2 * (v[0] / displayProps.minDimension) - 1;
	out[1] = 2 * (v[1] / displayProps.minDimension) - 1;
}

/**
 * Checks if entity is out of screen space by more than 50%.
 */
function offscreen(x, y) {
	return x < displayProps.width * -0.5 || x > displayProps.width * 1.5 || y < displayProps.height * -0.5 || y > displayProps.height * 1.5;
}

/**
 * Apply pre-draw effects to canvases and set composite modes before drawing entities.
 */
var prepareCanvases = function () {
	return function prepareCanvases() {
		/*
  	invertCtx.globalCompositeOperation = "source-in";
  	invertCtx.fillStyle = invFillStyle;
  	invertCtx.fillRect(0, 0,displayProps.width, displayProps.height);
  	invertCtx.globalCompositeOperation = "source-over";
  	*/
	};
}();

/**
 * Draws a colored circle.
 */
function drawCircle(ctx, x, y, size, fillStyle) {
	var lineWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
	var strokeStyle = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;

	ctx.globalCompositeOperation = "source-over";
	ctx.beginPath();
	ctx.arc(x, y, size, 2 * Math.PI, false);
	ctx.fillStyle = fillStyle;
	ctx.fill();
	if (strokeStyle) {
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}
	ctx.closePath();
}

/**
 * Main animation loop.
 */
function animate() {
	requestAnimationFrame(animate);
	var now = Date.now();
	var elapsed = now - lastFrame;
	if (elapsed > interval) {
		lastFrame = now - elapsed % interval;
		frameCount++;
		if (GAME_STARTED) game.tick(interval / elapsed, frameCount);
		prepareCanvases();
		bokeh.draw();
		entities.draw(game);
		ui.draw();
		buffers.composite(fullscreenBuffers, compositeBuffer, displayProps);
	}
}

/**
 * Initializes game environment.
 */
function init(state) {
	game = state.game;
	controls = state.controls;
	body = document.getElementsByTagName("body")[0];
	body.classList.add("2d");
	compositeBuffer = new buffers.CompositeBuffer(body);
	body.width = compositeBuffer.width = (0, _photonomix3.evenNumber)(document.body.clientWidth);
	body.height = compositeBuffer.height = (0, _photonomix3.evenNumber)(document.body.clientHeight);
	updateProperties();
	fullscreenBuffers = [new buffers.DrawBuffer("source-over", buffers.SCALE_KEEP_ASPECT), new buffers.DrawBuffer("lighter", buffers.SCALE_NONE), new buffers.DrawBuffer("lighter", buffers.SCALE_NONE), new buffers.DrawBuffer("hard-light", buffers.SCALE_NONE), new buffers.DrawBuffer("source-over", buffers.SCALE_NONE)];
	bokeh.init(fullscreenBuffers[0], fullscreenBuffers[1], displayProps);
	entities.init(fullscreenBuffers[2], fullscreenBuffers[3], displayProps);
	ui.init(fullscreenBuffers[4], displayProps);
	// do these here so they only get created once; they don't need to update with res
	window.addEventListener("resize", updateProperties);
	if (AUTO_FULLSCREEN) {
		body.addEventListener("click", toggleFullScreen);
		document.addEventListener("fullscreenchange", fullscreenOff);
		document.addEventListener("mozfullscreenchange", fullscreenOff);
		document.addEventListener("msfullscreenchange", fullscreenOff);
		document.addEventListener("webkitfullscreenchange", fullscreenOff);
	}
	startTime = Date.now();
	lastFrame = startTime;
	interval = 1000 / constants.TARGET_FPS;
	if (!animating) requestAnimationFrame(animate);
	animating = true;
}

/**
 * Starts up the game.
 */
function startGame() {
	GAME_STARTED = true;
	game.start();
	body.removeEventListener("click", startGame);
	body.classList.remove("start");
	if (AUTO_FULLSCREEN) toggleFullScreen();
	console.log("game started");
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Void = Void;

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomix = __webpack_require__(2);

var _photonomixGame = __webpack_require__(8);

var _photonomixGame2 = __webpack_require__(3);

var _photonomixGame3 = __webpack_require__(7);

var _photonomixGame4 = __webpack_require__(6);

var _photonomix2 = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    times = _vectrix$vectors.times,
    mut_times = _vectrix$vectors.mut_times,
    distance = _vectrix$vectors.distance;
var mut_plus = vectrix.matrices.mut_plus;
var random = Math.random,
    sqrt = Math.sqrt,
    PI = Math.PI,
    ceil = Math.ceil,
    min = Math.min;

var POS_C = vec2(0, 0);

function Void() {
	var ipos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : vec2();
	var ivel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vec2();
	var mass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	this.pos = vec2(ipos);
	this.vel = vec2(ivel);
	this.size = 0;
	this.birthMass = mass;
	this.mass = 1;
	this.lastMeal = -1;
	this.eatTime = 0;
	return this;
}

var scratchVec1 = vec2(),
    entity = void 0,
    i = 0 | 0,
    len = 0 | 0,
    a_dist = 0.0,
    consume = 0 | 0;
Void.prototype.tick = function (entities, delta) {
	if (this.birthMass > 0) {
		consume = min(this.birthMass, ceil(this.mass / 100));
		this.birthMass -= consume;
		this.mass += consume;
	}
	if (this.eatTime > 30) this.eatTime--;else this.lastMeal = -1;
	if ((0, _photonomix.outOfBounds)(this.pos, 1.3)) {
		this.mass = this.mass - 1;
	}
	this.size = sqrt(this.mass / PI) * _photonomix2.VOID_SIZE;
	// last turn's move, has to happen first
	mut_plus(this.pos, times(this.vel, delta, scratchVec1));

	// apply basic forces
	// don't go off the screen
	mut_plus(this.vel, (0, _photonomix.avoid)(this.vel, this.pos, POS_C, 1.3, 0.01, scratchVec1));
	// apply drag
	mut_plus(this.vel, (0, _photonomix.drag)(this.vel, _photonomix2.GLOBAL_DRAG));
	(0, _photonomix.limitVecMut)(this.vel, 0, 1);

	for (i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if (entity === this) continue;
		a_dist = distance(this.pos, entity.pos);

		if (entity instanceof _photonomixGame2.Photon && a_dist < this.size) {
			entity.lifetime = entity.lifetime - 1;
			if (entity.lifetime === 0 || a_dist < this.size * 0.6) {
				this.mass = this.mass + 1;
				this.lastMeal = entity.color;
				this.eatTime = 15;
				entity.lifetime = 0;
			}
		}
		if (entity instanceof _photonomixGame.Mote && a_dist < this.size * 0.6) {
			// probablistic injury, so they don't get shredded instantly
			if (random() * 30 * a_dist < 1) entity.injured = entity.injured + 1;
		}
		if (entity instanceof Void) {
			if (a_dist < (entity.size + this.size) * 0.44) {
				// bigger ones eat smaller ones
				if (this.mass > entity.mass) {
					consume = min(entity.mass, ceil(this.birthMass + this.mass / 100));
					this.birthMass += consume;
					entity.mass -= consume;
				}
			}
		}
		if (!entity.mass) continue; // zero mass means gravity bugs
		// apply gravity
		if (entity instanceof _photonomixGame3.Emitter) {
			// emitters have negative & repelling mass
			mut_plus(entity.vel, mut_times((0, _photonomix.gravitate)(entity.pos, this.pos, this.mass / entity.mass, scratchVec1), 1 / entity.mass));
		} else if (!(entity instanceof _photonomixGame4.AntiGravitonCluster)) {
			mut_plus(entity.vel, mut_times((0, _photonomix.gravitate)(entity.pos, this.pos, entity.mass * this.mass, scratchVec1), 1 / entity.mass));
		}
	}
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AntiGravitonCluster = AntiGravitonCluster;

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomix = __webpack_require__(2);

var _photonomixGame = __webpack_require__(5);

var _photonomixGame2 = __webpack_require__(3);

var _photonomix2 = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    times = _vectrix$vectors.times,
    distance = _vectrix$vectors.distance,
    mut_copy = _vectrix$vectors.mut_copy;
var mut_plus = vectrix.matrices.mut_plus;
var random = Math.random,
    sqrt = Math.sqrt,
    PI = Math.PI,
    ceil = Math.ceil,
    min = Math.min,
    max = Math.max;

var POS_C = vec2(0, 0);

function AntiGravitonCluster() {
	var ipos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : vec2();
	var ivel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vec2();
	var mass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	var photonPool = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

	this.pos = vec2(ipos);
	this.vel = vec2(ivel);
	this.size = 0;
	this.birthMass = this.initialMass = mass;
	this.mass = 1;
	this.photonPool = photonPool;
	this.instability = 0;
	this.size = 0;
	return this;
}

var scratch = vec2(),
    entity = void 0,
    i = 0 | 0,
    len = 0 | 0,
    dist = 0.0,
    consume = 0 | 0;
AntiGravitonCluster.prototype.tick = function (entities, delta, frameCount) {
	if (this.birthMass > 0) {
		consume = min(this.birthMass, ceil(this.mass / 10));
		this.birthMass -= consume;
		this.mass += consume;
	}
	this.size = sqrt(this.mass * 0.05 / PI) * _photonomix2.MOTE_BASE_SIZE;
	// last turn's move, has to happen first
	mut_plus(this.pos, times(this.vel, delta, scratch));
	this.initialMass = max(this.mass, this.initialMass);

	// apply basic forces
	// don't go off the screen
	mut_plus(this.vel, (0, _photonomix.avoid)(this.vel, this.pos, POS_C, 1.3, 0.01, scratch));
	// apply drag
	mut_plus(this.vel, (0, _photonomix.drag)(this.vel, _photonomix2.GLOBAL_DRAG));

	if (this.birthMass === 0) {
		this.instability += this.mass * 0.003;
	}
	if (frameCount % ceil(_photonomix2.TARGET_FPS * 0.05) === 0) {
		while (this.instability > 0 && this.mass > 0) {
			entities.push(this.emitPhoton());
			this.mass -= min(this.mass, 7);
			this.instability -= 0.9;
		}
	}

	for (i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if (entity === this) continue;
		dist = distance(this.pos, entity.pos);

		if (entity instanceof _photonomixGame.Void) {
			if (dist < (entity.size + this.size) * 0.5) {
				consume = min(entity.mass, ceil((entity.mass + entity.birthMass) / 10));
				this.mass += consume;
				entity.mass -= consume;
				this.instability += consume * 0.07;
			}
			if (dist < this.size * 10) mut_plus(this.vel, (0, _photonomix.accelerate)(this.pos, entity.pos, this.size * dist * 5, scratch));
			return;
		}
	}
};

AntiGravitonCluster.prototype.emitPhoton = function () {
	var pos = vec2(),
	    vel = vec2(),
	    rot = vec2(),
	    radians = 0.0,
	    mim = 0.0,
	    color = 0 | 0;
	return function emitPhoton() {
		color = ~~(random() * 3);
		pos[0] = this.size * 0.1;
		pos[1] = this.size * 0.1;
		mut_plus(pos, this.pos);
		mut_copy(vel, this.vel);
		mim = this.mass % this.initialMass;
		radians = mim / (this.initialMass / 2);
		radians = radians + mim % 100 * (2 / 100); // split across arms
		mut_copy(rot, (0, _photonomix.rotate)(pos, this.pos, radians, pos));
		mut_plus(rot, this.pos);
		mut_plus(pos, rot);
		// introduce some jitter
		mut_plus(vel, (0, _photonomix.accelerate)(this.pos, pos, this.size * 2, scratch));
		return new _photonomixGame2.Photon(pos, vel, color, this.photonPool);
	};
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Emitter = Emitter;

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomix = __webpack_require__(0);

var _photonomix2 = __webpack_require__(2);

var _photonomixGame = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    times = _vectrix$vectors.times,
    mut_times = _vectrix$vectors.mut_times,
    distance = _vectrix$vectors.distance;
var mut_plus = vectrix.matrices.mut_plus;
var random = Math.random,
    sqrt = Math.sqrt,
    ceil = Math.ceil,
    min = Math.min,
    PI = Math.PI;

var POS_C = vec2(0, 0);

/**
 * Emitters are "white holes" that spit out photons on a fixed schedule until depleted.
 */
function Emitter() {
	var ipos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : vec2();
	var ivel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vec2();
	var mass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	var photonPool = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
	var arms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

	this.pos = vec2(ipos);
	this.vel = vec2(ivel);
	this.birthMass = mass;
	this.mass = 1;
	this.initialMass = mass;
	this.photonPool = photonPool;
	this.arms = arms || ceil(random() * random() * 50);
	this.size = 0;
	this.next = ~~(random() * 3);
	return this;
}

var scratchVec1 = vec2(),
    emissionsPerSecond = 0 | 0,
    emissionsPerFrame = 0 | 0,
    targetFrame = 0 | 0,
    i = 0 | 0,
    len = 0 | 0,
    entity = void 0,
    a_dist = 0.0,
    consume = 0 | 0;
Emitter.prototype.tick = function (entities, delta, frameCount) {
	/* jshint unused:false */
	if (this.birthMass > 0) {
		consume = min(this.birthMass, ceil(this.mass / 100));
		this.birthMass -= consume;
		this.mass += consume;
	}
	this.size = sqrt(this.mass / PI) * _photonomix.EMITTER_SIZE;
	if (this.birthMass === 0) {
		// don't start producing until finished spawning
		emissionsPerSecond = this.initialMass / 20;
		targetFrame = ceil(_photonomix.TARGET_FPS / emissionsPerSecond);
		emissionsPerFrame = emissionsPerSecond / _photonomix.TARGET_FPS;
		if (frameCount % targetFrame === 0) {
			while (emissionsPerFrame-- > 0 && this.mass > 0) {
				this.mass--;
				entities.push(this.emitPhoton());
			}
		}
	}
	// last turn's move, has to happen first
	mut_plus(this.pos, times(this.vel, delta, scratchVec1));
	// apply drag
	mut_plus(this.vel, (0, _photonomix2.drag)(this.vel, _photonomix.GLOBAL_DRAG));
	// avoid edge
	mut_plus(this.vel, (0, _photonomix2.avoid)(this.vel, this.pos, POS_C, 1.3, 0.001, scratchVec1));

	for (i = 0, len = entities.length; i < len; ++i) {
		entity = entities[i];
		if (entity === this) continue;
		a_dist = distance(this.pos, entity.pos);
		if (entity instanceof Emitter) {
			mut_plus(entity.vel, mut_times((0, _photonomix2.gravitate)(entity.pos, this.pos, this.mass * entity.mass, scratchVec1), 1 / entity.mass));
		} else {
			mut_plus(entity.vel, mut_times((0, _photonomix2.gravitate)(entity.pos, this.pos, -this.mass * entity.mass, scratchVec1), 1 / entity.mass));
		}
	}
};

Emitter.prototype.emitPhoton = function () {
	var pos = vec2(),
	    radians = 0.0,
	    mim = 0.0,
	    color = 0 | 0;
	return function emitPhoton() {
		color = this.next;
		pos[0] = this.size / 5;
		pos[1] = this.size / 5;
		mut_plus(pos, this.pos);
		mim = this.mass % this.initialMass;
		radians = mim / (this.initialMass / 2);
		radians = radians + mim % this.arms * (2 / this.arms); // split across arms
		mut_plus((0, _photonomix2.rotate)(pos, this.pos, radians, pos), this.pos);
		this.next = ~~(random() * 3);
		// introduce some jitter
		return new _photonomixGame.Photon(pos, vec2(0, 0), color, this.photonPool);
	};
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BUFFER_LENGTH = exports.ACT_LINK = exports.ACT_ATTACK = exports.ACT_AVOID = exports.ACT_CHASE = exports.ACT_SEARCH = exports.ACT_IDLE = undefined;
exports.Mote = Mote;

var _photonomix = __webpack_require__(0);

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomix2 = __webpack_require__(2);

var _photonomixGame = __webpack_require__(3);

var _photonomixGame2 = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var random = Math.random,
    max = Math.max,
    min = Math.min,
    floor = Math.floor,
    ceil = Math.ceil,
    sin = Math.sin;
var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    times = _vectrix$vectors.times,
    mut_clamp = _vectrix$vectors.mut_clamp,
    magnitude = _vectrix$vectors.magnitude,
    distance = _vectrix$vectors.distance,
    mut_copy = _vectrix$vectors.mut_copy,
    mut_times = _vectrix$vectors.mut_times;
var _vectrix$matrices = vectrix.matrices,
    plus = _vectrix$matrices.plus,
    mut_plus = _vectrix$matrices.mut_plus;

var clamp = mut_clamp;
// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
var POS_C = vec2(0.0, 0.0);
// activity type constants
var ACT_IDLE = exports.ACT_IDLE = 0;
var ACT_SEARCH = exports.ACT_SEARCH = 1;
var ACT_CHASE = exports.ACT_CHASE = 2;
var ACT_AVOID = exports.ACT_AVOID = 3;
var ACT_ATTACK = exports.ACT_ATTACK = 4;
var ACT_LINK = exports.ACT_LINK = 5;

// twiddle to slightly offset the values, avoids divide by zero and other errors
// inherent to acceleration, friction, drag and gravity equations
(0, _photonomix2.twiddleVec)(POS_C);
// relative color values derived from a Mote's photons, used to produce color string
// for rendering

// various consts below are indexes and byte counts for mote data
// byte length of these value types
var I8 = 1;
var F32 = 4;

// uint8 values = photons[3]
var U8_PHO = 0,
    U8_COL = U8_PHO + I8 * 3,
    U8_VAL_LENGTH = U8_COL + I8 * 3,
    I8_BYTE_OFFSET = U8_VAL_LENGTH;
// int8 values =  dying, pregnant, injured, lastMeal, pulse
var I8_DYING = 0,
    I8_PREG = I8_DYING + I8,
    I8_INJURED = I8_PREG + I8,
    I8_LAST_INJURY = I8_INJURED + I8,
    I8_MEAL = I8_LAST_INJURY + I8,
    I8_UPD = I8_MEAL + I8,
    I8_PULSE = I8_UPD + I8,
    I8_ACT = I8_PULSE + I8,
    I8_VAL_LENGTH = I8_ACT + I8,
    INT_VAL_LENGTH = U8_VAL_LENGTH + I8_VAL_LENGTH;

// float32 values = p[3], v[3], color[4], size, sizeMin, sizeMax, speed, sight, agro, fear, potential, resistance
// from here on, increments of value * 4
// vectors
var VEC_BYTE_OFFSET = INT_VAL_LENGTH + (F32 - INT_VAL_LENGTH % F32),
    // float32 offsets must be multiples of 4
F32_POS = 0,
    F32_VEL = F32_POS + 2,
    F32_RAT = F32_VEL + 2,
    F32_PREF = F32_RAT + 3,
    VEC_VAL_LENGTH = F32_PREF + 3;

var F32_BYTE_OFFSET = VEC_BYTE_OFFSET + VEC_VAL_LENGTH * F32,

// scalars
F32_SIZE = 0,
    F32_SIZE_MIN = F32_SIZE + 1,
    F32_SIZE_MAX = F32_SIZE_MIN + 1,
    F32_SPEED = F32_SIZE_MAX + 1,
    F32_SIGHT = F32_SPEED + 1,
    F32_AGRO = F32_SIGHT + 1,
    F32_FEAR = F32_AGRO + 1,
    F32_POTENTIAL = F32_FEAR + 1,
    F32_RESISTANCE = F32_POTENTIAL + 1,
    F32_MASS = F32_RESISTANCE + 1,
    FLOAT_VAL_LENGTH = F32_MASS + 1;

var BUFFER_LENGTH = exports.BUFFER_LENGTH = F32_BYTE_OFFSET + FLOAT_VAL_LENGTH * F32;

// scratch vectors used in various functions
var scratch1 = vec2(),
    scratch2 = vec2();

/**
 * Constructor for Motes.
 * @param {Float32Array(3)} photons initial photons (0-255, R, G, B)
 * @param {vec2} pos initial position
 * @param {Float} bSpeed (optional) base acceleration: inheritance and predesigned motes 
 * @param {Float} bSight (optional) base vision radius: inheritance and predesigned motes 
 * @param {Float} bAgro (optional) base aggressiveness: inheritance and predesigned motes 
 * @param {Float} bFear (optional) base fearfulness: inheritance and predesigned motes 
 * @param {BufferPool} pool (optional) buffer pool to build the mote on
 * @property {vec2} pos position vector
 * @property {vec2} vel velocity vector
 * @property {Uint8} r red photon value (setter updates values and derived props)
 * @property {Uint8} g green photon value (setter updates value and derived props)
 * @property {Uint8} b blue photon value (setter updates value and derived props)
 * @property {string} color_string rgba color string, used for drawing in 2d
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
 * @property {Int8Array} intVals direct access to integer value array (for debug)
 * @property {Float32Array} ratios current photon ratios (R, G, B)
 * @property {Float32Array} prefs preferred photon ratios
 * @property {Float32Array} floatVals direct access to float value array (for debug)
 * @return {Mote}
 */
function Mote() {
	var _photons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Uint8Array(3);

	var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Float32Array(2);
	var pool = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
	var bSpeed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _photonomix.MOTE_BASE_SPEED;
	var bSight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _photonomix.MOTE_BASE_SIGHT;
	var bAgro = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1.0;
	var bFear = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1.0;

	var buffer = void 0,
	    offset = 0 | 0;
	if (pool) {
		buffer = pool.buffer;
		offset = pool.allocate();
	} else {
		buffer = new ArrayBuffer(BUFFER_LENGTH);
		offset = 0;
	}

	// "private" properties
	// use a single buffer for properties so that they're guaranteed to be contiguous
	// in memory and typed
	var photons = new Uint8ClampedArray(buffer, U8_PHO + offset, 3);
	var color = new Uint8ClampedArray(buffer, U8_COL + offset, 3);
	photons[_photonomixGame.COLOR_R] = _photons[_photonomixGame.COLOR_R];
	photons[_photonomixGame.COLOR_G] = _photons[_photonomixGame.COLOR_G];
	photons[_photonomixGame.COLOR_B] = _photons[_photonomixGame.COLOR_B];
	var intVals = new Int8Array(buffer, I8_BYTE_OFFSET + offset, I8_VAL_LENGTH - U8_PHO);
	var floatVals = new Float32Array(buffer, F32_BYTE_OFFSET + offset, FLOAT_VAL_LENGTH);
	this.pos = vec2(pos, buffer, F32_POS * F32 + VEC_BYTE_OFFSET + offset);
	this.vel = vec2(0.0, 0.0, buffer, F32_VEL * F32 + VEC_BYTE_OFFSET + offset);
	var ratios = new Float32Array(buffer, F32_RAT * F32 + VEC_BYTE_OFFSET + offset, 3);
	var prefs = new Float32Array(buffer, F32_PREF * F32 + VEC_BYTE_OFFSET + offset, 3);
	this.target = undefined;
	this.color_string = "";
	bSpeed = bSpeed + (0, _photonomix2.adjRand)(0.0005);
	bSight = bSight + (0, _photonomix2.adjRand)(0.001); // vision distance
	bAgro = bAgro + (0, _photonomix2.adjRand)(0.001);
	bFear = bFear + (0, _photonomix2.adjRand)(0.001);

	Object.defineProperties(this, {
		"photons": { get: function get() {
				return photons;
			} },
		"color": { get: function get() {
				return color;
			} },
		"dying": { get: function get() {
				return intVals[I8_DYING];
			}, set: function set(v) {
				return intVals[I8_DYING] = v;
			} },
		"action": { get: function get() {
				return intVals[I8_ACT];
			}, set: function set(v) {
				return intVals[I8_ACT] = v;
			} },
		"pregnant": { get: function get() {
				return intVals[I8_PREG];
			}, set: function set(v) {
				return intVals[I8_PREG] = v;
			} },
		"injured": { get: function get() {
				return intVals[I8_INJURED];
			}, set: function set(v) {
				return intVals[I8_INJURED] = v;
			} },
		"lastInjury": { get: function get() {
				return intVals[I8_LAST_INJURY];
			}, set: function set(v) {
				return intVals[I8_LAST_INJURY] = v;
			} },
		"needsUpdate": { get: function get() {
				return intVals[I8_UPD];
			}, set: function set(v) {
				return intVals[I8_UPD] = v;
			} },
		"pulse": { get: function get() {
				return intVals[I8_PULSE];
			}, set: function set(v) {
				return intVals[I8_PULSE] = v;
			} },
		"lastMeal": { get: function get() {
				return intVals[I8_MEAL];
			}, set: function set(v) {
				return intVals[I8_MEAL] = v;
			} },
		"size": { get: function get() {
				return floatVals[F32_SIZE];
			}, set: function set(v) {
				return floatVals[F32_SIZE] = v;
			} },
		"sizeMin": { get: function get() {
				return floatVals[F32_SIZE_MIN];
			}, set: function set(v) {
				return floatVals[F32_SIZE_MIN] = v;
			} },
		"sizeMax": { get: function get() {
				return floatVals[F32_SIZE_MAX];
			}, set: function set(v) {
				return floatVals[F32_SIZE_MAX] = v;
			} },
		"speed": { get: function get() {
				return floatVals[F32_SPEED];
			}, set: function set(v) {
				return floatVals[F32_SPEED] = v;
			} },
		"sight": { get: function get() {
				return floatVals[F32_SIGHT];
			}, set: function set(v) {
				return floatVals[F32_SIGHT] = v;
			} },
		"agro": { get: function get() {
				return floatVals[F32_AGRO];
			}, set: function set(v) {
				return floatVals[F32_AGRO] = v;
			} },
		"fear": { get: function get() {
				return floatVals[F32_FEAR];
			}, set: function set(v) {
				return floatVals[F32_FEAR] = v;
			} },
		"potential": { get: function get() {
				return floatVals[F32_POTENTIAL];
			}, set: function set(v) {
				return floatVals[F32_POTENTIAL] = v;
			} },
		"resistance": { get: function get() {
				return floatVals[F32_RESISTANCE];
			}, set: function set(v) {
				return floatVals[F32_RESISTANCE] = v;
			} },
		"mass": { get: function get() {
				return floatVals[F32_MASS];
			}, set: function set(v) {
				return floatVals[F32_MASS] = v;
			} },
		"base_speed": { get: function get() {
				return bSpeed;
			} },
		"base_sight": { get: function get() {
				return bSight;
			} },
		"base_agro": { get: function get() {
				return bAgro;
			} },
		"base_fear": { get: function get() {
				return bFear;
			} },
		"pool": { get: function get() {
				return pool;
			} },
		"offset": { get: function get() {
				return offset;
			} },
		"ratios": { get: function get() {
				return ratios;
			} },
		"prefs": { get: function get() {
				return prefs;
			} }
	});

	/*
  * Debug access only.
  */
	if (_photonomix.DEBUG) Object.defineProperties(this, {
		"intVals": { get: function get() {
				return intVals;
			} },
		"floatVals": { get: function get() {
				return floatVals;
			} }
	});

	// initialize values, important to do since buffer may be reused
	this.dying = 0;
	this.pregnant = 0;
	this.injured = 0;
	this.lastInjury = 0;
	this.speed = bSpeed;
	this.sight = bSight;
	this.agro = bAgro;
	this.fear = bFear;
	this.potential = this.agro * 2;
	this.resistance = this.fear * 2;
	this.lastMeal = ~~(random() * 3);
	this.pulse = ~~(_photonomix.TARGET_FPS * random());
	this.size = _photonomix.MOTE_BASE_SIZE;
	this.sizeMin = _photonomix.MOTE_BASE_SIZE * 0.5;
	this.sizeMax = _photonomix.MOTE_BASE_SIZE * 3;

	this.updateProperties();
	this.prefs[_photonomixGame.COLOR_R] = this.ratios[_photonomixGame.COLOR_R];
	this.prefs[_photonomixGame.COLOR_G] = this.ratios[_photonomixGame.COLOR_G];
	this.prefs[_photonomixGame.COLOR_B] = this.ratios[_photonomixGame.COLOR_B];
	return this;
}

/**
 * Updates derived properties for mote.
 */
Mote.prototype.updateProperties = function () {
	var r = 0 | 0,
	    g = 0 | 0,
	    b = 0 | 0,
	    photons = void 0,
	    color = void 0,
	    ratios = void 0;
	return function updateProperties() {
		photons = this.photons;
		ratios = this.ratios;
		color = this.color;

		r = photons[_photonomixGame.COLOR_R];
		g = photons[_photonomixGame.COLOR_G];
		b = photons[_photonomixGame.COLOR_B];
		this.mass = r + g + b;
		if (this.mass > 0) {
			// otherwise skip this stuff since the mote is dead anyway
			this.size = clamp(this.mass / (_photonomix.PREGNANT_THRESHOLD / 3) * _photonomix.MOTE_BASE_SIZE, this.sizeMin, this.sizeMax);
			ratios[_photonomixGame.COLOR_R] = (0, _photonomix2.ratio)(r, g + b);
			ratios[_photonomixGame.COLOR_G] = (0, _photonomix2.ratio)(g, r + b);
			ratios[_photonomixGame.COLOR_B] = (0, _photonomix2.ratio)(b, g + r);
			this.speed = this.base_speed * (1 - this.size) * (1 + ratios[_photonomixGame.COLOR_B]);
			this.sight = this.base_sight + this.size * 0.5; // see from edge onward
			this.agro = this.base_agro * (1 + ratios[_photonomixGame.COLOR_R]);
			this.fear = this.base_fear * (1 + ratios[_photonomixGame.COLOR_G]);
			if (_photonomix.DEBUG) {
				if (isNaN(this.speed)) throw new Error("Mote.updateProperties: NaN speed");
				if (isNaN(this.sight)) throw new Error("Mote.updateProperties: NaN sight");
				if (isNaN(this.size)) throw new Error("Mote.updateProperties: NaN size");
				if (isNaN(this.agro)) throw new Error("Mote.updateProperties: NaN agro");
				if (isNaN(this.fear)) throw new Error("Mote.updateProperties: NaN fear");
			}
		} // end of stuff to do only if sum > 0

		if (this.mass > _photonomix.PREGNANT_THRESHOLD && this.pregnant === 0) this.pregnant = _photonomix.PREGNANT_TIME;
		if (this.mass < _photonomix.DEATH_THRESHOLD && this.dying === 0) this.dying = 1;

		color[_photonomixGame.COLOR_R] = ~~(r / this.mass * 255);
		color[_photonomixGame.COLOR_G] = ~~(g / this.mass * 255);
		color[_photonomixGame.COLOR_B] = ~~(b / this.mass * 255);
		this.needsUpdate = 0;
	};
}();

/**
 * Maintenance tasks to be done each tick
 */
Mote.prototype.runMaintenance = function () {
	var pregnant = 0 | 0,
	    dying = 0 | 0,
	    tmpPot = 0.0,
	    tmpRes = 0.0,
	    agro = 0.0,
	    fear = 0.0,
	    size = 0.0,
	    speed = 0.0,
	    sight = 0.0,
	    pos = void 0,
	    vel = void 0,
	    target = void 0;
	return function runMaintenance(delta) {
		pos = this.pos;
		vel = this.vel;
		pregnant = this.pregnant;
		dying = this.dying;
		agro = this.agro;
		fear = this.fear;
		size = this.size;
		speed = this.speed;
		sight = this.sight;
		target = this.target;

		if (pregnant > 0) this.pregnant = pregnant - 1;
		if (dying > 0) this.dying = dying + 1; // start counting up
		if (this.needsUpdate) this.updateProperties();
		// build potential and resistance each tick
		tmpPot = agro * (size * 100);
		tmpRes = fear * (size * 100);
		this.potential = clamp(this.potential + agro * delta, -tmpPot, tmpPot);
		this.resistance = clamp(this.resistance + fear * delta, -tmpRes, tmpRes);

		// last turn's move, has to happen first to avoid prediction inaccuracy
		// during chases
		mut_plus(pos, times(vel, delta, scratch1));

		// don't go off the screen
		mut_plus(vel, (0, _photonomix2.avoid)(vel, pos, POS_C, 1.3, speed, scratch1));
		// apply drag
		mut_plus(vel, (0, _photonomix2.drag)(vel, _photonomix.GLOBAL_DRAG));
	};
}();

/**
 * Checks if a target is valid.
 * @param {Object} entity any game object that can be targeted
 * @return {float} distance if valid, otherwise -1
 */
Mote.prototype.validateTarget = function () {
	var dist = 0.0,
	    sight = 0.0,
	    pos = void 0;
	return function (entity) {
		pos = this.pos;
		sight = this.sight;

		dist = distance(pos, entity.pos);
		// these targets are invalid
		if (entity === this) return -1;
		if (entity.dying) return -1;
		if (entity.lifetime && entity.lifetime < 3) return -1;
		if (entity.mass < 1) return -1;
		if (dist > sight + entity.size * 0.5) return -1;
		if ((0, _photonomix2.outOfBounds)(entity, 0.7)) return -1;
		return dist;
	};
}();

/**
 * Search for a target and decide how to act toward it.
 */
Mote.prototype.search = function () {
	var i = 0 | 0,
	    len = 0 | 0,
	    sight = 0.0,
	    cur = 0.0,
	    pos = void 0,
	    vel = void 0,
	    highest = void 0,
	    dist = void 0,
	    entity = void 0,
	    deltar = 0.0,
	    deltag = 0.0,
	    deltab = 0.0,
	    mind = 0.0,
	    maxd = 0.0,
	    weight = 0.0;
	return function search(entities) {
		pos = this.pos;
		vel = this.vel;
		sight = this.sight;

		highest = -Infinity;
		dist = 0;
		if (this.pregnant || this.dying) {
			this.action = ACT_IDLE;
			highest = Infinity;
		}

		for (i = 0, len = entities.length; i < len && highest < Infinity; ++i) {
			entity = entities[i];
			var _dist = this.validateTarget(entity);
			if (_dist === -1) continue;
			// ignore things outside sight range
			if (entity instanceof Mote) {
				cur = 3 * (1 / _dist);
				if (cur > highest) {
					this.target = entity;
					if (entity.target === this || _dist < (this.size + entity.size) * 0.5) {
						this.action = ACT_AVOID;
					} else this.action = ACT_CHASE;
					highest = cur;
				}
			} else if (entity instanceof _photonomixGame2.Void) {
				this.target = entity;
				this.action = ACT_AVOID;
				highest = Infinity;
			} else if (entity instanceof _photonomixGame.Photon && entity.lifetime > 3) {
				deltar = this.prefs[_photonomixGame.COLOR_R] - this.ratios[_photonomixGame.COLOR_R];
				deltag = this.prefs[_photonomixGame.COLOR_G] - this.ratios[_photonomixGame.COLOR_G];
				deltab = this.prefs[_photonomixGame.COLOR_B] - this.ratios[_photonomixGame.COLOR_B];
				maxd = max(deltar, deltag, deltab);
				mind = min(deltar, deltag, deltab);
				if (maxd == deltar && entity.color == _photonomixGame.COLOR_R || maxd == deltag && entity.color == _photonomixGame.COLOR_G || maxd == deltab && entity.color == _photonomixGame.COLOR_B) weight = 30;
				if (mind == deltar && entity.color == _photonomixGame.COLOR_R || mind == deltag && entity.color == _photonomixGame.COLOR_G || mind == deltab && entity.color == _photonomixGame.COLOR_B) weight = 10;else weight = 20;
				cur = weight * (1 / _dist);
				if (cur > highest) {
					this.target = entity;
					this.action = ACT_CHASE;
					highest = cur;
				}
			}
		}
		if (highest < 0) return false;
		return true;
	};
}();

/**
 * Decide how to act each tick based on nearby objects.
 * @param Array surrounding array of nearby objects to consider in movement
 * @param Float delta time delta
 */
Mote.prototype.tick = function () {
	var pos = void 0,
	    vel = void 0,
	    size = void 0,
	    sight = void 0,
	    speed = void 0,
	    agro = void 0,
	    fear = void 0,
	    resistance = void 0,
	    potential = void 0,
	    target = void 0,
	    dist = void 0;
	return function tick(entities, delta, frameCount) {
		pos = this.pos;
		vel = this.vel;
		size = this.size;
		sight = this.sight;
		speed = this.speed;
		agro = this.agro;
		fear = this.fear;
		resistance = this.resistance;
		potential = this.potential;
		target = this.target;

		this.runMaintenance(delta);

		// validate current target 
		if (target && (dist = this.validateTarget(target)) === -1) {
			this.action = ACT_IDLE;
		}

		switch (this.action) {
			case ACT_IDLE:
				// lost target, gave up, or completed task
				this.target = undefined;
				if (magnitude(vel) < 0.001) {
					// not going anywhere, so pick a random direction
					scratch1[0] = random() * 2 - 1;
					scratch1[1] = random() * 2 - 1;
				} else {
					mut_copy(scratch1, pos);
					mut_plus(scratch1, times(vel, delta, scratch2));
					mut_plus(scratch1, (0, _photonomix2.rotate)(scratch1, pos, sin((frameCount + this.pulse) * speed), scratch2));
				}
				mut_plus(vel, (0, _photonomix2.accelerate)(pos, scratch1, speed, scratch2));
				this.action = ACT_SEARCH;
				break;
			case ACT_CHASE:
				// chasing a target
				// predict target's next move
				plus(target.pos, times(target.vel, delta, scratch1), scratch2);
				mut_plus(vel, (0, _photonomix2.accelerate)(pos, scratch2, speed, scratch1));
				if (dist < sight) {
					if (target instanceof Mote && this.potential > this.agro * 3) this.action = ACT_ATTACK;else this.action = ACT_ATTACK;
				}
				break;
			case ACT_AVOID:
				// avoiding a target
				// predict target's next move
				plus(target.pos, times(target.vel, delta, scratch1), scratch2);
				mut_plus(vel, (0, _photonomix2.accelerate)(scratch2, pos, speed, scratch1));
				if (this.resistance > fear * 3) this.action = ACT_IDLE;
				break;
			case ACT_ATTACK:
				// attacking a target
				if (target instanceof Mote) this.discharge(target);else if (target instanceof _photonomixGame.Photon) this.eatPhoton(target);
				break;
			case ACT_LINK:
				// linking with a target
				break;
			case ACT_SEARCH:
				if (!this.search(entities)) this.action = ACT_IDLE;
				break;
			default:
				break;
		}
	};
}();

var delta = 0.0;
Mote.prototype.discharge = function (target) {
	delta = this.potential - target.resistance;
	target.resistance -= max(this.agro, delta * this.agro);
	this.potential -= max(this.fear, delta * this.fear);
	target.injure(this, max(0, ~~delta));
	if (this.potential < 0) this.action = ACT_IDLE;
};

Mote.prototype.injure = function (by, strength) {
	this.injured += strength;
	this.lastInjury = this.injured;
	if (this.resistance < this.agro * 3 || this.injured < this.fear) this.target = by;
};

Mote.prototype.bleed = function () {
	var choice = 0 | 0,
	    choiceVal = 0 | 0,
	    pvel = vec2(),
	    photons = void 0;
	return function bleed(photonPool) {
		photons = this.photons;
		do {
			choice = ~~(random() * 3);
			switch (choice) {
				case _photonomixGame.COLOR_R:
					choiceVal = photons[_photonomixGame.COLOR_R];break;
				case _photonomixGame.COLOR_G:
					choiceVal = photons[_photonomixGame.COLOR_G];break;
				case _photonomixGame.COLOR_B:
					choiceVal = photons[_photonomixGame.COLOR_B];break;
			}
		} while (choiceVal === 0);
		switch (choice) {
			case _photonomixGame.COLOR_R:
				photons[_photonomixGame.COLOR_R] = photons[_photonomixGame.COLOR_R] - 1;break;
			case _photonomixGame.COLOR_G:
				photons[_photonomixGame.COLOR_G] = photons[_photonomixGame.COLOR_G] - 1;break;
			case _photonomixGame.COLOR_B:
				photons[_photonomixGame.COLOR_B] = photons[_photonomixGame.COLOR_B] - 1;break;
		}
		this.injured--;
		mut_times(this.vel, 1 + this.speed);
		mut_copy(pvel, this.vel);
		mut_times(pvel, -1);
		this.needsUpdate = 1;
		return new _photonomixGame.Photon(this.pos, pvel, choice, photonPool);
		//return choice;
	};
}();

Mote.prototype.split = function () {
	var baby = void 0,
	    photons = void 0;
	return function () {
		photons = this.photons;
		baby = new Mote([floor(photons[_photonomixGame.COLOR_R] / 2), floor(photons[_photonomixGame.COLOR_G] / 2), floor(photons[_photonomixGame.COLOR_B] / 2)], this.pos, this.pool, this.base_speed, this.base_sight, this.base_agro, this.base_fear);
		photons[_photonomixGame.COLOR_R] = ceil(photons[_photonomixGame.COLOR_R] / 2);
		photons[_photonomixGame.COLOR_G] = ceil(photons[_photonomixGame.COLOR_G] / 2);
		photons[_photonomixGame.COLOR_B] = ceil(photons[_photonomixGame.COLOR_B] / 2);
		this.pregnant = _photonomix.PREGNANT_TIME - 1;
		baby.pregnant = _photonomix.PREGNANT_TIME - 1;
		this.target = baby;
		baby.target = this;
		baby.needsUpdate = 1;
		this.needsUpdate = 1;
		return baby;
	};
}();

Mote.prototype.eatPhoton = function () {
	var photons = void 0;
	return function eatPhotons(photon) {
		if (photon.lifetime > 2 && distance(this.pos, photon.pos) < this.sight) {
			photons = this.photons;
			photon.lifetime = 2;
			switch (photon.color) {
				case _photonomixGame.COLOR_R:
					photons[_photonomixGame.COLOR_R] += 1;break;
				case _photonomixGame.COLOR_G:
					photons[_photonomixGame.COLOR_G] += 1;break;
				case _photonomixGame.COLOR_B:
					photons[_photonomixGame.COLOR_B] += 1;break;
			}
			this.lastMeal = photon.color;
			this.potential -= this.agro * 0.5;
			this.resistance -= this.fear * 0.5;
			this.needsUpdate = 1;
		}
		this.action = ACT_IDLE;
	};
}();

var rpos = new Float32Array(2);
var rphotons = new Uint8ClampedArray(3);
/**
 * Generates mote with randomized position and photon values.
 * @param {BufferPool} pool storage pool
 * @return {Mote}
 */
Mote.random = function (pool) {
	do {
		rpos[0] = random() * (0, _photonomix2.posneg)();
		rpos[1] = random() * (0, _photonomix2.posneg)();
	} while (magnitude(rpos) > 0.8);
	rphotons[0] = ~~(random() * 64);
	rphotons[1] = ~~(random() * 64);
	rphotons[2] = ~~(random() * 64);
	return new Mote(rphotons, rpos, pool);
};

Mote.prototype.destroy = function () {
	this.pool.free(this.offset);
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["flatten"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["likeMatrices"] = likeMatrices;
/* harmony export (immutable) */ __webpack_exports__["mut_plus"] = mut_plus;
/* harmony export (immutable) */ __webpack_exports__["mut_plus_scalar"] = mut_plus_scalar;
/* harmony export (immutable) */ __webpack_exports__["mut_minus"] = mut_minus;
/* harmony export (immutable) */ __webpack_exports__["mut_minus_scalar"] = mut_minus_scalar;
/* harmony export (immutable) */ __webpack_exports__["mut_multiply_scalar"] = mut_multiply_scalar;
/* harmony export (immutable) */ __webpack_exports__["toArray"] = toArray;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["wrap"] = wrap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__ = __webpack_require__(10);
/**
Require the module:
```javascript
const matrices = require("vectrix.matrices.js");
```

Create a 2x2 matrix using `create(rows, columns, values)`:
```javascript
let mat = matrices.create(2,2,[0,1, 2,3]);
```

Add two matrices using `a.plus(b)`:
```javascript
let first =  matrices.create(2,2,[1,2, 3,4]);
let second = matrices.create(2,2,[3,4, 5,6]);
let sum = first.plus(second);
```

Subtract two matrices with `a.minus(b)`:
```javascript
let diff = second.minus(first);
```

Get the dot product of two matrices via `a.dot(b)`:
```javascript
let prod = first.dot(second);
```

Dot can also multiply a matrix by a scalar:
```javascript
let scalarProd = first.dot(3);
```

All matrix and vector methods produce a new object from their operands, creating and
returning a new object as a result.
```javascript
sum.toArray(); // [4,6,8,10]
diff.toArray(); // [2,2,2,2]
product.toArray(); // [13,16,29,26]
first.toArray(); // [1,2,3,4]
second.toArray(); // [3,4,5,6]
scalarProd; // [3,6,9,12]
```

This means matrix operations are composable in an intuitive left-to-right fashion:
```javascript
first.sub(second).dot(diff).toArray(); // [8,8,8,8]
```

But keep in mind that you must follow matrix operation rules! Operating on two
incompatible matrices returns undefined:
```javascript
let third = matrices.create(1,2,[0,1]);
first.add(third); // undefined
```

It turned out to be useful to get a single row or column from a matrix, so you can
do that too using `mat.row(N)` and `mat.col(N)`:
```javascript
first.row(0); // matrix(2,1,[1,2])
first.col(1); // matrix(1,2,[2,4])
```
@module vectrix/matrices
*/


// set the max size for certain matrix operations, used in creating scratch memory
//const MBF = 20;
const {cos, sin} = Math;

const vec = __WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["create"];

/**
 * Flattens an array. Used for flattening arguments passed to factories. 
 * @function flatten
 * @param {mixed} a an array, array-like, or object that can be flattened
 * @return {mixed} flat version of input
 */
function flatten(a) {
	// cheap array-like check, may not always be reliable
	if(a instanceof Object && typeof a.length == "number") {
		let i = 0, len = a.length, out = [];
		for(;i < len; ++i) {
			out = out.concat(flatten(a[i]));
		}
		return out;
	}
	else return a;
}

/**
 * Tests whether two unknown objects are like matrices (same rows and columns) or
 * a compatible set of matrix and vector.
 * @param {Matrix|Vector} a 
 * @param {Matrix|Vector} b 
 * @return {bool}
 */
function likeMatrices(a, b) {
	return (
		// matrices
		(a.rows ===  b.rows) && (a.cols === b.cols) ||
		// vectors
		((a.rows === undefined && b.rows === undefined) &&
			a.length === b.length) ||
		// matrix / vector
		(b.cols === 1 && b.cols === undefined && a.rows === b.length) ||
		// vector / matrix
		(a.rows === 1 && b.rows === undefined && a.cols === b.length)
	);
}

/**
 * Add two matrices together.
 * @example
 * plus(matrix, anotherMatrix); // function
 * matrix.plus(anotherMatrix); // method
 * @function plus
 * @param {matrix} a first matrix
 * @param {matrix} b second matrix
 * @param {matrix} out out value (optional)
 * @return {matrix}
 */
const plus = (function() {
	let i = 0|0, l = 0|0, ar = 0|0, ac = 0|0;
	return function plus(a, b, out) {
		if(!likeMatrices(a, b)) return undefined;
		l = a.length;//-1;
		ar = a.rows;
		ac = a.cols;
		out = out||create.similar(a);
		for(i = 0|0; i < l; ++i) {
			out[i] = a[i] + b[i]
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["plus"] = plus;


/**
 * Mutating version of [plus](#plus).
 *
 * @function mut_plus
 * @param {matrix} a first matrix
 * @param {matrix} b second matrix
 * @param {matrix} out out value (optional)
 * @return {matrix}
 */
function mut_plus(a, b) {
	return plus(a, b, a);
}

/**
 * Add a scalar to a matrix.
 * plus_scalar(matrix, anotherMatrix); // function
 * matrix.plus_scalar(anotherMatrix); // method
 * @function plus
 * @param {matrix} a first matrix
 * @param {matrix} s scalar
 * @param {matrix} out (optional) out value
 * @return {matrix}
 */
const plus_scalar = (function() {
	let i = 0|0;
	return function plus_scalar(a, s, out) {
		out = out||create(a.rows, a.cols);
		s = +s;
		i = a.length;//-1;
		while(i--) {
			out[i] = a[i] + s;
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["plus_scalar"] = plus_scalar;


/**
 * Mutating version of [plus](#plus).
 * @function mut_plus
 * @param {matrix} a first matrix
 * @param {matrix} s second matrix
 * @return {matrix}
 */
function mut_plus_scalar(a, s) {
	return plus_scalar(a, s, a);
}

/**
 * Subtract matrices.
 * @example
 * minus(matrix, anotherMatrix); // function
 * matrix.minus(anotherMatrix); // method
 * @param {matrix} a first matrix
 * @param {matrix} b second matrix
 * @return {matrix}
 */
const minus = (function() {
	let i = 0|0, ac = 0|0, ar = 0|0;
	return function minus(a, b, out) {
		if(!likeMatrices(a, b)) return undefined;
		i = a.length;//-1;
		ar = a.rows || 0;
		ac = a.cols || i;
		out = out||create.similar(a);
		while(i--) {
			out[i] = a[i] - b[i]
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["minus"] = minus;


/**
 * Mutating version of [minus](#minus).
 *
 * @function mut_minus
 * @param {matrix} a first matrix
 * @param {matrix} b second matrix
 * @param {matrix} out out value (optional)
 * @return {matrix}
 */
function mut_minus(a, b) {
	return minus(a, b, a);
}

/**
 * subtract a scalar to a matrix.
 * minus_scalar(matrix, anotherMatrix); // function
 * matrix.minus_scalar(anotherMatrix); // method
 * @function minus
 * @param {matrix} a first matrix
 * @param {matrix} s scalar
 * @param {matrix} out (optional) out value
 * @return {matrix}
 */
const minus_scalar = (function() {
	let i = 0|0;
	return function minus_scalar(a, s, out) {
		out = out||create(a.rows, a.cols);
		s = +s;
		i = a.length;//-1;
		while(i--) {
			out[i] = a[i] - s;
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["minus_scalar"] = minus_scalar;


/**
 * Mutating version of [minus](#minus).
 * @function mut_minus
 * @param {matrix} a first matrix
 * @param {matrix} s second matrix
 * @return {matrix}
 */
function mut_minus_scalar(a, s) {
	return minus_scalar(a, s, a);
}

/**
 * Get a single column from a matrix.
 * @example
 * col(matrix, 2); // function
 * matrix.col(2); // method
 * @param {matrix} a source matrix
 * @param {n} column number (zero indexed)
 * @param {matrix} out (optional) out parameter, same rows, 1 column
 * @return {matrix} a single column from the source matrix
 */
const col = (function() {
	let i = 0|0, len = 0|0;
	return function col(a, n, out) {
		out = out||create(a.rows, 1);
		let cols = a.cols;
		for(i = 0, len = a.rows; i < len; ++i) {
			out[i] = a[i*cols+n]
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["col"] = col;


/**
 * Get a single row from a matrix.
 * @example
 * row(matrix, 2); // function
 * matrix.row(2); // method
 * @param {matrix} a source matrix
 * @param {n} row number (zero indexed)
 * @param {matrix} out (optional) out parameter with rows = a.cols, cols = 1 
 * @return {matrix} a single row from the source matrix
 */
const row = (function() {
	let i = 0|0, len = 0|0;
	return function row(a, n, out) {
		out = out||create(1, a.cols);
		let cols = a.cols;
		for(i = 0, len = a.cols; i < len; ++i) {
			out[i] = a[cols*n+i]
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["row"] = row;


const multiply_scalar = (function() {
	let i = 0|0, len = 0|0;
	return function multiply_scalar(a, s, out) {
		out = out||create(a.rows, a.cols);
		for(i = 0, len = a.length; i < len; ++i) {
			out[i] = a[i] * s;
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["multiply_scalar"] = multiply_scalar;


function mut_multiply_scalar(a, s) {
	return multiply_scalar(a, s, a);
}

/**
 * Multiply matrices or vectors.
 * @example
 * dot(matrix, anotherMatrix); // function 
 * matrix.dot(anotherMatrix); // method
 * @param {matrix} a first matrix
 * @param {matrix} b second matrix
 * @param {matrix} out (optional) out parameter 
 * @return {matrix}
 */
const dot = (function() {
	let blen = 0|0, brow = 0|0, bcol = 0|0, bcols = 0|0, brows = 0|0, bpos = 0|0;
	let acols = 0|0, arows = 0|0, arow = 0|0, aroff = 0|0, apos = 0|0;
	let opos = 0|0;
	return function dot(a, b, out) {
		acols = (a.cols !== undefined)?a.cols:a.length;
		brows = (b.rows !== undefined)?b.rows:b.length;
		if(acols === brows) {
			arows = (a.rows !== undefined)?a.rows:1;
			bcols = (b.cols !== undefined)?b.cols:1;
			blen = b.length;
			out = out||create(arows, bcols);
			//out.fill(0.0);
			opos = 0;
			for(arow = 0; arow < arows; ++arow) { 
				aroff = arow * acols;
				for(bpos = 0|0; bpos < blen; ++bpos) {
					bcol = bpos % bcols;
					brow = (bpos / bcols)|0; // bitwise floor is safe here and faster
					opos = (bcols * arow) + bcol;
					apos = (aroff + brow);
					out[opos] = out[opos] + b[bpos] * a[apos];
				}
			}
			return out;
		}
		else return undefined;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;



/**
 * Get the basic array representation of a matrix.
 * @example
 * toArray(matrix); // function
 * matrix.toArray(); // method
 * @param {matrix} a
 * @return {array} values as flat array
 */
function toArray(a) {
	return Array.prototype.slice.apply(a);
}

/**
 * Get a nicely formatted string representation of a matrix.
 * @example
 * matToString(matrix); // function
 * matrix.toString(); // method
 * @param {matrix} a
 * @return {string}
 */
const toString = (function() {
	let label = "matrix(", string = "", c = 0|0, r = 0|0, i = 0|0, len = 0|0,
		strings, colWidth, row;
	function padLeft(l,s) {
		return ((" ").repeat(l)+s).slice(-l);
	}
	function makeStrings(a) {
		return toArray(a).map((cur) => cur.toFixed(2));
	}
	return function toString(a) {
		c = a.cols|0;
		r = a.rows|0;
		string = label;
		strings = makeStrings(a);
		colWidth = strings.reduce((a, b) => Math.max(a, b.length), 0);
		for(i = 0; i < r; ++i) {
			row = strings.slice(i*c, 2*(i+1)*c);
		}
		for(i = 0, len = strings.length; i < len; ++i) {
			strings[i] = padLeft(colWidth, strings[i]);
			if(i > 0) {
				if(i % c === 0) string += "\n       ";
				else string += ", ";
			}
			string += strings[i];
		}
		return string + ")";
	}
})();
/* harmony export (immutable) */ __webpack_exports__["toString"] = toString;


/*
 * Matrix factories
 */

/**
 * Factory for creating generic matrices.
 * @function create
 * @param {int} rows matrix rows
 * @param {int} cols matrix columns
 * @param {mixed} values (optional) matrix values as an array-like object
 * @param {ArrayBuffer} buffer (optional) pre-supplied ArrayBuffer
 * @param {int} offset (optional) offset for buffer
 * @return {matrix}
 */
function create(rows, cols, values = [], buffer = undefined, offset = 0) {
	var matrix;
	if(buffer) {
		matrix = new Float32Array(buffer, offset, cols * rows);
	}
	else {
		matrix = new Float32Array(cols * rows);
	}
	var vals = flatten(values);
	matrix.rows = rows;
	matrix.cols = cols;
	if(vals.length) matrix.set(vals);
	else matrix.fill(0.0); // just in case it was a previously used buffer
	return matrix;
}

/**
 * Creates a matrix or vector similar to the one given.
 */
create.similar = function(a, ...args) {
	if(a.rows && a.cols) return create.apply(null, [a.rows, a.cols].concat(args));
	else return vec.apply(null, [a.length].concat(args));
}

/**
 * Wraps an matrix (created by [create](#create)) with matrix methods.
 * @param {array-like} matrix a matrix, Array, or Float32Array to wrap as a matrix
 * @param {int} rows (required for non-matrices) number of rows the matrix should have
 * @param {int} cols (required for non-matrices) number of columns the matrix should have
 * @return {matrix} a wrapped matrix
 */
function wrap(matrix, rows, cols) {
	matrix.rows = rows||matrix.rows;
	matrix.cols = cols||matrix.cols;
	matrix.toArray = toArray.bind(null, matrix);
	matrix.toString = toString.bind(null, matrix);
	matrix.col = col.bind(null, matrix);
	matrix.row = row.bind(null, matrix);
	matrix.plus = plus.bind(null, matrix);
	matrix.plus_scalar = plus_scalar.bind(null, matrix);
	matrix.minus = minus.bind(null, matrix);
	matrix.minus_scalar = minus_scalar.bind(null, matrix);
	matrix.dot = dot.bind(null, matrix);
	matrix.multiply_scalar = multiply_scalar.bind(null, matrix);
	matrix.mut_plus = mut_plus.bind(null, matrix);
	matrix.mut_plus_scalar = mut_plus_scalar.bind(null, matrix);
	matrix.mut_minus = mut_minus.bind(null, matrix);
	matrix.mut_minus_scalar = mut_minus_scalar.bind(null, matrix);
	return matrix;
}

/**
 * Creates an identity matrix of arbitrary dimensions.
 * @example
 * matrices.create.identity(4); // a 4x4 identity matrix
 * @param {int} n dimensions of the matrix
 * @param {ArrayBuffer} buffer (optional) pre-supplied ArrayBuffer
 * @param {int} offset (optional) offset for buffer
 * @return {matrix} identity matrix 
 */
create.identity = (function() {
	let i = 0|0, len = 0|0, j = 0|0;
	return function identity(n, buffer = undefined, offset = 0) {
		n = n|0;
		let m = create(n, n, undefined, buffer, offset);
		for(i = 0|0, len = n*n, j = n+1|0; i < len; i+=j) m[i] = 1.0;
		return m;
	}
})();

/**
 * Creates a translation matrix for a homogenous coordinate in 2D or 3D space. 
 * @example
 * let vec = vectors.create.vec3(3,4,5).toHomogenous();
 * matrices.create.identity(vec); // translates by 3x, 4y, 5z
 * @param {vector} v vector representing the distance to translate 
 * @return {matrix} 3x3 or 4x4 matrix
 */
create.translation = (function() {
	let v2 = Float32Array.from([1.0,0.0,0.0,
															0.0,1.0,0.0,
															0.0,0.0,1.0]); 
	let v3 = Float32Array.from([1.0,0.0,0.0,0.0,
														  0.0,1.0,0.0,0.0, 
															0.0,0.0,1.0,0.0, 
															0.0,0.0,0.0,1.0]);
	return function translation(v, buffer = undefined, offset = 0) {
		switch(v.length) {
			case 2: 
				v2[2] = v[0];
				v2[5] = v[1];
				return create(3, 3, v2, buffer, offset);
			case 3: 
				v3[3]  = v[0];
				v3[7]  = v[1];
				v3[11] = v[2];
				return create(4, 4, v3, buffer, offset);
			default: return undefined;
		}
	}
})();

/**
 * Creates a rotation matrix around absolute X axis of angle r.
 * @example
 * matrices.create.rotateX(1.5708); // 90 degree rotation around X axis
 * @param {radian} r angle as a radian
 * @return {matrix} 3x3 matrix
 */
create.rotateX = (function() {
	let cosr = 0.0, sinr = 0.0, scratch = Float32Array.from([
		1.0,0.0,0.0,
		0.0,1.0,0.0,
		0.0,0.0,1.0
	]);
	return function rotateX(r, buffer = undefined, offset = 0) {
		cosr = cos(r);
		sinr = sin(r);
		scratch[4] = cosr;
		scratch[5] = -sinr;
		scratch[7] = sinr;
		scratch[8] = cosr;
		return create(3, 3, scratch, buffer, offset);
	}
})();

/**
 * Creates a rotation matrix around absolute Y axis of angle r.
 * @example
 * matrices.create.rotateY(1.5708); // 90 degree rotation around Y axis
 * @param {radian} r angle as a radian
 * @return {matrix} 3x3 matrix
 */
create.rotateY = (function() {
	let cosr = 0.0, sinr = 0.0, scratch = Float32Array.from([
		1.0,0.0,0.0,
		0.0,1.0,0.0,
		0.0,0.0,1.0
	]);
	return function rotateY(r, buffer = undefined, offset = 0) {
		cosr = cos(r);
		sinr = sin(r);
		scratch[0] = cosr;
		scratch[2] = sinr;
		scratch[6] = -sinr;
		scratch[8] = cosr;
		return create(3, 3, scratch, buffer, offset);
	}
})();

/**
 * Creates a rotation matrix around absolute Z axis of angle r.
 * @example
 * matrices.create.rotateZ(1.5708); // 90 degree rotation around Z axis
 * @param {radian} r angle as a radian
 * @return {matrix} 3x3 matrix
 */
create.rotateZ = (function() {
	let cosr = 0.0, sinr = 0.0, scratch = Float32Array.from([
		1.0,0.0,0.0,
		0.0,1.0,0.0,
		0.0,0.0,1.0
	]);
	return function rotateZ(r, buffer = undefined, offset = 0) {
		cosr = cos(r);
		sinr = sin(r);
		scratch[0] = cosr;
		scratch[1] = -sinr;
		scratch[3] = sinr;
		scratch[4] = cosr;
		return create(3, 3, scratch, buffer, offset);
	}
})();


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["mut_normalize"] = mut_normalize;
/* harmony export (immutable) */ __webpack_exports__["mut_lerp"] = mut_lerp;
/* harmony export (immutable) */ __webpack_exports__["mut_cubic"] = mut_cubic;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "times", function() { return times; });
/* harmony export (immutable) */ __webpack_exports__["mut_times"] = mut_times;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (immutable) */ __webpack_exports__["mut_clamp"] = mut_clamp;
/* harmony export (immutable) */ __webpack_exports__["toString"] = toString;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["wrap"] = wrap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vectrix_matrices__ = __webpack_require__(9);
/**
The vectors module contains functions and objects related to 2d, 3d, and 4d vectors.

Vectors are composed from columnar matrices, so they support all the methods that
[[vectrix.matrices|matrices]] do.

Require the vector module:
```javascript
const vectors = require("vectrix.vectors.js");
const vec2 = vectors.create.vec2;
const vec3 = vectors.create.vec3;
const vec4 = vectors.create.vec4;
```


You can construct them with vec2, vec3, and vec4, passing zero, one or N arguments
where N is the vector size. Do whatever is convenient.
```javascript
let first = vec2(); // passing no arguments will give you a vector filled with zeroes
first.toArray(); // [0,0]
let second = vec2([3,7]); // you can pass an array-like object
second.toArray(); // [3,7] 
let third = vec2(17,4); // or just pass the components as arguments
third.toArray(); // [14,4] 
let fourth = vec3(1,2,3); // and so on with 3d and 4d vectors
fourth.toArray(); // [1,2,3]
```

Vector functions will operate on any array-like object, returning a plain Float32Array when the result is another vector. Creating vector objects is somewhat expensive, so when you're doing a lot of operations and performance really counts, use the functions for calculations and then use the vector factories on your final result.
```javascript
const lerp = vectors.lerp;
let res = lerp([0.1, 0.3], [0.3, 0.7], .5); // Float32Array(0.2, 0.5)
create.vec2(res); // vec2(0.2,0.5);
```

Vectors are composed from columnar matrices, so they can do the things that matrices
do. 
```javascript
second.add(second).toArray(); // [6,14]
third.sub(second).toArray(); // [11,-3]

const matrices = require("vectrix.matrices.js");
let identity = matrices.create(2,2,[1,0, 0,1]);
identity.dot(second).toArray(); // [3,7]
let scale2x = matrixes.create(2,2,[2,0, 0,2]);
scale2x.dot(third).toArray(); // [34,8]
```

Vector dot products are a special case. As in vector math, multplying two vectors
produces a scalar:
```javascript
let first = vec2(2,2);
let second = vec2([2,2]);
first.dot(second); // 8
let third = vec2(1,0);
let fourth = vec2(0,1);
third.dot(fourth); // 0
```

They also have some of their own useful properties.

You can find the cross product of two 3d vectors using `vec.cross()`:
```javascript
let first = vec3(1,2,1);
let second = vec3(2,-2,2);
first.cross(second).toArray(); // [6,0,-6]
```
Cross can be called on 2d vectors, with z implicitly being zero:
```javascript
let first = vec2(2,4);
let second = vec2(1,3);
first.cross(second).toArray(); // [0,0,2]
```

If you cross a vec2 with a vec3 for whatever reason, vec2.z is implicitly zero:
```javascript
let first = vec3(1,2,1);
let second = vec2(1,3);
first.cross(second).toArray(); // [-3,1,1]
```

Most vector operations are duck typed and make few assumptions internally, so you 
can just pass in anything array-like of the correct length if you want:
```javascript
let first = vec3(1,2,1);
first.cross([2,-2,2]).toArray(); // [6,0,-6]
```
Just beware weird behavior might result if it looks like a duck and quacks like a duck
but it's actually a trick-or-treating platypus.

You can produce a homogenous coordinate for matrix multiplication using `vec.homogenous()`:
```javascript
first.homogenous().toArray(); // [0,0,1]
```

Which lets you do a few useful matrix-vector ops more easily:
```javascript
const matrices = require("vectrix.matrices.js");
const vectors = require("vectrix.vectors.js");
let myVec = vectors.vec2([22,9]); 
let translate = matrices.create(3,3,[1,0,5, 0,1,6, 0,0,1]);
translate.dot(myVec.homogenous()).toArray(); // [27,15,1]
```
Making this more intuitive is on the roadmap.

Last but not least, they have a whole bunch of virtual properties that you might
be used to in GLSL. Once I used them I couldn't live without.
```javascript
let position = vectors.vec3([0,-0.5,0.5]);
position.x; // 0
position.y; // -0.5
position.z; // 0.5
position.xy; // vec2(0,-0.5)
position.zx; // vec2(0.5,0)
position.yzx; // vec3(-0.5,0.5,0)
let color = vectors.vec4(255,128,64,0.1)
color.rgb; // vec3(255,128,64)
color.bgr; // vec3(64,128,255)
```
...and so on - all aliases and combinations thereof for the xyzw and rgba sets
are available. vec2s only support x/y because r/g is not useful.
@module vectrix/vectors
*/


const {plus, minus, mut_plus, mut_minus} = __WEBPACK_IMPORTED_MODULE_0__vectrix_matrices__;
/* harmony export (immutable) */ __webpack_exports__["plus"] = plus;

/* harmony export (immutable) */ __webpack_exports__["minus"] = minus;

/* harmony export (immutable) */ __webpack_exports__["mut_plus"] = mut_plus;

/* harmony export (immutable) */ __webpack_exports__["mut_minus"] = mut_minus;

let flatten = __WEBPACK_IMPORTED_MODULE_0__vectrix_matrices__["flatten"];
let {sqrt, min, max, acos} = Math;

/*
 * All of the below is a dumb, slow workaround for the fact
 * that TypedArrays can't be used as prototypes. What we're 
 * doing here is creating property aliases so that we can use 
 * vectors somewhat like GLSL, for example: 
 *
 * vec3([0,3,4]).zyx == vec3([4,3,0]); 
 * 
 * We do this programmatically because doing it be hand would 
 * be even more tedious than this was. 
 * 
 * We precompute all the permutations of all the aliases and
 * their definitions, then throw them in the aliasesXd objects.
 * The individual vector factories then apply them during creation.
 * 
 * Hopefully this isn't too slow because I spend a heck of a lot
 * of time making this happen.
 */

const aliasCombos2d = [];
/* harmony export (immutable) */ __webpack_exports__["aliasCombos2d"] = aliasCombos2d;

const aliasCombos3d = [];
/* harmony export (immutable) */ __webpack_exports__["aliasCombos3d"] = aliasCombos3d;

const aliasCombos4d = [];
/* harmony export (immutable) */ __webpack_exports__["aliasCombos4d"] = aliasCombos4d;


const aliases2d = [
	{names:["x"], i:0},
	{names:["y"],i:1}
];
/* harmony export (immutable) */ __webpack_exports__["aliases2d"] = aliases2d;


const aliases3d = [
	{names:["x","r"],i:0},
	{names:["y","g"],i:1},
	{names:["z","b"],i:2}
];
/* harmony export (immutable) */ __webpack_exports__["aliases3d"] = aliases3d;


const aliases4d = [
	{names:["w", "a"],i:3}
].concat(aliases3d);
/* harmony export (immutable) */ __webpack_exports__["aliases4d"] = aliases4d;


permutations("xy".split("")).forEach((combo) => {
	aliasCombos2d.push(combo);
});

["xz","yz","xyz","rgb"].forEach((props) => {
	permutations(props.split("")).forEach((combo) => {
		aliasCombos3d.push(combo);
	});
});

["yxw","zxw","yzw","xyzw","rga","rba","gba","rgba"].forEach((props) => {
	permutations(props.split("")).forEach((combo) => {
		aliasCombos4d.push(combo);
	});
});

/**
 * Util function to help generate permutations of property alias
 * sets
 * @private
 */
function permutations(list) {
	// Empty list has one permutation
	if (list.length === 0) return [[]];
	var result = [];

	for (var i=0; i<list.length; i++) {
		var copy = list.slice();
		var head = copy.splice(i, 1);
		var rest = permutations(copy);
		for (var j=0; j<rest.length; j++) {
			var next = head.concat(rest[j]);
			result.push(next);
		}
	}
	return result;
}	

/**
 * @private
 */
function getAlias(i) {
	/* jshint validthis:true */
	return this[i];
}

/**
 * Generic function wrapper for vector combo aliases (e.g. vector.xy)
 * @private
 */
function getAliasCombo(factory, combo) {
	let vals = combo.map((p) => this[p]);
	return factory(vals);
}

/**
 * Defines vector aliases for a vector based on its length.
 * @private
 */
function defineAliases(vec) {
	let factory;
	let map;
	let combos;
	if(vec.length === 2) {
		map = aliases2d;
		combos = aliasCombos2d;
	}
	else if(vec.length === 3) {
		map = aliases3d;
		combos = aliasCombos2d.concat(aliasCombos3d);
	}
	else { // it's 4 because nothing else is supported or requested
		map = aliases4d;
		combos = aliasCombos2d.concat(aliasCombos3d, aliasCombos4d);
	}
	for(let i = 0, len = map.length; i < len; ++i) {
		let get = getAlias.bind(vec, map[i].i);
		for(let n = 0, len = map[i].names.length; n < len; ++n) {
			Object.defineProperty(vec, map[i].names[n], {
				get:get
			});
		}
	}
	for(let i = 0, len = combos.length; i < len; ++i) {
		switch(combos[i].length) {
			case 2:factory = create.vec2; break;
			case 3:factory = create.vec3; break;
			case 4:factory = create.vec4; break;
		}
		Object.defineProperty(vec, combos[i].join(""), {
			get:getAliasCombo.bind(vec, factory, combos[i])
		});
	}
}

/**
 * Turns a vector function into a method by wrapping its result in a create()
 * statement.
 * @param {function} method
 * @param {vector} vector
 * @private
 */
function asMethod(method, vector) {
	return function() {
		let res = method.apply(null, [vector].concat(Array.prototype.slice.apply(arguments)));
		if(!(res instanceof Float32Array)) return res;
		switch(res.length) {
			case 2: return wrap(create.vec2(res));
			case 3: return wrap(create.vec3(res));
			case 4: return wrap(create.vec4(res));
			default: return wrap(create(res.length, res));
		}
	}
}

/*
 * End ugly code for generating aliases.
 */


/**
 * @private
 * used in [lerp](#lerp)
 */
function lerp_element(a, b, t) {
	return a+t*(b-a);
}

/**
 * @private
 * used in [cubic](#cubic)
 */
function cubic_step(a, b, c, d, f0, f1, f2, f3) {
	return a*f0 + b*f1 + c*f2 + d*f3;
}

/**
 * Copies values from second operand into first.
 * @example
 * let v = vec3(1,2,3);
 * let v2 = vec2(31,6);
 * copy(v, v2); // vec3(31,6,3);
 *
 * @mutates
 * @function mut_copy
 * @param {vector} a vector to copy into
 * @param {vector} b vector to copy from
 * @return {vector} a, with copied values
 */
const mut_copy = (() => {
	let i = 0|0, alen = 0|0, blen = 0|0;
	return function mut_copy(a, b) {
		for(i = 0, alen = a.length, blen = b.length;
			i < alen && i < blen; ++i) {
			a[i] = b[i];
		}
		return a;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["mut_copy"] = mut_copy;



/**
 * Homogenous coordinates for a vector. 
 *
 * @function homogenous
 * @param {vector} a input vector
 * @param {vector} out (optional) out parameter of one higher dimension than a
 * @return {matrix}
 */
const homogenous = (function() {
	let i = 0|0, len = 0|0;
	return function homogenous(a, out = undefined) {
		len = a.length;
		out = out||create(a.length+1);
		for(i = 0|0; i < len; ++i) {
			out[i] = a[i];
		}
		out[i] = 1.0;
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["homogenous"] = homogenous;


/**
 * Calculate the magnitude of a vector.
 * @example
 * magnitude(vec3(2,3,6)); // ~6.16
 *
 * @function magnitude
 * @param {vector} a operand
 * @return {float} magnitude of a
 */
const magnitude = (function() {
	let scratch = 0.0, cur = 0.0, i = 0|0, len = 0|0;
	return function magnitude(a) {
		scratch = 0.0;
		for(i = 0, len = a.length; i < len; ++i) {
			cur = a[i];
			scratch = scratch + cur * cur;	
		}
		return sqrt(scratch);
	}
})();
/* harmony export (immutable) */ __webpack_exports__["magnitude"] = magnitude;


/**
 * Normalize a vector.
 *
 * @example
 * normalize(vector); // function style
 * vector.normalize(); // method style
 *
 * @function normalize
 * @param {vector} a vector to normalize
 * @param {vector} out (optional) a vector of the same dimensions as a
 * @return {vector}
 */
const normalize = (function() {
	let scale = 0.0, i = 0|0, len = 0|0;
	return function normalize(a, out = undefined) {
		len = a.length;
		out = out||create(len);
		scale = 1/magnitude(a);
		/*
		for(i = 0|0; i < len; ++i) {
			cur = a[i]; // cut out one reference
			sum = sum+cur*cur;
		}
		*/
		for(i = 0; i < len; ++i) {
			out[i] = a[i]*scale;
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;


/**
 * Mutating version of [normalize](#normalize).
 * @function mut_normalize
 * @param {vector} a input vector
 * @return {matrix}
 */
function mut_normalize(a) {
	return normalize(a, a);
}

/**
 * Perform a linear interpolation between two vectors.
 * @function lerp
 * @param {vector} a first operand
 * @param {vector} b second operand
 * @param {float} t interval
 * @param {vector} out (optional) vector of same dimensions as a & b
 * @return {vector}
 */
const lerp = (function() {
	let i = 0|0, len = 0|0;
	return function lerp(a, b, t, out) {
		len = a.length;
		out = out||create(len);
		for(i = 0|0; i < len; ++i) {
			out[i] = lerp_element(a[i], b[i], t);
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;


/**
 * Mutating version of [lerp](#lerp).
 * @function lerp
 * @param {vector} a first operand
 * @param {vector} b second operand
 * @param {float} t interval
 * @param {vector} out (optional) vector of same dimensions as a & b
 * @return {vector}
 */
function mut_lerp(a, b, t) {
	return lerp(a, b, t, a);
}

/**
 * Perform a cubic bezier interpolation.
 * @function cubic
 * @param {vector} a start point
 * @param {vector} b first control point
 * @param {vector} c second control point
 * @param {vector} d end point
 * @param {float} t interval
 * @param {vector} out (optional) vector of same dimensions as start point 
 * @return {vector}
 */
const cubic = (function() {
	let i = 0|0, len = 0|0, inv = 0.0, inv2 = 0.0, 
			fs = 0.0, f0 = 0.0, f1 = 0.0, f2 = 0.0, f3 = 0.0;
	return function cubic(a, b, c, d, t, out = undefined) {
		len = a.length;
		out = out||create(len);
		/* parametric cubic bezier, faster than dec */
		inv = 1-t;
		inv2 = inv*inv;
		fs = t*t;
		f0 = inv2 * inv;
		f1 = 3 * t * inv2;
		f2 = 3 * fs * inv;
		f3 = fs * t;
		for(i = 0|0; i < len; ++i) {
			out[i] = cubic_step(a[i], b[i], c[i], d[i], f0, f1, f2, f3);
		}
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["cubic"] = cubic;


/**
 * Mutating version of [cubic](#cubic).
 * @function mut_cubic
 * @param {vector} a start point
 * @param {vector} b first control point
 * @param {vector} c second control point
 * @param {vector} d end point
 * @param {float} t interval
 * @return {vector} interpolated a
 */
function mut_cubic(a, b, c, d, t) {
	return cubic(a, b, c, d, t, a);
}


const dot = (function() {
	let i = 0|0, sum = 0.0;
	return function dot(a, b) {
		sum = 0.0;
		i = a.length;
		while(i--) {
			sum = sum + a[i] * b[i];
		}
		return sum;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;


/**
 * Vector product for matching vector types. Accepts vectors or generic arrays, 
 * or defaults up to the matrix product if the vectors don't match (which supports
 * vector*matrix and scalar products).
 * @function times
 * @param {vector} a first operand
 * @param {vector|float} b second operand
 * @param {vector} out out vector 
 * @return {matrix|float} product of a and b 
 */
var times = (function() {
	let i = 0|0;//, len = 0|0;
	return function(a, b, out) {
		i = a.length-1;
		if(typeof b === "number") {
			out = out||new Float32Array(i+1);
			for(;i >= 0; --i) {
				out[i] = a[i] * b;
			}
			return out;
		}
		else return dot(a, b);
	}
})();

/**
 * Mutating version of [times](#times). Note that a is mutated only when a is a vector
 * and b is a scalar.
 *
 * @function times
 * @param {vector} a first operand
 * @param {vector|float} b second operand
 * @return {matrix|float} mutated a, product of a and b 
 */
function mut_times(a, b) {
	return times(a, b, a);
}


/**
 * Find the angle between two vectors in radians.
 * @function angle
 * @param {vector} a first operand
 * @param {vector} b second operand
 * @return {vector}
 */
const angle = (function() {
	let anorm, bnorm;
	return function angle(a, b) {
		anorm = normalize(a);
		bnorm = normalize(b);
		return acos(times(anorm, bnorm));
	}
})();
/* harmony export (immutable) */ __webpack_exports__["angle"] = angle;



/**
 * Find the distance between two vectors.
 * @function distance
 * @param {vector} a first operand
 * @param {vector} b second operand
 * @return {float} distance
 */
const distance = (function() {
	let i = 0|0, len = 0|0, sum = 0.0, tmp = 0.0;
	return function distance(a, b) {
		sum = 0.0;
		len = a.length;
		for(i = 0|0; i < len; ++i) {
			tmp = b[i] - a[i];
			sum = sum + tmp*tmp;
		}
		return sqrt(sum);
	}
})();
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;



/**
 * Vector cross products are technically only defined for 3D, but 2D can be
 * crossed with implicit z=0
 * @function cross
 * @param {vector} a first operand
 * @param {vector|float} b second operand
 * @param {vec3} out parameter
 * @return {Float32Array(3)} cross product
 */
const cross = (function() {
	let a0 = 0.0; let a1 = 0.0; let a2 = 0.0;
	let b0 = 0.0; let b1 = 0.0; let b2 = 0.0;
	return function cross(a, b, out) {
		if(a.length > 3 || b.length > 3 || a.length < 2 || b.length < 2) return undefined;
		out = out||create(3);
		a0 = a[0]; a1 = a[1]; a2 = a[2]||0.0;
		b0 = b[0]; b1 = b[1]; b2 = b[2]||0.0;
		out[0] = a1*b2 - a2*b1;
		out[1] = a2*b0 - a0*b2;
		out[2] = a0*b1 - a1*b0;
		/*
		mut_copy(scratcha, a);
		mut_copy(scratchb, b);
		if(a.length === 2) scratcha[2] = 0;
		if(b.length === 2) scratchb[2] = 0;
		out[0] = scratcha[1]*scratchb[2] - scratcha[2]*scratchb[1];
		out[1] = scratcha[2]*scratchb[0] - scratcha[0]*scratchb[2];
		out[2] = scratcha[0]*scratchb[1] - scratcha[1]*scratchb[0];
		*/
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["cross"] = cross;


/**
 * Restricts scalar or vector values to a range.
 * @example
 * let v = vectors.create.vec3([-5,100, -22]); // vec3(-5,100, -22)
 * clamp(v, -10, 10); // vec3(-5, 10, -10);
 * let s = 23.0;
 * clamp(s, 0, 5); // 5
 *
 * @function clamp
 * @param {vector} a vector or scalar to clamp
 * @param {float} minv minimum value
 * @param {float} maxv maximum value
 * @param {vector} out output vector
 * @return {vector} clamped vector
 */
var clamp = (() => {
	let i = 0|0, len = 0|0;
	function clamp_s(a, minv, maxv) {
		return max(min(a, maxv), minv)
	}
	return function(a, minv, maxv, out) {
		if(typeof(a) === "number") return clamp_s(a, minv, maxv);
		out = out||new Float32Array(a.length);
		for(i = 0, len = a.length; i < len; ++i) {
			out[i] = clamp(a[i], minv, maxv);
		}
		return out;
	}
})();

/**
 * Mutating version of [clamp](#clamp).
 * @return {vector} the mutated vector
 */
function mut_clamp(a, min, max) {
	return clamp(a, min, max, a);
}

/**
 * Get a string representation of a vector.
 * @example
 * vectors.create.vec2([23,1]).toString(); // vec2(23.00, 1.00)
 * vectors.toString(vectors.create.vec2([23,1])); // vec2(23.00, 1.00)
 * @param {vector} a input vector
 * @return {string}
 */
function toString(a) {
	let strings = a.toArray().map((cur) => cur.toFixed(2));
	return "vec"+a.length+"("+strings.join(", ")+")";
}

/**  
 * Creates a new vector. Note that vectors created directly with this function
 * will not have convenience aliases, meaning they're initialized faster but...
 * ah, less convenient. Can be supplied with an optional arraybuffer view and optional
 * offset to that view as the last or last two parameters.
 * @example
 * create(2); // vector[0,0]
 * create(2, 3.3, 3.2); // vector[3.3,3.2]
 * create(2, [3.3, 3.2]); // vector[3.3,3.2] from an array
 * create(2, 3.3, 3.2, new ArrayBuffer(2*4)); // vector[3.3,3.2] as view of ArrayBuffer
 * create(2, 3.3, 3.2, new ArrayBuffer(3*4), 4); // vector[3.3,3.2] as view of ArrayBuffer, offset by 4 bytes
 * create(2, [3.3, 3.2], new ArrayBuffer(3*4), 4); // vector[3.3,3.2] as view of ArrayBuffer, offset by 4 bytes, from an array
 *
 * @function create
 * @param {int} len [2...4] vector length
 * @param {mixed} args values in any combination of array-like and scalar values
 * @param {ArrayBuffer} buffer (optional) an array buffer to create the vector on 
 * @param {offset} offset (optional) offset for the buffer, ignored if buffer is not supplied 
 * @return {vector}
 */
function create() {
	var len = arguments.length, vec;
	if(len === 0) throw new Error("vectors.create requires at least one argument");
	else if(len === 1) {
		vec = new Float32Array(arguments[0]);
	}
	else {
		let params = Array.prototype.slice.apply(arguments), buffer, offset = 0, size = params.shift(), len = params.length;
		if((len > 0) && params[len-1] instanceof ArrayBuffer) { // supplied buffer, no offset
			offset = 0;
			buffer = params.pop();
		}
		else if((len > 1) && params[len-2] instanceof ArrayBuffer) { // supplied buffer + offset
			offset = params.pop();
			buffer = params.pop();
		}
		if(buffer !== undefined) {
			vec = new Float32Array(buffer, offset, size);
		}
		else vec = new Float32Array(size);
		if(params.length > 0) vec.set(flatten(params));
	}
	return vec;
}

/**
 * Wraps a vector or array-like object with vector functions as methods.
 * @param {array-like} vec the vector to wrap
 * @return {vector} the wrapped vector
 */
function wrap(vec) {
	// define vector-specific methods
	__WEBPACK_IMPORTED_MODULE_0__vectrix_matrices__["wrap"](vec, vec.length, 1);
	vec.toString = asMethod(toString, vec);
	vec.homogenous = asMethod(homogenous, vec);
	vec.times = asMethod(times, vec);
	vec.lerp = asMethod(lerp, vec);
	vec.cubic = asMethod(cubic, vec);
	vec.dot = asMethod(dot, vec);
	vec.clamp = asMethod(clamp, vec);
	vec.angle = angle.bind(null, vec);
	vec.magnitude = magnitude.bind(null, vec);
	vec.distance = distance.bind(null, vec);
	vec.normalize = asMethod(normalize, vec);
	vec.mut_normalize = asMethod(mut_normalize, vec);
	vec.mut_times = asMethod(mut_times, vec);
	vec.mut_lerp = asMethod(mut_lerp, vec);
	vec.mut_cubic = asMethod(mut_cubic, vec);
	vec.mut_clamp = asMethod(mut_clamp, vec);
	vec.mut_copy = asMethod(mut_copy, vec);
	if(vec.length === 2 || vec.length === 3) vec.cross = asMethod(cross, vec);
	defineAliases(vec);
	return vec;
}

/**
 * Creates a 2d vector. Curried version of [create](#create) with first argument presupplied.
 * @function create.vec2
 * @return {vector}
 */
const vec2 = create.vec2 = create.bind(null, 2);
/* harmony export (immutable) */ __webpack_exports__["vec2"] = vec2;

/** 
 * Creates a 3d vector. Curried version of [create](#create) with first argument presupplied.
 * @function create.vec3
 * @return {vector}
 */
const vec3 = create.vec3 = create.bind(null, 3);
/* harmony export (immutable) */ __webpack_exports__["vec3"] = vec3;

/** 
 * Creates a 4d vector. Curried version of [create](#create) with first argument presupplied.
 * @function create.vec4
 * @return {vector}
 */
const vec4 = create.vec4 = create.bind(null, 4);
/* harmony export (immutable) */ __webpack_exports__["vec4"] = vec4;



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.buttons = exports.keys = exports.pointer = undefined;
exports.init = init;

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomixDisplay = __webpack_require__(4);

var _photonomixEvents = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var vec2 = vectrix.vectors.vec2;


var game = void 0; // game state
var controlEvents = new _photonomixEvents.Events();
//let clickRegions = [];

var pointer = exports.pointer = {
	down: vec2(),
	up: vec2(),
	move: vec2()
};
var keys = exports.keys = Array(256);
var buttons = exports.buttons = Array(5);

function updateCursorState(event, v) {
	v[0] = event.clientX;
	v[1] = event.clientY;
}

/*
function registerClickRegion(center, radius, callback) {
	clickRegions.push({center:vec2(center), radius:radius, callback:callback});
}
*/

function init(env) {
	game = env;
	window.addEventListener("mousedown", function mouseDown(event) {
		updateCursorState(event, pointer.down);
		buttons[event.button] = 1;
		controlEvents.fire("mousedown");
	});
	window.addEventListener("mouseup", function mouseUp(event) {
		updateCursorState(event, pointer.up);
		buttons[event.button] = 0;
		controlEvents.fire("mouseup");
	});
	window.addEventListener("mousemove", function mouseMove(event) {
		updateCursorState(event, pointer.move);
	});
	window.addEventListener("keydown", function keyDown(event) {
		keys[event.keyCode] = 1;
	});
	window.addEventListener("keyup", function keyDown(event) {
		keys[event.keyCode] = 0;
	});

	/*
 controlEvents.on("mouseup", function(position) {
 	dist = distance(position, game.player.mouseDown);
 	if(dist < region.radius) region.callback(region.center, dist);
 });
 	controlEvents.on("mousedown", function() {
 });
 	controlEvents.on("mousemove", function() {
 });
 */

	//registerClickRegion([0.0, 0.95], 0.1, game.actions.launchAntiGravitonCluster);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initMoteSpriteSheet = initMoteSpriteSheet;
exports.createMoteCenterSprite = createMoteCenterSprite;
exports.getMoteSprite = getMoteSprite;
exports.getColorString = getColorString;
exports.colorIndex = colorIndex;
exports.createMoteSprite = createMoteSprite;
exports.createPhotonSprite = createPhotonSprite;
exports.createMarkerHitSprite = createMarkerHitSprite;
exports.createVoidSprite = createVoidSprite;
exports.createEmitterSprite = createEmitterSprite;
exports.createGameSpaceMask = createGameSpaceMask;
var colorStrings = exports.colorStrings = Array(4096);
var moteSpriteSheetCanvas = exports.moteSpriteSheetCanvas = undefined;
var MASK_R = 0xf00;
var MASK_G = 0x0f0;
var MASK_B = 0x00f;

var moteSprites;
var moteMaskCanvas;
var moteSpriteSheetContext;
var moteMaskContext;
var moteSpriteScale = 0;
var moteSpriteSize = 0;
var motePixelSize = 0;
var moteTmpCanvas;
var moteTmpContext;

function initMoteSpriteSheet(scale, size) {
	moteSpriteScale = scale;
	moteSpriteSize = size;
	motePixelSize = scaleSprite(moteSpriteScale, moteSpriteSize);

	moteTmpCanvas = document.createElement("canvas");
	moteTmpCanvas.width = moteTmpCanvas.height = motePixelSize;
	moteTmpContext = moteTmpCanvas.getContext("2d");

	exports.moteSpriteSheetCanvas = moteSpriteSheetCanvas = document.createElement("canvas");
	moteSpriteSheetCanvas.width = moteSpriteSheetCanvas.height = motePixelSize * 64;
	moteSpriteSheetContext = moteSpriteSheetCanvas.getContext("2d");

	moteMaskCanvas = document.createElement("canvas");
	moteMaskCanvas.width = moteMaskCanvas.height = motePixelSize;
	moteMaskContext = moteMaskCanvas.getContext("2d");

	moteSprites = Array(4096);
	var g = moteMaskContext.createRadialGradient(motePixelSize / 2, motePixelSize / 2, motePixelSize / 2, motePixelSize / 2, motePixelSize / 2, 0);
	g.addColorStop(1, "rgba(255,255,255,1.0");
	g.addColorStop(0.7, "rgba(255,255,255,0.5)");
	g.addColorStop(0.1, "rgba(255,255,255,0.0)");
	moteMaskContext.fillStyle = g;
	moteMaskContext.fillRect(0, 0, motePixelSize, motePixelSize);
	for (var i = 0; i < 4096; ++i) {
		colorStrings[i] = "rgb(" + ((i & MASK_R) >> 4) + "," + (i & MASK_G) + "," + ((i & MASK_B) << 4) + ")";
		moteSprites[i] = createMoteSprite(i, colorStrings[i]);
	}
}

function createMoteCenterSprite() {
	var pixelSize = motePixelSize;
	var w = motePixelSize;
	var h = motePixelSize;
	var px = 0;
	var py = 0;
	var canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	var context = canvas.getContext("2d");
	context.globalCompositeOperation = "copy";
	context.drawImage(moteMaskCanvas, 0, 0, w, h);
	context.globalCompositeOperation = "source-in";
	context.fillStyle = "rgba(255,255,255,0.25)";
	context.fillRect(0, 0, w, h);
	return {
		canvas: canvas,
		context: context,
		pixelSize: pixelSize,
		sw: pixelSize,
		sh: pixelSize,
		sx: px,
		sy: py
	};
}

function getMoteSprite(index) {
	return moteSprites[index];
}

function getColorString(index) {
	return colorStrings[index];
}

function colorIndex(r, g, b) {
	return (r >> 4 << 8) + (g >> 4 << 4) + (b >> 4);
}

function createMoteSprite(index, color) {
	var pixelSize = motePixelSize;
	var w = motePixelSize;
	var h = motePixelSize;
	var y = index % 64;
	var x = (index - y) / 64;
	var py = y * motePixelSize;
	var px = x * motePixelSize;
	moteTmpContext.globalCompositeOperation = "copy";
	moteTmpContext.drawImage(moteMaskCanvas, 0, 0, w, h);
	moteTmpContext.globalCompositeOperation = "source-in";
	moteTmpContext.fillStyle = color;
	moteTmpContext.fillRect(0, 0, w, h);
	moteSpriteSheetContext.drawImage(moteTmpCanvas, px, py, w, h);
	return {
		canvas: moteSpriteSheetCanvas,
		context: moteSpriteSheetContext,
		pixelSize: pixelSize,
		sw: pixelSize,
		sh: pixelSize,
		sx: px,
		sy: py
	};
}

function scaleSprite(scale, spriteSize) {
	return ~~(scale * spriteSize);
}

/**
 * Creates a photon sprite.
 */
function createPhotonSprite(scale, spriteSize, color) {
	var pixelSize = 17; //scaleSprite(scale, spriteSize);
	var hps = ~~(pixelSize / 2);
	var qps = ~~(pixelSize / 4);
	var canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	var context = canvas.getContext("2d");
	var g = void 0;
	/*
 let mask = document.createElement("canvas");
 mask.width = mask.height = pixelSize; 
 let maskCtx = mask.getContext("2d");
 */
	/*
 g = maskCtx.createRadialGradient(hps, hps, hps, hps, hps, 0);
 g.addColorStop(0.0, "rgba(255,255,255,0.0)");
 g.addColorStop(0.09, "rgba(255,255,255,1.0)");
 maskCtx.fillStyle = g;
 maskCtx.fillRect(0, 0, pixelSize, pixelSize);
 context.drawImage(mask, -hps, -hps, pixelSize, pixelSize);
 context.drawImage(mask, hps, hps, pixelSize, pixelSize);
 context.drawImage(mask, hps, -hps, pixelSize, pixelSize);
 context.drawImage(mask, -hps, hps, pixelSize, pixelSize);
 */
	g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.7, color);
	g.addColorStop(1.0, "white");
	context.globalCompositeOperation = "source-over";
	context.beginPath();
	context.moveTo(hps, 0);
	context.quadraticCurveTo(hps, hps, 0, hps);
	context.quadraticCurveTo(hps, hps, hps, pixelSize);
	context.quadraticCurveTo(hps, hps, pixelSize, hps);
	context.quadraticCurveTo(hps, hps, hps, 0);
	context.fillStyle = g;
	context.fill();
	context.closePath();
	context.beginPath();
	context.moveTo(hps, qps);
	context.lineTo(hps, pixelSize - qps);
	context.moveTo(qps, hps);
	context.lineTo(pixelSize - qps, hps);
	context.strokeStyle = "white";
	context.lineWidth = 1;
	context.stroke();
	context.closePath();
	//context.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas: canvas,
		context: context,
		pixelSize: pixelSize,
		w: pixelSize,
		h: pixelSize
	};
}

/**
 * Creates a hit marker sprite.
 */
function createMarkerHitSprite(scale, spriteSize) {
	var pixelSize = scaleSprite(scale, spriteSize);
	var hps = ~~(pixelSize / 2);
	var canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	var context = canvas.getContext("2d");
	var g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
	g.addColorStop(0.0, "rgba(255,255,255,0.0)");
	g.addColorStop(0.05, "rgba(255,255,255,0.4)");
	g.addColorStop(0.09, "rgba(255,255,255,0.35)");
	g.addColorStop(0.55, "rgba(255,255,255,0.0)");
	context.fillStyle = g;
	context.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas: canvas,
		context: context,
		pixelSize: pixelSize,
		w: pixelSize,
		h: pixelSize
	};
}

/**
 * Creates a void sprite.
 */
function createVoidSprite(scale, spriteSize) {
	var pixelSize = scaleSprite(scale, spriteSize);
	var canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	var ctx = canvas.getContext("2d");
	var g = ctx.createRadialGradient(pixelSize / 2, pixelSize / 2, pixelSize / 2, pixelSize / 2, pixelSize / 2, 0);
	g.addColorStop(1, "rgba(0,0,0,1.0)");
	g.addColorStop(0.50, "rgba(0,0,0,1.0)");
	g.addColorStop(0.479, "rgba(0,0,0,0.99)");
	g.addColorStop(0.442, "rgba(0,0,0,0.98)");
	g.addColorStop(0.44, "rgba(255,255,255,0.95)");
	g.addColorStop(0.43, "rgba(255,255,255,0.95)");
	g.addColorStop(0.41, "rgba(255,255,255,0.39)");
	g.addColorStop(0.37, "rgba(255,255,255,0.29)");
	g.addColorStop(0.36, "rgba(255,255,255,0.32)");
	g.addColorStop(0.34, "rgba(255,255,255,0.31)");
	g.addColorStop(0.30, "rgba(255,255,255,0.35)");
	g.addColorStop(0.28, "rgba(255,255,255,0.39)");
	g.addColorStop(0.26, "rgba(255,255,255,0.35)");
	g.addColorStop(0.23, "rgba(255,255,255,0.30)");
	g.addColorStop(0.21, "rgba(255,255,255,0.26)");
	g.addColorStop(0.20, "rgba(255,255,255,0.31)");
	g.addColorStop(0.19, "rgba(255,255,255,0.34)");
	g.addColorStop(0.17, "rgba(255,255,255,0.29)");
	g.addColorStop(0.16, "rgba(255,255,255,0.21)");
	g.addColorStop(0.15, "rgba(255,255,255,0.19)");
	g.addColorStop(0.14, "rgba(255,255,255,0.15)");
	g.addColorStop(0.10, "rgba(255,255,255,0.09)");
	g.addColorStop(0.09, "rgba(255,255,255,0.15)");
	g.addColorStop(0.07, "rgba(255,255,255,0.12)");
	g.addColorStop(0.05, "rgba(255,255,255,0.09)");
	/*
 g.addColorStop(0.43, "rgba(128,128,128,0.4)");
 g.addColorStop(0.41, "rgba(192,192,192,0.6)");
 g.addColorStop(0.4, "rgba(192,192,192,0.4)");
 g.addColorStop(0.37, "rgba(192,192,192,0.3)");
 g.addColorStop(0.15, "rgba(0,0,0,0.2)");
 */
	g.addColorStop(0.0, "rgba(0,0,0,0.0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas: canvas,
		context: ctx,
		w: pixelSize,
		h: pixelSize,
		pixelSize: pixelSize
	};
}

/**
 * Creates an emitter sprite.
 */
function createEmitterSprite(scale, spriteSize) {
	var pixelSize = scaleSprite(scale, spriteSize);
	var canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	var ctx = canvas.getContext("2d");
	var g = ctx.createRadialGradient(pixelSize / 2, pixelSize / 2, pixelSize / 2, pixelSize / 2, pixelSize / 2, 0);
	g.addColorStop(1, "rgba(255,255,255,0.3)");
	g.addColorStop(0.78, "rgba(255,255,255,0.3)");
	g.addColorStop(0.58, "rgba(255,255,255,0.22)");
	g.addColorStop(0.48, "rgba(255,255,255,0.17)");
	g.addColorStop(0.44, "rgba(255,255,255,0.22)");
	g.addColorStop(0.40, "rgba(255,255,255,0.19)");
	g.addColorStop(0.2, "rgba(255,255,255,0.09)");
	g.addColorStop(0.1, "rgba(255,255,255,0.0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas: canvas,
		context: ctx,
		w: pixelSize,
		h: pixelSize,
		pixelSize: pixelSize
	};
}

function createGameSpaceMask() {
	var pixelSize = 1000;
	var canvas = document.createElement("canvas");
	canvas.width = canvas.height = pixelSize;
	var ctx = canvas.getContext("2d");
	var g = ctx.createRadialGradient(pixelSize / 2, pixelSize / 2, pixelSize / 2, pixelSize / 2, pixelSize / 2, 0);
	g.addColorStop(1, "rgba(0,0,0,0.0)");
	g.addColorStop(0.05, "rgba(0,0,0,0.0)");
	g.addColorStop(0.0, "rgba(255,255,255,1.0)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, pixelSize, pixelSize);
	return {
		canvas: canvas,
		context: ctx,
		w: pixelSize,
		h: pixelSize,
		pixelSize: pixelSize
	};
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Events = Events;
function Events() {
	this.queue = {};
	return this;
}

Events.prototype.on = function (event, callback) {
	if (this.queue[event] === undefined) this.queue[event] = [];
	this.queue[event].push(callback);
};

Events.prototype.fire = function () {
	var i = void 0,
	    len = void 0;
	return function (event, params) {
		if (this.queue[event] === undefined) return;
		for (i = 0, len = this.queue[event].length; i < len; ++i) {
			this.queue[event][i].call(params);
		}
	};
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.antigravitons = exports.photons = exports.markers = exports.emitters = exports.voids = exports.motes = undefined;
exports.Game = Game;

var _photonomixGame = __webpack_require__(8);

var motes = _interopRequireWildcard(_photonomixGame);

var _photonomixGame2 = __webpack_require__(5);

var voids = _interopRequireWildcard(_photonomixGame2);

var _photonomixGame3 = __webpack_require__(7);

var emitters = _interopRequireWildcard(_photonomixGame3);

var _photonomixGame4 = __webpack_require__(20);

var markers = _interopRequireWildcard(_photonomixGame4);

var _photonomixGame5 = __webpack_require__(3);

var photons = _interopRequireWildcard(_photonomixGame5);

var _photonomixGame6 = __webpack_require__(6);

var antigravitons = _interopRequireWildcard(_photonomixGame6);

var _photonomix = __webpack_require__(2);

var _photonomix2 = __webpack_require__(15);

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomix3 = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.motes = motes;
exports.voids = voids;
exports.emitters = emitters;
exports.markers = markers;
exports.photons = photons;
exports.antigravitons = antigravitons;
var minus = vectrix.matrices.minus;
var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    mut_copy = _vectrix$vectors.mut_copy;
var random = Math.random;

var Marker = markers.Marker;
var Photon = photons.Photon;
var Mote = motes.Mote;
var Void = voids.Void;
var Emitter = emitters.Emitter;
var AntiGravitonCluster = antigravitons.AntiGravitonCluster;

var marks = new Uint16Array(_photonomix3.MAX_MOTES + _photonomix3.MAX_PHOTONS + 100);
var markpos = 0;
var mark = 0;

function Game() {
	this.entities = [];
	this.photonBuffer = null;
	this.stats = {
		pop: 0,
		born: 0,
		died: 0,
		target: 0
	};
	this.actions = {};
	this.registerActions();
	return this;
}

Game.prototype.start = function () {
	this.motePool = new _photonomix2.BufferPool(motes.BUFFER_LENGTH, _photonomix3.MAX_MOTES);
	this.photonPool = new _photonomix2.BufferPool(photons.BUFFER_LENGTH, _photonomix3.MAX_PHOTONS);
	for (var i = 0; i < _photonomix3.START_POP; ++i) {
		this.entities.push(new Mote.random(this.motePool));
	}
};

Game.prototype.tick = function () {
	var entities = void 0,
	    entity = void 0,
	    i = 0 | 0,
	    len = 0 | 0,
	    tick_delta = 0.0;
	return function tick(delta, frameCount) {
		entities = this.entities;
		this.stats.target = 0;
		this.stats.pop = 0;
		tick_delta = delta / _photonomix3.TARGET_FPS;
		for (i = 0, len = entities.length; i < len; ++i) {
			entity = entities[i];
			entity.tick(this.entities, tick_delta, frameCount);
			// do mote-specific stuff
			if (entity instanceof Mote) {
				this.stats.pop++;
				if (entity.target) this.stats.target++;
				if (entity.injured) {
					if (frameCount % ~~(_photonomix3.TARGET_FPS * 0.1) === 0) {
						this.entities.push(entity.bleed(this.photonPool));
					}
				}
				// mark dead for removal
				if (entity.dying === _photonomix3.DEATH_THRESHOLD) {
					this.killMote(entity);
					marks[markpos] = i;
					this.stats.died++;
					markpos++;
				} else if (entity.pregnant === _photonomix3.PREGNANT_TIME) {
					this.entities.push(entity.split());
					this.stats.born++;
				}
			} else if (entity instanceof Photon || entity instanceof Marker) {
				if (entity.lifetime <= 0) {
					marks[markpos] = i;
					markpos++;
				}
			} else if (entity.mass <= 0) {
				marks[markpos] = i;
				markpos++;
			}
			// physics effects sometimes chuck things way out of bounds
			// just delete them, they ain't comin' back
			if ((0, _photonomix.outOfBounds)(entity.pos, 20)) {
				marks[markpos] = i;
				markpos++;
			}
		}

		// sweep dead
		while (markpos > 0) {
			markpos--;
			mark = marks[markpos];
			entity = entities[mark];
			if (entity && entity.pool !== undefined) {
				entity.destroy();
			}
			entities.splice(mark, 1);
			marks[markpos] = 0;
		}

		// shuffling helps action lock issues and reduces first in list advantage
		//shuffle(entities);
	};
}();

Game.prototype.emitPhoton = function () {
	var pos = vec2(),
	    vel = vec2(),
	    center = vec2(),
	    p_c = 0,
	    base_vel = vec2(0.05, 0.05);
	return function emitPhoton(ipos, ivel, color) {
		var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : p_c;
		var max = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 12;

		ipos = ipos || [random() * 1.8 - 0.9, random() * 1.8 - 0.9];
		if (ivel) {
			mut_copy(vel, ivel);
		} else {
			mut_copy(vel, base_vel);
			(0, _photonomix.rotate)(vel, center, p_c % max / (max / 2), vel);
		}
		color = color || ~~(random() * 3);
		mut_copy(pos, ipos);
		this.entities.push(new Photon(pos, vel, color, this.photonPool));
		p_c++;
		return color;
	};
}();

Game.prototype.killMote = function () {
	var sum = 0 | 0,
	    c = 0 | 0,
	    i = 0 | 0,
	    pos = vec2(),
	    r = 0 | 0,
	    g = 0 | 0,
	    b = 0 | 0;
	return function killMote(mote) {
		if (random() < _photonomix3.POSITIVE_ENERGY) {
			this.entities.push(new Emitter(mote.pos, mote.vel, ~~(_photonomix3.DEATH_THRESHOLD * 10 * random()), this.photonPool));
		}
		if (random() < _photonomix3.NEGATIVE_ENERGY) {
			this.entities.push(new Void(mote.pos, mote.vel, ~~(_photonomix3.DEATH_THRESHOLD * 10 * random())));
		}
		mut_copy(pos, mote.pos);
		r = mote.photons[0];
		g = mote.photons[1];
		b = mote.photons[2];
		sum = r + b + g;
		c = 0;
		for (i = 0; i < sum; ++i) {
			if (r === i) c = 1;
			if (r + g === i) c = 2;
			this.emitPhoton(pos, undefined, c, i, sum);
		}
	};
}();

/**
 * Actions are callbacks accepting the following parameters:
 * @param {vec2} center center of the click region for the action (i.e. the UI element)
 * @param {float} dist the distance from region center to mouseUp position
 */
Game.prototype.registerAction = function (name, callback) {
	this.actions[name] = callback.bind(this);
};

var delta = vec2();
Game.prototype.registerActions = function () {
	this.registerAction("launchAntiGravitonCluster", function (center) {
		minus(this.player.mouseUp, center, delta);
		this.entities.push(new AntiGravitonCluster(center, delta, 148));
	});
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BufferPool = BufferPool;
var MAX_POOL_SIZE = exports.MAX_POOL_SIZE = Math.pow(2, 21); // 2mb

function calculatePoolSize(itemLength) {
	return MAX_POOL_SIZE - MAX_POOL_SIZE % itemLength;
}

function createFreedList(freedLength) {
	if (freedLength < Math.pow(2, 8)) return new Uint8Array(freedLength);else if (freedLength < Math.pow(2, 16)) return new Uint16Array(freedLength);else return new Uint32Array(freedLength);
}

function BufferPool(itemLength, maxItems) {
	var size = 0 | 0;
	if (maxItems) {
		if (itemLength * maxItems > MAX_POOL_SIZE) {
			throw new Error("requested buffer size is too large");
		} else size = itemLength * maxItems;
	} else size = calculatePoolSize(itemLength);
	var buffer = new ArrayBuffer(size);
	var freedLength = maxItems ? maxItems : size / itemLength;
	var freed = createFreedList(freedLength);
	Object.defineProperties(this, {
		"itemLength": { get: function get() {
				return itemLength;
			} },
		"buffer": { get: function get() {
				return buffer;
			} },
		"size": { get: function get() {
				return size;
			} },
		"freed": { get: function get() {
				return freed;
			} }
	});
	this.next = 0;
	this.freedPos = 0;
	return this;
}

var offset = 0 | 0;
BufferPool.prototype.allocate = function () {
	if (this.freedPos > 0) offset = this.popFree();else if (this.next < this.size - 1) {
		offset = this.next;
		this.next = this.next + this.itemLength;
	} else throw new Error("pool buffer is full");
	return offset;
};

BufferPool.prototype.popFree = function () {
	this.freedPos--;
	offset = this.freed[this.freedPos] * this.itemLength;
	this.freed[this.freedPos] = 0;
	return offset;
};

BufferPool.prototype.free = function (offset) {
	this.freed[this.freedPos] = offset === 0 ? offset : offset / this.itemLength;
	this.freedPos++;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Derived from bokeh generator by Jack Rugile at [CodePen](http://codepen.io/jackrugile/pen/gaFub)
 */

//import * as sprites from "./photonomix.display.sprites";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = init;
exports.draw = draw;
var bgBuffer = void 0,
    bokehBuffer = void 0,
    bgCtx = void 0,
    bokehCtx = void 0,
    cw = void 0,
    ch = void 0,
    w = void 0,
    h = void 0,
    tau = Math.PI * 2,
    parts = [],
    sizeBase = void 0,
    hue = void 0,
    opt = void 0,
    count = void 0,
    displayProps = void 0;

function rand(min, max) {
	return Math.random() * (max - min) + min;
}

function hsla(h, s, l, a) {
	return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
}

function init(buffer1, buffer2, props) {
	displayProps = props;
	bgBuffer = buffer1;
	bgCtx = bgBuffer.context;
	bokehBuffer = buffer2;
	bokehCtx = bokehBuffer.context;
	updateProps();
	displayProps.events.on("resize", updateProps);
	// this can't get resized or we'd have to regenerate it, so set it up now
	cw = bgBuffer.width = 1920;
	ch = bgBuffer.height = 1920;
	w = bokehBuffer.width;
	h = bokehBuffer.height;

	sizeBase = cw + ch;
	count = Math.floor(sizeBase * 0.1);
	hue = rand(0, 360);
	opt = {
		radiusMin: sizeBase * 0.02,
		radiusMax: sizeBase * 0.10,
		blurMin: sizeBase * 0.01,
		blurMax: sizeBase * 0.04,
		hueMin: hue,
		hueMax: hue + rand(25, 75),
		saturationMin: 10,
		saturationMax: 70,
		lightnessMin: 1,
		lightnessMax: 5,
		alphaMin: 0.1,
		alphaMax: 0.4
	};
	bgCtx.fillStyle = "#000000";
	bgCtx.fillRect(0, 0, cw, ch);
	bgCtx.globalCompositeOperation = "lighter";
	while (count--) {
		var radius = rand(opt.radiusMin, opt.radiusMax),
		    blur = rand(opt.blurMin, opt.blurMax),
		    x = rand(0, cw),
		    y = rand(0, ch),
		    _hue = rand(opt.hueMin, opt.hueMax),
		    saturation = rand(opt.saturationMin, opt.saturationMax),
		    lightness = rand(opt.lightnessMin, opt.lightnessMax),
		    alpha = rand(opt.alphaMin, opt.alphaMax);

		bgCtx.shadowColor = hsla(_hue, saturation, lightness, alpha);
		bgCtx.shadowBlur = blur;
		bgCtx.beginPath();
		bgCtx.arc(x, y, radius, 0, tau);
		bgCtx.fill();
		bgCtx.closePath();
	}

	parts.length = 0;
	for (var i = 0; i < Math.floor((w + h) * 0.01); i++) {
		parts.push({
			radius: rand(sizeBase * 0.005, sizeBase * 0.02),
			x: rand(0, w),
			y: rand(0, h),
			angle: rand(0, tau),
			vel: rand(0.05, 0.2),
			tick: rand(0, 10000)
		});
	}
}

function draw() {
	var i = parts.length;
	bokehCtx.fillStyle = "rgba(0,0,0,0)";
	bokehCtx.globalCompositeOperation = "source-over";
	bokehCtx.clearRect(0, 0, cw, ch);
	bokehCtx.shadowBlur = 15;
	bokehCtx.shadowColor = "#fff";
	w = bokehBuffer.width;
	h = bokehBuffer.height;
	while (i--) {
		var part = parts[i];

		part.x += Math.cos(part.angle) * part.vel;
		part.y += Math.sin(part.angle) * part.vel;
		part.angle += rand(-0.05, 0.05);

		bokehCtx.beginPath();
		bokehCtx.arc(part.x, part.y, part.radius, 0, tau);
		bokehCtx.fillStyle = hsla(0, 0, 100, 0.03 + Math.cos(part.tick * 0.02) * 0.01);
		bokehCtx.fill();

		if (part.x - part.radius > cw) part.x = -part.radius;
		if (part.x + part.radius < 0) part.x = w + part.radius;
		if (part.y - part.radius > ch) part.y = -part.radius;
		if (part.y + part.radius < 0) part.y = h + part.radius;

		part.tick++;
	}
}

function updateProps() {
	bokehBuffer.width = displayProps.width;
	bokehBuffer.height = displayProps.height;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * An offscreen draw buffer, which will be drawn to a composite buffer for display
 * onscreen.
 * @param {string} compositeMethod globalCompositeMethod to use when compositing
 * @param {bool} scaleMethod method for scaling (see SCALE_* constants)
 * @param {string} context [2d|webGL]
 * @return {DrawBuffer}
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DrawBuffer = DrawBuffer;
exports.CompositeBuffer = CompositeBuffer;
var min = Math.min;
var SCALE_STRETCH = exports.SCALE_STRETCH = 0;
var SCALE_KEEP_ASPECT = exports.SCALE_KEEP_ASPECT = 1;
var SCALE_NONE = exports.SCALE_NONE = 2;
function DrawBuffer() {
	var compositeMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "source-over";

	var _this = this;

	var scaleMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SCALE_STRETCH;
	var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "2d";

	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext(context);
	this.offsetX = 0;
	this.offsetY = 0;
	this.compositeMethod = compositeMethod;
	this.scaleMethod = scaleMethod;
	Object.defineProperties(this, {
		width: { get: function get() {
				return _this.canvas.width;
			}, set: function set(v) {
				return _this.canvas.width = v;
			} },
		height: { get: function get() {
				return _this.canvas.height;
			}, set: function set(v) {
				return _this.canvas.height = v;
			} }
	});
	return this;
}

/**
 * A canvas to draw a BufferGroup into.
 * @param {HTMLElement} container the containing element for the canvas
 * @return {CompositeBuffer}
 */
function CompositeBuffer(container) {
	var _this2 = this;

	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.container = container;
	this.container.appendChild(this.canvas);
	Object.defineProperties(this, {
		width: { get: function get() {
				return _this2.canvas.width;
			}, set: function set(v) {
				return _this2.canvas.width = v;
			} },
		height: { get: function get() {
				return _this2.canvas.height;
			}, set: function set(v) {
				return _this2.canvas.height = v;
			} }
	});
	return this;
}

var composite = exports.composite = function () {
	var i = void 0,
	    len = void 0,
	    buffer = void 0,
	    targetContext = void 0;
	var sw = void 0,
	    sh = void 0,
	    sx = void 0,
	    sy = void 0,
	    dw = void 0,
	    dh = void 0,
	    dx = void 0,
	    dy = void 0;
	return function composite(sourceBuffers, targetBuffer, displayProps) {
		targetContext = targetBuffer.context;
		for (i = 0, len = sourceBuffers.length; i < len; ++i) {
			buffer = sourceBuffers[i];
			if (targetContext.globalCompositeOperation !== buffer.compositeMethod) targetContext.globalCompositeOperation = buffer.compositeMethod;
			switch (buffer.scaleMethod) {
				case SCALE_STRETCH:
					sx = 0;sy = 0;sw = buffer.width;sh = buffer.height;
					dx = buffer.offsetX;dy = buffer.offsetY;
					dw = targetBuffer.width;dh = targetBuffer.height;
					break;
				case SCALE_KEEP_ASPECT:
					sx = 0;sy = 0;sw = buffer.width;sh = buffer.height;
					dx = buffer.offsetX;dy = buffer.offsetY;
					dw = targetBuffer.width;dh = targetBuffer.height;
					if (displayProps.orientation) {
						sw = targetBuffer.width;
						sh = min(targetBuffer.height, buffer.height);
						dw = min(targetBuffer.width, buffer.width);
						dh = targetBuffer.height;
					} else {
						sw = min(targetBuffer.width, buffer.width);
						sh = targetBuffer.height;
						dw = targetBuffer.width;
						dh = min(targetBuffer.height, buffer.height);
					}
					break;
				default:
					// SCALE_NONE
					sx = 0;sy = 0;sw = buffer.width;sh = buffer.height;
					dx = buffer.offsetX;dy = buffer.offsetY;
					dw = buffer.width;dh = buffer.height;
					break;
			}
			targetContext.drawImage(buffer.canvas, sx, sy, sw, sh, dx, dy, dw, dh);
		}
	};
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module for drawing entity layer.
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.draw = exports.init = undefined;

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

var _photonomixDisplay = __webpack_require__(12);

var sprites = _interopRequireWildcard(_photonomixDisplay);

var _photonomix = __webpack_require__(0);

var constants = _interopRequireWildcard(_photonomix);

var _photonomix2 = __webpack_require__(2);

var _photonomix3 = __webpack_require__(4);

var _photonomixGame = __webpack_require__(3);

var _photonomixGame2 = __webpack_require__(8);

var _photonomixGame3 = __webpack_require__(5);

var _photonomixGame4 = __webpack_require__(7);

var _photonomixGame5 = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _vectrix$vectors = vectrix.vectors,
    vec2 = _vectrix$vectors.vec2,
    lerp = _vectrix$vectors.lerp;
var mut_plus = vectrix.matrices.mut_plus;
var min = Math.min,
    cos = Math.cos,
    sin = Math.sin,
    sqrt = Math.sqrt,
    tan = Math.tan,
    round = Math.round,
    PI = Math.PI;

var tf = constants.TARGET_FPS;

var lightBuffer = void 0,
    darkBuffer = void 0,
    lightCtx = void 0,
    darkCtx = void 0,
    frameCount = void 0,
    displayProps = void 0;

var voidSprite = void 0,
    emitterSprite = void 0,
    moteCenterSprite = void 0,
    photonSprites = Array(3),
    mask = void 0;

/**
 * Draws plasma lines between a mote and its target.
 */
var drawPlasmaLine = function () {
	var a = vec2(),
	    b = vec2(),
	    c = vec2(),
	    d = vec2(),
	    ra = vec2(),
	    rb = vec2(),
	    rax = 0 | 0,
	    ray = 0 | 0,
	    speeda = 0.0,
	    ta = 0.0,
	    tc = 0.0,
	    rbx = 0 | 0,
	    rby = 0 | 0,
	    speedb = 0.0,
	    tb = 0.0,
	    td = 0.0,
	    sx = 0 | 0,
	    sy = 0 | 0,
	    tx = 0 | 0,
	    ty = 0 | 0;
	return function drawPlasmaLine(ctx, source, target, outerColor, innerColor) {
		var lineSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 4;
		var frameOffset = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

		// only these acts get lines
		ta = 0.6;
		tc = 0.9;
		tb = 0.7;
		td = 0.9;
		speeda = 0.57121;
		speedb = 0.71213;
		lerp(source, target, ta, a);
		lerp(source, target, tb, b);
		lerp(source, target, tc, c);
		lerp(source, target, td, d);

		mut_plus((0, _photonomix2.rotate)(a, c, tan(cos((frameCount + frameOffset) * speeda)), ra), a);
		mut_plus((0, _photonomix2.rotate)(b, d, tan(sin((frameCount + frameOffset) * speedb)), rb), b);

		sx = source[0];sy = source[1];
		tx = target[0];ty = target[1];
		rax = ra[0];ray = ra[1];
		rbx = rb[0];rby = rb[1];
		if (lightBuffer.width > lightBuffer.height) {
			sx = sx;
			tx = tx;
			rax = rax;
			rbx = rbx;
		} else {
			sy = sy;
			ty = ty;
			ray = ray;
			rby = rby;
		}
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty);
		ctx.strokeStyle = outerColor;
		ctx.lineWidth = round(cos((frameCount + frameOffset) * speeda) * lineSize);
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty);
		ctx.strokeStyle = innerColor;
		ctx.lineWidth = round(cos((frameCount + frameOffset) * speeda) * ~~(lineSize / 4));
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.closePath();
	};
}();

/**
 * Draw a mote.
 */
var drawMote = function () {
	var pulse = 0 | 0,
	    pregnant = 0 | 0,
	    injured = 0 | 0,
	    lastMeal = 0 | 0,
	    size = 0.0,
	    plasmaSource = vec2(),
	    plasmaTarget = vec2(),
	    sc = 0.0,
	    sw = 0.0,
	    sch = 0.0,
	    swh = 0.0,
	    colorIndex = 0 | 0,
	    px = 0.0,
	    py = 0.0,
	    sprite = void 0;
	return function drawMote(entity) {
		lightCtx.globalCompositeOperation = "lighter";
		px = (0, _photonomix3.screenSpace)(entity.pos[0]);
		py = (0, _photonomix3.screenSpace)(entity.pos[1]);

		pulse = entity.pulse;
		pregnant = entity.pregnant;
		injured = entity.injured;
		lastMeal = entity.lastMeal;

		size = entity.size * displayProps.minDimension;
		if (pregnant) {
			sc = size * cos((frameCount + pulse) * 0.2) * (sqrt(pregnant) + 1);
			sw = size * sin((frameCount + pulse + tf) * 0.2) * (sqrt(pregnant) + 1) * 0.1;
		} else if (injured) {
			sc = size * cos((frameCount + pulse) * (0.2 + (1 - 1 / injured)));
			sw = size * sin((frameCount + pulse + tf) * 0.2) * 0.1; //* (0.2+(1-1/injured)))*0.25;
		} else {
			sc = size * cos((frameCount + pulse) * 0.2);
			sw = size * sin((frameCount + pulse + tf) * 0.2) * 0.1;
		}
		sch = sc * 0.5;
		swh = sw * 0.5;
		colorIndex = sprites.colorIndex(entity.color[_photonomixGame.COLOR_R], entity.color[_photonomixGame.COLOR_G], entity.color[_photonomixGame.COLOR_B]);
		sprite = sprites.getMoteSprite(colorIndex);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - sch, py - sch, sc, sc);
		sprite = moteCenterSprite;
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - sch, py - sch, sc, sc);
		if (entity.target && entity.action == _photonomixGame2.ACT_ATTACK) {
			// need vectors but in screen space, not absolute space
			plasmaSource[0] = px;
			plasmaSource[1] = py;
			plasmaTarget[0] = (0, _photonomix3.screenSpace)(entity.target.pos[0]);
			plasmaTarget[1] = (0, _photonomix3.screenSpace)(entity.target.pos[1]);
			drawPlasmaLine(lightCtx, plasmaSource, plasmaTarget, sprites.getColorString(colorIndex), "white", 5, pulse);
		}
	};
}();

/**
 * Draws a photon.
 */
var drawPhoton = function () {
	var sw = 0.0,
	    swh = 0.0,
	    px = 0.0,
	    py = 0.0,
	    ps = 0.0,
	    pulse = 0 | 0,
	    sprite = void 0;
	return function drawPhoton(entity) {
		(0, _photonomix3.updateCompositeOperation)(lightCtx, "lighter");
		px = (0, _photonomix3.screenSpace)(entity.pos[0]);
		py = (0, _photonomix3.screenSpace)(entity.pos[1]);
		sprite = photonSprites[entity.color];
		ps = constants.PHOTON_BASE_SIZE * displayProps.minDimension; //sprite.pixelSize;
		pulse = entity.pulse;
		sw = ps * 0.75 * (cos((frameCount + pulse) * 0.3) * sin((frameCount + pulse) * 0.1)) + ps * 0.25;
		swh = sw * 0.5;
		lightCtx.drawImage(sprite.canvas, 0, 0, sprite.pixelSize, sprite.pixelSize, px - swh, py - swh, sw, sw);
	};
}();

/**
 * Draws a void.
 */
var drawVoid = function () {
	var sc = 0.0,
	    sch = 0.0,
	    px = 0.0,
	    py = 0.0,
	    ox = 0.0,
	    oy = 0.0,
	    sprite = void 0,
	    sw = 0.0,
	    swh = 0.0,
	    colorIndex = 0 | 0;
	return function drawVoid(entity) {
		px = (0, _photonomix3.screenSpace)(entity.pos[0]);
		py = (0, _photonomix3.screenSpace)(entity.pos[1]);

		sc = entity.size * displayProps.minDimension * 1 + sin(frameCount * 0.2);
		sch = sc * 0.5;

		sprite = voidSprite;
		(0, _photonomix3.updateCompositeOperation)(darkCtx, "source-over");
		darkCtx.drawImage(sprite.canvas, px - sch, py - sch, sc, sc);
		switch (entity.lastMeal) {
			case -1:
				colorIndex = 0x888;break;
			case _photonomixGame.COLOR_R:
				colorIndex = 0xf44;break;
			case _photonomixGame.COLOR_G:
				colorIndex = 0x4f4;break;
			case _photonomixGame.COLOR_B:
				colorIndex = 0x44f;break;
		}
		// white patch
		sw = sc * 1.7;
		swh = sw * 0.5;
		ox = sin(frameCount * 0.0127) * sc * 0.1;
		oy = cos(frameCount * 0.0127) * sc * 0.1;
		sprite = sprites.getMoteSprite(0xfff);
		(0, _photonomix3.updateCompositeOperation)(darkCtx, "soft-light");
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw);
		// color patch
		sw = sc * 1.2;
		swh = sw * 0.5;
		ox = cos(frameCount * 0.023) * sc * 0.13;
		oy = sin(frameCount * 0.023) * sc * 0.13;
		sprite = sprites.getMoteSprite(colorIndex);
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw);
		// dark patch
		sprite = sprites.getMoteSprite(0x000);
		sw = sc * 1.65;
		swh = sw * 0.5;
		ox = sin(frameCount * 0.0122) * sc * 0.15;
		oy = cos(frameCount * 0.0122) * sc * 0.15;
		(0, _photonomix3.updateCompositeOperation)(darkCtx, "multiply");
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw);
	};
}();

/**
 * Draws an emitter.
 */
var drawEmitter = function () {
	var sc = 0.0,
	    sch = 0.0,
	    px = 0.0,
	    py = 0.0,
	    ox = 0.0,
	    oy = 0.0,
	    sprite = void 0,
	    sw = 0.0,
	    swh = 0.0;
	return function drawEmitter(entity) {
		(0, _photonomix3.updateCompositeOperation)(lightCtx, "lighter");
		px = (0, _photonomix3.screenSpace)(entity.pos[0]);
		py = (0, _photonomix3.screenSpace)(entity.pos[1]);

		sc = entity.size * displayProps.minDimension;
		//sc = sc + (sc*(sin(frameCount*0.05))/100);
		sch = sc * 0.5;

		sprite = emitterSprite;
		lightCtx.drawImage(sprite.canvas, px - sch, py - sch, sc, sc);

		sw = cos(frameCount * 0.2) * sc * 1.7;
		swh = sw * 0.5;

		sprite = sprites.getMoteSprite(0x333);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - swh, py - swh, sw, sw);

		sw = sc * 1.3;
		swh = sw * 0.5;
		ox = sin(frameCount * 0.08) * sc * 0.1;
		oy = cos(frameCount * 0.08) * sc * 0.1;
		sprite = sprites.getMoteSprite(0x500);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw);

		ox = sin(frameCount * 0.08 + 2.094394) * sc * 0.1;
		oy = cos(frameCount * 0.08 + 2.094394) * sc * 0.1;
		sprite = sprites.getMoteSprite(0x050);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw);

		ox = sin(frameCount * 0.08 + 4.188789) * sc * 0.1;
		oy = cos(frameCount * 0.08 + 4.188789) * sc * 0.1;
		sprite = sprites.getMoteSprite(0x005);
		lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw);
	};
}();

/**
 * Draws an antigraviton cluster.
 */
var drawAntiGravitonCluster = function () {
	var size = 0.0,
	    plasmaSource = vec2(),
	    plasmaTarget = vec2(),
	    lw = 4,
	    outerColor = "rgba(0,0,0,0.3)",
	    innerColor = "rgba(0,0,0,0.7)",
	    pi3rd = PI * (1 / 3),
	    px = 0.0,
	    py = 0.0,
	    ox = 0.0,
	    oy = 0.0,
	    sc = 0.0,
	    sch = 0.0,
	    sprite = void 0;
	function drawAntiPlasma(offset, length) {
		ox = sin(frameCount * 0.08 + offset) * sc * length;
		oy = cos(frameCount * 0.08 + offset) * sc * length;
		plasmaTarget[0] = px + ox;
		plasmaTarget[1] = py + oy;
		drawPlasmaLine(darkCtx, plasmaSource, plasmaTarget, outerColor, innerColor, lw);
	}
	return function drawAntiGravitonCluster(entity) {
		(0, _photonomix3.updateCompositeOperation)(darkCtx, "multiply");
		px = (0, _photonomix3.screenSpace)(entity.pos[0]);
		py = (0, _photonomix3.screenSpace)(entity.pos[1]);

		size = entity.size * displayProps.minDimension;
		sc = size;
		lw = min(4, ~~(sc / 2));
		sch = sc * 0.5;
		plasmaSource[0] = px;
		plasmaSource[1] = py;

		drawAntiPlasma(0, 0.5);
		drawAntiPlasma(pi3rd * 2, 0.5);
		drawAntiPlasma(pi3rd * 4, 0.5);
		drawAntiPlasma(pi3rd, 0.25);
		drawAntiPlasma(pi3rd * 3, 0.25);
		drawAntiPlasma(pi3rd * 5, 0.25);

		sprite = sprites.getMoteSprite(0x000);
		darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - sch, py - sch, sc, sc);
	};
}();

var init = exports.init = function init(buffer1, buffer2, props) {
	displayProps = props;
	lightBuffer = buffer1;
	darkBuffer = buffer2;
	lightCtx = lightBuffer.context;
	darkCtx = darkBuffer.context;
	updateProps();
	displayProps.events.on("resize", updateProps);
	voidSprite = sprites.createVoidSprite(1000, 1);
	emitterSprite = sprites.createEmitterSprite(displayProps.minDimension, 1);
	photonSprites[_photonomixGame.COLOR_R] = sprites.createPhotonSprite(displayProps.minDimension, constants.PHOTON_BASE_SIZE, "red");
	photonSprites[_photonomixGame.COLOR_G] = sprites.createPhotonSprite(displayProps.minDimension, constants.PHOTON_BASE_SIZE, "green");
	photonSprites[_photonomixGame.COLOR_B] = sprites.createPhotonSprite(displayProps.minDimension, constants.PHOTON_BASE_SIZE, "blue");
	sprites.initMoteSpriteSheet(1000, constants.MOTE_BASE_SIZE * 4);
	mask = sprites.createGameSpaceMask();
	moteCenterSprite = sprites.createMoteCenterSprite();
};

/**
 * Draw call for all entities. Loops through game entities and draws them according
 * to kind and displayProps.
 */
var draw = exports.draw = function () {
	// these variables are shared by draw calls below
	var i = void 0,
	    l = void 0,
	    entity = void 0,
	    px = void 0,
	    py = void 0;
	var lightClearStyle = "rgba(0,0,0,0.3)";
	var darkClearStyle = "rgba(0,0,0,0.1)";

	return function draw(state) {
		(0, _photonomix3.updateCompositeOperation)(lightCtx, "source-over");
		lightCtx.fillStyle = lightClearStyle;
		lightCtx.fillRect(0, 0, lightBuffer.width, lightBuffer.height);
		(0, _photonomix3.updateCompositeOperation)(darkCtx, "destination-out");
		darkCtx.fillStyle = darkClearStyle;
		darkCtx.clearRect(0, 0, darkBuffer.width, darkBuffer.height);
		frameCount = (0, _photonomix3.getFrameCount)();
		for (i = 0, l = state.entities.length; i < l; ++i) {
			entity = state.entities[i];
			px = (0, _photonomix3.screenSpace)(entity.pos[0]);
			py = (0, _photonomix3.screenSpace)(entity.pos[1]);
			if ((0, _photonomix3.offscreen)(px, py)) continue;
			if (entity instanceof _photonomixGame2.Mote) drawMote(entity);else if (entity instanceof _photonomixGame.Photon) drawPhoton(entity);else if (entity instanceof _photonomixGame3.Void) drawVoid(entity);else if (entity instanceof _photonomixGame4.Emitter) drawEmitter(entity);else if (entity instanceof _photonomixGame5.AntiGravitonCluster) drawAntiGravitonCluster(entity);
		}
		(0, _photonomix3.updateCompositeOperation)(lightCtx, "destination-out");
		lightCtx.drawImage(mask.canvas, 0, 0, displayProps.minDimension, displayProps.minDimension);
		(0, _photonomix3.updateCompositeOperation)(darkCtx, "destination-out");
		darkCtx.drawImage(mask.canvas, 0, 0, displayProps.minDimension, displayProps.minDimension);
	};
}();

function updateProps() {
	var _displayProps = displayProps,
	    width = _displayProps.width,
	    height = _displayProps.height,
	    minDimension = _displayProps.minDimension,
	    orientation = _displayProps.orientation;

	var ox = void 0,
	    oy = void 0;
	lightBuffer.width = darkBuffer.width = minDimension;
	lightBuffer.height = darkBuffer.height = minDimension;
	if (orientation) {
		ox = 0;
		oy = (height - width) / 2;
	} else {
		ox = (width - height) / 2;
		oy = 0;
	}
	lightBuffer.offsetX = darkBuffer.offsetX = ox;
	lightBuffer.offsetY = darkBuffer.offsetY = oy;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.draw = draw;
exports.init = init;

var _photonomix = __webpack_require__(4);

var _photonomix2 = __webpack_require__(0);

var _photonomix3 = __webpack_require__(11);

var controls = _interopRequireWildcard(_photonomix3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var max = Math.max;


var ctx = void 0,
    uiBuffer = void 0;
var displayProps = void 0;

/**
 * Creates debug markers on screen to show the center, top, left, bottom, right, topleft
 * and topright extremes of the main game area.
 */
var debugMarkers = function () {
	var w = void 0,
	    h = void 0,
	    wh = void 0,
	    hh = void 0;
	return function debugMarkers() {
		w = displayProps.width;
		h = displayProps.height;
		wh = w / 2;
		hh = h / 2;
		(0, _photonomix.drawCircle)(ctx, 0, 0, 4, "yellow", 1, "white");
		(0, _photonomix.drawCircle)(ctx, wh, 0, 4, "orange", 1, "white");
		(0, _photonomix.drawCircle)(ctx, w, 0, 4, "red", 1, "white");
		(0, _photonomix.drawCircle)(ctx, 0, hh, 4, "white", 1, "white");
		(0, _photonomix.drawCircle)(ctx, wh, hh, 4, "gray", 1, "white");
		(0, _photonomix.drawCircle)(ctx, w, hh, 4, "black", 1, "white");
		(0, _photonomix.drawCircle)(ctx, 0, h, 4, "blue", 1, "white");
		(0, _photonomix.drawCircle)(ctx, wh, h, 4, "cyan", 1, "white");
		(0, _photonomix.drawCircle)(ctx, w, h, 4, "green", 1, "white");
	};
}();

/**
 * Draws an edge button.
 */
function drawEdgeButton(ctx, x, y, w, h) {
	var halfButtonWidth = w * 0.5;
	var buttonHeight = h;
	var cpXScale = w * 0.122;
	var beginX = x - halfButtonWidth;
	var beginY = y;
	var topX = x;
	var topY = y - buttonHeight;
	var endX = x + halfButtonWidth;
	var endY = y;
	var aCPX = beginX + cpXScale;
	var aCPY = beginY - cpXScale;
	var bCPX = beginX + cpXScale;
	var bCPY = topY;
	var cCPX = endX - cpXScale;
	var cCPY = topY;
	var dCPX = endX - cpXScale;
	var dCPY = endY - cpXScale;
	var color = "rgba(255,255,255,0.1)";

	ctx.beginPath();
	ctx.moveTo(beginX, beginY);
	ctx.bezierCurveTo(aCPX, aCPY, bCPX, bCPY, topX, topY);
	ctx.bezierCurveTo(cCPX, cCPY, dCPX, dCPY, endX, endY);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.lineWidth = 4;
	ctx.fill();
	ctx.closePath();
}

/**
 * Draws UI elements.
 */
function draw() {
	var w = displayProps.width;
	var h = displayProps.height;
	var bw = max(100, w * 0.1);
	var bh = max(47, w * 0.047);
	var _controls$pointer = controls.pointer,
	    move = _controls$pointer.move,
	    down = _controls$pointer.down;

	ctx.clearRect(0, 0, w, h);
	drawEdgeButton(ctx, w * 0.5, h, bw, bh);
	drawEdgeButton(ctx, w * 0.333, h, bw, bh);
	drawEdgeButton(ctx, w * 0.666, h, bw, bh);
	(0, _photonomix.drawCircle)(ctx, move[0], move[1], 5, "white");
	if (controls.buttons[0]) {
		ctx.beginPath();
		ctx.moveTo(down[0], down[1]);
		ctx.lineTo(move[0], move[1]);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}
	//drawAntiGravitonCluster(agClusterIcon, ctx);
	if (_photonomix2.DEBUG) debugMarkers();
}

/**
 * Initializes the UI submodule.
 * @param {DrawBuffer} buffer
 */
function init(buffer, props) {
	displayProps = props;
	uiBuffer = buffer;
	updateProps();
	displayProps.events.on("resize", updateProps);
	ctx = uiBuffer.context;
}

function updateProps() {
	uiBuffer.width = displayProps.width;
	uiBuffer.height = displayProps.height;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MARKER_HIT = undefined;
exports.Marker = Marker;

var _photonomix = __webpack_require__(0);

var _vectrix = __webpack_require__(1);

var vectrix = _interopRequireWildcard(_vectrix);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MARKER_HIT = exports.MARKER_HIT = 0;
function Marker(type, pos) {
	var lifetime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _photonomix.TARGET_FPS;

	this.type = type;
	this.pos = vectrix.vectors.vec2(pos);
	this.start = lifetime;
	this.lifetime = lifetime;
}

Marker.prototype.tick = function () {
	this.lifetime--;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _photonomix = __webpack_require__(4);

var display = _interopRequireWildcard(_photonomix);

var _photonomix2 = __webpack_require__(0);

var constants = _interopRequireWildcard(_photonomix2);

var _photonomix3 = __webpack_require__(14);

var game = _interopRequireWildcard(_photonomix3);

var _photonomix4 = __webpack_require__(2);

var util = _interopRequireWildcard(_photonomix4);

var _photonomix5 = __webpack_require__(11);

var controls = _interopRequireWildcard(_photonomix5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var photonomix = {
	util: util,
	constants: constants,
	display: display,
	game: game,
	state: {}
};

window.photonomix = photonomix;

window.addEventListener("load", function () {
	photonomix.state.game = new game.Game();
	controls.init(photonomix.state);
	photonomix.state.controls = controls.state;
	photonomix.display.init(photonomix.state);
	photonomix.display.startGame();
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["toString"] = toString;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["wrap"] = wrap;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vectrix_matrices__ = __webpack_require__(9);

/**
The quaternions module focuses on quaternion operations that are useful for performing 3-dimensional rotations. Quaternions inherit from [[vectrix.vectors#vec4|4d-vectors]], which in turn inherit from [[vectrix.matrices|matrices]], so most of the operations supported by vec4 and generic matrices are supported by quats (TODO: remove the ones that don't make sense for quaternions)

Note that in the examples quaternions outputs are displayed as they would be by quaternion.toString(), which rounds to the nearest 2 decimal points for brevity. Actual values will be accurate to at least 1.0e-7 (the minimum accuracy required by the unit tests).

Vectrix quaternions store their scalar component in the last place, so all quaternion functions that accept an array as a parameter expect it as [x,y,z,w] rather than [w,x,y,z]. This for consistency with the vectors module.

```javascript
const quaternions = require("vectrix.quaternions");
let q = quaternion.create([0.4, 1.0, 2.1, 1.0]); // quaternion(0.40, 1.00, 2.10, 1.0);
```
Quaternion values are aliased to x, y, z, and w, and can be accessed in any combination
as with GLSL:
```javascript
q.xy; // [0.4, 1.0]
q.zyx; // [2.1, 1.0, 0.4]
q.zw; // [2.1, 1.0]
// etc
```
@module vectrix/quaternions
*/



const vecNrm = __WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["normalize"];
const {abs, sin, cos, acos, sqrt} = Math;

/**
 * @private
 */
let aliasCombos = [];
	
["xyzw", "xyz", "xzw", "xyw", "yzw", "xy", "xw", "xz", "yz", "yw", "zw"].forEach((props) => {
	permutations(props.split("")).forEach((combo) => {
		aliasCombos.push(combo);
	});
});

/**
 * Util function to help generate permutations of property alias sets
 * @private
 */
function permutations(list) {
	// Empty list has one permutation
	if (list.length === 0) return [[]];
	var result = [];
	for (var i=0; i<list.length; i++) {
		var copy = list.slice();
		var head = copy.splice(i, 1);
		var rest = permutations(copy);
		for (var j=0; j<rest.length; j++) {
			var next = head.concat(rest[j]);
			result.push(next);
		}
	}
	return result;
}
/**
 * @private
 */
function getAliasCombo(combo) {
	return combo.map((p) => this[p]);
}

/**
 * Adds x,y,z,w aliases to a quaternion.
 * @private
 */
function defineAliases(q) {
	Object.defineProperties(q, {
		x:{get:function() {return this[0]}},
		y:{get:function() {return this[1]}},
		z:{get:function() {return this[2]}},
		w:{get:function() {return this[3]}}
	});
	for(let i = 0, len = aliasCombos.length; i < len; ++i) {
		Object.defineProperty(q, aliasCombos[i].join(""), {
			get:getAliasCombo.bind(q, aliasCombos[i])
		});
	}
}

/**
 * Create a string representation of a quaternion.
 * @example
 * // functional style
 * quaternions.quatToString(quaternions.create()); // quaternion(0.00, 0.00, 0.00, 1.00)
 * // OO style
 * quaternions.create().toString(); // quaternion(0.00, 0.00, 0.00, 1.00)
 * @param {quaternion} a quaternion to stringify
 * @return {string}
 */
function toString(a) {
	let strings = __WEBPACK_IMPORTED_MODULE_1__vectrix_matrices__["toArray"](a).map((cur) => cur.toFixed(2));
	return "quaternion("+strings.join(", ")+")";
}

/**
 * Performs a spherical linear interpolation between a and b.
 * @example
 * let q1 = quaternions.create([0.3,-0.6,-0.4,0.2]);
 * let q2 = quaternions.create([0.6,0.8,0.5,0.7]);
 * slerp(q1, q2, 0.4); // quaternion(0.75, 0.01, -0.02, 0.72);
 * @param {quaternion|array(4)} a origin quaternion
 * @param {quaternion|array(4)} b destination quaternion
 * @param {float} t interval [0...1]
 * @return {quaternion}
 */ 
const slerp = (function() {
	let ax = 0.0, bx = 0.0, ay = 0.0, by = 0.0,
		  az = 0.0, bz = 0.0, aw = 0.0, bw = 0.0,
			cosHalfTheta = 0.0, sinHalfTheta = 0.0,
			halfTheta = 0.0,
			ratioA = 0.0, ratioB = 0.0;
	return function slerp(a, b, t, out = undefined) {
		ax = a[0];
		bx = b[0];
		ay = a[1];
		by = b[1];
		az = a[2];
		bz = b[2];
		aw = a[3];
		bw = b[3];
		cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw;
		out = out||create();
		if (abs(cosHalfTheta) >= 1.0) {
			out[0] = ax;
			out[1] = ay;
			out[2] = az;
			out[3] = aw;
			return out;
		}
		halfTheta = acos(cosHalfTheta);
		sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);
		ratioA = sin((1 - t) * halfTheta) / sinHalfTheta;
		ratioB = sin(t * halfTheta) / sinHalfTheta;

		out[0] = ax * ratioA + bx * ratioB;
		out[1] = ay * ratioA + by * ratioB;
		out[2] = az * ratioA + bz * ratioB;
		out[3] = aw * ratioA + bw * ratioB;
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["slerp"] = slerp;


/**
 * Normalize a quaternion.
 * @example
 * // functional style
 * quaternions.normalize([4.0, 10.0, 3.0, 1.0]).toString(); // quaternion(0.36, 0.89, 0.27, 0.09);
 * // OO style
 * quaternions.create([4.0, 10.0, 3.0, 1.0]).normalize(); // quaternion(0.36, 0.89, 0.27, 0.09);
 * @param {quaternion|array(4)} a quaternion to normalize
 * @param {quaternion} out (optional) out parameter
 * @return {quaternion}
 */
function normalize(a, out = undefined) {
	// this function only exists to override the out parameter, so pass down
	// to the vector version of normalize afterward
	out = out||create();
	let out2 = vecNrm(a, out);
	return out2;
}

/**
 * Finds the inverse of a quaternion by normalizing then inverting the quat. Normalization
 * can be skipped by setting normalize = false if the quat is known to be normal already.
 * Be careful, since floating point errors will often de-normalize your quats!
 * @example
 * // functional
 * quaternions.invert([4.0,7.0,5.0,1.0]); // quaternion(-0.36, -0.89, -0.27, 0.09)
 * // OO
 * quaternions.create([4.0,7.0,5.0,1.0]).invert(); // quaternion(-0.36, -0.89, -0.27, 0.09)
 * @param {quaternion|array(4)} a the input quaternion
 * @param {quaternion} (optional) out out parameter
 * @param {bool} norm (default true) whether to normalize the quaternion before inverting
 * @return {quaternion}
 */
const invert = (function() {
	return function invert(a, norm = true, out = undefined) {
		out = out||create();
		if(norm) normalize(a, out);
		else out.set(a);
		out[0] = -out[0];
		out[1] = -out[1];
		out[2] = -out[2];
		return out;
	}
})();
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;


/**
 * Factory for creating quaternions. Quaternions are represented as 4 member arrays
 * of (x,y,z,w) where x,y,z are the vector component and w is the scalar component.
 * @example
 * quaternions.create([0.4, 32.1, 9.0, 1.0]); // quaternion(0.40, 32.10, 9.00, 1.00)
 * @param {array(4)} vals [x,y,z,w] (default [0,0,0,1] = identity quaternion)
 * @param {ArrayBuffer} buffer (optional) an array buffer to create the vector on 
 * @param {offset} offset (optional) offset for the buffer, ignored if buffer is not supplied 

 * @return {quaternion}
 */
function create() {
	let identity = [0,0,0,1];
	let params = Array.prototype.slice.apply(arguments), len = params.length;
	if(len === 0) { // just create an identity quaternion 
		params = identity;
	}
	else {
		if(params[len-1] instanceof ArrayBuffer) { // supplied buffer, no offset
			if(len === 1) params = identity.concat(params).concat([0]);
			else params = params.concat([0]);
		}
		else if(params[len-2] instanceof ArrayBuffer) { // supplied buffer + offset
			if(len === 2) params = identity.concat(params);
		}
	}
	let q = __WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["create"].apply(null, [4].concat(params));
	return q;
}

/**
 * Wraps a quaternion with aliases and quaternion functions as methods.
 * @param {quaternion} q quaternion to wrap
 * @return {quaternion} wrapped quaternion
 */
function wrap(q) {
	defineAliases(q);
	__WEBPACK_IMPORTED_MODULE_1__vectrix_matrices__["wrap"](q);
	q.slerp = asMethod(slerp, q);
	q.normalize = asMethod(normalize, q);
	q.invert = asMethod(invert, q);
	q.toString = toString.bind(null, q);
	q.times = asMethod(__WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["times"], q);
	q.clamp = asMethod(__WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["clamp"], q);
	q.normalize = asMethod(__WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["normalize"], q);
	q.mut_normalize = asMethod(__WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["mut_normalize"], q);
	q.mut_times = asMethod(__WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["mut_times"], q);
	q.mut_clamp = asMethod(__WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["mut_clamp"], q);
	q.mut_copy = asMethod(__WEBPACK_IMPORTED_MODULE_0__vectrix_vectors__["mut_copy"], q);
	return q;
}

/**
 * Turns a quaternion function into a method by wrapping its result.
 * @param {function} method
 * @param {quaternion} q 
 * @private
 */
function asMethod(method, q) {
	return function() {
		let res = method.apply(null, [q].concat(Array.prototype.slice.apply(arguments)));
		return wrap(create(res));
	}
}

/**
 * Creates an identity quaternion [0,0,0,1].
 * @example 
 * quaternions.create.identity(); // quaternion(0.00, 0.00, 0.00, 1.00)
 * @param {ArrayBuffer} buffer (optional) an array buffer to create the vector on 
 * @param {offset} offset (optional) offset for the buffer, ignored if buffer is not supplied 
 * @return {quaternion}
 */
create.identity = function() {
	return create();
}

/**
 * Creates a quaternion from Euler angles (in radians).
 * @example
 * quaternions.create.fromEulerAngles([75*Math.PI/180, 65*Math.PI/180, 15*Math.PI/180]); // quaternion(0.412, 0.56, 0.36, 0.62)
 * @param {array(3)} a [yaw,pitch,roll] in radians 
 * @param {ArrayBuffer} buffer (optional) an array buffer to create the vector on 
 * @param {offset} offset (optional) offset for the buffer, ignored if buffer is not supplied 
 * @return {quaternion}
 */
create.fromEulerAngles = (function() {
	let yawh = 0.0, pitchh = 0.0, rollh = 0.0, c1 = 0.0, s1 = 0.0,
		c2 = 0.0, s2 = 0.0, c3 = 0.0, s3 = 0.0, c1c2 = 0.0, s1s2 = 0.0;
	return function(a, buffer = undefined, offset = undefined) {
		let out = create(buffer, offset);
		yawh = a[0]/2;
		pitchh = a[1]/2;
		rollh = a[2]/2;
		c1 = cos(yawh);
		s1 = sin(yawh);
		c2 = cos(pitchh);
		s2 = sin(pitchh);
		c3 = cos(rollh);
		s3 = sin(rollh);
		c1c2 = c1*c2;
		s1s2 = s1*s2;
		out[0] = c1c2*s3 + s1s2*c3;
		out[1] = s1*c2*c3 + c1*s2*s3;
		out[2] = c1*s2*c3 - s1*c2*s3;
		out[3] = c1c2*c3 - s1s2*s3;
		return out;
	}
})();

/**
 * Creates a quaternion from an axis-angle rotation.
 * @example
 * quaternions.create.fromAxisAngle([1,0,0],90*Math.PI/180); // quaternion(0.70, 0.00, 0.00, 0.70)
 * @param {array(3)} axis of rotation
 * @param {float} angle of rotation as radian
 * @param {ArrayBuffer} buffer (optional) an array buffer to create the vector on 
 * @param {offset} offset (optional) offset for the buffer, ignored if buffer is not supplied 
 * @return {quaternion}
 */
create.fromAxisAngle = (function() {
	let a = 0.0, angleh = 0.0;
	return function fromAxisAngle(axis, angle, buffer = undefined, offset = undefined) {
		let out = create(buffer, offset);
		a = vecNrm(axis);
		angleh = angle/2;
		out[0] = a[0] * sin(angleh);
		out[1] = a[1] * sin(angleh);
		out[2] = a[2] * sin(angleh);
		out[3] = cos(angleh);
		return out;
	}
})();


/***/ })
/******/ ]);