/**
 * class Coord
 *
 * A 3d coordinate with some translation and comparison methods. Currently, the
 * z axis is not actually used - need to figure out a standard way of handling
 * foreshortening & distance scaling.
 *
 * @author Justen Robertson <justen@justenrobertson.com>
 * @link http://www.justenrobertson.com
 * @version 0.4
 * @license Free (no restrictions, no rights reserved)
 *
 * @param p1 x coord, or hash of {x:x, y:y, z:z}
 * @param p2 y coord
 * @param p3 z coord
 *
 */
function Coord(p1, p2, p3) {
	this.x = (p1.x?p1.x:p1?p1:0);
	this.y = (p1.y?p1.y:p2?p2:0);
	this.z = (p1.z?p1.z:p3?p3:0);




 /**
  * @method str returns a string of "x,y" (z omitted)
	* @param xadd an amount to add to x
  * @param yadd an amount to add to y
  */
	this.str = function(xadd, yadd) {return (this.x+(xadd?xadd:0))+","+(this.y+(yadd?yadd:0));};




/**
 * @method rot rotates the coordinate around center and returns the result as a new Coord.
 * @param angle angle of rotation in degrees
 * @param cntr optional centerpoint, otherwise uses 0,0
 * @return a new Coord at the new rotation point
 */

	this.rot = function (angle, cntr) {
		var xa = this.x;
		var xb = cntr?cntr.x:0;
		var ya = this.y;
		var yb = cntr?cntr.y:0;
		var b = xb-xa; // change in y from rotation center to coord
		var a = yb-ya; // change in x from rotation center to coord

		if (angle == 180) return new Coord(xa, ya+a*2); // no need to rotate, and it bugs anyway

		var slope = b==0?90:a==0?0:r2d(a/b);
		var leg = a==0?b:b==0?a:Math.sqrt(Math.pow(a,2)+Math.pow(b,2)); // get the hypotenuse of xa,ya-xb,yb right triangle
		var legAngle = 90 - (angle/2); // angle opposite legs
		// law of sines states sinA/a = sinB/b = sinC/c so sin(legAngle)/leg = sin(angle)/base
		var base = Math.sin(d2r(angle))*leg/Math.sin(d2r(legAngle)); // length of base
		// Now we just calculate x & y translation and return it as a new coordinate
		return new Coord(Math.cos(d2r(180-slope-legAngle))*base+xa, Math.sin(d2r(180-slope-legAngle))*base+ya);
	}




/**
 * @method diff returns a new Coord that is the difference between this and other
 * @param other a coord to compare to
 * @return Coord the difference between this and other
 */
	this.diff = function (other) {
		return new Coord(other.x-this.x, other.y-this.y, other.z-this.z);
	}




/**
 * @method add adds value of this to other and returns new Cood
 * @param other a Coord to add to
 * @return Coord the sum of this and other
 */
	this.add = function(other) {
		return new Coord(this.x+other.x, this.y+other.y, this.z+other.z);
	}




/**
 * @method times multiplies coordinates of this by coordinates of other
 * @param other the set of coordinates to multiply by
 * @return Coord the resultant coordinates
 */
	this.times = function(other) {
		return new Coord(this.x*other.x, this.y*other.y, this.z*other.z);
	}




/**
 * @method flip flips the coordinate around center
 * @param center the center point to flip across
 * @return Coord the flipped coordinates
 */
	this.flip = function(center) {
		var diff = this.diff(center);
		var times = diff.times(new Coord(-1,-1,-1));
		return center.add(diff);
	}




/**
 * @method distTo caclulates distance between coords (currently only 2d space)
 */

	this.distTo = function(coord) {
		var diff = this.diff(coord);
		return Math.sqrt(Math.pow(diff.x,2)+Math.pow(diff.y,2));
	}


/**
 * @method equals checks equality to the nearest whole number
 * @return bool
 */
	this.equals = function(coord) {
		if (parseInt(this.x) == parseInt(coord.x) && parseInt(this.y) == parseInt(coord.y) && parseInt(this.z) == parseInt(coord.z)) return true;
		return false;
	}
}