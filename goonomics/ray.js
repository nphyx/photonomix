window.addEvent('load', function() {
	var field = Raphael($('paperBox'), 500, 500);
	var gradient = '320-#ffb-#440:100%';
	var grad2 = '20-#440-#ffa:60%';
	field.path({'stroke-width':'0', gradient:gradient, opacity:0.50}, 'M 200 0 L 20 500 L 280 500 L 300 0 Z');

});