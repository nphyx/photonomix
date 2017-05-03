/**
 * Goonomics Singleton
 *
 * This singleton handles the simulation setup and the main loop. It also
 * keeps track of mouse movements and window resizes and acts appropriately.
 *
 * @author Justen Robertson <justen@justenrobertson.com>
 * @link http://www.justenrobertson.com
 * @version 0.6a 3/31/2009
 * @copyright 2009 Justen Robertson
 * @license Creative Commons BY NC SA http://creativecommons.org/licenses/by-nc-sa/2.0/
 */

var goonomics = function() {
	var paper;
	var births = 0;
	var deaths = 0;
	var loopStart = 0; var loopEnd = 0;
	var bites = 0;
	var popLimit = 0;
	var texts = [];
	var simSpeed = 200;
	var subLoops = 10;
	var popShift = 0;
	var bg = false;




	// Some simple spatial functions. x & y return the width & height of the
	// box, and if param update is true, will update it to match the new window
	// size. cx & cy return calculated center x & y of the view.

	var x = function(update) {
		if(update) {
			var x = goonomics.x()-10;
			goonomics.paper.node.setProperty('width', x);
			//if(goonomics.bg) goonomics.bg.attr('width', x-10);
		}
		return goonomics.field.getSize().x-goonomics.paper.node.getProperty('left');
	}

	var y = function(update){
		if(update) {
			$('paperBox').setStyle('height', $$('body')[0].getSize().y);
			var y = goonomics.y()-10;
			goonomics.paper.node.setProperty('height', y);
			//if (goonomics.bg) goonomics.bg.attr('height', y-10);
		}
		return goonomics.field.getSize().y-goonomics.paper.node.getProperty('top');
	}

	var cx = function(){return goonomics.x()/2;}
	var cy = function(){return goonomics.y()/2;}

	// center coordinates
	var cc = function() {return new Coord(goonomics.cx(), goonomics.cy());}



	var bindObservers = function() {
		unbindObservers();
		window.addEvent('resize', function(){goonomics.x(1); goonomics.y(1);});
		document.addEvent('mousemove', function(event) {goonomics.chase(event)});
	}




	// Unbind observers needs to exactly mirror bindObservers
	var unbindObservers = function() {
		window.removeEvents('resize');
	}




	/**
	 * build sets up all the initial values, generates the simulation field,
	 * and creates the initial population.
	 */
	var build = function() {
		$('paperBox').setStyle('height', $$('body')[0].getSize().y);


		/**
		 * First things first, let's set up the simulation field
		 */
		goonomics.field = $('paperBox');
		goonomics.paper = Raphael(goonomics.field, goonomics.field.getSize().x-10, goonomics.field.getSize().y-10);
		try {
			goonomics.field.getChildren('svg')[0].setProperty('id', 'rpaper');
			goonomics.paper.node = $('rpaper');
		} catch(e) {} // this is for IE compatibility
		try {
			if(!$('rpaper')) {
				goonomics.paper.setProperty('id', 'rpaper');
				goonomics.paper.node = $('rpaper');
			}
		} catch(e) {}

		goonomics.paper.node = $('rpaper');

		var cc = goonomics.cc();




		/**
		 * Now we need to set up the initial population and scatter them randomly
		 * about the field. They can't be ordered because that leads in the long
		 * run to them tending toward the initial coordinates of the first quarter
		 * or so, just because of the way the grouping coordinates work.
		 */

		/**
		 * First things first, let's generate the coordinates we need.
		 */
		goonomics.popLimit = $('count').value;
		goonomics.subLoops = Math.ceil(goonomics.popLimit/10);

		var pts = [new Coord(cc.x, cc.y-(goonomics.popLimit*5))];
		$('setupForm').dispose();
		for(i=1;i<goonomics.popLimit;i++) {
			var x =parseInt((goonomics.paper.node.getProperty('width')-goonomics.paper.node.getProperty('left'))*Math.random());
			var y =parseInt((goonomics.paper.node.getProperty('height')-goonomics.paper.node.getProperty('top'))*Math.random());
			pts[i] = new Coord(x, y);
		}

		var rad = Math.max(4, Math.min(8, 3*Math.ceil(25/goonomics.popLimit))); // min 4, max 8

		/**
		 * Now let's initialize some goobers.
		 */
		var chaser = new Goober({baseRad:rad, coord:goonomics.cc(), field:goonomics, color:"#000"});
		chaser.hide();
		chaser.spread = function() {return false;}; // chaser is special, it doesn't spread
		pts.each(function(pt) {
			new Goober({baseRad:rad, coord:pt, field:goonomics});
		});
		goonomics.update();



		/**
		 * Generate the buttons we need.
		 *
		var bgButton = goonomics.paper.rect(goonomics.x()-40, goonomics.y()-30, 20, 15, 2).attr({stroke:'#ada', fill:'#000'}).toFront();
		bgButton.node.addEvent('click', function(){
			if(goonomics.bg) {
				goonomics.bg.remove();
				goonomics.bg = false;
			}
			else {
				goonomics.bg = goonomics.paper.image('discover2.jpg', 10, 10, goonomics.x()-20, goonomics.y()-20).toBack();
			}
		});
		bgButton.node.addEvent('mouseover', function(){
			bgButton.animate({stroke:"#fff"}, 50);
		});
		bgButton.node.addEvent('mouseout', function(){
			bgButton.animate({stroke:"#bfb"}, 50);
		});*/
	} // end build




	/**
	 * Our first goober is actually a faker, he's hidden, all black, and follows
	 * the mouse around. Most of the goober methods ignore hidden goobers,
	 * except the lookAround() methods which has a good chance of making them
	 * chase this guy for a short while.
	 */
	var chase = function(event) {
		var dest = new Coord(event.client.x, event.client.y);
		Goobers[0].warpTo(dest);
		Goobers[0].updateObservers();
	}




	/**
	 * This is the main loop.
	 */
	var update = function() {
		var d = new Date();
		if(goonomics.popShift == 0) goonomics.loopStart = d.getTime();
		var shift = goonomics.popShift;
		for(var i=0;i<Math.round(Goobers.length/goonomics.subLoops);i++) {
			if(Goobers[i+shift]) Goobers[i+shift].act();
		}/*
		Goobers.each(function(goob){
			goob.act();
		});*/
		if(shift<=Goobers.length) goonomics.popShift += i;
		else {
			goonomics.popShift = 0;
			goonomics.loopEnd = d.getTime();
			var loopTime = (goonomics.loopEnd-goonomics.loopStart);
			// update the loop only once per cycle
			if(goonomics.texts.length) goonomics.texts.each(function(text) {
				if(text.node.parentNode) text.remove();
			});
			goonomics.texts = []; // reset the array
			goonomics.texts.push(goonomics.paper.text(100, 25, "Population:"+(Goobers.length-1))); // minus one because of mouse cursor goob
			goonomics.texts.push(goonomics.paper.text(goonomics.paper.node.getProperty('width')*0.3, 25, "Births:"+goonomics.births));
			goonomics.texts.push(goonomics.paper.text(goonomics.paper.node.getProperty('width')*0.4, 25, "Deaths:"+goonomics.deaths));
			goonomics.texts.push(goonomics.paper.text(goonomics.paper.node.getProperty('width')*0.6, 25, "Cycle Speed:"+(loopTime/1000)));
			goonomics.texts.push(goonomics.paper.text(goonomics.paper.node.getProperty('width')*0.8, 25, "SimSpeed:"+goonomics.simSpeed));
			goonomics.texts.each(function(text) {text.attr('fill', '#484')});
			var timeDiff = goonomics.simSpeed - loopTime;
			goonomics.simSpeed = Math.max(150, loopTime); // this is used for animation timing to try to keep everything constantly moving
		}
		setTimeout(function(){goonomics.update()}, 1);
	}


	

	var init = function() {
		build();
		bindObservers();
	}




	return {
		paper:paper,
		// spatial functions
		x:x, y:y, cx:cx, cy:cy, cc:cc, bg:bg,
		// text stuff
		births:births, deaths:deaths, popLimit:popLimit, simSpeed:simSpeed, subLoops:subLoops,
		texts:texts,
		loopStart:loopStart, loopEnd:loopEnd, bites:bites,
		init: init,
		bindObservers: bindObservers,
		unbindObservers: unbindObservers,
		build:build,
		chase:chase,
		popShift:popShift,
		update:update
	}

}();

// Replace the following with an event binding appropriate to your framework
// or simply use:
// window.onload = ModuleName.init;
// For use without a framework.
window.addEvent('load', function() {$('generate').addEvent('click', function() {goonomics.init()})});