"use strict";
import * as display from "./photonomix.display.2d";
import * as motes from "./photonomix.motes";
import * as photons from "./photonomix.photons";
import * as constants from "./photonomix.constants";
import * as state from "./photonomix.state";

var photonomix = {
	motes:motes,
	photons:photons,
	constants:constants
}

window.photonomix = photonomix;


window.addEventListener("load", function() {
	photonomix.state = new state.State();
	display.init(photonomix.state);
});
