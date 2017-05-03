/**
 * helpers.js
 *
 * A variety of helper functions for general purpose use.
 *
 * @author Justen Robertson <justen@justenrobertson.com>
 * @link http://www.justenrobertson.com
 * @license Free (no restrictions, no rights reserved)
 */





/**
 * function mkCurve
 *
 * Builds a curve string for use in a path. Useful for dynamically generating
 * the string so we can pass it to an animation.
 */
function mkCurve(coords, type) {
	var str = (type?type:"C");
	coords.each(function(coord) {
		if (typeof coord == 'string') str = str +" "+coord;
		else str = str+" "+coord.x+","+coord.y;
	});
	return str;
}




/**
 * function dec2hex
 *
 * Converts a decimal to hex value.
 */
function dec2hex(d) {return d.toString(16);}




/**
 * function hex2dec
 *
 * Converts a hexadecimal to decimal value.
 */

function hex2dec(h) {return parseInt(h,16);}




/**
 * function r2d
 *
 * Converts radian to degrees
 */

function r2d(deg) {
	return deg*(360/(2*Math.PI));
}




/**
 * function d2r
 *
 * Converts degrees to radians
 */
function d2r(rad) {
	return rad*((2*Math.PI)/360);
}




/**
 * function rndColor()
 *
 * Creates a random color as a hex string.
 */
function rndColor() {
	var r = dec2hex(parseInt(255*Math.random()));
	var g = dec2hex(parseInt(255*Math.random()));
	var b = dec2hex(parseInt(255*Math.random()));
	while (r.length<2) r = "0"+r; // pad it out to 2 places
	while (g.length<2) g = "0"+g;
	while (b.length<2) b = "0"+b;

	return "#"+r+g+b;
}




/**
 * inArray method for arrays, similar to in_array in PHP
 */
Array.prototype.inArray = function (value) {
// Returns true if the passed value is found in the
// array. Returns false if it is not.
	var i;
	for (i=0; i < this.length; i++) {
		// Matches identical (===), not just similar (==).
		if (this[i] === value) {
			return true;
		}
	}
	return false;
}




/**
 * function bin2dec converts a binary to decimal number
 */
function bin2dec(num) {return parseInt(num, 2);}


/**
 * function dec2bin converts a decimal to binary number
 */
function dec2bin(num) {return num.toString(2);}


/**
 * function bin2hex converts a binary to hexadecimal number
 */
function bin2hex(num) {return parseInt(num, 2).toString(16);}


/**
 * function hex2bin converts a hexadecimal to binary number
 */
function hex2bin(num) {return parseInt(num, 16).toString(2);}
