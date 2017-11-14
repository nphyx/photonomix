"use strict";
import * as display from "./photonomix.display";
import * as constants from "./photonomix.constants";
import * as game from "./photonomix.game";
import * as util from "./photonomix.util";
import * as controls from "./photonomix.controls";

var photonomix = {
	util:util,
	constants:constants,
	display:display,
	game:game,
	state:{}
}

window.photonomix = photonomix;


window.addEventListener("load", function() {
	photonomix.state.game = new game.Game();
	controls.init(photonomix.state);
	photonomix.state.controls = controls.state;
	photonomix.display.init(photonomix.state);
	photonomix.display.startGame();
});
