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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../nphyx-pxene/index.js":
/*!*******************************!*\
  !*** ../nphyx-pxene/index.js ***!
  \*******************************/
/*! exports provided: display, controls, events, util, assets, graphics, ObjectPool, BooleanArray, CollisionMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/controls */ "../nphyx-pxene/src/controls/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "controls", function() { return _src_controls__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _src_graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/graphics */ "../nphyx-pxene/src/graphics/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "graphics", function() { return _src_graphics__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _src_pxene_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/pxene.display */ "../nphyx-pxene/src/pxene.display.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "display", function() { return _src_pxene_display__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _src_pxene_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/pxene.events */ "../nphyx-pxene/src/pxene.events.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _src_pxene_events__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _src_pxene_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/pxene.util */ "../nphyx-pxene/src/pxene.util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _src_pxene_util__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _src_pxene_assets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/pxene.assets */ "../nphyx-pxene/src/pxene.assets.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "assets", function() { return _src_pxene_assets__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _src_pxene_BooleanArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/pxene.BooleanArray */ "../nphyx-pxene/src/pxene.BooleanArray.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanArray", function() { return _src_pxene_BooleanArray__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _src_pxene_ObjectPool__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/pxene.ObjectPool */ "../nphyx-pxene/src/pxene.ObjectPool.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectPool", function() { return _src_pxene_ObjectPool__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _src_pxene_CollisionMap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/pxene.CollisionMap */ "../nphyx-pxene/src/pxene.CollisionMap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollisionMap", function() { return _src_pxene_CollisionMap__WEBPACK_IMPORTED_MODULE_8__["default"]; });














/***/ }),

/***/ "../nphyx-pxene/src/controls/KeyMap.js":
/*!*********************************************!*\
  !*** ../nphyx-pxene/src/controls/KeyMap.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeyMap; });

/**
 * @module pxene.controls.KeyMap
 * contains the KeyMap prototype.
 */

/**
 * Data type for handling mappings of keys to control labels.
 * @example
 * ```javascript
 * let jump = pxene.controls.map("jump", "space");
 * jump.down(); // true or false depending on whether the spacebar is down
 * pxene.controls.map("jump", "esc");
 * jump.isDown(); // true if either space or esc are down 
 * jump.lastDown(); // most recent time either space or esc were pressed down
 * jump.LastUp(); // most recent time either space or esc were released
 * jump.unmap("esc"); // now jump only pays attention to spacebar
 *
 * // The controls module keeps track of your control mappings, so you don't
 * // have to worry about losing them. Once you've created the "jump" label
 * // above you can always look it up later:
 * let jump = pxene.controls.lookupMap("jump");
 * ```
 * @param {String} label the label for the mapping
 * @return KeyMap object
 */
function KeyMap(label) {
	label = label.toLowerCase();
	this.label = label;
	this.keys = [];
	this.checkedDown = 0;
	this.checkedUp = 0;
	return Object.seal(this);
}

KeyMap.prototype.lastDown = function lastDown() {
	return this.keys.reduce((p, c) => p = (p > c.lastDown?p:c.lastDown), 0);
}

KeyMap.prototype.lastUp = function lastUp() {
	return this.keys.reduce((p, c) => p = (p > c.lastDown?p:c.lastDown), 0);
}

KeyMap.prototype.isDown = function isDown() {
	return this.keys.reduce((p, c) => p = p || c.down, false);
}

KeyMap.prototype.onceDown = function onceDown() {
	if(this.lastUp() >= this.checkedDown && this.isDown()) {
		this.checkedDown = Date.now();
		return true;
	}
	return false;
}

KeyMap.prototype.onceUp = function onceUp() {
	if(this.lastDown() >= this.checkedUp && !this.isDown()) {
		this.checkedUp = Date.now();
		return true;
	}
	return false;
}


/***/ }),

/***/ "../nphyx-pxene/src/controls/KeyState.js":
/*!***********************************************!*\
  !*** ../nphyx-pxene/src/controls/KeyState.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeyState; });

/**
 * @module pxene.controls.KeyState
 * contains the KeyState prototype.
 */

/**
 * Data type for tracking the state of a single key.
 * @param {string} key key name, as defined in [KeyboardEvent.key]{@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values}
 * @return {KeyState}
 */
function KeyState(key) {
	this.key = key;
	this.down = false;
	this.lastDown = 0;
	this.lastUp = 0;
	return Object.seal(this);
}


/***/ }),

/***/ "../nphyx-pxene/src/controls/index.js":
/*!********************************************!*\
  !*** ../nphyx-pxene/src/controls/index.js ***!
  \********************************************/
/*! exports provided: flatten, map, unmap, lookupMap, lookupKeyState, getCursorPosition, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmap", function() { return unmap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookupMap", function() { return lookupMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookupKeyState", function() { return lookupKeyState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCursorPosition", function() { return getCursorPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _KeyState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeyState */ "../nphyx-pxene/src/controls/KeyState.js");
/* harmony import */ var _KeyMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KeyMap */ "../nphyx-pxene/src/controls/KeyMap.js");

//import {flatten} from "../pxene.util";



const state = [
];

const keyMaps = {
}

/**
 * Flattens an array. 
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
 * Maps a label to one or more keys.
 * @example
 * ```javascript
 * let forward = pxene.controls.map("forward", "d", "rightArrow");
 * ```
 * @param {string} label a label for the keymap
 * @param {string|Array} ...keys a list of keys to map
 * @return {KeyMap}
 */
function map(label, ...keys) {
	const map = getOrInitMap(label);
	keys = flatten(keys);
	keys.forEach(key => {
		const ks = getOrInitKeyState(key);
		if(map.keys.indexOf(ks) == -1) map.keys.push(ks)
	});
	return map;
}

/**
 * Removes a key mapping, returning the modified {@link KeyMap}.
 * @param {string} label the key map's label
 * @param {string} key the [key name]{@link KeyState} to remove
 * @return {KeyMap|undefined} undefined if the KeyMap for the label didn't exist
 */
function unmap(label, key) {
	if(keyMaps[label]) {
		let index = keyMaps[label].keys.indexOf(lookupKeyState(key));
		if(index) keyMaps.keys.splice(index, 1);
	}
	return keyMaps[label];
}

/**
 * Finds a keyState by [key name]{@link KeyMap}, initializing a new one if necessary.
 * @param {string} key the key name
 * @return {KeyState}
 */
function getOrInitKeyState(key) {
	key = key.toLowerCase();
	let ks = lookupKeyState(key);
	if(ks === undefined) {
		ks = new _KeyState__WEBPACK_IMPORTED_MODULE_0__["default"](key);
		state.push(ks);
	}
	return ks;
}

/**
 * Finds a keyMap by label, initializing a new one if necessary.
 * @param {string} label the keymap label
 * @return {KeyMap}
 */
function getOrInitMap(label) {
	let mapped = lookupMap(label);
	if(mapped === undefined) {
		mapped = new _KeyMap__WEBPACK_IMPORTED_MODULE_1__["default"](label);
		keyMaps[label] = mapped;
	}
	return mapped;
}

/**
 * Looks up a KeyMap by label.
 * @param {string} label the keymap label
 * @return {KeyMap|undefined}
 */
function lookupMap(label) {
	return keyMaps[label];
}

/**
 * Looks up a KeyState by [key name]{@link KeyState}.
 */
function lookupKeyState(key) {
	key = key.toLowerCase();
	return state.filter(ks => ks.key === key)[0]
}

/**
 * Handles keydown & mousedown events.
 */
function down(ev) {
	const time = Date.now();
	if(ev instanceof MouseEvent) {
		const ks = lookupKeyState("mouse"+ev.button);
		if(ks && ks.lastUp >= ks.lastDown) { // ignore key repeats
			ks.down = true;
			ks.lastDown = time; 
		}
	}
	else if(ev instanceof KeyboardEvent) {
		/* global KeyboardEvent */
		const ks = lookupKeyState(ev.key);
		if(ks && ks.lastUp >= ks.lastDown) { // ignore key repeats
			ks.down = true;
			ks.lastDown = time; 
		}
	}
}

/**
 * Handles keyup & mouseup events.
 */
function up(ev) {
	const time = Date.now();
	if(ev instanceof MouseEvent) {
		const ks = lookupKeyState("mouse"+ev.button);
		if(ks) {
			ks.down = false;
			ks.lastUp = time;
		}
	}
	else if(ev instanceof KeyboardEvent) {
		const ks = lookupKeyState(ev.key);
		if(ks) {
			ks.down = false;
			ks.lastUp = time;
		}
	}
}

/**
 * When the window blurs we lose track of key events, so toggle all keys off.
 */
function blur() {
	const time = Date.now();
	state.forEach(ks => {
		ks.down = false;
		ks.lastUp = time;
	});
}

const cursor_pos = new Float32Array(2);
function updateCursorState(ev) {
	cursor_pos[0] = ev.clientX;
	cursor_pos[1] = ev.clientY;
}

function getCursorPosition() {
	return Float32Array.of(cursor_pos[0], cursor_pos[1]);
}

function init() {
	window.addEventListener("keydown", down); 
	window.addEventListener("keyup", up); 
	window.addEventListener("mousedown", down); 
	window.addEventListener("mouseup", up); 
	window.addEventListener("blur", blur);
	window.addEventListener("mousemove", updateCursorState);
}


/***/ }),

/***/ "../nphyx-pxene/src/graphics/Atlas.js":
/*!********************************************!*\
  !*** ../nphyx-pxene/src/graphics/Atlas.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Atlas; });
/* harmony import */ var _pxene_assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pxene.assets */ "../nphyx-pxene/src/pxene.assets.js");
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");

/**
 * @module pxene.graphics.Atlas
 *
 * Contains the Atlas prototype.
 */



/** a cache of already processed Atlases **/
const cache = [];
/**
 * Much like a sprite, an atlas is a collection of smaller images on a single sheet.
 * An atlas may have non-uniform cell sizes, and is more suitable for static graphics.
 *
 * @todo Implement me
 */
function Atlas(layers, animations, slices) {
	this.layers = layers;
	this.animations = animations;
	this.slices = slices;
	this.source = undefined;
	this.context = undefined;
	this.flippedContext = undefined;
	this.ready = false;
	return Object.seal(this);
}

/**
 * Initializes the sprite with an image, copying it to the sprite's internal
 * canvas.
 * @param {Image} image a loaded Image element
 * @param {bool} flipped whether to generate a horizontally flipped version (default: true)
 */
Atlas.prototype.init = function init(image, flipped = true) {
	this.source = image;
	let canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	let context = canvas.getContext("2d");
	context.drawImage(image, 0, 0);
	this.context = context;
	if(flipped) this.generateFlipped();
	this.ready = true;
}

/**
 * Generates a horizontally flipped version of the sprite with all the cells
 * at the same indexes. Normally run during {@link init} but can be called
 * manually if init was instructed not to create the flipped version.
 */
Atlas.prototype.generateFlipped = function generateFlipped() {
	let canvas = document.createElement("canvas");
	canvas.width = this.context.canvas.width;
	canvas.height = this.context.canvas.height;
	let context = canvas.getContext("2d");
	context.scale(-1, 1);
	let i, len, layer;
	// let's not create functions within loops
	let eachSlice = (key) => {
		let slice = this.slices[key];	
		let source = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(slice.pos);
		_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].mut_plus(source, layer.frames[i].pos);
		context.drawImage(
			this.context.canvas,
			source[0], source[1],
			slice.dims[0], slice.dims[1],
			-source[0]-slice.dims[0], source[1],
			slice.dims[0], slice.dims[1]
		);

	}

	let eachLayer = (key) => {
		layer = this.layers[key];
		for(i = 0, len = layer.frames.length; i < len; ++i) {
			Object.keys(this.slices).filter(key => key !== "default").forEach(eachSlice);
		}
	}

	Object.keys(this.layers).forEach(eachLayer); 

	context.setTransform(1, 0, 0, 1, 0, 0);
	this.flippedContext = context;
}

/**
 * Draw a slice from the atlas to the given context.
 * @param {CanvasContext2d} dest the destination context
 * @param {string} name the name of the slice to draw
 * @param {vec2} pos the top left corner to start drawing at
 * @param {bool} flipped horizontal flip toggle (to reverse facing of image)
 * @param {Array} layers list of layers by name to draw
 */
Atlas.prototype.draw = function(dest, label, pos, flipped = false, layers = undefined) {
	let slice = (
			this.slices[label]?
			this.slices[label]:
			this.slices.default);
	let canvas = flipped?this.flippedContext.canvas:this.context.canvas;

	// draw all layers if a layer list isn't specified
	if(layers === undefined) layers = Object.keys(this.layers);
	layers.forEach(layer => {
		let source = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(slice.pos);
		//vectors.mut_plus(source, this.layers[layer].pos);
		_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].mut_plus(source, this.layers[layer].frames[0].pos);
		dest.drawImage(
			canvas,
			source[0], source[1],
			slice.dims[0], slice.dims[1],
			pos[0], pos[1],
			slice.dims[0], slice.dims[1]
		);
	});
}

/**
 * Draws a sprite frame from a given animation set, or the default animation
 * if the specified animation is incorrect.
 * @param {CanvasRenderingContext2D} dest the destination context
 * @param {string} label the name of the animation to draw
 * @param {vec2} pos the top left corner from which to start drawing
 * @param {int} frame the frame number to draw
 * @param {bool} flip horizontal flip toggle (to reverse facing of sprite)
 * @param {Array} layers list of layers by name to draw
 */
Atlas.prototype.animate = function animate(dest, label, pos, frame, flipped = false, layers = undefined) {
	// draw all layers if a layer list isn't specified
	if(layers === undefined) layers = Object.keys(this.layers);

	let animation = (
			this.animations[label]?
			this.animations[label]:
			this.animations.default);

	let frameNum = animation.start + (frame % animation.length);
	let canvas = flipped?this.flippedContext.canvas:this.context.canvas; 
	layers.forEach(layer => {
		let frame = this.layers[layer].frames[frameNum];
		dest.drawImage(
			canvas,
			frame.pos[0], frame.pos[1],
			frame.dims[0], frame.dims[1],
			pos[0], pos[1], 
			frame.dims[0], frame.dims[1])
	});
}

/**
 * Creates a new Atlas by combining into a single layer the listed layers, 
 * in the order supplied.
 * @param {Array} layers list of layers by label
 * @return {Atlas}
 *
 * @todo implement me
 */
Atlas.prototype.prebake = function prebake() {
	throw new Error("unimplemented");
}

/**
 * Create a new Atlas from an imported AsepriteAtlas. Returns a promise
 * which resolves with an atlas once it's ready to use. Accepts a callback for
 * processing the data property on layers and slices, which defaults to treating
 * it as a string.
 *
 * @todo a gulp module that exports with the correct options to make this work
 *
 * @param {string} uri a URI for an atlas JSON file
 * @param {function} dataCallback custom function for transforming the "data" parameter
 * @return {Promise}
 */
Atlas.fromAsepriteAtlas = function fromAsepriteAtlas(uri, dataCallback) {
	dataCallback = dataCallback || function(a) {return a};
	/**
	 * uniq used below to filter unique tags, due to aseprite bug
	 * which creates duplicate entries
	 */
	//const uniq = (v, i, self) => self.indexOf(v) === i;
	return new Promise((resolve) => {
		if(cache[uri] !== undefined && cache[uri] instanceof Atlas) {
			resolve(cache[uri]);
		}
		else {
			console.log(_pxene_assets__WEBPACK_IMPORTED_MODULE_0__);
			_pxene_assets__WEBPACK_IMPORTED_MODULE_0__["requestAsset"](uri).then((asset) => {
				let aspr = asset.content;
				let width = aspr.meta.size.w;
				let height = aspr.meta.size.h;
				let numLayers = aspr.meta.layers.length;
				let numFrames = aspr.frames.length / numLayers;
				let layerHeight = height / numLayers;

				// Hash of layers by name to be added to the Atlas
				let layers = {}, layer;
				let layerNames = [];

				aspr.meta.layers.forEach((l, i) => {
					layerNames.push(l.name);
					if(layers[l.name] === undefined) {
						layer = {
							label:l.name.trim(),
							data:dataCallback(l.data?l.data:""),
							opacity:l.opacity,
							blendMode:l.blendMode,
							pos:_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(0, i * layerHeight),
							frames:[]
						}
						layers[layer.label] = Object.freeze(layer);
					}
				});

				// Hash of animations by name to be added to the Atlas
				let slices = {
					default:{
						label:"default",
						data:dataCallback(""),
						pos:_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(0, 0),
						dims:_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(width, height)
					}
				}, slice;

				aspr.meta.slices.forEach(s => {
					// as of v1.2.2, aseprite duplicates frame tags once per
					// layer but the data is always the same
					if(slices[s.name] === undefined) {
						slice = {
							label:s.name.trim(),
							data:dataCallback(s.data?s.data:""),
							pos:_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(s.keys[0].bounds.x, s.keys[0].bounds.y),
							dims:_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(s.keys[0].bounds.w, s.keys[0].bounds.h)
						}
						slices[slice.label] = Object.freeze(slice);
					}
				});

				// Hash of animations by name to be added to the Atlas
				let animations = {}, animation;

				aspr.meta.frameTags.forEach(f => {
					// as of v1.2.2, aseprite duplicates frame tags once per
					// layer but the data is always the same
					if(animations[f.name] === undefined) {
						 animation = {
							label:f.name.trim(),
							start:f.from,
							length:(f.to - f.from) + 1
						}
						animations[animation.label] = Object.freeze(animation);
					}
				});

				aspr.frames.forEach((f, i) => {
					let layer = layers[layerNames[~~(i / numFrames)]];
					let frame = {
						//label:f.name.trim(),
						pos:_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(f.frame.x, f.frame.y),
						dims:_nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(f.frame.w, f.frame.h)
					}
					layer.frames.push(Object.freeze(frame));
				});

				_pxene_assets__WEBPACK_IMPORTED_MODULE_0__["requestAsset"](aspr.meta.image).then((image) => {
					let atlas = new Atlas(
						Object.seal(layers),
						Object.seal(animations),
						Object.seal(slices)
					);
					atlas.init(image.content);
					cache[uri] = atlas;
					resolve(atlas);
				});
			});
		}
	});
}


/***/ }),

/***/ "../nphyx-pxene/src/graphics/BitmapFont.js":
/*!*************************************************!*\
  !*** ../nphyx-pxene/src/graphics/BitmapFont.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BitmapFont; });

/**
 * @module pxene.graphics.BitmapFont
 *
 * Contains the BitmapFont prototype.
 */

/**
 * A bitmap font is a fixed-size font contained in a single bitmap image, 
 * similar to a Sprite or Atlas. The BitmapFont object manages loading the font
 * and writing text to a canvas using the font.
 * @todo implement me
 */
function BitmapFont() {
	return this;
}

/**
 * Initializes the font with an image.
 * @param {Image} image a loaded Image element
 */
BitmapFont.prototype.init = function(image) {
}

/**
 * Draws text to canvas.
 * @param {string} text text contents to write
 * @param {CanvasContext2d} target canvas context to write to
 * @param {int} sx start x-coordinate
 * @param {int} sy start y-coordinate
 * @param {int} wl wrap length in pixels
 * @param {int} lh space between lines in pixels (optional, default 1)
 * @param {int}	ls letter spacing in pixels (optional, default 1) 
 */
BitmapFont.prototype.write = function(text, target, sx, sy, lw, ls = 1) {
}


/***/ }),

/***/ "../nphyx-pxene/src/graphics/CompositeSprite.js":
/*!******************************************************!*\
  !*** ../nphyx-pxene/src/graphics/CompositeSprite.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompositeSprite; });

/**
 * @module pxene.graphics.CompositeSprite
 *
 * Contains the CompositeSprite prototype.
 */
function CompositeSprite() {
	return this;
}

/**
 * Generates a composite sprite from the image list the sprite was loaded with.
 */
CompositeSprite.prototype.init = function init(sprites) {
	let canvas = document.createElement("canvas");
	canvas.width = this.width = sprites[0].width;
	canvas.height = this.height = sprites[0].height;
	this.columns = canvas.width / this.frameWidth;
	this.rows = canvas.height / this.frameHeight;
	let context = canvas.getContext("2d");
	for(let i = 0, len = sprites.length; i < len; ++i) {
		context.drawImage(sprites[i], 0, 0);
	}
	this.ready = true;
	this.spriteCanvas = canvas;
}


/***/ }),

/***/ "../nphyx-pxene/src/graphics/Sprite.js":
/*!*********************************************!*\
  !*** ../nphyx-pxene/src/graphics/Sprite.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sprite; });
/* harmony import */ var _pxene_assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pxene.assets */ "../nphyx-pxene/src/pxene.assets.js");


/**
 * @module pxene.graphics.Sprite
 *
 * Contains the Sprite prototype, as well as the internally managed sprite cache.
 */
/** a cache of already processed Sprites **/
let cache = [];

/**
 * An image subdivided into individual cells suitable for character animations. The
 * Sprite object manages data related to the location of individual animations, and
 * drawing of individual cells to an external canvas.
 */
function Sprite(frameCount, frameWidth, frameHeight, animations) {
	this.frameCount = frameCount;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
	this.animations = animations;
	this.context = undefined;
	this.flippedContext = undefined;
	this.ready = false;
	// below calculated during generateComposite
	this.width = 0; 
	this.height = 0;
	this.rows = 0;
	this.columns = 0;
	return Object.seal(this);
}

/**
 * Initializes the sprite with an image, copying it to the sprite's internal
 * canvas.
 * @param {Image} image a loaded Image element
 * @param {bool} flipped whether to generate a horizontally flipped version (default: true)
 */
Sprite.prototype.init = function init(image, flipped = true) {
	let canvas = document.createElement("canvas");
	canvas.width = this.width = image.width;
	canvas.height = this.height = image.height;
	this.columns = canvas.width / this.frameWidth;
	this.rows = canvas.height / this.frameHeight;
	let context = canvas.getContext("2d");
	context.drawImage(image, 0, 0);
	this.context = context;
	if(flipped) this.generateFlipped();
	this.ready = true;
}


/**
 * Generates a horizontally flipped version of the sprite with all the cells
 * at the same indexes. Normally run during {@link init} but can be called
 * manually if init was instructed not to create the flipped version.
 */
Sprite.prototype.generateFlipped = function generateFlipped() {
	let canvas = document.createElement("canvas");
	canvas.width = this.width;
	canvas.height = this.height;
	let context = canvas.getContext("2d");
	let row, col, sx, sy, dx, dy;
	let rows = this.rows;
	let cols = this.cols;
	let w = this.frameWidth;
	let h = this.frameHeight;

	context.scale(-1, 1);
	for(row = 0, rows = this.rows; row < rows; ++row) {
		for(col = 0, cols = this.columns; col < cols; ++col) {
			sx = col * w;
			dx = sx; //((cols - col) * w) - w;
			sy = dy = row * h;
			context.drawImage(this.context.canvas, sx, sy, w, h, -sx-w, dy, w, h);
		}
	}
	context.setTransform(1, 0, 0, 1, 0, 0);
	this.flippedContext = context;
}

/**
 * Draws a sprite frame from a given animation set, or the default animation
 * if the specified animation is incorrect.
 * @param {CanvasRenderingContext2D} dest the destination context
 * @param {string} name the name of the animation to draw
 * @param {int} frame the frame number to draw
 * @param {vec2} pos the top left corner from which to start drawing
 * @param {bool} flip horizontal flip toggle (to reverse facing of sprite)
 */
Sprite.prototype.draw = function draw(dest, name, frame, pos, flipped = false) {
	let animation = (
			this.animations[name]?
			this.animations[name]:
			this.animations.default);
	let frameNum = animation.startFrame + (frame % animation.length);
	let {frameWidth, frameHeight} = this;
	let canvas = flipped?this.flippedContext.canvas:this.context.canvas; 
	dest.drawImage(
		canvas,
		getX(this, frameNum), getY(this, frameNum),
		frameWidth, frameHeight,
		pos[0], pos[1], 
		frameWidth, frameHeight);
}

/**
 * Figures out the x offset for a frame based on the frame number and the sprite's parameters.
 */
function getX(sprite, frameNum) {
	return (frameNum % sprite.columns) * sprite.frameWidth;
}

/**
 * Figures out the x offset for a frame based on the frame number and the sprite's parameters.
 */
function getY(sprite, frameNum) {
	return Math.floor(frameNum / sprite.columns) * sprite.frameHeight;
}

/**
 * Create a new Sprite from an imported AsepriteAtlas. Returns a promise
 * which resolves with a sprite once it's ready to use.
 *
 * @param {string} uri a URI for an atlas JSON file
 * @return {Promise}
 */
Sprite.fromAsepriteAtlas = function fromAsepriteAtlas(uri) {
	return new Promise((resolve) => {
		if(cache[uri] !== undefined && cache[uri] instanceof Sprite) {
			resolve(cache[uri]);
		}
		else {
			console.log(_pxene_assets__WEBPACK_IMPORTED_MODULE_0__);
			_pxene_assets__WEBPACK_IMPORTED_MODULE_0__["requestAsset"](uri).then((asset) => {
				let aspr = asset.content;
				let animations = {
					default:{
					label:"default",
					startFrame:0,
					length:1
					}
				}

				if(aspr.meta.frameTags) aspr.meta.frameTags.forEach((anim) => {
					animations[anim.name.toLowerCase()] = {
						label:anim.name.toLowerCase(),
						startFrame:anim.from,
						length:(anim.to - anim.from) + 1
					};
				});

				_pxene_assets__WEBPACK_IMPORTED_MODULE_0__["requestAsset"](aspr.meta.image).then((image) => {
					let sprite = new Sprite(
						aspr.frames.length,
						aspr.frames[0].frame.w,
						aspr.frames[0].frame.h,
						animations
					);
					sprite.init(image.content);
					cache[uri] = sprite;
					resolve(sprite);
				});
			});
		}
	});
}


/***/ }),

/***/ "../nphyx-pxene/src/graphics/index.js":
/*!********************************************!*\
  !*** ../nphyx-pxene/src/graphics/index.js ***!
  \********************************************/
/*! exports provided: Sprite, CompositeSprite, Atlas, BitmapFont */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ "../nphyx-pxene/src/graphics/Sprite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return _Sprite__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _CompositeSprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CompositeSprite */ "../nphyx-pxene/src/graphics/CompositeSprite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompositeSprite", function() { return _CompositeSprite__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Atlas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Atlas */ "../nphyx-pxene/src/graphics/Atlas.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Atlas", function() { return _Atlas__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _BitmapFont__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BitmapFont */ "../nphyx-pxene/src/graphics/BitmapFont.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BitmapFont", function() { return _BitmapFont__WEBPACK_IMPORTED_MODULE_3__["default"]; });


/**
 * @module pxene.graphics
 *
 * Handles import, initialization and use of various specialized graphics
 * resources.
 */








/***/ }),

/***/ "../nphyx-pxene/src/pxene.BooleanArray.js":
/*!************************************************!*\
  !*** ../nphyx-pxene/src/pxene.BooleanArray.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BooleanArray; });

/**
 * @module pxene.BooleanArray
 */

/**
 * A BooleanArray is a TypedArray-like implementation for integer-indexed
 * boolean fields. It lets you store a set of boolean values in an arraybuffer,
 * which allows for better potential memory use in circumstances where you need
 * to set more than 2 booleans on a single data set\*, and potentially slightly
 * better performance (though probably not significantly).
 *
 * It's probably not incredibly useful in most circumstances, but when you have
 * an object with a bunch of boolean flags and you're going to make a bunch of
 * that kind of object it might come in handy.
 *
 * In short, if you don't know whether you need this you almost certainly don't.
 *
 * *_most sources indicate a boolean occupies 4 bytes of javascript memory due 
 * to storage and indexing overhead. In contrast, a BooleanArray can store up 
 * to 8 booleans in around the same amount of memory (and the proportionate 
 * savings grow the more booleans you have to store, since an arraybuffer
 * has a small fixed overhead)._
 */
const internalArray = Symbol();

function BooleanArray() {
	if((arguments[0] instanceof ArrayBuffer) && (typeof arguments[1] === "number") && (typeof arguments[2] === "number")) {
			this[internalArray] = new Uint8Array(arguments[0], arguments[1], Math.ceil(arguments[2]/8));
			this.length = arguments[2];
	}
	else if(typeof arguments[0] === "number") {
		this[internalArray] = new Uint8Array(Math.ceil(arguments[0]/8));
		this.length = arguments[0];
	}
	else throw Error("expected either length or buffer, offset, length as arguments");
	Object.freeze(this);
	return this;
}

/**
 * Gets a boolean by index.
 */
BooleanArray.prototype.get = function get(n) {
	if(n > this.length) return undefined;
	let i = ~~(n/8);
	let s = n % 8;
	return (this[internalArray][i] & (1 << s))?true:false;
}

/**
 * Sets an index to the truthiness of the given value.
 * @param {int} n index to set
 * @param {truthy|falsy} v value to set
 */
BooleanArray.prototype.set = function set(n, v) {
	if(n > this.length) return;
	let i = ~~(n/8);
	let s = n % 8;
	if(v) { // any kind of truthy is ok!
		this[internalArray][i] |= 1 << s;
	}
	else {
		this[internalArray][i] &= 255 ^ (1 << s);
	}
}

/**
 * Fill the array with a value.
 * @param {truthy|falsy} v
 */
BooleanArray.prototype.fill = function(v) {
	this[internalArray].fill(v?255:0);
}

/**
 * For useful compatibility with {@link pxene.ObjectPool}.
 */
BooleanArray.prototype.recycle = function() {
	this[internalArray].fill(0);
}

/**
 * Same as Array.forEach.
 * Accepts a callback function in the form of:
 * function(currentElement, currentIndex, SelfArray)
 *
 * @param {function} callback a callback function
 */
BooleanArray.prototype.forEach = function(callback) {
	let set = 0, externalIndex = 0, i = 0, k = 0, len, 
		  alen = this.length;
	for(len = this[internalArray].length; i < len; ++i) {
		externalIndex = i * 8;
		set = this[internalArray][i];
		for(k = 0; k < 8 && externalIndex + k < alen; ++k) {
			callback((set & (1 << k))?true:false, externalIndex + k, this);
		}
	}
}


/***/ }),

/***/ "../nphyx-pxene/src/pxene.CollisionMap.js":
/*!************************************************!*\
  !*** ../nphyx-pxene/src/pxene.CollisionMap.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CollisionMap; });

//import BooleanArray from "./pxene.BooleanArray";
const {floor} = Math;
/** mask a full rectangle **/
const MASK_16 = Math.pow(2, 16) - 1;
/** used to generate offset masks **/
const MASK_X = new Uint16Array(4);
/** used to generate offset masks **/
const MASK_Y = new Uint16Array(4);
/** mask offsets from the top **/
const MASK_TOP = new Uint16Array(4);
/** mask offsets from the bottom **/
const MASK_BOTTOM = new Uint16Array(4);
/** mask offsets from the right **/
const MASK_RIGHT = new Uint16Array(4);
/** mask offsets from the left **/
const MASK_LEFT = new Uint16Array(4);

/**
 * Precompute a bunch of useful masks for fast shape checks. Done this way
 * to illustrate/keep track of how they're constructed instead of just using
 * "magic numbers".
 */
MASK_X[0] = 1 | (1 << 4) | (1 << 8) | (1 << 12);
MASK_X[1] = MASK_X[0] << 1;
MASK_X[2] = MASK_X[0] << 2;
MASK_X[3] = MASK_X[0] << 3;
if((MASK_X[0] | MASK_X[1] | MASK_X[2] | MASK_X[3]) !== MASK_16) throw new Error("MASK_X is bad");

MASK_Y[0] = (1 << 4) - 1; 
MASK_Y[1] = MASK_Y[0] << 4;
MASK_Y[2] = MASK_Y[0] << 8;
MASK_Y[3] = MASK_Y[0] << 12;
if((MASK_Y[0] | MASK_Y[1] | MASK_Y[2] | MASK_Y[3]) !== MASK_16) throw new Error("MASK_Y is bad");

MASK_TOP[0] = 0;
MASK_TOP[1] = MASK_Y[3];
MASK_TOP[2] = MASK_TOP[1] | MASK_Y[2];
MASK_TOP[3] = MASK_TOP[2] | MASK_Y[1];

MASK_BOTTOM[0] = 0;
MASK_BOTTOM[1] = MASK_Y[0];
MASK_BOTTOM[2] = MASK_BOTTOM[1] | MASK_Y[1];
MASK_BOTTOM[3] = MASK_BOTTOM[2] | MASK_Y[2];

MASK_RIGHT[0] = 0;
MASK_RIGHT[1] = MASK_X[3];
MASK_RIGHT[2] = MASK_RIGHT[1] | MASK_X[2];
MASK_RIGHT[3] = MASK_RIGHT[2] | MASK_X[1];

MASK_LEFT[0] = 0;
MASK_LEFT[1] = MASK_X[0];
MASK_LEFT[2] = MASK_LEFT[1] | MASK_X[1];
MASK_LEFT[3] = MASK_LEFT[2] | MASK_X[2];


/**
 * @module pxene.CollisionMap
 *
 * Module containing {@link CollisionMap} prototype.
 */

const internal_array = Symbol();

/**
 * @constructor
 * A collision map is a 2d grid of boolean true/false values, meant to be
 * used for collision testing.
 *
 * @param {int} width the width of the grid
 * @param {int} height the height of the grid
 * @return {CollisionMap}
 */
function CollisionMap(width = 0, height = 0) {
	this.width = 0;
	this.height = 0;
	this.cellWidth = 0;
	this.cellHeight = 0;
	this.length = 0;
	if(width && height) this.init(width, height);
	return this;
}

/* helpful(?) constants */
/** pixel array index offset for the red channel **/
CollisionMap.CHANNEL_RED = 0;
/** pixel array index offset for the green channel **/
CollisionMap.CHANNEL_GREEN = 1;
/** pixel array index offset for the blue channel **/
CollisionMap.CHANNEL_BLUE = 2;
/** pixel array index offset for the alpha channel **/
CollisionMap.CHANNEL_ALPHA = 3;

/**
 * Creates a per-pixel collision map from a Canvas.
 * @param {Canvas} canvas the canvas to read pixel data from
 * @param {int} threshold the threshold above which a pixel will be considered solid (default 0) 
 * @param {int} channel the channel to check against (default {@link CollisionMap.CHANNEL_ALPHA}) 
 * @return {CollisionMap} 
 *
 * @note internal canvas pixel data stores alpha in a range of 0 to 255, so
 * convert from [0 - 1] to [0 - 255] if providing a threshold 
 */
CollisionMap.fromCanvasPixels = function(canvas, threshold = 0, channel = CollisionMap.CHANNEL_ALPHA) {
	console.time("new CollisionMap");
	let map = new CollisionMap(canvas.width, canvas.height);
	console.timeEnd("new CollisionMap");
	let pixels;
	let context = canvas.getContext("2d");
	console.time("fromCanvasPixels loop");
	let once = true;
	for(let y = 0, h = canvas.height; y < h; y += 100) {
		// go 100 rows at time with the image data for sanity/memory use
		try {
			if(once) console.time("getImageData");
			pixels = context.getImageData(0, y, canvas.width, 100).data;
			if(once) console.timeEnd("getImageData");
		}
		catch(e) {
			throw new Error("CollisionData:failed to get image data :(");
		}
		if(once) console.time("loop map.set");
		for(let i = 0, len = pixels.length; i < len; i+=4) {
			let mx = (i / 4) % canvas.width, my = y + (~~((i / 4) / canvas.width));
			if(pixels[i+channel] > threshold) map.set(mx, my, true);
		}
		if(once) console.timeEnd("loop map.set");
		once = false;
	}
	console.timeEnd("fromCanvasPixels loop");
	return map;
}

/**
 * Returns the bit for the given set of coordinates.
 */
const cellBit = CollisionMap.cellBit = function cellBit(x, y) {
	return 1 << ((x % 4) + ((y % 4)*4));
}

/**
 * Returns the mask which excludes the given bit coordinate from the cell.
 */
const cellMask = CollisionMap.cellMask = function cellMask(x, y) {
	return invertMask(cellBit(x, y));
}

const cellIndex = CollisionMap.cellIndex = function cellIndex(x, y, w) {
	return (floor(y/4) * floor(w/4)) + floor(x/4) 
}


/**
 * Reinitializes the map with a new width and height.
 * @param {int} width
 * @param {int} height
 * @return {self}
 */
CollisionMap.prototype.init = function(width, height) {
	this.width = ~~width;
	if(this.width % 4) this.width += (4 - (~~width % 4)); // round to nearest 4
	this.height = ~~height;
	if(this.height % 4) this.height += (4 - (~~height % 4)); // round to nearest 4
	this.cellWidth = this.width / 4;
	this.cellHeight = this.height / 4;
	let newlen = (this.cellWidth * this.cellHeight);
	if(this.length !== newlen) {
		this.length = newlen;
		if(this.length) {
			this[internal_array] = new Uint16Array(this.length);
		}
	}
	else if(this[internal_array]) this[internal_array].fill(0);
	return this;
}

CollisionMap.prototype.getCell = function getCell(x, y) {
	return this[internal_array][cellIndex(x, y, this.width)];
}

CollisionMap.prototype.get = function get(x, y) {
	return (this.getCell(x, y) & cellBit(x, y))?1:0;
}

CollisionMap.prototype.set = function set(x, y, v) {
	if(v) this[internal_array][cellIndex(x, y, this.width)] |= cellBit(x, y);
	else this[internal_array][cellIndex(x, y, this.width)] &= cellMask(x, y);
}

/**
 * Checks a rectangular area of the CollisionMap, returning a count of solid
 * grid sections within.
 *
 * @param {int} x start x coordinate
 * @param {int} y start y coordinate
 * @param {int} w width of rectangle
 * @param {int} h height of rectangle 
 * @return {int}
 */
CollisionMap.prototype.checkRect = function checkRect(x, y, w, h) {
	let offsetX = x % 4;
	let offsetY = y % 4;
	let cellWidth = Math.ceil((offsetX + w) / 4);
	let cellHeight = Math.ceil((offsetY + h) / 4);
	let maskX, maskY;
	for(let cellY = 0; cellY < cellHeight; ++cellY) {
		if(cellY === 0) maskY = MASK_TOP[offsetY];
		else if(cellY === (cellHeight - 1)) maskY = MASK_BOTTOM[offsetY];
		else maskY = MASK_16;
		for(let cellX = 0; cellX < cellWidth; ++cellX) {
			if(cellX === 0) maskX = MASK_LEFT[offsetX];
			else if(cellX === (cellWidth - 1)) maskX = MASK_RIGHT[offsetX];
			else maskX = MASK_16;
			if(maskX & maskY & this[internal_array][(cellY * this.cellWidth) + cellX]) return 1;
		}
	}

	return 0;
}

/**
 * Intersects two CollisionMaps, returning a sum of the count of overlapping
 * solid areas.
 * @param {CollisionMap} target the map to intersect with
 * @param {int} sx start x of this map
 * @param {int} sy start y of this map
 * @param {int} tx start x of the target map
 * @param {int} ty start y of the target map
 * @param {int} w width of area to collide
 * @param {int} h height of area to collide
 * @return {int}
 * @todo examine whether fast intersection by blocks of 8 sectors is doable
 */
CollisionMap.prototype.intersect = function intersect(target, sx, sy, tx, ty, w, h) {
	let x, y, sum = 0;
	for(y = 0; y < h; ++y) {
		for(x = 0; x < h; ++x) {
			sum += (this.get(sx+x, sy+y) && target.get(tx+x, ty+y))?1:0;	
		}
	}
	return sum;
}

function invertMask(mask) {
	return MASK_16 ^ mask;
}

// export constants for debugging
CollisionMap.MASK_X = MASK_X;
CollisionMap.MASK_Y = MASK_Y;
CollisionMap.MASK_TOP = MASK_TOP;
CollisionMap.MASK_BOTTOM = MASK_BOTTOM;
CollisionMap.MASK_LEFT = MASK_LEFT;
CollisionMap.MASK_RIGHT = MASK_RIGHT;


/***/ }),

/***/ "../nphyx-pxene/src/pxene.ObjectPool.js":
/*!**********************************************!*\
  !*** ../nphyx-pxene/src/pxene.ObjectPool.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ObjectPool; });

/**
 * @module ObjectPool
 * Simple auto-expanding object pool.
 */

/**
 * A simple object pool, which expands itself automatically when needed but
 * prefers to recycle objects when available.  *
 * The factory function passed as a parameter should generate uniform objects, 
 * even though the factory pattern suggests a factory can produce made-to-purpose 
 * objects. The point of accepting a factory rather than a constructor is only to 
 * support programming styles that prefer not to use constructors or classes.
 *
 * Objects created by the pool will be [sealed]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal}
 * to enforce the uniformity requirement externally.
 *
 * Objects in the pool may support a recyle() method, which cleans up an object
 * and readies it for reuse, as well as an init() function, which allows pass-
 * through support for {@link ObjectPool.prototype.allocate()} parameters.
 *
 * @param {function} factory a function that returns one pool object
 */

function ObjectPool(factory) {
	const pool = [];
	const freed = [];
	var open = true;

	/**
	 * Allocate an item from the pool (either recycled or new as available).
	 * Parameters are passed through to the init() method of the pool object
	 * if it has one.
	 * @throws Error if the pool is closed and there are no free objects
	 */
	this.allocate = function allocate(...args) {
		let obj;
		if(freed.length) obj = freed.pop();
		else if(open) {
			obj = Object.seal(factory());
			pool.push(obj);
		}
		else throw new Error("pool is closed");
		if(typeof(obj.init) === "function") obj.init.apply(obj, args);
		return obj;
	}

	/**
	 * Free an object for reuse. If the object has a recycle() method, it will
	 * be called during this operation.
	 */
	this.free = function free(obj) {
		if(pool.indexOf(obj) > -1) {
			if(typeof(obj.recycle) === "function") obj.recycle();
			freed.push(obj);
		}
		else throw new Error("free called with non-pool-member");
	}

	/**
	 * Pre-allocate a bunch of objects if you want to have some available
	 * ahead of time.
	 */
	this.preAllocate = function(n) {
		if(!open) throw new Error("pool is closed");
		let obj;
		for(let i = 0; i < n; ++i) {
			obj = factory();
			pool.push(obj);
			freed.push(obj);
		}
	}

	/**
	 * Closes the pool, so that no new objects will be created.
	 */
	this.close = function() {
		open = false;
	}

	/**
	 * Opens the pool if closed.
	 */
	this.open = function() {
		open = true;
	}

	Object.defineProperties(this, {
		length:{get:() => pool.length},
		available:{get:() => freed.length},
		used:{get:() => pool.length - freed.length}
	});

	return Object.freeze(this);
}


/***/ }),

/***/ "../nphyx-pxene/src/pxene.assets.js":
/*!******************************************!*\
  !*** ../nphyx-pxene/src/pxene.assets.js ***!
  \******************************************/
/*! exports provided: requestAsset, requestAssetList, enqueueAsset, enqueueAssetList, processQueue, setGlobalAssetPrefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAsset", function() { return requestAsset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAssetList", function() { return requestAssetList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueueAsset", function() { return enqueueAsset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueueAssetList", function() { return enqueueAssetList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processQueue", function() { return processQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGlobalAssetPrefix", function() { return setGlobalAssetPrefix; });
/* harmony import */ var _pxene_assets_mimeTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pxene.assets.mimeTypes */ "../nphyx-pxene/src/pxene.assets.mimeTypes.js");



/**
 * @Module pxene.assets
 * Handles loading, pre-processing, and caching of remote assets.
 */
/** @const {Array} list of deferred asset URIs **/
const enqueuedURIs = [];
/** @const {Array} list of currently fetching URIs **/
const fetchingURIs = [];
/** @const {Array} list of completed URIs which should be in the cache **/
const completedURIs = [];
/** @const {Object} a hash of uri->{@link Asset} **/
const cache = {};
/** @const {Object} a hash of handlers by mime type **/

let globalAssetPrefix = "";
let fetching = 0;

/**
 * Safely attempt to move an item from one array to another.
 * @return {bool} true if an item was found or moved, otherwise false
 */
function moveItem(item, oldList, newList) {
	let i = oldList.indexOf(item);
	if(i !== -1) {
		newList.push(oldList.splice(i, 1));
		return true;
	}
	else return false;
}

/**
 * An object representing a loaded asset.
 * @property uri the uri originally requested for the object (not including global prefixes, domain names, etc)
 * @property {Object} content the processed response, which may be an Image, a string, an SVG, a decoded JSON object, or any other supported value type
 * @property {String} type
 */
function Asset(uri, content, type) {
	this.uri = uri;
	this.content = content;
	this.type = type;
	return this;
}

/**
 * Fetches an asset from a remote source.
 * @param {String} uri
 */
function fetchAsset(uri) {
	if(fetchingURIs.indexOf(uri) === -1 && completedURIs.indexOf(uri) === -1) {
		fetching++;
		// add to the fetching list, moving it from enqueuedURIs if needed
		if(!moveItem(uri, enqueuedURIs, fetchingURIs)) fetchingURIs.push(uri);
		return fetch(globalAssetPrefix+uri).then(makeProcessFetchResponse(uri))	
	}
	else if(fetchingURIs.indexOf(uri) >= 0) {
		return new Promise((resolve) => {
			// @todo event based implementation of this ridiculous shit right here
			let count = 0;
			let interval = setInterval(() => {
				if(cache[uri] !== undefined) {
					resolve(cache[uri]);
					clearInterval(interval);
				}
				else count++;
				if(count > 100) {
					clearInterval(interval);
					throw Error("stuck in fetching status way too long");
				}
			}, 250);
		});
	}
	else if(completedURIs.indexOf(uri) >= 0) {
		return Promise.resolve(cache[uri]);
	}
}


/**
 * Makes a processFetchResponse binding to ensure the original uri stays in scope.
 */
function makeProcessFetchResponse(uri) {
	return processFetchResponse.bind(null, uri);
}

/**
 * Processes a response from a fetch request.
 */
function processFetchResponse(uri, response) {
	return new Promise((resolve, reject) => {
		if(response.ok) {
			let type = response.headers.get("Content-type");
			return _pxene_assets_mimeTypes__WEBPACK_IMPORTED_MODULE_0__["getHandler"](type)(response)
				.then((content) => storeAsset(uri, content, type, resolve));
		}
		else reject("failed to fetch asset "+uri);
	});
}

/**
 * Stores an asset in the cache.
 * @param {String} uri the originally requested URI
 * @param {mixed} content the processed response content
 * @param {String} type the mime type of the response
 * @param {function} resolve promise callback for the original fetch request
 */
function storeAsset(uri, content, type, resolve) {
	let item = new Asset(uri, content, type); 
	cache[uri] = item;
	fetching--;
	moveItem(uri, fetchingURIs, completedURIs);
	resolve(item);
}

/**
 * Gets an asset from the cache if available, or else fetches it from a remote source.
 * Returns a promise which resolves with the {@link Asset} requested.
 * @param {String} uri 
 * @return Promise
 */
function requestAsset(uri) {
	let item = cache[uri];
	if(item === undefined) return fetchAsset(uri);
	else return Promise.resolve(item);
}

function requestAssetList(list) {
	return Promise.all(list.map((item) => requestAsset(item)));
}

/**
 * Enqueues an asset to be fetched. Enqueued assets are fetched later when processQueue is called.
 */
function enqueueAsset(uri) {
	if(enqueuedURIs.indexOf(uri) === -1 && fetchingURIs.indexOf(uri) === -1 && cache[uri] === undefined) enqueuedURIs.push(uri);
}

/**
 * Enqueues a list of assets to be fetched layer during a processQueue() call.
 * @param {Array} list array of URIs to load
 * @returns {Promise|undefined}
 */
function enqueueAssetList(list) {
	list.forEach(item => enqueueAsset(item)); 
}

/**
 * Process any deferred items in the queue.
 * @return {Promise} a promise that resolves when all the items are fetched with an array of all the fetched items
 */
function processQueue() {
	return Promise.all(enqueuedURIs.map((uri) => fetchAsset(uri)));
}

/**
 * Sets the globalAssetPrefix, which is prepended to all fetch URIs.
 * @param {string} prefix a string representing a path or filename prefix
 */
function setGlobalAssetPrefix(prefix) {
	globalAssetPrefix = prefix;
}


/***/ }),

/***/ "../nphyx-pxene/src/pxene.assets.mimeTypes.js":
/*!****************************************************!*\
  !*** ../nphyx-pxene/src/pxene.assets.mimeTypes.js ***!
  \****************************************************/
/*! exports provided: addHandler, getHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addHandler", function() { return addHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHandler", function() { return getHandler; });
/**
 * @module pxene.assets.mimeTypes
 * Manages the collection of mime type handlers used by the {@link pxene.assets} module to process
 * fetched assets.
 */
const mimeHandlers = {
	"default":(response) => new Promise(resolve => response.blob().then(blob => resolve(blob)))
};

/**
 * Adds a specialized handler for a given mime type. Can be used as a plugin system or to handle
 * specialized asset types. See {@link mimeTimeHandler} for information about the callback.
 *
 * @Example
 * ```javascript
 * addMimeHandler("some-type/subtype", fn(originalUrl, response, resolve) {
*   res.text().then(text => resolve(text, originalUrl, type));
 * });
 * @param {string} mimeType
 * @param {mimeTypeHandler} cb callback
 */
function addHandler(mimeType, cb) {
	if(mimeHandlers[mimeType] === undefined) mimeHandlers[mimeType] = cb;
	else throw new Error("tried to add a mimeType but there's already a handler for it");
}

/**
 * Looks up a mime type handler, returning the default handler if none is found.
 */
function getHandler(mimeType) {
	if(typeof mimeHandlers[mimeType] === "function") return mimeHandlers[mimeType];
	else return mimeHandlers.default;
}

/**
 * A mime type handler callback function. This is a sort of middleware that does some preprocessing
 * on certain asset types before passing them on to the storage system.
 * @callback mimeTypeHandler
 * @param {Response} the Response object returned from a fetch()
 * @return {Promise} which resolves() with the final form of the asset to be stored
 */

/**
 * A mime handler for image types.
 */
function mimeTypeHandlerImages(response) {
	return new Promise((resolve) => {
		response.blob().then((blob) => {
			let img = document.createElement("img");
			img.addEventListener("load", () => resolve(img));
			img.src = URL.createObjectURL(blob);
		});
	});
}

/**
 * A mime type handler for plain text.
 */
function mimeTypeHandlerText(response) {
	return new Promise((resolve) => response.text().then(text => resolve(text)));
}

/**
 * A mime type handler for json objects.
 */
function mimeTypeHandlerJSON(response) {
	return new Promise((resolve) => response.json().then(json => resolve(json)));
}

addHandler("image/jpeg", mimeTypeHandlerImages);
addHandler("image/gif",  mimeTypeHandlerImages);
addHandler("image/png",  mimeTypeHandlerImages);
addHandler("text/html", mimeTypeHandlerText);
addHandler("text/plain", mimeTypeHandlerText);
addHandler("application/json", mimeTypeHandlerJSON);


/***/ }),

/***/ "../nphyx-pxene/src/pxene.constants.js":
/*!*********************************************!*\
  !*** ../nphyx-pxene/src/pxene.constants.js ***!
  \*********************************************/
/*! exports provided: TARGET_FPS, GRAVITY, GLOBAL_DRAG, DEBUG, VALIDATE_VECTORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGET_FPS", function() { return TARGET_FPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRAVITY", function() { return GRAVITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL_DRAG", function() { return GLOBAL_DRAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBUG", function() { return DEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_VECTORS", function() { return VALIDATE_VECTORS; });
const TARGET_FPS = 30;
const GRAVITY = 6.67408e-8;
const GLOBAL_DRAG = 0.1;

// general debug switch
const DEBUG = true;
// toggles vector validation in various functions that tend to produce
// infinite or NaN results; when enabled, vectors are checked and if invalid
// the function is rerun step by step and logged to identify trouble spots
const VALIDATE_VECTORS = DEBUG || true;


/***/ }),

/***/ "../nphyx-pxene/src/pxene.display.buffers.js":
/*!***************************************************!*\
  !*** ../nphyx-pxene/src/pxene.display.buffers.js ***!
  \***************************************************/
/*! exports provided: SCALE_STRETCH, SCALE_KEEP_ASPECT, SCALE_NONE, SCALE_CROP, DrawBuffer, CompositeBuffer, composite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCALE_STRETCH", function() { return SCALE_STRETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCALE_KEEP_ASPECT", function() { return SCALE_KEEP_ASPECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCALE_NONE", function() { return SCALE_NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCALE_CROP", function() { return SCALE_CROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawBuffer", function() { return DrawBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompositeBuffer", function() { return CompositeBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "composite", function() { return composite; });

/**
 * An offscreen draw buffer, which will be drawn to a composite buffer for display
 * onscreen.
 * @param {string} compositeMethod globalCompositeMethod to use when compositing
 * @param {bool} scaleMethod method for scaling (see SCALE_* constants)
 * @param {string} context [2d|webGL]
 * @return {DrawBuffer}
 */
const {min} = Math;
const SCALE_STRETCH = 0;
const SCALE_KEEP_ASPECT = 1;
const SCALE_NONE = 2;
const SCALE_CROP = 3;
function DrawBuffer(compositeMethod = "source-over", scaleMethod = SCALE_STRETCH, context = "2d") {
	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext(context);
	this.offsetX = 0;
	this.offsetY = 0;
	this.compositeMethod = compositeMethod;
	this.scaleMethod = scaleMethod;
	Object.defineProperties(this, {
		width:{get:() => this.canvas.width, set:(v) => this.canvas.width = v},
		height:{get:() => this.canvas.height, set:(v) => this.canvas.height = v},
	});
	return this;
}

/**
 * A canvas to draw a BufferGroup into.
 * @param {HTMLElement} container the containing element for the canvas
 * @return {CompositeBuffer}
 */
function CompositeBuffer(container) {
	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.container = container;
	this.container.appendChild(this.canvas);
	Object.defineProperties(this, {
		width:{get:() => this.canvas.width, set:(v) => this.canvas.width = v},
		height:{get:() => this.canvas.height, set:(v) => this.canvas.height = v},
	});
	return this;
}

const composite = (function() {
	let i, len, sourceBuffer, targetContext;
	let sw, sh, sx, sy, dw, dh, dx, dy;
	return function composite(sourceBuffers, targetBuffer, displayProps) {
		targetContext = targetBuffer.context;
		// if using a pixel ratio, assume it's for pixel art and don't screw it up
		if(displayProps.pixelRatio !== 1) targetContext.imageSmoothingEnabled = false;
		for(i = 0, len = sourceBuffers.length; i < len; ++i) {
			sourceBuffer = sourceBuffers[i];
			if(targetContext.globalCompositeOperation !== sourceBuffer.compositeMethod)
				targetContext.globalCompositeOperation = sourceBuffer.compositeMethod;
			switch(sourceBuffer.scaleMethod) {
				case SCALE_STRETCH:
					sx = 0; sy = 0; sw = sourceBuffer.width; sh = sourceBuffer.height;
					dx = sourceBuffer.offsetX; dy = sourceBuffer.offsetY; 
					dw = targetBuffer.width; dh = targetBuffer.height;
				break;
				case SCALE_KEEP_ASPECT:
					sx = 0; sy = 0; sw = sourceBuffer.width; sh = sourceBuffer.height;
					dx = sourceBuffer.offsetX; dy = sourceBuffer.offsetY; 
					dw = targetBuffer.width; dh = targetBuffer.height;
					if(displayProps.orientation) {
						sw = targetBuffer.width;
						sh = min(targetBuffer.height, sourceBuffer.height);
						dw = min(targetBuffer.width, sourceBuffer.width);
						dh = targetBuffer.height;
					}
					else {
						sw = min(targetBuffer.width, sourceBuffer.width);
						sh = targetBuffer.height;
						dw = targetBuffer.width;
						dh = min(targetBuffer.height, sourceBuffer.height);
					}
				break;
				case SCALE_CROP:
					sx = 0; sy = 0; 
					sw = min(targetBuffer.width - sourceBuffer.offsetX, sourceBuffer.width);
					sh = min(targetBuffer.height - sourceBuffer.offsetY, sourceBuffer.height);
					dx = sourceBuffer.offsetX; dy = sourceBuffer.offsetY; 
					dw = min(targetBuffer.width - sourceBuffer.offsetX, sourceBuffer.width);
					dh = min(targetBuffer.height - sourceBuffer.offsetY, sourceBuffer.height);
				break;
				default: // SCALE_NONE
					sx = 0; sy = 0; sw = sourceBuffer.width; sh = sourceBuffer.height;
					dx = sourceBuffer.offsetX; dy = sourceBuffer.offsetY; 
					dw = sourceBuffer.width*displayProps.pixelRatio; dh = sourceBuffer.height*displayProps.pixelRatio;
				break;
			}
			targetContext.drawImage(sourceBuffer.canvas, sx, sy, sw, sh, dx, dy, dw, dh); 
		}
	}
})();


/***/ }),

/***/ "../nphyx-pxene/src/pxene.display.js":
/*!*******************************************!*\
  !*** ../nphyx-pxene/src/pxene.display.js ***!
  \*******************************************/
/*! exports provided: buffers, ui, util, buffersByLabel, evenNumber, props, timing, updateCompositeOperation, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buffersByLabel", function() { return buffersByLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evenNumber", function() { return evenNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "props", function() { return props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timing", function() { return timing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCompositeOperation", function() { return updateCompositeOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _pxene_display_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pxene.display.util.js */ "../nphyx-pxene/src/pxene.display.util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _pxene_display_util_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _pxene_display_buffers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pxene.display.buffers */ "../nphyx-pxene/src/pxene.display.buffers.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "buffers", function() { return _pxene_display_buffers__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _pxene_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pxene.events */ "../nphyx-pxene/src/pxene.events.js");
/* harmony import */ var _pxene_display_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pxene.display.ui */ "../nphyx-pxene/src/pxene.display.ui.js");
/* harmony import */ var _pxene_display_ui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_pxene_display_ui__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ui", function() { return _pxene_display_ui__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _pxene_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pxene.constants */ "../nphyx-pxene/src/pxene.constants.js");







//import {evenNumber} from "./pxene.util";
let {min, max} = Math;
let AUTO_FULLSCREEN = false;

let startTime; // time game started
let interval = 0;
let elapsed = 0;
let frameCount = 0; // running total of drawn frames
let animating = false; // whether the game is currently running animation loop
let container; // display container 
let fullscreen = false; // whether the game is in fullscreen mode
let lastFrame = 0;
let frameCallback;
const bufferList = [];
const buffersByLabel = {};
let compositeBuffer;

/**
 * Round to nearest even number.
 */
function evenNumber(n) {
return n >> 1 << 1;
}

const props = {
	width:0,
	height:0,
	pixelRatio:1,
	orientation:0,
	aspect:0,
	minDimension:0,
	maxDimension:0,
	events:new _pxene_events__WEBPACK_IMPORTED_MODULE_2__["Events"]()
}

const timing = {
	get frameCount() {return frameCount},
	get startTime() {return startTime},
	get lastFrame() {return lastFrame},
	get elapsed() {return elapsed},
	get interval() {return interval}
}

/**
 * Using this checks and avoids altering the canvas context state machine if unnecessary,
 * which theoretically saves a little time.
 */
function updateCompositeOperation(ctx, op) {
	if(ctx.globalCompositeOperation !== op) ctx.globalCompositeOperation = op;
}

/**
 * Toggles fullscreen on.
 * Code from Mozilla Developer Network.
 */
function toggleFullScreen() {
	if(fullscreen) return;
	fullscreen = true;
  if(!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && 
			!document.webkitFullscreenElement && 
			!document.msFullscreenElement) {  // current working methods
    if(document.documentElement.requestFullscreen)
			document.documentElement.requestFullscreen();
    else if (document.documentElement.msRequestFullscreen)
      document.documentElement.msRequestFullscreen();
    else if (document.documentElement.mozRequestFullScreen)
      document.documentElement.mozRequestFullScreen();
    else if (document.documentElement.webkitRequestFullscreen)
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		props.events.fire("fullscreen-on");
  } 
	else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
		props.events.fire("fullscreen-off");
  }
}

/**
 * Turns fullscreen off.
 */
function fullscreenOff(ev) {
	ev.preventDefault();
	if(document.webkitIsFullScreen || 
	   document.mozIsFullScreen || 
		 document.msIsFullScreen) fullscreen = true;
	else fullscreen = false;
	return false;
}

/**
 * Updates screen ratio.
 */
function updateProperties() {
	compositeBuffer.width  = props.width  = evenNumber(container.clientWidth);
	compositeBuffer.height = props.height = evenNumber(container.clientHeight);
	props.orientation = props.width > props.height?0:1;
	props.minDimension = min(props.width, props.height);
	props.maxDimension = max(props.width, props.height);
	// @todo review this, it probably needs better handling
	bufferList.forEach(buffer => {
		buffer.width = ~~(props.width/props.pixelRatio);
		buffer.height = ~~(props.height/props.pixelRatio);
	});
	props.events.fire("resize");
}


/**
 * Main animation loop.
 */
function animate() {
	requestAnimationFrame(animate);
	try {
		let now = Date.now();
			elapsed = now - lastFrame;
			if(elapsed > interval) {
				lastFrame = now - (elapsed % interval);
				frameCount++;
				frameCallback(buffersByLabel);
				_pxene_display_buffers__WEBPACK_IMPORTED_MODULE_1__["composite"](bufferList, compositeBuffer, props);
			}
		}
	catch(e) {
		console.error("Crappy uncaught error in animation loop is crappy");
	}
}

function initBuffers(bufferDescriptions) {
	for(let i = 0, len = bufferDescriptions.length; i < len; ++i) {
		let bufData = bufferDescriptions[i];
		let buffer = new _pxene_display_buffers__WEBPACK_IMPORTED_MODULE_1__["DrawBuffer"](bufData.compositeMethod, bufData.scaleMethod);
		buffer.id = bufData.label;
		bufferList.push(buffer);
		buffersByLabel[bufData.label] = buffer;
	}
}

/**
 * Initializes game environment.
 */
function init(config) {
	props.pixelRatio = config.pixelRatio || props.pixelRatio;
	container = document.querySelector(config.container);
	container.classList.add("2d");
	compositeBuffer = new _pxene_display_buffers__WEBPACK_IMPORTED_MODULE_1__["CompositeBuffer"](container);
	container.width = compositeBuffer.width  = evenNumber(container.clientWidth);
	container.height = compositeBuffer.height = evenNumber(container.clientHeight);
	initBuffers(config.bufferDescriptions);
	updateProperties();
	frameCallback = config.frameCallback;
	window.addEventListener("resize", updateProperties);
	AUTO_FULLSCREEN = config.fullscreen;
	if(AUTO_FULLSCREEN) {
		container.addEventListener("click", toggleFullScreen);
		document.addEventListener("fullscreenchange", fullscreenOff);
		document.addEventListener("mozfullscreenchange", fullscreenOff);
		document.addEventListener("msfullscreenchange", fullscreenOff);
		document.addEventListener("webkitfullscreenchange", fullscreenOff);
	}
	startTime = Date.now();
	lastFrame = startTime;
	interval = 1000 / _pxene_constants__WEBPACK_IMPORTED_MODULE_4__["TARGET_FPS"];
	if(!animating) requestAnimationFrame(animate);
	animating = true;
}


/***/ }),

/***/ "../nphyx-pxene/src/pxene.display.ui.js":
/*!**********************************************!*\
  !*** ../nphyx-pxene/src/pxene.display.ui.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
//import {drawCircle} from "./pxene.display";
import {DEBUG} from "./pxene.constants";
import * as controls from "./controls";
const {max} = Math;

let ctx, uiBuffer;
let displayProps;

/**
 * Creates debug markers on screen to show the center, top, left, bottom, right, topleft
 * and topright extremes of the main game area.
 *
const debugMarkers = (function() {
	let w, h, wh, hh;
	return function debugMarkers() {
		w = displayProps.width;
		h = displayProps.height;
		wh = w/2; 
		hh = h/2;
		drawCircle(ctx,  0,  0, 4, "yellow", 1, "white");
		drawCircle(ctx, wh,  0, 4, "orange", 1, "white");
		drawCircle(ctx,  w,  0, 4, "red", 1, "white");
		drawCircle(ctx,  0, hh, 4, "white", 1, "white");
		drawCircle(ctx, wh, hh, 4, "gray", 1, "white");
		drawCircle(ctx,  w, hh, 4, "black", 1, "white");
		drawCircle(ctx,  0,  h, 4, "blue", 1, "white");
		drawCircle(ctx, wh,  h, 4, "cyan", 1, "white");
		drawCircle(ctx,  w,  h, 4, "green", 1, "white");
	}
})();

/**
 * Draws an edge button.
 *
function drawEdgeButton(ctx, x, y, w, h) {
	let halfButtonWidth = w*0.5;
	let buttonHeight = h;
	let cpXScale = w*0.122;
	let beginX = x-halfButtonWidth;
	let beginY = y;
	let topX = x;
	let topY = y-buttonHeight;
	let endX = x+halfButtonWidth;
	let endY = y;
	let aCPX = beginX + cpXScale;
	let aCPY = beginY - cpXScale;
	let bCPX = beginX + cpXScale;
	let bCPY = topY;
	let cCPX = endX - cpXScale;
	let cCPY = topY;
	let dCPX = endX - cpXScale;
	let dCPY = endY - cpXScale;
	let color = "rgba(255,255,255,0.1)";

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
 *
export function draw() {
	let w = displayProps.width;
	let h = displayProps.height;
	let bw = max(100, w*0.1);
	let bh = max(47,  w*0.047);
	let {move, down} = controls.pointer;
	ctx.clearRect(0, 0, w, h);
	drawEdgeButton(ctx, w*0.5, h, bw, bh);
	drawEdgeButton(ctx, w*0.333, h, bw, bh); 
	drawEdgeButton(ctx, w*0.666, h, bw, bh);  
	drawCircle(ctx, move[0], move[1], 5, "white");
	if(controls.buttons[0]) {
		ctx.beginPath();
		ctx.moveTo(down[0], down[1]);
		ctx.lineTo(move[0], move[1]);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}
	if(DEBUG) debugMarkers();
}

/**
 * Initializes the UI submodule.
 * @param {DrawBuffer} buffer
 *
export function init(buffer, props) {
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
*/


/***/ }),

/***/ "../nphyx-pxene/src/pxene.display.util.js":
/*!************************************************!*\
  !*** ../nphyx-pxene/src/pxene.display.util.js ***!
  \************************************************/
/*! exports provided: drawCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawCircle", function() { return drawCircle; });



/**
 * Draws a colored circle.
 */
function drawCircle(ctx, x, y, size, fillStyle, lineWidth = 0, strokeStyle = undefined) {
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


/***/ }),

/***/ "../nphyx-pxene/src/pxene.events.js":
/*!******************************************!*\
  !*** ../nphyx-pxene/src/pxene.events.js ***!
  \******************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });


/**
 * *Very* simple event object.
 */
function Events() {
	this.queue = {};
	return this;
}

Events.prototype.on = function(event, callback) {
	if(this.queue[event] === undefined) this.queue[event] = [];
	this.queue[event].push(callback);
}

Events.prototype.fire = (function() {
	let i, len;
	return function(event, params) {
		if(this.queue[event] === undefined) return;
		for(i = 0, len = this.queue[event].length; i < len; ++i) {
			this.queue[event][i].call(params);
		}
	}
})();


/***/ }),

/***/ "../nphyx-pxene/src/pxene.util.js":
/*!****************************************!*\
  !*** ../nphyx-pxene/src/pxene.util.js ***!
  \****************************************/
/*! exports provided: evenNumber, tan_vec, perpdot, floor_vec, mut_floor_vec, ceil_vec, mut_ceil_vec, round_vec, mut_round_vec, limitVecMut, validate, gravitate, accelerate, drag, offscreen, screenSpace, screenSpaceVec, gameSpaceVec, flatten */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evenNumber", function() { return evenNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tan_vec", function() { return tan_vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perpdot", function() { return perpdot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor_vec", function() { return floor_vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_floor_vec", function() { return mut_floor_vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil_vec", function() { return ceil_vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_ceil_vec", function() { return mut_ceil_vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round_vec", function() { return round_vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_round_vec", function() { return mut_round_vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitVecMut", function() { return limitVecMut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gravitate", function() { return gravitate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "accelerate", function() { return accelerate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drag", function() { return drag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offscreen", function() { return offscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screenSpace", function() { return screenSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screenSpaceVec", function() { return screenSpaceVec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gameSpaceVec", function() { return gameSpaceVec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony import */ var _pxene_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pxene.constants */ "../nphyx-pxene/src/pxene.constants.js");
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");



const {minus,mut_clamp,mut_copy,mut_times,normalize,mut_normalize,magnitude,vec2} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"];
const {sqrt, abs, floor, ceil, round} = Math;
const MIN_F = 1e-11;
const MAX_F = 1e+11;

/**
 * Round to nearest even number.
 */
function evenNumber(n) {
return n >> 1 << 1;
}

function tan_vec(v, out) {
	let tmpx = 0;
	normalize(v, out);
	tmpx = out[0];
	out[0] = -out[1];
	out[1] = tmpx;
	return out;
}

function perpdot(a, b) {
	return a[0]*b[1] - b[0]*a[1];
}

function floor_vec(v, out) {
	let len = v.length;
	out = out || _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].create(len);
	for(let i = 0; i < len; ++i) {
		out[i] = floor(v[i]);
	}
	return out;
}

function mut_floor_vec(v) {
	return floor_vec(v, v);
}

function ceil_vec(v, out) {
	let len = v.length;
	out = out || _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].create(len);
	for(let i = 0; i < len; ++i) {
		out[i] = ceil(v[i]);
	}
	return out;
}

function mut_ceil_vec(v) {
	return ceil_vec(v, v);
}

function round_vec(v, out) {
	let len = v.length;
	out = out || _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].create(len);
	for(let i = 0; i < len; ++i) {
		out[i] = round(v[i]);
	}
	return out;
}

function mut_round_vec(v) {
	return round_vec(v, v);
}

/**
 * Clamp the absolute value of a number, keeping its sign.
 */
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

/**
 * Limits absolute values of vectors within a range.
 */
const limitVecMut = (function() {
	let i = 0|0, l = 0|0;
	return function limitVecMut(v, min_v = 0, max_v = Infinity) {	
		for(i = 0, l = v.length; i < l; ++i) {
			v[i] = limit(v[i], min_v, max_v);
		}
	}
})();

/**
 * Validates a vector. For debugging purposes.
 */
const validate = (function() {
	let i, l;
	return function validate(v) {
		for(i = 0, l = v.length; i < l; i++) {
			if(isNaN(v[i])) throw new Error("NaN vector");
			if(v[i] === Infinity) throw new Error("Infinite vector");
			if(v[i] === -Infinity) throw new Error("-Infinite vector");
		}
	}
})();

/**
 * Gravitate toward target.
 */
const gravitate = (function() {
	let g_v = vec2();
	let mag = 0.0, x = 0.0, y = 0.0, scale = 0.0;
	return function gravitate(p1, p2, strength, out) {
		out = out||g_v;
		minus(p1, p2, out);
		mag = magnitude(out);
		// inline normalize for speed, since this happens a lot
		x = out[0];
		y = out[1];
		if((x === 0 && y === 0) || mag === 0) return out;
		scale = mut_clamp(1/sqrt((x*x)+(y*y)), MIN_F, MAX_F);
		strength = mut_clamp(strength, -MAX_F, MAX_F);
		out[0] = x*scale;
		out[1] = y*scale;
		//mut_normalize(out);
		mut_times(out, -strength*_pxene_constants__WEBPACK_IMPORTED_MODULE_0__["GRAVITY"]/(mag*mag));
		if(_pxene_constants__WEBPACK_IMPORTED_MODULE_0__["VALIDATE_VECTORS"]) {
			try {
				validate(out);
			}
			catch(e) {
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
				mut_times(out, -strength/(mag*mag));
				console.log("scale", out);
				out.fill(0.0);
			}
		}
		return out;
	}
})();

/**
 * Accelerate toward a target.
 */
const accelerate = (function() {
	let v = vec2();
	let scale = 0.0, x = 0.0, y = 0.0;
	return function accelerate(p1, p2, strength, out) {
		out = out||v;	
		minus(p1, p2, out);
		x = out[0];
		y = out[1];
		if(x === 0 && y === 0) return out;
		scale = mut_clamp(1/sqrt((x*x)+(y*y)), MIN_F, MAX_F);
		strength = mut_clamp(strength, -MAX_F, MAX_F);
		// inline normalize for speed, since this happens a lot
		out[0] = x*scale;
		out[1] = y*scale;
		//mut_normalize(out);
		mut_times(out, -strength);
		if(_pxene_constants__WEBPACK_IMPORTED_MODULE_0__["VALIDATE_VECTORS"]) {
			try {
				validate(out);
			}
			catch(e) {
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
	}
})();

const drag = (function() {
	let delta = vec2(), dragStrength = 0.0, dragSpeed = 0.0;
	let scale = 0.0, x = 0.0, y = 0.0;
	/**
	 * Apply drag.
	 */
	return function drag(vel, c, out) {
		out = out||delta;
		dragSpeed = magnitude(vel);
		// null small values
		dragSpeed = limit(dragSpeed, 0, 1e+11); // avoid infinite dragSpeeds
		dragStrength = mut_clamp(c * dragSpeed * dragSpeed, 1e-11, 1e+11);
		mut_copy(out, vel);
		x = out[0];
		y = out[1];
		if((x === 0 && y === 0) || dragStrength === 0) return out;
		// inline normalize for speed, since this happens a lot
		scale = mut_clamp(1/sqrt((x*x)+(y*y)), MIN_F, MAX_F);
		dragStrength = mut_clamp(dragStrength, MIN_F, MAX_F);
		out[0] = x*scale;
		out[1] = y*scale;
		// mut_normalize(out)
		mut_times(out, -1);
		mut_times(out, dragStrength);
		if(_pxene_constants__WEBPACK_IMPORTED_MODULE_0__["VALIDATE_VECTORS"]) {
			try {
				validate(out);
			}
			catch(e) {
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
	}
})();


/**
 * Checks if entity is out of screen space by more than 50%.
 */
function offscreen(x, y, displayProps) {
	return (
		x < (displayProps.width  * -0.5) || x >displayProps.width   * 1.5 ||
		y < (displayProps.height * -0.5) || y > displayProps.height * 1.5
	)
}

/**
 * Calculates the screenspace pixel offset of a coordinate from the [-1,1] coordinate
 * range used in game position vectors.
 */
function screenSpace(x, displayProps) {
	return ((x+1)/2) * displayProps.minDimension;
}

/**
 * Finds the screen space equivalent of the game space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */

function screenSpaceVec(v, displayProps, out) {
	out[0] = (((v[0]+1)/2)*displayProps.minDimension);
	out[1] = (((v[1]+1)/2)*displayProps.minDimension);
	return out;
}

/**
 * Finds the game space equivalent of the sceen space vector v.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */
function gameSpaceVec(v, displayProps, out) {
	out[0] = 2*((v[0])/displayProps.minDimension)-1;
	out[1] = 2*((v[1])/displayProps.minDimension)-1;
}

/**
 * Flattens an array. 
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


/***/ }),

/***/ "../nphyx-valloc/index.js":
/*!********************************!*\
  !*** ../nphyx-valloc/index.js ***!
  \********************************/
/*! exports provided: create, from */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ */ "../nphyx-valloc/src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "create", function() { return _src___WEBPACK_IMPORTED_MODULE_0__["create"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "from", function() { return _src___WEBPACK_IMPORTED_MODULE_0__["from"]; });





/***/ }),

/***/ "../nphyx-valloc/src/index.js":
/*!************************************!*\
  !*** ../nphyx-valloc/src/index.js ***!
  \************************************/
/*! exports provided: from, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "../nphyx-valloc/src/util.js");

const defaultCreateOpts = {
  factory: () => ({}),
  init: () => {},
  clean: () => {}
}

Object.freeze(defaultCreateOpts)
function vallocFactory(pool, init, clean) {
  const allocator = new Array(pool.length)
  allocator.fill(false)
  let valloc = {}
  let used = 0
  Object.defineProperties(valloc, {
    next: {value: (...args) => {
      let member = Object(_util__WEBPACK_IMPORTED_MODULE_0__["allocate"])(pool, allocator, init, ...args)
      used++
      return member
    }},
    indexOf: {value: (member) => pool.indexOf(member)},
    isAllocated: {value: _util__WEBPACK_IMPORTED_MODULE_0__["isAllocated"].bind(undefined, pool, allocator)},
    isIndexAllocated: {value: _util__WEBPACK_IMPORTED_MODULE_0__["isIndexAllocated"].bind(undefined, allocator)},
    eachActive: {value: (cb) => {
      Object(_util__WEBPACK_IMPORTED_MODULE_0__["eachActive"])(pool, allocator, cb)
    }},
    free: {value: (member) => {
      Object(_util__WEBPACK_IMPORTED_MODULE_0__["free"])(pool, allocator, clean, member)
      used--
    }},
    freeIndex: {value: (index) => {
      Object(_util__WEBPACK_IMPORTED_MODULE_0__["freeIndex"])(pool, allocator, clean, index)
      used--
    }},
    nextIndex: {get: _util__WEBPACK_IMPORTED_MODULE_0__["nextIndex"].bind(undefined, allocator)},
    length: {get: () => allocator.length},
    available: {get: () => allocator.length - used},
    used: {get: () => used}
  })
  Object.freeze(valloc)
  return valloc
}

/**
 * Create a new allocator from an array
 * @param
 */
const from = (array) => {
  if (typeof array === "undefined") {
    throw new Error("valloc.from requires an array")
  }
  return vallocFactory(array, defaultCreateOpts.init, defaultCreateOpts.clean)
}

/**
 * Create a new allocator with an internally managed pool
 */
function create(length, opts = {}) {
  if (!length) {
    throw new Error("valloc.create requires a length")
  }
  length = ~~length; // enforce integer
  const factory = opts.factory || defaultCreateOpts.factory
  const init = opts.init || defaultCreateOpts.init
  const clean = opts.clean || defaultCreateOpts.clean
  let array = new Array(length)
  for (let i = 0; i < length; ++i) {array[i] = factory(i)}

  return vallocFactory(array, init, clean)
}


/***/ }),

/***/ "../nphyx-valloc/src/util.js":
/*!***********************************!*\
  !*** ../nphyx-valloc/src/util.js ***!
  \***********************************/
/*! exports provided: allocateIndex, allocate, freeIndex, free, isAllocated, isIndexAllocated, nextIndex, eachActive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allocateIndex", function() { return allocateIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allocate", function() { return allocate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freeIndex", function() { return freeIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "free", function() { return free; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAllocated", function() { return isAllocated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIndexAllocated", function() { return isIndexAllocated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextIndex", function() { return nextIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eachActive", function() { return eachActive; });
/**
 * Utility functions used by valloc
 */

/**
 * allocate a free member by index
 * @private
 */
function allocateIndex(pool, allocator, init, index, ...args) {
  if (allocator[index]) {
    throw new Error("member at given index is already allocated")
  }
  if (index >= pool.length) {
    throw new Error("requested allocator index is out of bounds")
  }
  let member = pool[index]
  allocator[index] = true
  init(member, ...args)
  return member
}

/**
 * allocate a free member
 * @private
 */
function allocate(pool, allocator, init, ...args) {
  let index = nextIndex(allocator)
  if (index === -1) {
    throw new Error("pool is full")
  }
  return allocateIndex(pool, allocator, init, index, ...args)
}

/**
 * free member at index
 * @private
 */
function freeIndex(pool, allocator, clean, index) {
  if (!allocator[index]) {
    throw new Error("member was not allocated when freed")
  }
  clean(pool[index])
  allocator[index] = false
}

/**
 * free member
 * @private
 */
function free(pool, allocator, clean, member) {
  let index = pool.indexOf(member)
  if (index === -1) {
    throw new Error("item is not a member of the pool")
  }
  freeIndex(pool, allocator, clean, index)
}

/**
 * Checks if an item is allocated in a pool.
 * @private
 * @param {Array} pool
 * @param {BooleanArray} allocator
 * @param {mixed} member member to search for
 */
function isAllocated(pool, allocator, member) {
  let index = pool.indexOf(member)
  if (index === -1) {throw new Error("queried item is not a member of this pool")}
  return allocator[index]
}

/**
 * Checks if a member at a given index is allocated
 * @private
 * @param {BooleanArray} allocator
 * @param {Int} index
 */
function isIndexAllocated(allocator, index) {
  if (index < 0 || index > allocator.length - 1) {throw new Error("index out of bounds")}
  return allocator[index]
}

/**
 * find next free index
 * @private
 */
function nextIndex(allocator) {
  for (let i = 0, len = allocator.length; i < len; ++i) {if (!allocator[i]) {return i}}
  return -1
}

/**
 * perform a callback on each active item
 */
function eachActive(pool, allocator, cb) {
  allocator.forEach((active, i) => {
    if (active) {
      cb(pool[i], i)
    }
  })
}


/***/ }),

/***/ "../nphyx-vanderpool/src/index.js":
/*!****************************************!*\
  !*** ../nphyx-vanderpool/src/index.js ***!
  \****************************************/
/*! exports provided: MAX_POOL_SIZE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_POOL_SIZE", function() { return MAX_POOL_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VanderPool; });


// This is based on current Javascript maximums for ArrayBuffers
const MAX_POOL_SIZE = Math.pow(2, 21);

function calculatePoolSize(itemLength) {
	return MAX_POOL_SIZE - (MAX_POOL_SIZE % itemLength);
}

/**
 * Makes the smallest array possible that can contain every address in a pool.
 */
function createFreedList(maxIndex) {
	if(maxIndex < Math.pow(2, 8)) return new Uint8Array(maxIndex);
	else if(maxIndex < Math.pow(2, 16)) return new Uint16Array(maxIndex);
	else return new Uint32Array(maxIndex);
}


/**
 * VanderPool constructor.
 * @param {int} itemLength length in bytes of a single member of the pool
 * @param {int} itemCount number of members in the pool
 * @property {ArrayBuffer} buffer ArrayBuffer backing the pool
 * @property {Uint8Array} freed list of freed offsets ready for reuse
 * @property {int} itemLength size in bytes of pool member
 * @property {int} byteLength size of pool in bytes
 * @return {VanderPool}
 */
function VanderPool(itemLength, itemCount) {
	let byteLength = 0|0;

	if(itemCount) {
		if(itemLength * itemCount > MAX_POOL_SIZE) {
			throw new Error("requested buffer byteLength is too large");
		}
		else byteLength = itemLength * itemCount;
	}
	else byteLength = calculatePoolSize(itemLength);

	let buffer = new ArrayBuffer(byteLength);
	// The freed list's length is the maximum possible number of members
	// We could do this smarter by minimizing fragmentation
	let freed = createFreedList(itemCount?itemCount:(byteLength/itemLength));
	let next = 0;
	let freedPos = 0;

	Object.defineProperties(this, {
		"buffer":{get: () => buffer},
		"itemLength":{get: () => itemLength},
		"byteLength":{get: () => byteLength}
	});


	function popFree() {
		freedPos--;
		let offset = freed[freedPos]*itemLength;
		freed[freedPos] = 0;
		return offset;
	}

	/**
	 * Allocates a new chunk of the pool.  The callback is executed immediately and its
	 * return value is returned out of allocate.
	 * @Example
	 * ```javascript
	 * let vp = new VanderPool(8, 100); // a pool of 100 items of 7 bytes each
	 * // you can pass the params directly to a DataView constructor
	 * let dv = vp.allocate((buf, bo, bl) => 
	 *     new DataView(buf, bo, bl));
	 * // keep in mind that TypedArrays expect an item length, not a byte length
	 * let f32arr = vp.allocate((buf, bo, bl) => 
	 *     new Float32Array(buf, bo, bl/Float32Array.BYTES_PER_ELEMENT));
	 * ```
	 * @param {function} cb callback `function(buffer, byteOffset, itemLength)`
	 * @return {mixed} return value of callback function
	 * @throws {Error} when buffer is full
	 */
	this.allocate = function(cb) {
		let offset = 0|0;
		if(freedPos > 0) offset = popFree();
		else if (next < byteLength - 1) {
			offset = next;
			next = next + itemLength;
		}
		else throw new Error("buffer is full");
		return cb(buffer, offset, itemLength);
	}

	/**
	 * Frees an allocation at the given starting offset. You need to keep track of this
	 * value if you're using a custom object in allocate(). 
	 * @Example
	 * ```javascript
	 * let vp = new VanderPool(8, 100); // a pool of 100 items of 7 bytes each
	 * let dv = vp.allocate(DataView);
	 * // DataViews and TypedArrays keep the offset in the byteOffset property
	 * vp.free(DataView.byteOffset); 
	 * ```
	 * @param {offset} the start offset of the chunk to be freed
	 * @return {undefined}
	 */
	this.free = function(offset) {
		freed[freedPos] = (offset === 0?offset:(offset/itemLength));
		freedPos++;
	}

	return this;
}


/***/ }),

/***/ "../nphyx-vectrix/index.js":
/*!*********************************!*\
  !*** ../nphyx-vectrix/index.js ***!
  \*********************************/
/*! exports provided: vectors, matrices, quaternions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/vectrix */ "../nphyx-vectrix/src/vectrix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "vectors", function() { return _src_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matrices", function() { return _src_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quaternions", function() { return _src_vectrix__WEBPACK_IMPORTED_MODULE_0__["quaternions"]; });





/***/ }),

/***/ "../nphyx-vectrix/src/vectrix.js":
/*!***************************************!*\
  !*** ../nphyx-vectrix/src/vectrix.js ***!
  \***************************************/
/*! exports provided: vectors, matrices, quaternions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vectors", function() { return vectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matrices", function() { return matrices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quaternions", function() { return quaternions; });
/* harmony import */ var _vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vectrix.vectors */ "../nphyx-vectrix/src/vectrix.vectors.js");
/* harmony import */ var _vectrix_matrices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vectrix.matrices */ "../nphyx-vectrix/src/vectrix.matrices.js");
/* harmony import */ var _vectrix_quaternions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vectrix.quaternions */ "../nphyx-vectrix/src/vectrix.quaternions.js");
/**
Master module for vectrix. See individual modules for documentation.
@module vectrix
 */





const vectors = _vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__;
const matrices = _vectrix_matrices__WEBPACK_IMPORTED_MODULE_1__;
const quaternions = _vectrix_quaternions__WEBPACK_IMPORTED_MODULE_2__;



/***/ }),

/***/ "../nphyx-vectrix/src/vectrix.matrices.js":
/*!************************************************!*\
  !*** ../nphyx-vectrix/src/vectrix.matrices.js ***!
  \************************************************/
/*! exports provided: flatten, likeMatrices, plus, mut_plus, plus_scalar, mut_plus_scalar, minus, mut_minus, minus_scalar, mut_minus_scalar, col, row, multiply_scalar, mut_multiply_scalar, dot, toArray, toString, create, wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "likeMatrices", function() { return likeMatrices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plus", function() { return plus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_plus", function() { return mut_plus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plus_scalar", function() { return plus_scalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_plus_scalar", function() { return mut_plus_scalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minus", function() { return minus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_minus", function() { return mut_minus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minus_scalar", function() { return minus_scalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_minus_scalar", function() { return mut_minus_scalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "col", function() { return col; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "row", function() { return row; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply_scalar", function() { return multiply_scalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_multiply_scalar", function() { return mut_multiply_scalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return toString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony import */ var _vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vectrix.vectors */ "../nphyx-vectrix/src/vectrix.vectors.js");
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

const vec = _vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["create"];

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

/***/ "../nphyx-vectrix/src/vectrix.quaternions.js":
/*!***************************************************!*\
  !*** ../nphyx-vectrix/src/vectrix.quaternions.js ***!
  \***************************************************/
/*! exports provided: toString, slerp, normalize, invert, create, wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return toString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slerp", function() { return slerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony import */ var _vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vectrix.vectors */ "../nphyx-vectrix/src/vectrix.vectors.js");
/* harmony import */ var _vectrix_matrices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vectrix.matrices */ "../nphyx-vectrix/src/vectrix.matrices.js");

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



const vecNrm = _vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["normalize"];
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
	let strings = _vectrix_matrices__WEBPACK_IMPORTED_MODULE_1__["toArray"](a).map((cur) => cur.toFixed(2));
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
	let q = _vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["create"].apply(null, [4].concat(params));
	return q;
}

/**
 * Wraps a quaternion with aliases and quaternion functions as methods.
 * @param {quaternion} q quaternion to wrap
 * @return {quaternion} wrapped quaternion
 */
function wrap(q) {
	defineAliases(q);
	_vectrix_matrices__WEBPACK_IMPORTED_MODULE_1__["wrap"](q);
	q.slerp = asMethod(slerp, q);
	q.normalize = asMethod(normalize, q);
	q.invert = asMethod(invert, q);
	q.toString = toString.bind(null, q);
	q.times = asMethod(_vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["times"], q);
	q.clamp = asMethod(_vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["clamp"], q);
	q.normalize = asMethod(_vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["normalize"], q);
	q.mut_normalize = asMethod(_vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["mut_normalize"], q);
	q.mut_times = asMethod(_vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["mut_times"], q);
	q.mut_clamp = asMethod(_vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["mut_clamp"], q);
	q.mut_copy = asMethod(_vectrix_vectors__WEBPACK_IMPORTED_MODULE_0__["mut_copy"], q);
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


/***/ }),

/***/ "../nphyx-vectrix/src/vectrix.vectors.js":
/*!***********************************************!*\
  !*** ../nphyx-vectrix/src/vectrix.vectors.js ***!
  \***********************************************/
/*! exports provided: plus, minus, mut_plus, mut_minus, aliasCombos2d, aliasCombos3d, aliasCombos4d, aliases2d, aliases3d, aliases4d, mut_copy, homogenous, magnitude, normalize, mut_normalize, lerp, mut_lerp, cubic, mut_cubic, dot, times, mut_times, angle, distance, cross, clamp, mut_clamp, toString, create, wrap, vec2, vec3, vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plus", function() { return plus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minus", function() { return minus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_plus", function() { return mut_plus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_minus", function() { return mut_minus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aliasCombos2d", function() { return aliasCombos2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aliasCombos3d", function() { return aliasCombos3d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aliasCombos4d", function() { return aliasCombos4d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aliases2d", function() { return aliases2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aliases3d", function() { return aliases3d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aliases4d", function() { return aliases4d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_copy", function() { return mut_copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homogenous", function() { return homogenous; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnitude", function() { return magnitude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_normalize", function() { return mut_normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_lerp", function() { return mut_lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubic", function() { return cubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_cubic", function() { return mut_cubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "times", function() { return times; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_times", function() { return mut_times; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mut_clamp", function() { return mut_clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return toString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return vec2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vec3", function() { return vec3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return vec4; });
/* harmony import */ var _vectrix_matrices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vectrix.matrices */ "../nphyx-vectrix/src/vectrix.matrices.js");
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


const {plus, minus, mut_plus, mut_minus} = _vectrix_matrices__WEBPACK_IMPORTED_MODULE_0__;
let flatten = _vectrix_matrices__WEBPACK_IMPORTED_MODULE_0__["flatten"];
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
const aliasCombos3d = [];
const aliasCombos4d = [];

const aliases2d = [
	{names:["x"], i:0},
	{names:["y"],i:1}
];

const aliases3d = [
	{names:["x","r"],i:0},
	{names:["y","g"],i:1},
	{names:["z","b"],i:2}
];

const aliases4d = [
	{names:["w", "a"],i:3}
].concat(aliases3d);

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
	_vectrix_matrices__WEBPACK_IMPORTED_MODULE_0__["wrap"](vec, vec.length, 1);
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
/** 
 * Creates a 3d vector. Curried version of [create](#create) with first argument presupplied.
 * @function create.vec3
 * @return {vector}
 */
const vec3 = create.vec3 = create.bind(null, 3);
/** 
 * Creates a 4d vector. Curried version of [create](#create) with first argument presupplied.
 * @function create.vec4
 * @return {vector}
 */
const vec4 = create.vec4 = create.bind(null, 4);


/***/ }),

/***/ "./node_modules/stackblur-canvas/src/stackblur.js":
/*!********************************************************!*\
  !*** ./node_modules/stackblur-canvas/src/stackblur.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
    StackBlur - a fast almost Gaussian Blur For Canvas

    Version:     0.5
    Author:        Mario Klingemann
    Contact:     mario@quasimondo.com
    Website:    http://www.quasimondo.com/StackBlurForCanvas
    Twitter:    @quasimondo

    In case you find this class useful - especially in commercial projects -
    I am not totally unhappy for a small donation to my PayPal account
    mario@quasimondo.de

    Or support me on flattr:
    https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

    Copyright (c) 2010 Mario Klingemann

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    */


var mul_table = [
    512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
    454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
    482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
    437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
    497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
    320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
    446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
    329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
    505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
    399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
    324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
    268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
    451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
    385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
    332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
    289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];


var shg_table = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];


function processImage(img, canvas, radius, blurAlphaChannel)
{
    if (typeof(img) == 'string') {
        var img = document.getElementById(img);
    }
    else if (typeof HTMLImageElement !== 'undefined' && !img instanceof HTMLImageElement) {
        return;
    }
    var w = img.naturalWidth;
    var h = img.naturalHeight;

    if (typeof(canvas) == 'string') {
        var canvas = document.getElementById(canvas);
    }
    else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement) {
        return;
    }

    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0);

    if (isNaN(radius) || radius < 1) return;

    if (blurAlphaChannel)
        processCanvasRGBA(canvas, 0, 0, w, h, radius);
    else
        processCanvasRGB(canvas, 0, 0, w, h, radius);
}

function getImageDataFromCanvas(canvas, top_x, top_y, width, height)
{
    if (typeof(canvas) == 'string')
        var canvas  = document.getElementById(canvas);
    else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement)
        return;

    var context = canvas.getContext('2d');
    var imageData;

    try {
        try {
            imageData = context.getImageData(top_x, top_y, width, height);
        } catch(e) {
            throw new Error("unable to access local image data: " + e);
            return;
        }
    } catch(e) {
        throw new Error("unable to access image data: " + e);
    }

    return imageData;
}

function processCanvasRGBA(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);

    imageData = processImageDataRGBA(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGBA(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
        pr, pg, pb, pa, rbs;

    var div = radius + radius + 1;
    var w4 = width << 2;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[p+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa != 0)
            {
                pa = 255 / pa;
                pixels[yi]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);
            a_in_sum += (stackIn.a = pixels[p+3]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            a_sum += a_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[yi+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa > 0)
            {
                pa = 255 / pa;
                pixels[p]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[p] = pixels[p+1] = pixels[p+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));
            a_sum += (a_in_sum += (stackIn.a = pixels[p+3]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += width;
        }
    }
    return imageData;
}

function processCanvasRGB(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);
    imageData = processImageDataRGB(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGB(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
        r_out_sum, g_out_sum, b_out_sum,
        r_in_sum, g_in_sum, b_in_sum,
        pr, pg, pb, rbs;

    var div = radius + radius + 1;
    var w4 = width << 2;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
            pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p]   = (r_sum * mul_sum) >> shg_sum;
            pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[p+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += width;
        }
    }

    return imageData;
}

function BlurStack()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}

module.exports = {
    image: processImage,
    canvasRGBA: processCanvasRGBA,
    canvasRGB: processCanvasRGB,
    imageDataRGBA: processImageDataRGBA,
    imageDataRGB: processImageDataRGB
};


/***/ }),

/***/ "./src/scripts/bufferPools.js":
/*!************************************!*\
  !*** ./src/scripts/bufferPools.js ***!
  \************************************/
/*! exports provided: MAX_POOL_SIZE, BufferPool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_POOL_SIZE", function() { return MAX_POOL_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferPool", function() { return BufferPool; });


const MAX_POOL_SIZE = Math.pow(2, 21); // 2mb

function calculatePoolSize(itemLength) {
  return MAX_POOL_SIZE - (MAX_POOL_SIZE % itemLength);
}

function createFreedList(freedLength) {
  if(freedLength < Math.pow(2, 8)) return new Uint8Array(freedLength);
  else if(freedLength < Math.pow(2, 16)) return new Uint16Array(freedLength);
  else return new Uint32Array(freedLength);
}

function BufferPool(itemLength, maxItems) {
  let size = 0 | 0;
  if(maxItems) {
    if(itemLength * maxItems > MAX_POOL_SIZE) {
      throw new Error("requested buffer size is too large");
    }
    else size = itemLength * maxItems;
  }
  else size = calculatePoolSize(itemLength);
  let buffer = new ArrayBuffer(size);
  let freedLength = (maxItems ? maxItems : size / itemLength);
  let freed = createFreedList(freedLength);
  Object.defineProperties(this, {
    itemLength:{get: () => itemLength},
    buffer:{get: () => buffer},
    size:{get: () => size},
    freed:{get: () => freed}
  });
  this.next = 0;
  this.freedPos = 0;
  return this;
}

let offset = 0 | 0;
BufferPool.prototype.allocate = function() {
  if(this.freedPos > 0) offset = this.popFree();
  else if (this.next < this.size - 1) {
    offset = this.next;
    this.next = this.next + this.itemLength;
  }
  else throw new Error("pool buffer is full");
  return offset;
}

BufferPool.prototype.popFree = function() {
  this.freedPos--;
  offset = this.freed[this.freedPos] * this.itemLength;
  this.freed[this.freedPos] = 0;
  return offset;
}

BufferPool.prototype.free = function(offset) {
  this.freed[this.freedPos] = (offset === 0 ? offset : offset / this.itemLength);
  this.freedPos++;
}


/***/ }),

/***/ "./src/scripts/constants.js":
/*!**********************************!*\
  !*** ./src/scripts/constants.js ***!
  \**********************************/
/*! exports provided: AUTO_FULLSCREEN, TARGET_FPS, WEIGHT_PRED_R, WEIGHT_PRED_G, WEIGHT_PRED_B, START_POP, MOTE_BASE_SIZE, MOTE_BASE_ALPHA, MOTE_BASE_SPEED, MOTE_BASE_SIGHT, PREGNANT_THRESHOLD, PREGNANT_TIME, DEATH_THRESHOLD, GRAVITY, GLOBAL_DRAG, PHOTON_BASE_SIZE, PHOTON_LIFETIME, MARKER_HIT_LIFETIME, MARKER_HIT_SIZE, VOID_SIZE, EMITTER_SIZE, MAX_MOTES, MAX_PHOTONS, MAX_VOIDS, MAX_EMITTERS, MAX_ENTITIES, POSITIVE_ENERGY, NEGATIVE_ENERGY, TYPE_PHOTON, TYPE_MOTE, DEBUG, VALIDATE_VECTORS, VALIDATE_VECTORS_DEBUG, BUFFER_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTO_FULLSCREEN", function() { return AUTO_FULLSCREEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGET_FPS", function() { return TARGET_FPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEIGHT_PRED_R", function() { return WEIGHT_PRED_R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEIGHT_PRED_G", function() { return WEIGHT_PRED_G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEIGHT_PRED_B", function() { return WEIGHT_PRED_B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_POP", function() { return START_POP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOTE_BASE_SIZE", function() { return MOTE_BASE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOTE_BASE_ALPHA", function() { return MOTE_BASE_ALPHA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOTE_BASE_SPEED", function() { return MOTE_BASE_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOTE_BASE_SIGHT", function() { return MOTE_BASE_SIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREGNANT_THRESHOLD", function() { return PREGNANT_THRESHOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREGNANT_TIME", function() { return PREGNANT_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEATH_THRESHOLD", function() { return DEATH_THRESHOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRAVITY", function() { return GRAVITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL_DRAG", function() { return GLOBAL_DRAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PHOTON_BASE_SIZE", function() { return PHOTON_BASE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PHOTON_LIFETIME", function() { return PHOTON_LIFETIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MARKER_HIT_LIFETIME", function() { return MARKER_HIT_LIFETIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MARKER_HIT_SIZE", function() { return MARKER_HIT_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOID_SIZE", function() { return VOID_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMITTER_SIZE", function() { return EMITTER_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_MOTES", function() { return MAX_MOTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_PHOTONS", function() { return MAX_PHOTONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_VOIDS", function() { return MAX_VOIDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_EMITTERS", function() { return MAX_EMITTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_ENTITIES", function() { return MAX_ENTITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POSITIVE_ENERGY", function() { return POSITIVE_ENERGY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEGATIVE_ENERGY", function() { return NEGATIVE_ENERGY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_PHOTON", function() { return TYPE_PHOTON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_MOTE", function() { return TYPE_MOTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBUG", function() { return DEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_VECTORS", function() { return VALIDATE_VECTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_VECTORS_DEBUG", function() { return VALIDATE_VECTORS_DEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER_TYPE", function() { return BUFFER_TYPE; });
const AUTO_FULLSCREEN = true;
const TARGET_FPS = 30;
const WEIGHT_PRED_R = 1.3;
const WEIGHT_PRED_G = 0.7;
const WEIGHT_PRED_B = 1;
const START_POP = 50;
const MOTE_BASE_SIZE = 0.015;
const MOTE_BASE_ALPHA = 1;
const MOTE_BASE_SPEED = 0.0005;
const MOTE_BASE_SIGHT = 0.15;
const PREGNANT_THRESHOLD = 172;
const PREGNANT_TIME = 30;
const DEATH_THRESHOLD = 18;
const GRAVITY = 6.67408e-8;
const GLOBAL_DRAG = 0.1;
const PHOTON_BASE_SIZE = 0.015;
const PHOTON_LIFETIME = TARGET_FPS * 10;
const MARKER_HIT_LIFETIME = ~~(TARGET_FPS);
const MARKER_HIT_SIZE = 0.1;
const VOID_SIZE = 0.01;
const EMITTER_SIZE = 0.01;
const MAX_MOTES = 300;
const MAX_PHOTONS = ~~((MAX_MOTES * PREGNANT_THRESHOLD) / 2);
const MAX_VOIDS = 5;
const MAX_EMITTERS = 5;
const MAX_ENTITIES = MAX_MOTES + MAX_PHOTONS + MAX_VOIDS + MAX_EMITTERS;
const POSITIVE_ENERGY = 0.01; // chance a dead mote will produce an emitter
const NEGATIVE_ENERGY = 0.01; // chance a dead mote will produce a void

// type identifiers
const TYPE_PHOTON = 0
const TYPE_MOTE = 0

// general debug switch
const DEBUG = false;
// toggles vector validation in various functions that tend to produce
// infinite or NaN results; when enabled, vectors are checked and if invalid
// the function is rerun step by step and logged to identify trouble spots
const VALIDATE_VECTORS = DEBUG && false;
const VALIDATE_VECTORS_DEBUG = DEBUG;// || true;

let type;
if(typeof(SharedArrayBuffer) !== "undefined") {
  /* global SharedArrayBuffer */
  type = SharedArrayBuffer;
}
else {
  type = ArrayBuffer;
}

const BUFFER_TYPE = type;


/***/ }),

/***/ "./src/scripts/draw/bokeh.js":
/*!***********************************!*\
  !*** ./src/scripts/draw/bokeh.js ***!
  \***********************************/
/*! exports provided: init, generateBackground, draw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateBackground", function() { return generateBackground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "draw", function() { return draw; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var stackblur_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stackblur-canvas */ "./node_modules/stackblur-canvas/src/stackblur.js");
/* harmony import */ var stackblur_canvas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stackblur_canvas__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Derived from bokeh generator by Jack Rugile at [CodePen](http://codepen.io/jackrugile/pen/gaFub)
 */



let bgBuffer, bokehBuffer, bgCtx, bokehCtx, tau = Math.PI * 2, parts = [], displayProps;
let colors1 = [
  "rgba(255,64,64,1.0)",
  "rgba(64,255,64,1.0)",
  "rgba(64,64,225,1.0)"
];
Object(_util__WEBPACK_IMPORTED_MODULE_0__["shuffle"])(colors1);
let colors2 = [
  "rgba(255,64,64,0.8)",
  "rgba(64,255,64,0.8)",
  "rgba(64,64,225,0.8)"
];
Object(_util__WEBPACK_IMPORTED_MODULE_0__["shuffle"])(colors2);



function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function hsla(h, s, l, a) {
  return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
}

function init(display) {
  displayProps = display.props;
  bgBuffer = display.buffersByLabel.bokehBack;//buffer1;
  bgCtx = bgBuffer.context;
  bokehBuffer = display.buffersByLabel.bokehFront; //buffer2;
  bokehCtx = bokehBuffer.context;

  let sizeBase = bgBuffer.width + bgBuffer.height;
  let w = bokehBuffer.width;
  let h = bokehBuffer.height;


  parts.length = 0;
  for(var i = 0; i < Math.floor((w + h) * 0.01); i++) {
    parts.push({
      radius: rand(sizeBase * 0.005, sizeBase * 0.02),
      x: rand(0, w),
      y: rand(0, h),
      angle: rand(0, tau),
      vel: rand(0.05, 0.2),
      tick: rand(0, 10000)
    });
  }

  generateBackground();
  displayProps.events.on("resize", generateBackground);
}

function generateBackground() {
  let w = bokehBuffer.width;
  let h = bokehBuffer.height;
  let mind = Math.min(w, h);
  let maxd = Math.max(w, h);
  let noise = 6;
  bgCtx.fillStyle = "black";
  bgCtx.fillRect(0, 0, w, h);
  let g = bgCtx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0.0, colors1[0]);
  g.addColorStop(0.5, colors1[1]);
  g.addColorStop(1.0, colors1[2]);
  bgCtx.fillStyle = g;
  bgCtx.fillRect(0, 0, w, h);

  g = bgCtx.createLinearGradient(0, h, w, 0);
  g.addColorStop(0.0, colors2[0]);
  g.addColorStop(0.5, colors2[1]);
  g.addColorStop(1.0, colors2[2]);
  bgCtx.fillStyle = g;
  bgCtx.fillRect(0, 0, w, h);
  noisify(bgCtx, 0, 0, w, h, noise);

  g = bgCtx.createRadialGradient(w / 2, h / 2, maxd / 2, w / 2, h / 2, 0);
  let rad = ((maxd - mind) / maxd);
  g.addColorStop(1, "rgba(32,32,32,0.5)");
  g.addColorStop(rad + 0.06, "rgba(0,0,0,0.8)");
  g.addColorStop(rad + 0.05, "rgba(128,128,128,1.0)");
  g.addColorStop(rad + 0.04, "rgba(255,255,255,0.6)");
  g.addColorStop(rad + 0.03, "rgba(255,255,255,0.8)");
  g.addColorStop(rad + 0.025, "rgba(255,255,255,0.8)");
  g.addColorStop(rad + 0.005, "rgba(255,255,255,0.5)");
  g.addColorStop(0, "rgba(255,255,255,0.01)");
  bgCtx.fillStyle = g;
  bgCtx.globalCompositeOperation = "luminosity";
  bgCtx.fillRect(0, 0, w, h);
  bgCtx.globalCompositeOperation = "source-in";
  noisify(bgCtx, 0, 0, w, h, noise);
  Object(stackblur_canvas__WEBPACK_IMPORTED_MODULE_1__["canvasRGBA"])(bgCtx.canvas, 0, 0, w, h, 4);
}


function noisify(ctx, sx, sy, sw, sh, strength = 1) {
  let data = ctx.getImageData(sx, sy, sw, sh);
  let pixels = data.data;
  let tweak;
  for(let i = 0, len = pixels.length; i < len; i += 4) {
    tweak = ~~((Math.random() * strength * 2) - strength);
    pixels[i] = Object(_util__WEBPACK_IMPORTED_MODULE_0__["clamp"])(pixels[i] + tweak, 0, 255);
    tweak = ~~((Math.random() * strength * 2) - strength);
    pixels[i + 1] = Object(_util__WEBPACK_IMPORTED_MODULE_0__["clamp"])(pixels[i + 1] + tweak, 0, 255);
    tweak = ~~((Math.random() * strength * 2) - strength);
    pixels[i + 2] = Object(_util__WEBPACK_IMPORTED_MODULE_0__["clamp"])(pixels[i + 2] + tweak, 0, 255);
  }
  bgCtx.putImageData(data, sx, sy);
}

function draw() {
  var i = parts.length;
  let w = bokehBuffer.width;
  let h = bokehBuffer.height;
  bokehCtx.fillStyle = "rgba(0,0,0,0)";
  bokehCtx.globalCompositeOperation = "source-over";
  bokehCtx.clearRect(0, 0, w, h);
  bokehCtx.shadowBlur = 15;
  bokehCtx.shadowColor = "#fff";
  while(i--) {
    var part = parts[i];

    part.x += Math.cos(part.angle) * part.vel;
    part.y += Math.sin(part.angle) * part.vel;
    part.angle += rand(-0.05, 0.05);

    bokehCtx.beginPath();
    bokehCtx.arc(part.x, part.y, part.radius, 0, tau);
    bokehCtx.fillStyle = hsla(0, 0, 100, 0.03 + Math.cos(part.tick * 0.02) * 0.01);
    bokehCtx.fill();

    if(part.x - part.radius > w) part.x = -part.radius;
    if(part.x + part.radius < 0) part.x = w + part.radius;
    if(part.y - part.radius > h) part.y = -part.radius;
    if(part.y + part.radius < 0) part.y = h + part.radius;

    part.tick++;
  }
}


/***/ }),

/***/ "./src/scripts/draw/entities.js":
/*!**************************************!*\
  !*** ./src/scripts/draw/entities.js ***!
  \**************************************/
/*! exports provided: init, draw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "draw", function() { return draw; });
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprites */ "./src/scripts/draw/sprites/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");
/* harmony import */ var _game_photons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game/photons */ "./src/scripts/game/photons.js");
/* harmony import */ var _game_motes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game/motes */ "./src/scripts/game/motes.js");
/* harmony import */ var _game_motes_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../game/motes.actions */ "./src/scripts/game/motes.actions.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ */ "./src/scripts/draw/index.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../game */ "./src/scripts/game/index.js");

/**
 * Module for drawing entity layer.
 */











const {vec2, lerp} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"]
const {mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"]
// const tf = constants.TARGET_FPS

let {min, cos, sin, sqrt, tan, round, PI} = Math
let lightBuffer, darkBuffer, lightCtx, darkCtx, frameCount, timing, displayProps

/**
 * Draws plasma lines between a mote and its target.
 */
const drawPlasmaLine = (function() {
  let a  = vec2(), b  = vec2(), c  = vec2(), d  = vec2(),
    ra = vec2(), rb = vec2(),
    rax = 0 | 0, ray = 0 | 0, speeda = 0.0, ta = 0.0, tc = 0.0,
    rbx = 0 | 0, rby = 0 | 0, speedb = 0.0, tb = 0.0, td = 0.0,
    sx = 0 | 0, sy = 0 | 0, tx = 0 | 0, ty = 0 | 0
  return function drawPlasmaLine(ctx, source, target, outerColor, innerColor, lineSize = 4, frameOffset = 0) {
    // only these acts get lines
    ta = 0.6
    tc = 0.9
    tb = 0.7
    td = 0.9
    speeda = 0.57121
    speedb = 0.71213
    lerp(source, target, ta, a)
    lerp(source, target, tb, b)
    lerp(source, target, tc, c)
    lerp(source, target, td, d)

    mut_plus(Object(_util__WEBPACK_IMPORTED_MODULE_6__["rotate"])(a, c, tan(cos((frameCount + frameOffset) * speeda)), ra), a)
    mut_plus(Object(_util__WEBPACK_IMPORTED_MODULE_6__["rotate"])(b, d, tan(sin((frameCount + frameOffset) * speedb)), rb), b)

    sx = source[0]; sy = source[1]
    tx = target[0]; ty = target[1]
    rax = ra[0]; ray = ra[1]
    rbx = rb[0]; rby = rb[1]
    /*
    if(lightBuffer.width > lightBuffer.height) {
      sx = sx
      tx = tx
      rax = rax
      rbx = rbx
    }
    else {
      sy = sy
      ty = ty
      ray = ray
      rby = rby
    }
    */
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty)
    ctx.strokeStyle = outerColor
    ctx.lineWidth = round(cos((frameCount + frameOffset) * speeda) * lineSize)
    ctx.lineCap = "round"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.bezierCurveTo(rax, ray, rbx, rby, tx, ty)
    ctx.strokeStyle = innerColor
    ctx.lineWidth = round(cos((frameCount + frameOffset) * speeda) * ~~(lineSize / 4))
    ctx.lineCap = "round"
    ctx.stroke()
    ctx.closePath()
  }
}())

/**
 * Draw a mote.
 */
const drawMote = (function() {
  let pulse = 0 | 0, pregnant = 0 | 0, injured = 0 | 0, size = 0.0,
    plasmaSource = vec2(), plasmaTarget = vec2(), sc = 0.0, sch = 0.0,
    colorIndex = 0 | 0, px = 0.0, py = 0.0, sprite
  return function drawMote(entity) {
    lightCtx.globalCompositeOperation = "lighter"
    px = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[0])
    py = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[1])

    ;({pulse, pregnant, injured} = entity)
    size = entity.size * displayProps.minDimension
    if(pregnant) {
      sc = size * cos((frameCount + pulse) * 0.2) * (sqrt(pregnant) + 1)
      // sw = size * sin((frameCount + pulse + tf) * 0.2) * (sqrt(pregnant) + 1) * 0.1
    }
    else if(injured) {
      sc = size * cos((frameCount + pulse) * (0.2 + (1 - 1 / injured)))
      // sw = size * sin((frameCount + pulse + tf) * 0.2) * 0.1; //* (0.2+(1-1/injured)))*0.25
    }
    else {
      sc = size * cos((frameCount + pulse) * 0.2)
      // sw = size * sin((frameCount + pulse + tf) * 0.2) * 0.1
    }
    sch = sc * 0.5
    colorIndex = _sprites__WEBPACK_IMPORTED_MODULE_1__["util"].colorIndex(entity.color[_game_photons__WEBPACK_IMPORTED_MODULE_3__["COLOR_R"]], entity.color[_game_photons__WEBPACK_IMPORTED_MODULE_3__["COLOR_G"]], entity.color[_game_photons__WEBPACK_IMPORTED_MODULE_3__["COLOR_B"]])
    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(colorIndex)
    lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - sch, py - sch, sc, sc)
    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].getCenter()
    lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - sch, py - sch, sc, sc)
    if(entity.target && entity.action == _game_motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_ATTACK"]) {
      // need vectors but in screen space, not absolute space
      plasmaSource[0] = px
      plasmaSource[1] = py
      plasmaTarget[0] = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.target.pos[0])
      plasmaTarget[1] = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.target.pos[1])
      drawPlasmaLine(lightCtx, plasmaSource, plasmaTarget, _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].getColorString(colorIndex), "white", 5, pulse)
    }
  }
}())

/**
 * Draws a photon.
 */
const drawPhoton = (function() {
  let sw = 0.0, swh = 0.0, px = 0.0, py = 0.0, ps = 0.0, pulse = 0 | 0, sprite
  return function drawPhoton(entity) {
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(lightCtx, "lighter")
    px = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[0])
    py = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[1])
    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["photons"].get(entity.color)
    ps = _constants__WEBPACK_IMPORTED_MODULE_2__["PHOTON_BASE_SIZE"] * displayProps.minDimension; //sprite.pixelSize
    pulse = entity.pulse
    sw = (ps * 0.75 * (cos((frameCount + pulse) * 0.3) * sin((frameCount + pulse) * 0.1))) +
      (ps * 0.25)
    swh = sw * 0.5
    lightCtx.drawImage(sprite.canvas, 0, 0, sprite.pixelSize, sprite.pixelSize, px - swh, py - swh, sw, sw)
  }
}())

/**
 * Draws a marker.
 */
const drawMarker = (function() {
  let sw = 0.0, swh = 0.0, px = 0.0, py = 0.0, ps = 0.0, sprite
  return function drawMarker(entity) {
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(lightCtx, "lighter")
    px = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[0])
    py = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[1])
    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["markers"].get()
    ps = Math.pow(100 - entity.mass, 1.5) * 0.5

    sw = ps;// * 0.55 * sin((frameCount)*0.3) + (ps * 0.45)
    swh = sw * 0.5
    lightCtx.drawImage(sprite.canvas, 0, 0, sprite.pixelSize, sprite.pixelSize, px - swh, py - swh, sw, sw)

    sw = ps * cos(frameCount * 10)
    swh = sw * 0.5
    lightCtx.drawImage(sprite.canvas, 0, 0, sprite.pixelSize, sprite.pixelSize, px - swh, py - swh, sw, sw)
  }
}())


/**
 * Draws a void.
 */
const drawVoid = (function() {
  let sc = 0.0, sch = 0.0, px = 0.0, py = 0.0, ox = 0.0, oy = 0.0, sprite,
    sw = 0.0, swh = 0.0, colorIndex = 0 | 0
  return function drawVoid(entity) {
    px = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[0])
    py = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[1])

    sc = entity.size * displayProps.minDimension * 1 + (sin(frameCount * 0.2))
    sch = sc * 0.5

    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["voids"].get()
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(darkCtx, "source-over")
    darkCtx.drawImage(sprite.canvas, px - sch, py - sch, sc, sc)
    switch(entity.lastMeal) {
      case -1:colorIndex = 0x888; break
      case _game_photons__WEBPACK_IMPORTED_MODULE_3__["COLOR_R"]:colorIndex = 0xf44; break
      case _game_photons__WEBPACK_IMPORTED_MODULE_3__["COLOR_G"]:colorIndex = 0x4f4; break
      case _game_photons__WEBPACK_IMPORTED_MODULE_3__["COLOR_B"]:colorIndex = 0x44f; break
    }
    // white patch
    sw = sc * 1.7
    swh = sw * 0.5
    ox = sin(frameCount * 0.0127) * sc * 0.1
    oy = cos(frameCount * 0.0127) * sc * 0.1
    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(0xfff)
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(darkCtx, "soft-light")
    darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw)
    // color patch
    sw = sc * 1.2
    swh = sw * 0.5
    ox = cos(frameCount * 0.023) * sc * 0.13
    oy = sin(frameCount * 0.023) * sc * 0.13
    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(colorIndex)
    darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw)
    // dark patch
    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(0x000)
    sw = sc * 1.65
    swh = sw * 0.5
    ox = sin(frameCount * 0.0122) * sc * 0.15
    oy = cos(frameCount * 0.0122) * sc * 0.15
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(darkCtx, "multiply")
    darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw)
  }
}())

/**
 * Draws an emitter.
 */
const drawEmitter = (function() {
  let sc = 0.0, sch = 0.0, px = 0.0, py = 0.0, ox = 0.0, oy = 0.0, sprite,
    sw = 0.0, swh = 0.0
  return function drawEmitter(entity) {
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(lightCtx, "lighter")
    px = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[0])
    py = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[1])

    sc = entity.size * displayProps.minDimension
    //sc = sc + (sc*(sin(frameCount*0.05))/100)
    sch = sc * 0.5

    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["emitters"].get()
    lightCtx.drawImage(sprite.canvas, px - sch, py - sch, sc, sc)

    sw = cos((frameCount) * 0.2) * sc * 1.7
    swh = sw * 0.5

    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(0x333)
    lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - swh, py - swh, sw, sw)

    try {
      sw = sc * 1.3
      swh = sw * 0.5
      ox = sin(frameCount * 0.08) * sc * (0.1 - (entity.ratios[0] * 0.1))
      oy = cos(frameCount * 0.08) * sc * (0.1 - (entity.ratios[0] * 0.1))
      sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(entity.ratios[0] * 15.9 << 8)
      lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw)

      sw = sc * 1.3
      swh = sw * 0.5
      ox = sin(frameCount * 0.08 + 2.094394) * sc * (0.1 - (entity.ratios[1] * 0.1))
      oy = cos(frameCount * 0.08 + 2.094394) * sc * (0.1 - (entity.ratios[1] * 0.1))
      sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(entity.ratios[1] * 15.9 << 4)
      lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw)

      sw = sc * 1.3
      swh = sw * 0.5
      ox = sin(frameCount * 0.08 + 4.188789) * sc * (0.1 - (entity.ratios[2] * 0.1))
      oy = cos(frameCount * 0.08 + 4.188789) * sc * (0.1 - (entity.ratios[2] * 0.1))
      sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(~~(entity.ratios[2] * 15.9))
      lightCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px + ox - swh, py + oy - swh, sw, sw)
    } catch (e) {console.log(e.message)}
  }
}())


/**
 * Draws an antigraviton cluster.
 */
const drawAntiGravitonCluster = (function() {
  let size = 0.0, plasmaSource = vec2(), plasmaTarget = vec2(), lw = 4,
    outerColor = "rgba(0,0,0,0.3)", innerColor = "rgba(0,0,0,0.7)",
    pi3rd = PI * (1 / 3), px = 0.0, py = 0.0, ox = 0.0, oy = 0.0,
    sc = 0.0, sch = 0.0, sprite
  function drawAntiPlasma(offset, length) {
    ox = sin(frameCount * 0.08 + offset) * sc * length
    oy = cos(frameCount * 0.08 + offset) * sc * length
    plasmaTarget[0] = px + ox
    plasmaTarget[1] = py + oy
    drawPlasmaLine(darkCtx, plasmaSource, plasmaTarget, outerColor, innerColor, lw)
  }
  return function drawAntiGravitonCluster(entity) {
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(darkCtx, "multiply")
    px = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[0])
    py = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[1])

    size = entity.size * displayProps.minDimension
    sc = size
    lw = min(4, ~~(sc / 2))
    sch = sc * 0.5
    plasmaSource[0] = px
    plasmaSource[1] = py

    drawAntiPlasma(0, 0.5)
    drawAntiPlasma(pi3rd * 2, 0.5)
    drawAntiPlasma(pi3rd * 4, 0.5)
    drawAntiPlasma(pi3rd, 0.25)
    drawAntiPlasma(pi3rd * 3, 0.25)
    drawAntiPlasma(pi3rd * 5, 0.25)

    sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__["motes"].get(0x000)
    darkCtx.drawImage(sprite.canvas, sprite.sx, sprite.sy, sprite.sw, sprite.sh, px - sch, py - sch, sc, sc)
  }
}())

const init = function(display) {
  displayProps = display.props
  timing = display.timing
  lightBuffer = display.buffersByLabel.entitiesLight
  darkBuffer = display.buffersByLabel.entitiesDark
  lightCtx = lightBuffer.context
  darkCtx = darkBuffer.context
  updateProps()
  displayProps.events.on("resize", updateProps)
  _sprites__WEBPACK_IMPORTED_MODULE_1__["init"](displayProps)
}

/**
 * Draw call for all entities. Loops through game entities and draws them according
 * to kind and displayProps.
 */
const draw = (function() {
  // these variables are shared by draw calls below
  let i, l, entity, px, py
  let lightClearStyle = "rgba(0,0,0,0.2)"
  let darkClearStyle  = "rgba(0,0,0,0.1)"

  return function draw(state) {
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(lightCtx, "destination-out"); //"source-over")
    lightCtx.fillStyle = lightClearStyle
    lightCtx.fillRect(0, 0, lightBuffer.width, lightBuffer.height)
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(darkCtx, "destination-out")
    darkCtx.fillStyle = darkClearStyle
    darkCtx.clearRect(0, 0, darkBuffer.width, darkBuffer.height)
    frameCount = timing.frameCount
    let mask = _sprites__WEBPACK_IMPORTED_MODULE_1__["ui"].get("mask")
    try {
      _game_photons__WEBPACK_IMPORTED_MODULE_3__["eachActive"](drawPhoton)
    }
    catch(e) {
      console.error(e)
      return
    }
    _game_motes__WEBPACK_IMPORTED_MODULE_4__["eachActive"](drawMote)
    for(i = 0, l = state.entities.length; i < l; ++i) {
      entity = state.entities[i]
      px = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[0])
      py = Object(___WEBPACK_IMPORTED_MODULE_7__["screenSpace"])(entity.pos[1])
      if(Object(___WEBPACK_IMPORTED_MODULE_7__["offscreen"])(px, py)) continue
      else if(entity instanceof _game__WEBPACK_IMPORTED_MODULE_8__["Void"]) drawVoid(entity)
      else if(entity instanceof _game__WEBPACK_IMPORTED_MODULE_8__["Emitter"]) drawEmitter(entity)
      else if(entity instanceof _game__WEBPACK_IMPORTED_MODULE_8__["AntiGravitonCluster"]) drawAntiGravitonCluster(entity)
      else if(entity instanceof _game__WEBPACK_IMPORTED_MODULE_8__["Ripple"]) drawMarker(entity)
    }
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(lightCtx, "destination-out")
    lightCtx.drawImage(mask.canvas, 0, 0, displayProps.minDimension, displayProps.minDimension)
    Object(___WEBPACK_IMPORTED_MODULE_7__["updateCompositeOperation"])(darkCtx, "destination-out")
    darkCtx.drawImage(mask.canvas, 0, 0, displayProps.minDimension, displayProps.minDimension)
  }
}())

function updateProps() {
  let {width, height, minDimension, orientation} = displayProps
  let ox, oy
  lightBuffer.width = darkBuffer.width = minDimension
  lightBuffer.height = darkBuffer.height = minDimension
  if(orientation) {
    ox = 0
    oy = (height - width) / 2
  }
  else {
    ox = (width - height) / 2
    oy = 0
  }
  lightBuffer.offsetX = darkBuffer.offsetX = ox
  lightBuffer.offsetY = darkBuffer.offsetY = oy
}


/***/ }),

/***/ "./src/scripts/draw/index.js":
/*!***********************************!*\
  !*** ./src/scripts/draw/index.js ***!
  \***********************************/
/*! exports provided: bokeh, entities, sprites, ui, updateCompositeOperation, screenSpace, screenSpaceVec, gameSpaceVec, offscreen, drawCircle, tick, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCompositeOperation", function() { return updateCompositeOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screenSpace", function() { return screenSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "screenSpaceVec", function() { return screenSpaceVec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gameSpaceVec", function() { return gameSpaceVec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offscreen", function() { return offscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawCircle", function() { return drawCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _bokeh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bokeh */ "./src/scripts/draw/bokeh.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "bokeh", function() { return _bokeh__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ "./src/scripts/draw/entities.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "entities", function() { return _entities__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprites */ "./src/scripts/draw/sprites/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "sprites", function() { return _sprites__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/scripts/draw/ui.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ui", function() { return _ui__WEBPACK_IMPORTED_MODULE_3__; });







let animating = false; // whether the game is currently running animation loop
let game; // game environment object
let props; // display properties

/**
 * Using this checks and avoids altering the canvas context state machine if unnecessary,
 * which theoretically saves a little time.
 */
function updateCompositeOperation(ctx, op) {
  if(ctx.globalCompositeOperation !== op) ctx.globalCompositeOperation = op;
}

/**
 * Calculates the screenspace pixel offset of a coordinate from the [-1,1] coordinate
 * range used in game position vectors.
 */
function screenSpace(x) {
  return ((x + 1) / 2) * props.minDimension;
}

/**
 * Finds the screen space equivalent of the game space vector v. Centering is handled
 * at a higher level so it's not accounted for here.
 * @param {vec2} v game space vector
 * @param {vec2} out out parameter
 * @return {out}
 */

function screenSpaceVec(v, out) {
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
function gameSpaceVec(v, out) {
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
function offscreen(x, y) {
  return (
    x < (props.width  * -0.5) || x > props.width   * 1.5 ||
		y < (props.height * -0.5) || y > props.height * 1.5
  )
}

/**
 * Draws a colored circle.
 */
function drawCircle(ctx, x, y, size, fillStyle, lineWidth = 0, strokeStyle = undefined) {
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
function tick() {
  if(!animating) animating = true;
  _bokeh__WEBPACK_IMPORTED_MODULE_0__["draw"]();
  _entities__WEBPACK_IMPORTED_MODULE_1__["draw"](game);
  _ui__WEBPACK_IMPORTED_MODULE_3__["draw"](game);
}

/**
 * Initializes game environment.
 */
function init(state, display) {
  game = state.game;
  props = display.props;
  _bokeh__WEBPACK_IMPORTED_MODULE_0__["init"](display);
  _entities__WEBPACK_IMPORTED_MODULE_1__["init"](display);
  _ui__WEBPACK_IMPORTED_MODULE_3__["init"](display);
}


/***/ }),

/***/ "./src/scripts/draw/sprites/emitters.js":
/*!**********************************************!*\
  !*** ./src/scripts/draw/sprites/emitters.js ***!
  \**********************************************/
/*! exports provided: init, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/draw/sprites/util.js");



var sprite;

/**
 * Creates an emitter sprite.
 */
function init(props) {
  let pixelSize = Object(_util__WEBPACK_IMPORTED_MODULE_0__["scaleSprite"])(props.minDimension, 1);
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let ctx = canvas.getContext("2d");
  let g = ctx.createRadialGradient(
    pixelSize / 2, pixelSize / 2, pixelSize / 2,
    pixelSize / 2, pixelSize / 2, 0
  );
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
  sprite = {
    canvas:canvas,
    context:ctx,
    w:pixelSize,
    h:pixelSize,
    pixelSize:pixelSize
  }
}

function get() {
  return sprite;
}


/***/ }),

/***/ "./src/scripts/draw/sprites/index.js":
/*!*******************************************!*\
  !*** ./src/scripts/draw/sprites/index.js ***!
  \*******************************************/
/*! exports provided: motes, emitters, photons, voids, markers, ui, util, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _motes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./motes */ "./src/scripts/draw/sprites/motes.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "motes", function() { return _motes__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _emitters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emitters */ "./src/scripts/draw/sprites/emitters.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "emitters", function() { return _emitters__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _photons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./photons */ "./src/scripts/draw/sprites/photons.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "photons", function() { return _photons__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _voids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./voids */ "./src/scripts/draw/sprites/voids.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "voids", function() { return _voids__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _markers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./markers */ "./src/scripts/draw/sprites/markers.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "markers", function() { return _markers__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui */ "./src/scripts/draw/sprites/ui.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ui", function() { return _ui__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util */ "./src/scripts/draw/sprites/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_6__; });











function init(props) {
  _motes__WEBPACK_IMPORTED_MODULE_0__["init"](props);
  _photons__WEBPACK_IMPORTED_MODULE_2__["init"](props);
  _emitters__WEBPACK_IMPORTED_MODULE_1__["init"](props);
  _voids__WEBPACK_IMPORTED_MODULE_3__["init"](props);
  _ui__WEBPACK_IMPORTED_MODULE_5__["init"](props);
  _markers__WEBPACK_IMPORTED_MODULE_4__["init"](props);
}


/***/ }),

/***/ "./src/scripts/draw/sprites/markers.js":
/*!*********************************************!*\
  !*** ./src/scripts/draw/sprites/markers.js ***!
  \*********************************************/
/*! exports provided: init, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/draw/sprites/util.js");



var sprite;

function init(props) {
  let pixelSize = Object(_util__WEBPACK_IMPORTED_MODULE_0__["scaleSprite"])(props.minDimension, 1);
  let hps = ~~(pixelSize / 2);
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let context = canvas.getContext("2d");
  let g = context.createRadialGradient(hps, hps, hps, hps, hps, 0);
  g.addColorStop(0.0, "rgba(255,255,255,0.0)");
  g.addColorStop(0.75, "rgba(255,255,255,0.0)");
  g.addColorStop(0.8, "rgba(255,255,255,0.007)");
  g.addColorStop(0.85, "rgba(255,255,255,0.007)");
  g.addColorStop(0.9, "rgba(255,255,255,0.0)");
  context.fillStyle = g;
  context.fillRect(0, 0, pixelSize, pixelSize);
  sprite = {
    canvas:canvas,
    context:context,
    pixelSize:pixelSize,
    w:pixelSize,
    h:pixelSize
  }
}

function get() {return sprite;}


/***/ }),

/***/ "./src/scripts/draw/sprites/motes.js":
/*!*******************************************!*\
  !*** ./src/scripts/draw/sprites/motes.js ***!
  \*******************************************/
/*! exports provided: getColorString, get, getCenter, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getColorString", function() { return getColorString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCenter", function() { return getCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/scripts/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/scripts/draw/sprites/util.js");



var moteSprites, moteMaskCanvas, moteCenter, moteSpriteSheetContext,
  moteMaskContext, moteTmpCanvas, moteTmpContext, spriteScale, moteSpriteSize,
  motePixelSize, moteSpriteSheetCanvas;
const MASK_R = 0xf00;
const MASK_G = 0x0f0;
const MASK_B = 0x00f;
const colorStrings = Array(4096);

function getColorString(index) {
  return colorStrings[index];
}

function get(index) {
  return moteSprites[index];
}

function getCenter() {
  return moteCenter;
}

function init(props) {
  spriteScale = props.minDimension;
  moteSpriteSize = _constants__WEBPACK_IMPORTED_MODULE_0__["MOTE_BASE_SIZE"] * 4;
  motePixelSize = Object(_util__WEBPACK_IMPORTED_MODULE_1__["scaleSprite"])(spriteScale, moteSpriteSize);

  initMask();
  initCenterSprite();
  initSpriteSheet();
}

function initCenterSprite() {
  let w = motePixelSize;
  let h = motePixelSize;
  let px = 0;
  let py = 0;
  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  let context = canvas.getContext("2d");
  context.globalCompositeOperation = "copy";
  context.drawImage(moteMaskCanvas, 0, 0, w, h);
  context.globalCompositeOperation = "source-in";
  context.fillStyle = "rgba(255,255,255,0.15)";
  context.fillRect(0, 0, w, h);
  moteCenter = {
    canvas:canvas,
    context:context,
    pixelSize:motePixelSize,
    sw:motePixelSize,
    sh:motePixelSize,
    sx:px,
    sy:py
  }
}

function initMask() {
  moteMaskCanvas = document.createElement("canvas");
  moteMaskCanvas.width = moteMaskCanvas.height = motePixelSize;
  moteMaskContext = moteMaskCanvas.getContext("2d");
  let g = moteMaskContext.createRadialGradient(
    motePixelSize / 2, motePixelSize / 2, motePixelSize / 2,
    motePixelSize / 2, motePixelSize / 2, 0
  );
  g.addColorStop(1, "rgba(255,255,255,1.0");
  g.addColorStop(0.8, "rgba(255,255,255,0.5)");
  g.addColorStop(0.1, "rgba(255,255,255,0.0)");
  moteMaskContext.fillStyle = g;
  moteMaskContext.fillRect(0, 0, motePixelSize, motePixelSize);
}

function initSpriteSheet() {
  moteTmpCanvas = document.createElement("canvas");
  moteTmpCanvas.width = moteTmpCanvas.height = motePixelSize;
  moteTmpContext = moteTmpCanvas.getContext("2d");

  moteSpriteSheetCanvas = document.createElement("canvas");
  moteSpriteSheetCanvas.width = moteSpriteSheetCanvas.height = motePixelSize * 64;
  moteSpriteSheetContext = moteSpriteSheetCanvas.getContext("2d");

  moteSprites = Array(4096);
  for(let i = 0; i < 4096; ++i) {
    colorStrings[i] = "rgb(" + ((i & MASK_R) >> 4) +
													"," + (i  & MASK_G) +
													"," + ((i & MASK_B) << 4) + ")";
    moteSprites[i] = createMoteSprite(i, colorStrings[i]);
  }
}

function createMoteSprite(index, color) {
  let w = motePixelSize;
  let h = motePixelSize;
  let y = (index % 64);
  let x = (index - y) / 64;
  let py = y * motePixelSize;
  let px = x * motePixelSize;
  moteTmpContext.globalCompositeOperation = "copy";
  moteTmpContext.drawImage(moteMaskCanvas, 0, 0, w, h);
  moteTmpContext.globalCompositeOperation = "source-in";
  moteTmpContext.fillStyle = color;
  moteTmpContext.fillRect(0, 0, w, h);
  moteSpriteSheetContext.drawImage(moteTmpCanvas, px, py, w, h);
  return {
    canvas:moteSpriteSheetCanvas,
    context:moteSpriteSheetContext,
    pixelSize:motePixelSize,
    sw:motePixelSize,
    sh:motePixelSize,
    sx:px,
    sy:py
  }
}


/***/ }),

/***/ "./src/scripts/draw/sprites/photons.js":
/*!*********************************************!*\
  !*** ./src/scripts/draw/sprites/photons.js ***!
  \*********************************************/
/*! exports provided: init, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/scripts/constants.js");
/* harmony import */ var _game_photons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../game/photons */ "./src/scripts/game/photons.js");





const sprites = Array(3);

function init(props) {
  sprites[_game_photons__WEBPACK_IMPORTED_MODULE_1__["COLOR_R"]] = createPhotonSprite(props.minDimension, _constants__WEBPACK_IMPORTED_MODULE_0__["PHOTON_BASE_SIZE"], "red");
  sprites[_game_photons__WEBPACK_IMPORTED_MODULE_1__["COLOR_G"]] = createPhotonSprite(props.minDimension, _constants__WEBPACK_IMPORTED_MODULE_0__["PHOTON_BASE_SIZE"], "green");
  sprites[_game_photons__WEBPACK_IMPORTED_MODULE_1__["COLOR_B"]] = createPhotonSprite(props.minDimension, _constants__WEBPACK_IMPORTED_MODULE_0__["PHOTON_BASE_SIZE"], "blue");
}

function get(color) {
  return sprites[color];
}

/**
 * Creates a photon sprite.
 */
function createPhotonSprite(scale, spriteSize, color) {
  let pixelSize = 17;
  let hps = ~~(pixelSize / 2);
  let qps = ~~(pixelSize / 4);
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let context = canvas.getContext("2d");
  let g;
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
  return {
    canvas:canvas,
    context:context,
    pixelSize:pixelSize,
    w:pixelSize,
    h:pixelSize
  }
}


/***/ }),

/***/ "./src/scripts/draw/sprites/ui.js":
/*!****************************************!*\
  !*** ./src/scripts/draw/sprites/ui.js ***!
  \****************************************/
/*! exports provided: get, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });


var sprites = {
  mask:undefined
}

function get(which) {
  return sprites[which];
}

function init(display) {
  let pixelSize = display.minDimension;
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let ctx = canvas.getContext("2d");
  let g = ctx.createRadialGradient(
    pixelSize / 2, pixelSize / 2, pixelSize / 2,
    pixelSize / 2, pixelSize / 2, 0
  );
  g.addColorStop(1, "rgba(0,0,0,0.0)");
  g.addColorStop(0.05, "rgba(0,0,0,0.0)");
  g.addColorStop(0.0, "rgba(255,255,255,1.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, pixelSize, pixelSize);
  sprites.mask = {
    canvas:canvas,
    context:ctx,
    w:pixelSize,
    h:pixelSize,
    pixelSize:pixelSize
  }
}


/***/ }),

/***/ "./src/scripts/draw/sprites/util.js":
/*!******************************************!*\
  !*** ./src/scripts/draw/sprites/util.js ***!
  \******************************************/
/*! exports provided: scaleSprite, colorIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleSprite", function() { return scaleSprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorIndex", function() { return colorIndex; });


function scaleSprite(scale, spriteSize) {
  return ~~(scale * spriteSize);
}

function colorIndex(r, g, b) {
  return (r >> 4 << 8) + (g >> 4 << 4) + (b >> 4);
}



/***/ }),

/***/ "./src/scripts/draw/sprites/voids.js":
/*!*******************************************!*\
  !*** ./src/scripts/draw/sprites/voids.js ***!
  \*******************************************/
/*! exports provided: init, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/scripts/draw/sprites/util.js");



var sprite;

/**
 * Creates a void sprite.
 */
function init(props) {
  let pixelSize = Object(_util__WEBPACK_IMPORTED_MODULE_0__["scaleSprite"])(props.minDimension, 1);
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = pixelSize;
  let ctx = canvas.getContext("2d");
  let g = ctx.createRadialGradient(
    pixelSize / 2, pixelSize / 2, pixelSize / 2,
    pixelSize / 2, pixelSize / 2, 0
  );
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
  g.addColorStop(0.0, "rgba(0,0,0,0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, pixelSize, pixelSize);
  sprite = {
    canvas:canvas,
    context:ctx,
    w:pixelSize,
    h:pixelSize,
    pixelSize:pixelSize
  }
}

function get() {
  return sprite;
}


/***/ }),

/***/ "./src/scripts/draw/ui.js":
/*!********************************!*\
  !*** ./src/scripts/draw/ui.js ***!
  \********************************/
/*! exports provided: drawUIText, draw, writeCentered, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawUIText", function() { return drawUIText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "draw", function() { return draw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeCentered", function() { return writeCentered; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ */ "./src/scripts/draw/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");
/* harmony import */ var _nphyx_pxene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nphyx/pxene */ "../nphyx-pxene/index.js");





let ctx, uiBuffer;
let displayProps;

/**
 * Creates debug markers on screen to show the center, top, left, bottom, right, topleft
 * and topright extremes of the main game area.
 */
const drawDebugMarkers = (function() {
  let w, h, wh, hh;
  return function drawDebugMarkers() {
    w = displayProps.width;
    h = displayProps.height;
    wh = w / 2;
    hh = h / 2;
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx,  0,  0, 4, "yellow", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx, wh,  0, 4, "orange", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx,  w,  0, 4, "red", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx,  0, hh, 4, "white", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx, wh, hh, 4, "gray", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx,  w, hh, 4, "black", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx,  0,  h, 4, "blue", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx, wh,  h, 4, "cyan", 1, "white");
    Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx,  w,  h, 4, "green", 1, "white");
  }
}());

/**
 * Draws an edge button.
 */
function drawEdgeButton(ctx, x, y, w, h) {
  let halfButtonWidth = w * 0.5;
  let buttonHeight = h;
  let cpXScale = w * 0.122;
  let beginX = x - halfButtonWidth;
  let beginY = y;
  let topX = x;
  let topY = y - buttonHeight;
  let endX = x + halfButtonWidth;
  let endY = y;
  let aCPX = beginX + cpXScale;
  let aCPY = beginY - cpXScale;
  let bCPX = beginX + cpXScale;
  let bCPY = topY;
  let cCPX = endX - cpXScale;
  let cCPY = topY;
  let dCPX = endX - cpXScale;
  let dCPY = endY - cpXScale;
  let color = "rgba(255,255,255,0.1)";

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
 * Draws necessary text based on game state.
 */
function drawUIText(game) {
  let alpha, delta, color;
  let w = displayProps.width;
  let h = displayProps.height;
  let err = true;
  let size = 90;
  let curTime = Date.now();
  if(game.started < 0 || game.started > curTime - 1000) {
    delta = game.started > 0 ? curTime - game.started : 0;
    alpha = (1000 - delta) / 1000;
    color = "rgba(255,255,255," + alpha + ")";
    while(err) {
      try {
        ctx.font = size + "px RightBankFLF";
        ctx.fillStyle = color;
        writeCentered(ctx, "PHOTONOMIX", w / 2, h / 2 + size / 2);
        err = false;
      }
      catch(e) {
        err = true;
        size -= 10;
      }
    }
    ctx.font = (size / 3) + "px RightBankFLF";
    ctx.fillStyle = color;
    writeCentered(ctx, "click to start", w / 2, h / 2 + size);
  }
}

function drawPointer() {
  let move = _nphyx_pxene__WEBPACK_IMPORTED_MODULE_2__["controls"].getCursorPosition();
  Object(___WEBPACK_IMPORTED_MODULE_0__["drawCircle"])(ctx, move[0], move[1], 5, "white");
}

/**
 * Draws UI elements.
 */
function draw(game) {
  let w = displayProps.width;
  let h = displayProps.height;
  ctx.clearRect(0, 0, w, h);
  if(_constants__WEBPACK_IMPORTED_MODULE_1__["DEBUG"]) drawDebugMarkers();
  drawUIText(game);
  drawPointer();
}

function writeCentered(ctx, text, x, y) {
  let metrics = ctx.measureText(text);
  if(metrics.width > displayProps.width) throw new Error("text is wider than body");
  ctx.fillText(text, x - metrics.width / 2, y);
}

/**
 * Initializes the UI submodule.
 * @param {Object} display pxene display object initialized with a ui buffer
 */
function init(display) {
  displayProps = display.props;
  uiBuffer = display.buffersByLabel.ui;
  ctx = uiBuffer.context;
}


/***/ }),

/***/ "./src/scripts/game/AntiGravitonCluster.js":
/*!*************************************************!*\
  !*** ./src/scripts/game/AntiGravitonCluster.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AntiGravitonCluster; });
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/scripts/game/index.js");
/* harmony import */ var _photons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./photons */ "./src/scripts/game/photons.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");





const {vec2, times, distance, mut_copy} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"];
const {mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"];

const {random, sqrt, PI, ceil, min, max} = Math;
const POS_C = vec2(0,0);

function AntiGravitonCluster(ipos = vec2(), ivel = vec2(), mass = 1) {
  this.pos = vec2(ipos);
  this.vel = vec2(ivel);
  this.size = 0;
  this.birthMass = this.initialMass = mass;
  this.mass = 1;
  this.instability = 0;
  this.size = 0;
  return this;
}

let scratch = vec2(), entity, i = 0 | 0, len = 0 | 0, dist = 0.0, consume = 0 | 0;
AntiGravitonCluster.prototype.tick = function(entities, delta, frameCount) {
  if(this.birthMass > 0) {
    consume = min(this.birthMass, ceil(this.mass / 10));
    this.birthMass -= consume;
    this.mass += consume;
  }
  this.size = sqrt(this.mass * 0.05 / PI) * _constants__WEBPACK_IMPORTED_MODULE_4__["MOTE_BASE_SIZE"];
  // last turn's move, has to happen first
  mut_plus(this.pos, times(this.vel, delta, scratch));
  this.initialMass = max(this.mass, this.initialMass);

  // apply basic forces
  // don't go off the screen
  mut_plus(this.vel, Object(_util__WEBPACK_IMPORTED_MODULE_1__["avoid"])(this.vel, this.pos, POS_C, 1.3, 0.01, scratch));
  // apply drag
  mut_plus(this.vel, Object(_util__WEBPACK_IMPORTED_MODULE_1__["drag"])(this.vel, _constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_DRAG"]));

  if(this.birthMass === 0) {
    this.instability += this.mass * 0.003;
  }
  if((frameCount % ceil(_constants__WEBPACK_IMPORTED_MODULE_4__["TARGET_FPS"] * 0.05)) === 0) {
    while((this.instability > 0) && (this.mass > 0)) {
      entities.push(this.emitPhoton());
      this.mass -= min(this.mass, 7);
      this.instability -= 0.9;
    }
  }

  for(i = 0, len = entities.length; i < len; ++i) {
    entity = entities[i];
    if(entity === this) continue;
    dist = distance(this.pos, entity.pos);

    if(entity instanceof ___WEBPACK_IMPORTED_MODULE_2__["Void"]) {
      if((dist < (entity.size + this.size) * 0.5)) {
        consume = min(entity.mass, ceil((entity.mass + entity.birthMass) / 10));
        this.mass += consume;
        entity.mass -= consume;
        this.instability += consume * 0.07;
      }
      if(dist < this.size * 10) mut_plus(this.vel, Object(_util__WEBPACK_IMPORTED_MODULE_1__["accelerate"])(this.pos, entity.pos, this.size * dist * 5, scratch));
      return;
    }
  }
}

AntiGravitonCluster.prototype.emitPhoton = (function() {
  let pos = vec2(), vel = vec2(), rot = vec2(), radians = 0.0, mim = 0.0, color = 0 | 0;
  return function emitPhoton() {
    color = ~~(random() * 3);
    pos[0] = this.size * 0.1;
    pos[1] = this.size * 0.1;
    mut_plus(pos, this.pos);
    mut_copy(vel, this.vel);
    mim = (this.mass % this.initialMass);
    radians = (mim / (this.initialMass / 2));
    radians = radians + (mim % 100) * (2 / 100); // split across arms
    mut_copy(rot, Object(_util__WEBPACK_IMPORTED_MODULE_1__["rotate"])(pos, this.pos, radians, pos));
    mut_plus(rot, this.pos);
    mut_plus(pos, rot);
    // introduce some jitter
    mut_plus(vel, Object(_util__WEBPACK_IMPORTED_MODULE_1__["accelerate"])(this.pos, pos, this.size * 2, scratch));
    return(_photons__WEBPACK_IMPORTED_MODULE_3__["pool"].next(pos, vel, color));
  }
}());


/***/ }),

/***/ "./src/scripts/game/Emitter.js":
/*!*************************************!*\
  !*** ./src/scripts/game/Emitter.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Emitter; });
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var _photons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./photons */ "./src/scripts/game/photons.js");
/* harmony import */ var _motes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./motes */ "./src/scripts/game/motes.js");
/* harmony import */ var _Ripple__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Ripple */ "./src/scripts/game/Ripple.js");








let {vec2, vec3, times, mut_times} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"];
let {mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"];
let {random, sqrt, ceil, min, PI} = Math;

const POS_C = vec2(0,0);

/**
 * Emitters are "white holes" that spit out photons on a fixed schedule until depleted.
 */
function Emitter(ipos = vec2(), ivel = vec2(), mass = 1, arms = undefined, ratios = vec3(1, 1, 1)) {
  this.pos = vec2(ipos);
  this.vel = vec2(ivel);
  this.ratios = Object(_util__WEBPACK_IMPORTED_MODULE_2__["norm_ratio"])(ratios);
  this.birthMass = mass;
  this.mass = 1;
  this.initialMass = mass;
  this.arms = arms || (ceil(random() * random() * 50));
  this.size = 0;
  this.next = ~~(random() * 3);
  return this;
}

let scratchVec1 = vec2(), emissionsPerSecond = 0 | 0, emissionsPerFrame = 0 | 0,
  targetFrame = 0 | 0, i = 0 | 0, len = 0 | 0, entity, consume = 0 | 0;
Emitter.prototype.tick = function(entities, delta, frameCount) {
  /* jshint unused:false */
  if(this.birthMass > 0) {
    consume = min(this.birthMass, ceil(this.mass / 100));
    this.birthMass -= consume;
    this.mass += consume;
  }
  this.size = sqrt(this.mass / PI) * _constants__WEBPACK_IMPORTED_MODULE_1__["EMITTER_SIZE"];
  if(this.birthMass === 0) { // don't start producing until finished spawning
    emissionsPerSecond = this.initialMass / 20;
    targetFrame = ceil(_constants__WEBPACK_IMPORTED_MODULE_1__["TARGET_FPS"] / emissionsPerSecond);
    emissionsPerFrame = emissionsPerSecond / _constants__WEBPACK_IMPORTED_MODULE_1__["TARGET_FPS"];
    if(frameCount % targetFrame === 0) {
      while((emissionsPerFrame-- > 0) && this.mass > 0) {
        this.mass--;
        this.emitPhoton();
      }
    }
  }
  // last turn's move, has to happen first
  mut_plus(this.pos, times(this.vel, delta, scratchVec1));
  // apply drag
  mut_plus(this.vel, Object(_util__WEBPACK_IMPORTED_MODULE_2__["drag"])(this.vel, _constants__WEBPACK_IMPORTED_MODULE_1__["GLOBAL_DRAG"]));
  // avoid edge
  mut_plus(this.vel, Object(_util__WEBPACK_IMPORTED_MODULE_2__["avoid"])(this.vel, this.pos, POS_C, 1.3, 0.001, scratchVec1));

  _photons__WEBPACK_IMPORTED_MODULE_3__["eachActive"]((photon) => {
    mut_plus(photon.vel, mut_times(
      Object(_util__WEBPACK_IMPORTED_MODULE_2__["gravitate"])(photon.pos, this.pos, -this.mass * photon.mass, scratchVec1),
      1 / photon.mass)
    );
  });

  _motes__WEBPACK_IMPORTED_MODULE_4__["eachActive"]((mote) => {
    mut_plus(mote.vel, mut_times(
      Object(_util__WEBPACK_IMPORTED_MODULE_2__["gravitate"])(mote.pos, this.pos, -this.mass * mote.mass, scratchVec1),
      1 / mote.mass)
    );
  });

  for(i = 0, len = entities.length; i < len; ++i) {
    entity = entities[i];
    if(entity === this) continue;
    if(entity instanceof Emitter) {
      mut_plus(entity.vel, mut_times(
        Object(_util__WEBPACK_IMPORTED_MODULE_2__["gravitate"])(entity.pos, this.pos, this.mass * entity.mass, scratchVec1),
        1 / entity.mass)
      );
    }
    else if(!(entity instanceof _Ripple__WEBPACK_IMPORTED_MODULE_5__["default"]))  {
      mut_plus(entity.vel, mut_times(
        Object(_util__WEBPACK_IMPORTED_MODULE_2__["gravitate"])(entity.pos, this.pos, -this.mass * entity.mass, scratchVec1),
        1 / entity.mass)
      );
    }
  }
}

Emitter.prototype.emitPhoton = (function() {
  let pos = vec2(), vel = vec2(), radians = 0.0, mim = 0.0, color = 0 | 0;
  return function emitPhoton() {
    color = this.next;
    pos[0] = this.size / 5;
    pos[1] = this.size / 5;
    mut_plus(pos, this.pos);
    mim = (this.mass % this.initialMass);
    radians = (mim / (this.initialMass / 2));
    radians = radians + (mim % this.arms) * (2 / this.arms); // split across arms
    mut_plus(Object(_util__WEBPACK_IMPORTED_MODULE_2__["rotate"])(pos, this.pos, radians, pos), this.pos);
    this.next = getColor(this.ratios);
    _photons__WEBPACK_IMPORTED_MODULE_3__["pool"].next(pos, vel, color);
  }
}());

function getColor(ratios) {
  let rand = random();
  if(rand < ratios[0]) return 0;
  else if(rand < ratios[0] + ratios[1]) return 1;
  else return 2;
}


/***/ }),

/***/ "./src/scripts/game/Marker.js":
/*!************************************!*\
  !*** ./src/scripts/game/Marker.js ***!
  \************************************/
/*! exports provided: MARKER_HIT, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MARKER_HIT", function() { return MARKER_HIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Marker; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");




const MARKER_HIT = 0;

function Marker(type, pos, lifetime = _constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_FPS"]) {
  this.type = type;
  this.pos = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"].vec2(pos);
  this.start = lifetime;
  this.lifetime = lifetime;
}

Marker.prototype.tick = function() {
  this.lifetime--;
}


/***/ }),

/***/ "./src/scripts/game/Ripple.js":
/*!************************************!*\
  !*** ./src/scripts/game/Ripple.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ripple; });
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var _photons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./photons */ "./src/scripts/game/photons.js");
/* harmony import */ var _motes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./motes */ "./src/scripts/game/motes.js");
/* harmony import */ var _Void__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Void */ "./src/scripts/game/Void.js");



let {vec2, mut_times, distance} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"];
let {mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"];




/**
 * Ripples are small bursts that push objects away then expire. Usually spawned by player clicks.
 */
function Ripple(pos = vec2(), mass = 100) {
  this.pos = vec2(pos);
  this.vel = vec2(0,0);
  this.storedMass = 0;
  this.mass = mass;
  return this;
}

let scratchVec1 = vec2(), i = 0 | 0, len = 0 | 0, entity, a_dist = 0.0;
Ripple.prototype.tick = function(entities) {
  if(this.storedMass) {
    this.mass += this.storedMass;
    this.storedMass = 0;
  }
  else this.mass--;
  _photons__WEBPACK_IMPORTED_MODULE_2__["eachActive"]((photon) => {
    a_dist = distance(this.pos, photon.pos);
    if(a_dist < 0.01) photon.lifetime = 0;
    else mut_plus(photon.vel, mut_times(
      Object(_util__WEBPACK_IMPORTED_MODULE_1__["gravitate"])(photon.pos, this.pos, this.mass * 20, scratchVec1),
      1 / photon.mass));
  });
  _motes__WEBPACK_IMPORTED_MODULE_3__["eachActive"]((mote) => {
    mut_plus(mote.vel, mut_times(
      Object(_util__WEBPACK_IMPORTED_MODULE_1__["gravitate"])(mote.pos, this.pos, -this.mass * mote.mass, scratchVec1),
      1 / mote.mass));
  });

  for(i = 0, len = entities.length; i < len; ++i) {
    entity = entities[i];
    if(entity === this) continue;
    a_dist = distance(this.pos, entity.pos);
    // check for stored mass so they don't just swap back and forth forever
    if(entity instanceof Ripple && !entity.storedMass) {
      if(a_dist < 0.005 && a_dist > 0.001) {
        this.storedMass++;
        entity.mass--;
      }
    }
    else if(entity instanceof _Void__WEBPACK_IMPORTED_MODULE_4__["default"]) {
      if(a_dist < 0.0025) {
        entity.birthMass += this.storedMass;
        this.storedMass = 0;
      }
      if((a_dist - entity.size) < 0.01 && this.mass > 90 && this.mass < 100) {
        entity.mass--;
      }
      this.storedMass = 0;
    }
    else {
      mut_plus(entity.vel, mut_times(
        Object(_util__WEBPACK_IMPORTED_MODULE_1__["gravitate"])(entity.pos, this.pos, -this.mass * entity.mass, scratchVec1),
        1 / entity.mass));
    }
  }
}


/***/ }),

/***/ "./src/scripts/game/Void.js":
/*!**********************************!*\
  !*** ./src/scripts/game/Void.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Void; });
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/scripts/game/index.js");
/* harmony import */ var _photons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./photons */ "./src/scripts/game/photons.js");
/* harmony import */ var _motes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./motes */ "./src/scripts/game/motes.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");








const {vec2, times, mut_times, distance} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"];
const {mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"];
const {random, sqrt, PI, ceil, min} = Math;
const POS_C = vec2(0,0);

function Void(ipos = vec2(), ivel = vec2(), mass = 1) {
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
  if(Object(_util__WEBPACK_IMPORTED_MODULE_1__["outOfBounds"])(this.pos, 1.3)) {
    this.mass = this.mass - 1;
  }
  this.size = sqrt(this.mass / PI) * _constants__WEBPACK_IMPORTED_MODULE_5__["VOID_SIZE"];
  // last turn's move, has to happen first
  mut_plus(this.pos, times(this.vel, delta, scratchVec1));

  // apply basic forces
  // don't go off the screen
  mut_plus(this.vel, Object(_util__WEBPACK_IMPORTED_MODULE_1__["avoid"])(this.vel, this.pos, POS_C, 1.3, 0.01, scratchVec1));
  // apply drag
  mut_plus(this.vel, Object(_util__WEBPACK_IMPORTED_MODULE_1__["drag"])(this.vel, _constants__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_DRAG"]));
  Object(_util__WEBPACK_IMPORTED_MODULE_1__["limitVecMut"])(this.vel, 0, 1);

  _photons__WEBPACK_IMPORTED_MODULE_3__["eachActive"]((photon) => {
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
      Object(_util__WEBPACK_IMPORTED_MODULE_1__["gravitate"])(photon.pos, this.pos, photon.mass * this.mass, scratchVec1),
      (1 / photon.mass))
    );
  });

  _motes__WEBPACK_IMPORTED_MODULE_4__["eachActive"]((mote) => {
    a_dist = distance(this.pos, mote.pos);
    if(a_dist < this.size * 0.6) {
      // probablistic injury, so they don't get shredded instantly
      if((random() * 30 * a_dist) < 1) mote.injured = mote.injured + 1;
    }
    mut_plus(mote.vel, mut_times(
      Object(_util__WEBPACK_IMPORTED_MODULE_1__["gravitate"])(mote.pos, this.pos, mote.mass * this.mass, scratchVec1),
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
    if(entity instanceof ___WEBPACK_IMPORTED_MODULE_2__["Emitter"]) { // emitters have negative & repelling mass
      mut_plus(entity.vel, mut_times(
        Object(_util__WEBPACK_IMPORTED_MODULE_1__["gravitate"])(entity.pos, this.pos, (this.mass / entity.mass), scratchVec1),
        (1 / entity.mass))
      );
    }
    else if(!(entity instanceof ___WEBPACK_IMPORTED_MODULE_2__["AntiGravitonCluster"])) {
      mut_plus(entity.vel, mut_times(
        Object(_util__WEBPACK_IMPORTED_MODULE_1__["gravitate"])(entity.pos, this.pos, entity.mass * this.mass, scratchVec1),
        (1 / entity.mass))
      );
    }
  }
}


/***/ }),

/***/ "./src/scripts/game/index.js":
/*!***********************************!*\
  !*** ./src/scripts/game/index.js ***!
  \***********************************/
/*! exports provided: Void, Emitter, Marker, motes, photons, AntiGravitonCluster, Ripple, registerType, Game, emitPhoton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerType", function() { return registerType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitPhoton", function() { return emitPhoton; });
/* harmony import */ var _Void__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Void */ "./src/scripts/game/Void.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Void", function() { return _Void__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Emitter */ "./src/scripts/game/Emitter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return _Emitter__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Marker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Marker */ "./src/scripts/game/Marker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Marker", function() { return _Marker__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _motes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./motes */ "./src/scripts/game/motes.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "motes", function() { return _motes__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _photons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./photons */ "./src/scripts/game/photons.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "photons", function() { return _photons__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _Ripple__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Ripple */ "./src/scripts/game/Ripple.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ripple", function() { return _Ripple__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../draw */ "./src/scripts/draw/index.js");
/* harmony import */ var _AntiGravitonCluster__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AntiGravitonCluster */ "./src/scripts/game/AntiGravitonCluster.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AntiGravitonCluster", function() { return _AntiGravitonCluster__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _nphyx_pxene__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @nphyx/pxene */ "../nphyx-pxene/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");














const {minus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_9__["matrices"];
const {vec2, mut_copy} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_9__["vectors"];
const marks = new Uint16Array(_constants__WEBPACK_IMPORTED_MODULE_11__["MAX_MOTES"] + _constants__WEBPACK_IMPORTED_MODULE_11__["MAX_PHOTONS"] + 100);

let {random} = Math;
let markpos = 0;
let mark = 0;

const ENTITY_TYPES = {};



/**
 * TODO: change these functions out with proper factories.
 */
function registerType(name, constructor) {
  ENTITY_TYPES[name] = function() {
    return new (Function.prototype.bind.apply(constructor, arguments))();
  }
}

registerType("void", _Void__WEBPACK_IMPORTED_MODULE_0__["default"]);
registerType("emitter", _Emitter__WEBPACK_IMPORTED_MODULE_1__["default"]);
registerType("marker", _Marker__WEBPACK_IMPORTED_MODULE_2__["default"]);
registerType("ripple", _Ripple__WEBPACK_IMPORTED_MODULE_5__["default"]);
registerType("antiGravitonCluster", _AntiGravitonCluster__WEBPACK_IMPORTED_MODULE_7__["default"]);

function Game() {
  _nphyx_pxene__WEBPACK_IMPORTED_MODULE_10__["controls"].map("ripple", "mouse0");
  this.entities = [];
  this.stats = {
    pop:0,
    born:0,
    died:0,
    target:0
  }
  this.actions = {};
  this.registerActions();
  this.started = -1;
  this.clickCooldown = 0;
  return this;
}

Game.prototype.start = function() {
  for(let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_11__["START_POP"]; ++i) {
    _motes__WEBPACK_IMPORTED_MODULE_3__["createRandom"]();
  }
  this.started = Date.now();
}

Game.prototype.tick = (function() {
  let entities, entity, i = 0 | 0, len = 0 | 0, tick_delta = 0.0, cursorPos = vec2();
  return function tick(timing) {
    if(this.clickCooldown === 0) {
      if(_nphyx_pxene__WEBPACK_IMPORTED_MODULE_10__["controls"].lookupMap("ripple").isDown()) {
        Object(_draw__WEBPACK_IMPORTED_MODULE_6__["gameSpaceVec"])(_nphyx_pxene__WEBPACK_IMPORTED_MODULE_10__["controls"].getCursorPosition(), cursorPos);
        this.spawn("ripple", cursorPos);
        this.clickCooldown = 3;
      }
    }
    else this.clickCooldown--;
    let delta = timing.interval / timing.elapsed;
    let frameCount = timing.frameCount;
    entities = this.entities;
    this.stats.target = 0;
    this.stats.pop = 0;
    tick_delta = delta / _constants__WEBPACK_IMPORTED_MODULE_11__["TARGET_FPS"];
    try {
      _photons__WEBPACK_IMPORTED_MODULE_4__["tick"](this.entities, tick_delta, frameCount);
      _motes__WEBPACK_IMPORTED_MODULE_3__["tick"](this.entities, tick_delta, frameCount);
    }
    catch(e) {
      console.error(e)
      return
    }
    for(i = 0, len = entities.length; i < len; ++i) {
      entity = entities[i];
      entity.tick(this.entities, tick_delta, frameCount);
      // do mote-specific stuff
      if(entity.type === _constants__WEBPACK_IMPORTED_MODULE_11__["TYPE_MOTE"]) {
        /*
				this.stats.pop++;
				if(entity.target) this.stats.target++;
				if(entity.injured) {
					if(frameCount % ~~(TARGET_FPS*0.1) === 0) {
						//this.entities.push(entity.bleed());
						entity.bleed();
					}
				}
				// mark dead for removal
				if(entity.dying === DEATH_THRESHOLD) {
					this.killMote(entity);
					marks[markpos] = i;
					this.stats.died++;
					markpos++;
				}
				else if(entity.pregnant === PREGNANT_TIME) {
					this.entities.push(entity.split());
					this.stats.born++;
				}
				*/
        throw new Error("Motes should no longer end up in the general entity pool");
      }
      else if(entity instanceof _Ripple__WEBPACK_IMPORTED_MODULE_5__["default"]) {
        if(entity.mass > 250) {
          this.spawn("void", entity.pos, [0,0], 100);
          entity.mass = 0;
        }
        if(entity.mass <= 0) {
          marks[markpos] = i;
          markpos++;
        }
      }
      else if(entity.mass <= 0) {
        marks[markpos] = i;
        markpos++;
      }
      // physics effects sometimes chuck things way out of bounds
      // just delete them, they ain't comin' back
      if(Object(_util__WEBPACK_IMPORTED_MODULE_8__["outOfBounds"])(entity.pos, 20)) {
        marks[markpos] = i;
        markpos++;
      }
    }

    // sweep dead
    while(markpos > 0) {
      markpos--;
      mark = marks[markpos];
      entity = entities[mark];
      if(entity && (entity.pool !== undefined)) {
        entity.destroy();
      }
      entities.splice(mark, 1);
      marks[markpos] = 0;
    }

    // shuffling helps action lock issues and reduces first in list advantage
    //shuffle(entities);
  }
}());

const emitPhoton = (function() {
  let pos = vec2(), vel = vec2(), center = vec2(), p_c = 0,
    base_vel = vec2(0.05, 0.05);
  return function emitPhoton(ipos, ivel, color, count = p_c, max = 12) {
    ipos = ipos || [random() * 1.8 - 0.9, random() * 1.8 - 0.9];
    if(ivel) {
      mut_copy(vel, ivel);
    }
    else {
      mut_copy(vel, base_vel);
      Object(_util__WEBPACK_IMPORTED_MODULE_8__["rotate"])(vel, center, ((p_c % max) / (max / 2)), vel);
    }
    color = color || ~~(random() * 3);
    mut_copy(pos, ipos);
    _photons__WEBPACK_IMPORTED_MODULE_4__["pool"].next(pos, vel, color);
    p_c++;
    return color;
  }
}());

Game.prototype.spawn = function() {
  let args = Array.prototype.slice.apply(arguments);
  let type = args.shift();
  if(ENTITY_TYPES[type]) {
    this.entities.push(ENTITY_TYPES[type].apply(null, arguments));
  }
}

/**
 * Actions are callbacks accepting the following parameters:
 * @param {vec2} center center of the click region for the action (i.e. the UI element)
 * @param {float} dist the distance from region center to mouseUp position
 */
Game.prototype.registerAction = function(name, callback) {
  this.actions[name] = callback.bind(this);
}

let delta = vec2();
Game.prototype.registerActions = function() {
  this.registerAction("launchAntiGravitonCluster", function(center) {
    minus(this.player.mouseUp, center, delta);
    this.entities.push(new _AntiGravitonCluster__WEBPACK_IMPORTED_MODULE_7__["default"](center, delta, 148));
  });
}


/***/ }),

/***/ "./src/scripts/game/motes.actions.js":
/*!*******************************************!*\
  !*** ./src/scripts/game/motes.actions.js ***!
  \*******************************************/
/*! exports provided: ACT_IDLE, ACT_SEARCH, ACT_CHASE, ACT_AVOID, ACT_ATTACK, ACT_LINK, death_count, birth_count, updateProperties, runMaintenance, validateTarget, search, injure, discharge, bleed, split, eatPhoton, die */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACT_IDLE", function() { return ACT_IDLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACT_SEARCH", function() { return ACT_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACT_CHASE", function() { return ACT_CHASE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACT_AVOID", function() { return ACT_AVOID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACT_ATTACK", function() { return ACT_ATTACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACT_LINK", function() { return ACT_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "death_count", function() { return death_count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "birth_count", function() { return birth_count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProperties", function() { return updateProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runMaintenance", function() { return runMaintenance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTarget", function() { return validateTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "search", function() { return search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injure", function() { return injure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "discharge", function() { return discharge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bleed", function() { return bleed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "split", function() { return split; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eatPhoton", function() { return eatPhoton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "die", function() { return die; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ */ "./src/scripts/game/index.js");
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var _photons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./photons */ "./src/scripts/game/photons.js");
/* harmony import */ var _motes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./motes */ "./src/scripts/game/motes.js");








const {vec2, times, mut_clamp, distance, mut_copy, mut_times} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"]
const {mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["matrices"]
const {random, max, min, floor, ceil} = Math
const scratch1 = vec2()

// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
const POS_C  = vec2(0.0, 0.0)

// activity type constants
const ACT_IDLE   = 0
const ACT_SEARCH = 1
const ACT_CHASE  = 2
const ACT_AVOID  = 3
const ACT_ATTACK = 4
const ACT_LINK   = 5
var death_count = 0
var birth_count = 0

/**
 * Updates derived properties for mote.
 */
const updateProperties = (() => {
  let  photons, color, ratios
  return function updateProperties(mote) {
    ({photons, ratios, color} = mote)
    mote.mass = photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]]  +  photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]]  +  photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]]
    mote.size = mut_clamp(mote.mass / (_constants__WEBPACK_IMPORTED_MODULE_2__["PREGNANT_THRESHOLD"] / 3) * _constants__WEBPACK_IMPORTED_MODULE_2__["MOTE_BASE_SIZE"], mote.sizeMin, mote.sizeMax)
    Object(_util__WEBPACK_IMPORTED_MODULE_3__["norm_ratio"])(photons, ratios)
    mote.speed = mote.base_speed * (1 - mote.size) * (1 + ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]])
    mote.sight = mote.base_sight + (mote.size * 0.5)  // see from edge onward
    mote.agro = mote.base_agro * (1 + ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]])
    mote.fear = mote.base_fear * (1 + ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]])
    if(_constants__WEBPACK_IMPORTED_MODULE_2__["DEBUG"]) {
      if(isNaN(mote.speed)) throw new Error("updateProperties: NaN speed")
      if(isNaN(mote.sight)) throw new Error("updateProperties: NaN sight")
      if(isNaN(mote.size)) throw new Error("updateProperties: NaN size")
      if(isNaN(mote.agro)) throw new Error("updateProperties: NaN agro")
      if(isNaN(mote.fear)) throw new Error("updateProperties: NaN fear")
    }

    if((mote.mass > _constants__WEBPACK_IMPORTED_MODULE_2__["PREGNANT_THRESHOLD"]) && mote.pregnant === 0) mote.pregnant = _constants__WEBPACK_IMPORTED_MODULE_2__["PREGNANT_TIME"]
    if((mote.mass < _constants__WEBPACK_IMPORTED_MODULE_2__["DEATH_THRESHOLD"]) && mote.dying === 0) mote.dying = 1
    if(_motes__WEBPACK_IMPORTED_MODULE_5__["current_population"] >= _constants__WEBPACK_IMPORTED_MODULE_2__["MAX_MOTES"]) mote.pregnant = 0 // can't have a baby, dang population controls!

    color[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] = ~~(ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] * 255)
    color[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] = ~~(ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] * 255)
    color[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] = ~~(ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] * 255)
    mote.needsUpdate = 0
  }
})()

/**
 * Maintenance tasks to be done each tick
 */
const runMaintenance = (function() {
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
    mut_plus(vel, Object(_util__WEBPACK_IMPORTED_MODULE_3__["avoid"])(vel, pos, POS_C, 1.3, speed, scratch1))
    // apply drag
    mut_plus(vel, Object(_util__WEBPACK_IMPORTED_MODULE_3__["drag"])(vel, _constants__WEBPACK_IMPORTED_MODULE_2__["GLOBAL_DRAG"]))
  }
}())

/**
 * Checks if a target is valid.
 * @param {Object} entity any game object that can be targeted
 * @return {float} distance if valid, otherwise -1
 */
const validateTarget = (function() {
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
    if(Object(_util__WEBPACK_IMPORTED_MODULE_3__["outOfBounds"])(entity, 0.7)) return -1
    return dist
  }
}())

/**
 * Search for a target and decide how to act toward it.
 */
const search = (function() {
  let cur = 0.0, highest, deltar = 0.0, deltag = 0.0, deltab = 0.0, mind = 0.0,
    maxd = 0.0, weight = 0.0
  return function search(mote, pool) {
    highest = -Infinity
    if(mote.pregnant || mote.dying) {
      mote.action = ACT_IDLE
      highest = Infinity
    }

    // check out photons
    _photons__WEBPACK_IMPORTED_MODULE_4__["eachActive"]((photon) => {
      let dist = mote.validateTarget(photon)
      if(dist === -1) return
      if(photon.lifetime < 4) return
      deltar = (mote.prefs[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] - mote.ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]])
      deltag = (mote.prefs[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] - mote.ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]])
      deltab = (mote.prefs[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] - mote.ratios[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]])
      maxd = max(deltar, deltag, deltab)
      mind = min(deltar, deltag, deltab)
      if((maxd == deltar && photon.color == _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]) ||
         (maxd == deltag && photon.color == _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]) ||
         (maxd == deltab && photon.color == _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"])) weight = 30
      if((mind == deltar && photon.color == _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]) ||
         (mind == deltag && photon.color == _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]) ||
         (mind == deltab && photon.color == _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"])) weight = 10
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
const injure = function(mote, attacker, strength) {
  mote.injured += strength
  mote.lastInjury = mote.injured
  if(mote.resistance < (mote.agro * 3) ||
    mote.injured < mote.fear
  ) mote.mote = attacker
}

/**
 * Discharges a bolt of plasma at a target.
 */
const discharge = function(mote, target) {
  let delta = mote.potential - target.resistance
  target.resistance -= max(mote.agro, delta * mote.agro)
  mote.potential -= max(mote.fear, delta * mote.fear)
  injure(target, mote, max(0, ~~(delta)))
  if(mote.potential < 0) mote.action = ACT_IDLE
}

/**
 * When motes are damaged they bleed out photons until the damage equalizes.
 */
const bleed = (function() {
  let choice = 0 | 0, choiceVal = 0 | 0, pvel = vec2(), colors
  return function bleed(mote) {
    colors = mote.photons
    do {
      choice = ~~(random() * 3)
      switch(choice) {
        case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]: choiceVal = colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]]; break
        case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]: choiceVal = colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]]; break
        case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]: choiceVal = colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]]; break
      }
    } while (choiceVal === 0)
    switch(choice) {
      case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]: colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] = colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] - 1; break
      case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]: colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] = colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] - 1; break
      case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]: colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] = colors[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] - 1; break
    }
    mote.injured--
    mut_times(mote.vel, 1 + mote.speed)
    mut_copy(pvel, mote.vel)
    mut_times(pvel, -1)
    mote.needsUpdate = 1
    _photons__WEBPACK_IMPORTED_MODULE_4__["pool"].next(mote.pos, pvel, choice)
    //return choice
  }
}())

/**
 * A mote that reaches the pregnancy threshold will split into two semi-identical motes.
 * @param {mote} mote to be split
 */
const split = (function() {
  let baby, photons
  return function split(mote, pool) {
    photons = mote.photons
    baby = pool.allocate(
      [floor(photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] / 2), floor(photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] / 2), floor(photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] / 2)],
      mote.pos, mote.base_speed, mote.base_sight, mote.base_agro,
      mote.base_fear)
    photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] = ceil(photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] / 2)
    photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] = ceil(photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] / 2)
    photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] = ceil(photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] / 2)
    mote.pregnant = _constants__WEBPACK_IMPORTED_MODULE_2__["PREGNANT_TIME"] - 1
    baby.pregnant = _constants__WEBPACK_IMPORTED_MODULE_2__["PREGNANT_TIME"] - 1
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
const eatPhoton = (function() {
  let photons
  return function eatPhoton(mote, photon) {
    if(photon.lifetime > 2 && distance(mote.pos, photon.pos) < mote.sight) {
      photons = mote.photons
      photon.lifetime = 2
      switch(photon.color) {
        case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]: photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_R"]] += 1; break
        case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]: photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_G"]] += 1; break
        case _photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]: photons[_photons__WEBPACK_IMPORTED_MODULE_4__["COLOR_B"]] += 1; break
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
const die = function(mote, pool) {
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
    Object(___WEBPACK_IMPORTED_MODULE_0__["emitPhoton"])(mote.pos, undefined, c, i, sum)
  }
  pool.freeIndex(mote.poolIndex)
  death_count++
}


/***/ }),

/***/ "./src/scripts/game/motes.js":
/*!***********************************!*\
  !*** ./src/scripts/game/motes.js ***!
  \***********************************/
/*! exports provided: current_population, pool, createRandom, tick, eachActive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "current_population", function() { return current_population; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pool", function() { return pool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRandom", function() { return createRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eachActive", function() { return eachActive; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _nphyx_valloc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nphyx/valloc */ "../nphyx-valloc/index.js");
/* harmony import */ var _nphyx_vanderpool_src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nphyx/vanderpool/src */ "../nphyx-vanderpool/src/index.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var _motes_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./motes.actions */ "./src/scripts/game/motes.actions.js");









const {vec2, times, magnitude, mut_copy} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["vectors"]
const {plus, mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_1__["matrices"]
let {random, sin} = Math

// Center of the playfield is at 0,0 (ranging from -1 to 1 on X and Y axis)
const POS_C  = vec2(0.0, 0.0)

// twiddle to slightly offset the values, avoids divide by zero and other errors
// inherent to acceleration, friction, drag and gravity equations
Object(_util__WEBPACK_IMPORTED_MODULE_4__["twiddleVec"])(POS_C)
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
const [U8_PHO, U8_COL] = int_vec_lengths.map(_util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].i8)
const U8_VEC_LENGTH = sum(int_vec_lengths)

const I8_VAL_OFFSET = _util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].offset
const int_val_lengths = new Array(8).fill(1)
const [I8_PREG, I8_INJURED, I8_LAST_INJURY, I8_MEAL, I8_UPD , I8_PULSE, I8_ACT, I8_DYING] =
  int_val_lengths.map(_util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].i8)
const I8_VAL_LENGTH = sum(int_val_lengths)

_util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].round32()
const float_vec_lengths = [2,2,3,3]
const F32_VEC_OFFSET = _util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].offset
const [F32_POS, F32_VEL, F32_RAT, F32_PREF] = float_vec_lengths.map(_util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].f32)
const F32_VEC_LENGTH = sum(float_vec_lengths)

const F32_VAL_OFFSET = _util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].offset
const float_val_lengths = new Array(14).fill(1)
const [F32_SIZE, F32_SIZE_MIN, F32_SIZE_MAX, F32_SPEED, F32_SIGHT, F32_AGRO,
  F32_FEAR, F32_BASE_SPEED, F32_BASE_SIGHT, F32_BASE_AGRO, F32_BASE_FEAR,
  F32_POTENTIAL, F32_RESISTANCE, F32_MASS] = float_val_lengths.map(_util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].f32)
const F32_VAL_LENGTH = sum(float_val_lengths)

// scratch vectors used in various functions
const scratch1 = vec2(), scratch2 = vec2()

console.log('item length', _util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].offset, 'max motes', _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_MOTES"])
console.log('           ', 'U8', 'I8', 'VEC', 'VAL')
console.log('offsets    ', U8_VEC_OFFSET, I8_VAL_OFFSET, F32_VEC_OFFSET, F32_VAL_OFFSET)
console.log('first item ', U8_PHO, I8_PREG, F32_POS, F32_SIZE)
console.log('lengths    ', U8_VEC_LENGTH, I8_VAL_LENGTH, F32_VEC_LENGTH, F32_VAL_LENGTH)
console.log('pool length', _util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].offset)
const BUFFER_POOL = new _nphyx_vanderpool_src__WEBPACK_IMPORTED_MODULE_3__["default"](_util__WEBPACK_IMPORTED_MODULE_4__["offsetter"].offset, _constants__WEBPACK_IMPORTED_MODULE_0__["MAX_MOTES"])
var current_population = 0

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
    type: {get: () => _constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_MOTE"]},
    poolIndex: {get: () => poolIndex},
    active: {get: () => active, set: (v) => !!v}
  })

  /*
   * Debug access only.
   */
  if(_constants__WEBPACK_IMPORTED_MODULE_0__["DEBUG"]) Object.defineProperties(mote, {
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
function init(mote, photons = new Uint8Array(3), pos = new Float32Array(2), bSpeed = _constants__WEBPACK_IMPORTED_MODULE_0__["MOTE_BASE_SPEED"], bSight = _constants__WEBPACK_IMPORTED_MODULE_0__["MOTE_BASE_SIGHT"], bAgro = 1.0, bFear = 1.0) {
  mut_copy(mote.pos, pos)
  mut_copy(mote.photons, photons)

  // set up initial and derived values
  mote.base_speed = bSpeed + Object(_util__WEBPACK_IMPORTED_MODULE_4__["adjRand"])(0.0005)
  mote.base_sight = bSight + Object(_util__WEBPACK_IMPORTED_MODULE_4__["adjRand"])(0.001)
  mote.base_agro = bAgro + Object(_util__WEBPACK_IMPORTED_MODULE_4__["adjRand"])(0.001)
  mote.base_fear = bFear + Object(_util__WEBPACK_IMPORTED_MODULE_4__["adjRand"])(0.001)
  mote.potential = mote.agro * 2
  mote.resistance = mote.fear * 2
  mote.lastMeal = ~~(random() * 3)
  mote.pulse = ~~(_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_FPS"] * random())
  mote.size = _constants__WEBPACK_IMPORTED_MODULE_0__["MOTE_BASE_SIZE"]
  mote.sizeMin = _constants__WEBPACK_IMPORTED_MODULE_0__["MOTE_BASE_SIZE"] * 0.5
  mote.sizeMax = _constants__WEBPACK_IMPORTED_MODULE_0__["MOTE_BASE_SIZE"] * 3
  mote.active = true

  Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["updateProperties"])(mote)

  // only set the preferred color ratios once, since we want them to persist from birth
  mut_copy(mote.prefs, mote.ratios)
}

const pool = _nphyx_valloc__WEBPACK_IMPORTED_MODULE_2__["create"](_constants__WEBPACK_IMPORTED_MODULE_0__["MAX_MOTES"], {factory, init, clean})

/**
 * Generates mote with randomized position and photon values.
 */
const createRandom = (function () {
  const rpos = new Float32Array(2)
  const rphotons = new Uint8ClampedArray(3)
  return function createRandom() {
    console.log('creating random mote')
    do {
      rpos[0] = random() * Object(_util__WEBPACK_IMPORTED_MODULE_4__["posneg"])()
      rpos[1] = random() * Object(_util__WEBPACK_IMPORTED_MODULE_4__["posneg"])()
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
const tick = function(entities, delta, frameCount) {
  let dist
  pool.eachActive(mote => {
    let {pos, vel, sight, speed, fear, target} = mote
    Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["runMaintenance"])(mote, delta)

    // validate current target
    if(target && (dist = mote.validateTarget(target)) === -1) {
      mote.action = _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_IDLE"]
    }

    switch(mote.action) {
      case _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_IDLE"]: // lost target, gave up, or completed task
        mote.target = undefined
        if(magnitude(vel) < 0.001) { // not going anywhere, so pick a random direction
          scratch1[0] = random() * 2 - 1
          scratch1[1] = random() * 2 - 1
        }
        else {
          mut_copy(scratch1, pos)
          mut_plus(scratch1, times(vel, delta, scratch2))
          mut_plus(scratch1, Object(_util__WEBPACK_IMPORTED_MODULE_4__["rotate"])(scratch1, pos, sin((frameCount + mote.pulse) * speed), scratch2))
        }
        mut_plus(vel, Object(_util__WEBPACK_IMPORTED_MODULE_4__["accelerate"])(pos, scratch1, speed, scratch2))
        mote.action = _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_SEARCH"]
        break
      case _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_CHASE"]: // chasing a target
        // predict target's next move
        plus(target.pos, times(target.vel, delta, scratch1), scratch2)
        mut_plus(vel, Object(_util__WEBPACK_IMPORTED_MODULE_4__["accelerate"])(pos, scratch2, speed, scratch1))
        if(dist < sight) {
          if(target.type === _constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_MOTE"]  && mote.potential > mote.agro * 3)
            mote.action = _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_ATTACK"]
          else mote.action = _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_ATTACK"]
        }
        break
      case _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_AVOID"]: // avoiding a target
        // predict target's next move
        plus(target.pos, times(target.vel, delta, scratch1), scratch2)
        mut_plus(vel, Object(_util__WEBPACK_IMPORTED_MODULE_4__["accelerate"])(scratch2, pos, speed, scratch1))
        if(mote.resistance > fear * 3) mote.action = _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_IDLE"]
        break
      case _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_ATTACK"]: // attacking a target
        if(target.type ===  _constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_MOTE"]) Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["discharge"])(mote, target)
        else if(target.type === _constants__WEBPACK_IMPORTED_MODULE_0__["TYPE_PHOTON"]) Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["eatPhoton"])(mote, target)
        break
      case _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_LINK"]: // linking with a target
        break
      case _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_SEARCH"]:
        if(!Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["search"])(mote, pool)) mote.action = _motes_actions__WEBPACK_IMPORTED_MODULE_5__["ACT_IDLE"]
        break
      default:
        break
    } // end action switch

    if(mote.injured) {
      if(frameCount % ~~(_constants__WEBPACK_IMPORTED_MODULE_0__["TARGET_FPS"] * 0.1) === 0) {
        Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["bleed"])(mote)
      }
    }
    // mark dead for removal
    if(mote.dying === _constants__WEBPACK_IMPORTED_MODULE_0__["DEATH_THRESHOLD"]) {
      Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["die"])(mote)
    }
    else if(mote.pregnant === _constants__WEBPACK_IMPORTED_MODULE_0__["PREGNANT_TIME"]) {
      Object(_motes_actions__WEBPACK_IMPORTED_MODULE_5__["split"])(mote, pool)
    }
  }) // end eachActive mote
}

const eachActive = pool.eachActive


/***/ }),

/***/ "./src/scripts/game/photons.js":
/*!*************************************!*\
  !*** ./src/scripts/game/photons.js ***!
  \*************************************/
/*! exports provided: BUFFER_LENGTH, COLOR_R, COLOR_G, COLOR_B, pool, eachActive, tick, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUFFER_LENGTH", function() { return BUFFER_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_R", function() { return COLOR_R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_G", function() { return COLOR_G; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_B", function() { return COLOR_B; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pool", function() { return pool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eachActive", function() { return eachActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _nphyx_valloc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nphyx/valloc */ "../nphyx-valloc/index.js");
/* harmony import */ var _bufferPools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bufferPools */ "./src/scripts/bufferPools.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/scripts/util.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/scripts/constants.js");






let {vec2, times, mut_copy} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"];
let {mut_plus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"];
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
const BUFFER_LENGTH = (FLOAT_LENGTH + U8_LENGTH) + (F32 - (FLOAT_LENGTH + U8_LENGTH) % F32);
const COLOR_R = 0, COLOR_G = 1, COLOR_B = 2;

const BUFFER_POOL = new _bufferPools__WEBPACK_IMPORTED_MODULE_2__["BufferPool"](BUFFER_LENGTH, _constants__WEBPACK_IMPORTED_MODULE_4__["MAX_PHOTONS"]);

const pool = _nphyx_valloc__WEBPACK_IMPORTED_MODULE_1__["create"](_constants__WEBPACK_IMPORTED_MODULE_4__["MAX_PHOTONS"], {
  factory:(i) => create(i),
  init:(photon, ipos, ivel, color) => {
    mut_copy(photon.pos, ipos)
    mut_copy(photon.vel, ivel)
    photon.lifetime = _constants__WEBPACK_IMPORTED_MODULE_4__["PHOTON_LIFETIME"]
    photon.size = _constants__WEBPACK_IMPORTED_MODULE_4__["PHOTON_BASE_SIZE"]
    photon.color = color
    photon.mass = 1
    photon.pulse = ~~(_constants__WEBPACK_IMPORTED_MODULE_4__["TARGET_FPS"] * random())
    photon.active = true
  },
  clean:(photon) => {
    photon.pos.fill(0.0)
    photon.vel.fill(0.0)
    photon.intVals.fill(0)
    photon.active = false
  }
})

const eachActive = pool.eachActive

function tick(surrounding, delta) {
  let tmpvec = vec2()
  pool.eachActive((photon, i) => {
    if(photon.lifetime > 0) photon.lifetime--
    mut_plus(photon.pos, times(photon.vel, delta, tmpvec))
    mut_plus(photon.vel, Object(_util__WEBPACK_IMPORTED_MODULE_3__["drag"])(photon.vel, _constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_DRAG"]))
    if(photon.lifetime <= 0) pool.freeIndex(i)
  })
}

function create(index) {
  const buffer = BUFFER_POOL.buffer
  const offset = BUFFER_POOL.allocate()
  const photon = {}
  const intVals = new Uint8ClampedArray(buffer, FLOAT_LENGTH + offset, U8_LENGTH)
  let active = false

  Object.defineProperties(photon, {
    index: {get: () => index},
    type: {get:() => _constants__WEBPACK_IMPORTED_MODULE_4__["TYPE_PHOTON"]},
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


/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/*! exports provided: startGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startGame", function() { return startGame; });
/* harmony import */ var _nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/pxene */ "../nphyx-pxene/index.js");
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw */ "./src/scripts/draw/index.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/scripts/game/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/scripts/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./src/scripts/util.js");







const displayConfig = {
  container:"body",
  bufferDescriptions:[
    {label:"bokehBack", compositeMethod:"source-over", scaleMethod:_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"].buffers.SCALE_KEEP_ASPECT},
    {label:"bokehFront", compositeMethod:"lighter", scaleMethod:_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"].buffers.SCALE_NONE},
    {label:"entitiesLight", compositeMethod:"lighter", scaleMethod:_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"].buffers.SCALE_NONE},
    {label:"entitiesDark", compositeMethod:"hard-light", scaleMethod:_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"].buffers.SCALE_NONE},
    {label:"ui", compositeMethod:"source-over", scaleMethod:_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"].buffers.SCALE_NONE}

  ],
  pixelRatio:1,
  frameCallback:main,
  fullscreen:_constants__WEBPACK_IMPORTED_MODULE_3__["AUTO_FULLSCREEN"]
}

var photonomix = {
  util:_util__WEBPACK_IMPORTED_MODULE_4__,
  constants:_constants__WEBPACK_IMPORTED_MODULE_3__,
  controls:_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["controls"],
  display:_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"],
  game:_game__WEBPACK_IMPORTED_MODULE_2__,
  draw:_draw__WEBPACK_IMPORTED_MODULE_1__,
  state:{}
}

window.photonomix = photonomix;

window.addEventListener("load", function() {
  photonomix.state.game = new _game__WEBPACK_IMPORTED_MODULE_2__["Game"]();
  _nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"].init(displayConfig);
  _draw__WEBPACK_IMPORTED_MODULE_1__["init"](photonomix.state, _nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"]);
  _nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["controls"].init();
  document.querySelector(displayConfig.container).addEventListener("click", startGame);
});

function main() {
  if(photonomix.state.game.started) photonomix.state.game.tick(_nphyx_pxene__WEBPACK_IMPORTED_MODULE_0__["display"].timing);
  photonomix.draw.tick();
}

/**
 * Starts up the game.
 */
function startGame() {
  let container = document.querySelector(displayConfig.container);
  photonomix.state.game.start();
  container.removeEventListener("click", startGame);
  container.classList.remove("start");
  console.log("game started");
}


/***/ }),

/***/ "./src/scripts/util.js":
/*!*****************************!*\
  !*** ./src/scripts/util.js ***!
  \*****************************/
/*! exports provided: twiddle, twiddleVec, validate, dist, limitVecMut, gravitate, accelerate, drag, avoid, absVec, outOfBounds, logisticSmooth, adjRand, rotate, posneg, clamp, ratio, rat_vec2, norm_ratio, shuffle, evenNumber, offsetter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twiddle", function() { return twiddle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twiddleVec", function() { return twiddleVec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitVecMut", function() { return limitVecMut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gravitate", function() { return gravitate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "accelerate", function() { return accelerate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drag", function() { return drag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avoid", function() { return avoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absVec", function() { return absVec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outOfBounds", function() { return outOfBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logisticSmooth", function() { return logisticSmooth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjRand", function() { return adjRand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "posneg", function() { return posneg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ratio", function() { return ratio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rat_vec2", function() { return rat_vec2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "norm_ratio", function() { return norm_ratio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evenNumber", function() { return evenNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offsetter", function() { return offsetter; });
/* harmony import */ var _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nphyx/vectrix */ "../nphyx-vectrix/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/scripts/constants.js");



const {vec2, magnitude, mut_normalize, distance, mut_times, mut_copy, mut_clamp} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["vectors"];
const {minus} = _nphyx_vectrix__WEBPACK_IMPORTED_MODULE_0__["matrices"];
const {sqrt, abs, E, pow, cos, sin, random, PI, max, min} = Math;
const X = 0, Y = 1;
const MIN_F = 1e-11;
const MAX_F = 1e+11;

/**
 * Twiddles a value by a small amount to avoid zeroes
 */
function twiddle(x) {
  return x + (1e-11 * posneg());
}

const twiddleVec = (function() {
  let i = 0 | 0, l = 0 | 0;
  return function twiddleVec(v) {
    for(i = 0, l = v.length; i < l; ++i) {
      v[i] = twiddle(v[i]);
    }
    return v;
  }
}());


const validate = (function() {
  let i, l;
  return function validate(v) {
    for(i = 0, l = v.length; i < l; i++) {
      if(isNaN(v[i])) throw new Error("NaN vector");
      if(v[i] === Infinity) throw new Error("Infinite vector");
      if(v[i] === -Infinity) throw new Error("-Infinite vector");
    }
  }
}());

const dist = (function () {
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

const limitVecMut = (function() {
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
const gravitate = (function() {
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
    mut_times(out, -strength * _constants__WEBPACK_IMPORTED_MODULE_1__["GRAVITY"] / (mag * mag));
    if(_constants__WEBPACK_IMPORTED_MODULE_1__["VALIDATE_VECTORS"]) {
      try {
        validate(out);
      }
      catch(e) {
        if(_constants__WEBPACK_IMPORTED_MODULE_1__["VALIDATE_VECTORS_DEBUG"]) {
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
const accelerate = (function() {
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
    if(_constants__WEBPACK_IMPORTED_MODULE_1__["VALIDATE_VECTORS"]) {
      try {
        validate(out);
      }
      catch(e) {
        if(_constants__WEBPACK_IMPORTED_MODULE_1__["VALIDATE_VECTORS_DEBUG"]) {
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


const drag = (function() {
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
    if(_constants__WEBPACK_IMPORTED_MODULE_1__["VALIDATE_VECTORS"]) {
      try {
        validate(out);
      }
      catch(e) {
        if(_constants__WEBPACK_IMPORTED_MODULE_1__["VALIDATE_VECTORS_DEBUG"]) {
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

const avoid = (function() {
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
const absVec = (function() {
  let i = 0 | 0, l = 0 | 0;
  return function absVec(v) {
    for(i = 0, l = v.length; i < l; ++i) {
      v[i] = abs(v[i]);
    }
    return v;
  }
}());

const outOfBounds = (function() {
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
function logisticSmooth(x, x0, L = x * 2, k = 1) {
  return L / (1 + pow(E, k * x - x0))
}

/**
 * A random function adjusted to a range of -1 to 1 and multiplied by a
 * scaling value
 */
function adjRand(scale = 1) {
  return ((random() * 2) - 1) * scale
}

/**
 * Returns a delta velocity vector of the vector p rotated around center point c by
 * r radians.
 */
const rotate = (function() {
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

function posneg() {
  return random() > 0.5 ? 1 : -1;
}

function clamp(v, minv, maxv) {
  return max(min(v, maxv), minv);
}

function ratio(a, b) { return a / (abs(a) + abs(b)) }
function rat_vec2(v) { return ratio(v[X], v[Y]) }

function norm_ratio(v, out) {
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
const shuffle = (function() {
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
function evenNumber(n) {
  return n >> 1 << 1;
}
/**
 * Tool for generating byte offsets.
 */
const offsetter = (() => {
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


/***/ })

/******/ });
//# sourceMappingURL=index.js.map