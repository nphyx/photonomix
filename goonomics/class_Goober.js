/**
 * class Goober
 *
 * A goober is an artificial life form that lives, breeds and dies in a color-based
 * ecosystem. That is to say, Goobers need color; they eat it as food, if they
 * eat enough they divide, and if they loose too much they die. Goobers follow
 * the observer pattern for communicating with eachother. They are somewhat
 * aware of their surroundings, and determine what is interesting by their
 * similarity or dissimilarity in color to the object in question.
 *
 * Depends on the Coord and Color class, as well as the helpers.js library by
 * this author.
 *
 * @author Justen Robertson <justen@justenroberson.com>
 * @version 0.3 3/21/2009
 * @link http://www.justenrobertson.com
 * @license Creative Commons BY NC SA http://creativecommons.org/licenses/by-nc-sa/2.0/
 * @copyright 2009 Justen Robertson
 */



var Goobers = []; // holds all goobers

function Goober(params) {
	this.baseRad = params.baseRad?params.baseRad:4;
	this.radMult = 1;
	this.color = new Color(params.color?params.color:rndColor());
	this.strokeAdd = new Color(32,32,32);
	this.field = params.field?params.field: Raphael();
	this.coord = params.coord?params.coord:this.field.cc();
	this.pt = this.field.paper.circle(this.coord.x, this.coord.y, this.baseRad);
	this.pt.attr({
		stroke:this.color.add(this.strokeAdd).toHex(),
		fill:this.color.toHex(),
		'stroke-width':2,
		'stroke-dasharray':'.'
	});
	this.animating = false; // whether or not we're moving, keep track and only move every once in a while
	this.dest = this.coord; // current destination, we adjust it in the various moving algorithms
	this.moveSpeed = 0; // this is how fast to animate to the current destination
	this.minDist = this.baseRad*this.radMult*1.3; // multiplier of this.rad as the minimum distance between this and other objects
	this.observers = [];
	this.chasing = false;
	this.hidden = false;
	this.interest = false;
	this.dividing = 0;
	this.opacity = 1;
	this.dying = 0;




	this.getCoord = function() {
		this.coord = new Coord(this.pt.attr('cx'), this.pt.attr('cy'));
		return this.coord;
	}




	this.updateSpeed = function() {
		this.moveSpeed = Math.min(Math.max(this.field.simSpeed, this.getCoord().distTo(this.dest)*1.25), 1000); // we use this to time everything
	}








/** MOVEMENT RELATED METHODS **/
	this.flockTo = function(dest) {
		//if (this.animating) return false;
		// flocking rule: follow the leader
		// what we really want is follow the group, but we're not there yet
		//var angle = 180*Math.random();
		var destx=this.baseRad*(Math.random()>0.5?1:-1);
		var desty=this.baseRad*(Math.random()>0.5?1:-1);
		var temp = new Coord(destx+dest.x, desty+dest.y);
		this.dest = temp; //temp.rot(angle, dest);
		//this.spread();
		return true;
	}




	this.spread = function() { // flocking rule: don't get too close
		if (this.animating || this.hidden) return false;
		var my = this;
		var breakNow = false;
		Goobers.each(function(goob) {
			//if (breakNow) return false; // already decided to move, so let's just stop
			if (goob === my || goob.hidden || goob === my.chasing || goob.chasing === my) return false;
			if (goob.dest.x > my.dest.x+my.minDist) return false;
			if (goob.dest.y > my.dest.y+my.minDist) return false; // don't bother calculating further if it's too far off
			if (my.dest.distTo(goob.dest) < my.minDist) {
				my.moveRand();
				breakNow = true;
				return true;
			}
			return false;
		});
		return breakNow;
	}




	this.moveRand = function(mult) {
		if(this.hidden) return false;
		if (!mult) var mult = 1;
		var randx = (Math.random()-Math.random())*mult*this.minDist;
		this.dest.x+=randx;
		var randy = (Math.random()-Math.random())*mult*this.minDist;
		this.dest.y+=randy;
		// Statistics
		//randx>0?this.field.pos++:this.field.neg++;
		//randy>0?this.field.pos++:this.field.neg++;
		return true;
	}




/**
 * method setupMove does some basic movement cleanup to make sure we don't go off screen or anything
 */
	this.setupMove = function() {
		if (this.dest.equals(this.getCoord())) return false;
		this.updateSpeed();
		if (this.dest.x > this.field.paper.node.getProperty('width')) this.dest.x = this.field.paper.node.getProperty('width')-25;
		if (this.dest.y > this.field.paper.node.getProperty('height')) this.dest.y = this.field.paper.node.getProperty('height')-25;
		if (this.dest.x < 25) this.dest.x = 25;
		if (this.dest.y < 25) this.dest.y = 25;
		return true;
	}




	this.moveTo = function(coord) {
		this.dest = coord;
		this.setupMove();
	}




	this.warpTo = function(coord) {
		this.dest = coord;
		this.setupMove();
		this.pt.attr({cx:this.dest.x, cy:this.dest.y});
	}




	this.chase = function(goob) {
		this.chasing = goob;
		goob.addObserver(this);
		this.flockTo(goob.dest);
		this.setupMove();
	}








/** OBSERVER PATTERN RELATED METHODS **/
	this.addObserver = function(obs) {
		if(!this.observers.inArray(obs)) this.observers.push(obs);
	}




	this.removeObserver = function(obs) {
		if (!this.observers) return false;
		var index = this.observers.indexOf(obs);
		if(index) this.observers.splice(index, 1);
		return true;
	}




	this.stopObserving = function(obs) {
		if (obs) obs.removeObserver(this);
		if (this.chasing === obs) this.chasing = false;
	}




	this.updateObservers = function() {
		var goob = this;
		this.observers.each(function(obs) {
			obs.notify(goob);
		});
	}




	this.notify = function(upd) {
		if(this.chasing === upd) {
			this.flockTo(upd.dest);
			this.setupMove();
			this.animate(1);
		}
	}







/** VISIBILITY RELATED METHODS **/
	this.hide = function() {
		this.hidden = true;
		this.pt.attr({'fill-opacity':0, 'stroke-opacity':0});
	}




	this.appear = function() {
		this.pt.attr({'fill-opacity':0, 'stroke-opacity':0});
		this.hidden = false;
	}




	this.getColor = function() {
		return new Color(this.color.toHex()); // make a copy
	}








/** MAIN AI METHODS **/
	this.lookAround = function() {
		var my = this;
		var mostInteresting = 0;
		var lastInterest = this.interest;
		this.stopObserving(this.interest);
		this.interest = false;
		this.chasing = false;
		var foundInterest = false;
		if (this.hidden) return false;
		Goobers.each(function(goob) {
			goob.removeObserver(this);
			if (goob === my || foundInterest) return true; // we don't care about hidden objects, or ourselves
			if (goob.dying) return true; // dont' chase dying goobs
			if (goob.dest.x > my.dest.x+my.minDist*5) return true;
			if (goob.dest.y > my.dest.y+my.minDist*5) return true; // don't bother calculating further if it's too far off
			if (my.getCoord().distTo(goob.dest) < my.minDist*5) {
				var itsColor = goob.getColor();
				var myColor = my.getColor();
				var diff = myColor.diff(itsColor);
				var interesting = (diff.r<25 || diff.r>225)?Math.random()+0.5:0;
				if (diff.g<25 || diff.g>225) interesting += Math.random()+0.5;
				if (diff.b<25 || diff.b>225) interesting += Math.random()+0.5;

				if (itsColor.r == 0) interesting += 2*Math.random();
				if (itsColor.g == 0) interesting += 2*Math.random();
				if (itsColor.b == 0) interesting += 2*Math.random(); // zero in for the kill

				if (goob === lastInterest) interesting += 0.5; // don't get too promiscuous
				if (interesting > mostInteresting) {
					mostInteresting = interesting;
					if(interesting > 1.5) my.interest = goob;
					foundInterest = true;
				}
			}
			return true;
		});
		if (this.interest) {
			this.chase(this.interest);
		}
		return true;
	}








	/** LIFECYCLE RELATED METHODS **/
	this.eat = function() {
		if(!(this.health()+Math.random()>1)) return false; // not hungry enough
		var myColor = this.getColor();
		if (this.chasing) {
			var chaseColor = this.chasing.getColor();

			var diff = myColor.diff(chaseColor);
			var tastiness = (diff.r+diff.g+diff.b)/255+((Math.random()-Math.random()*1.5));
			var bite;
			if (tastiness > 1) {
				bite = this.chasing.getEaten(this);
				this.color.r = Math.min(255, bite.r+this.color.r);
				this.color.g = Math.min(255, bite.g+this.color.g);
				this.color.b = Math.min(255, bite.b+this.color.b);
				if(bite.r || bite.b || bite.g) this.field.bites++;
			}
		}
		return true;
	}




	this.getEaten= function(goob) {
		var which = Math.round(Math.random()*3);
		var bite = {r:0, g:0, b:0};
		var biteSize = parseInt(64*Math.random());
		switch (which) {
			case 1:
				if (biteSize > this.color.r) biteSize = this.color.r;
				if (biteSize > 255-goob.color.r) biteSize = 255-goob.color.r;
				this.color.r -= biteSize;
				bite.r += biteSize;
			break;
			case 2:
				if (biteSize > this.color.g) biteSize = this.color.g;
				if (biteSize > 255-goob.color.g) biteSize = 255-goob.color.g;
				this.color.g -= biteSize;
				bite.g += biteSize;
			break;
			case 3:
				if (biteSize > this.color.b) biteSize = this.color.b;
				if (biteSize > 255-goob.color.b) biteSize = 255-goob.color.b;
				this.color.b -= biteSize;
				bite.b += biteSize;
			break;
		}
		this.moveRand(3);
		return bite;
	}




	this.health = function() {
		return (this.color.r+this.color.g+this.color.b)/765;
	}




	this.die = function() {
		var me = false; // don't create a reference yet
		switch(this.dying) {
			case 0:
				if(this.health()>0.15 || this.hidden) {
					this.dying = 0;
					return false;
				}
				this.pt.attr({'stroke-opacity':0});
				this.dying = 1;
				return true;
			break;
			case 1:
				me = this;
				this.chasing = false;
				this.observers = [];
				setTimeout(function(){
					me.pt.animate({'opacity':0}, 5000); // can't use the main animator here
				}, 500);
				setTimeout(function(){me.dying = 3},5500);
				Goobers.each(function(goob){
					if(goob.observers.indexOf(me)) goob.observers.splice(goob.observers.indexOf(me), 1);
					if(goob.chasing === me) goob.chasing = false;
				});
				me.dying = 2;
				return true;
			break;
			case 2:
				return true; // wait for animation to finish and such
			break;
			case 3:
				me = this;
				Goobers.splice(Goobers.indexOf(me), 1);
				me.pt.remove();
				me.field.deaths++;
				return true;
			break;
		}
		return false;
	}




	this.divide = function() {
		if((this.health()<0.75 && !this.dividing) || this.hidden) return false; // not healthy enough to split
		switch (this.dividing) {
			case 0:
				this.dividing = 1;
			break;
			case 1:
				this.dividing = 2;
				this.radMult = 1.5;
			break;
			case 2:
				this.dividing = 3;
				this.radMult = 0.8;
			break;
			case 3:
				this.dividing = 4;
				this.radMult = 1;
				this.color.r = parseInt(this.color.r*0.525);
				this.color.g = parseInt(this.color.g*0.525);
				this.color.b = parseInt(this.color.b*0.525);
				var baby = new Goober({coord:this.coord, color:this.color.toHex(), field:this.field, baseRad:this.baseRad});
				baby.moveRand();
				this.field.births++;
			break;
			case 4:
				this.dividing = 0;
			break;
		}
		return true;
	}




	this.digest = function() { // this lets us keep our colors rich
		if(Math.random()<0.3) return false; // don't do this constantly, it's annoying
		var d1 = Math.abs(a-b);
		var d2 = Math.abs(a-c);
		var d3 = Math.abs(b-c);
		if(d1+d2+d3>64) return false; // let's not ruin the colors too much
		var c = this.color;
		var a = Math.max(c.r, c.g, c.b);
		var b = Math.min(c.r, c.g, c.b);
		var min = c.r==b?'r':c.g==b?'g':'b';
		var max = c.r==a?'r':c.g==a?'g':'b';
		if(c[min]==0) {
			switch (min){
				case 'r':
					min = max == 'b'?'g':'b';
				break;
				case 'g':
					min = max == 'r'?'b':'r';
				break;
				case 'b':
					min = max == 'g'?'r':'g';
				break;
			}
		}
		var pick = max;
		var eat = min;
		// now do a little digesting
		var amt = Math.min(this.color[eat], 32);
		if(amt+this.color[pick]>216) amt = 216-this.color[pick];
		this.color[pick] +=  amt;
		this.color[eat] -= amt;
		return true;
	}







/**
 * method act
 *
 * This method is called by the main simulation loop to get the goob doing its
 * thing.
 */

	this.act = function() {
		//this.pt.attr({'stroke':0});
		// some conditions mean we don't do anything
		if(this.die()) return false; // if we're dying, we skip everything
		if (this.hidden) return false;
		// see if anything interesting is around
		this.lookAround();
		// do some moving
		if (!this.chasing || this.chasing.dest.equals(this.dest)) { // if we're chasing someone we've already got marching orders
			if(!this.spread()) this.moveRand(3);
			this.setupMove();
		}

		// do some living
		this.eat();
		this.digest();
		this.divide();

		// finish up
		this.animate();
		this.updateObservers();
		return true;
	}




	/** once all the changes are processed, this animates the goob **/
	this.animate = function(now) {
		if (this.animating && !now) return false;
		this.animating = true;
		var goob = this;
		if(!now) setTimeout(function(){goob.animating=false;}, this.moveSpeed*0.5); // give them some time to move before updating again
		this.pt.animate({
			cx:this.dest.x,
			cy:this.dest.y,
			rotation:Math.max(-359, Math.min(359, parseInt((Math.random()-Math.random())*182))),
			fill:this.color.toHex(),
			stroke:this.color.add(this.strokeAdd).toHex(),
			r:this.baseRad*this.radMult
		}, this.moveSpeed);
		return true;
	}




	Goobers.push(this);
}