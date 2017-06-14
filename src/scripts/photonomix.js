"use strict";
import * as display from "./photonomix.display.2d";
import * as motes from "./photonomix.motes";
import * as markers from "./photonomix.markers";
import * as photons from "./photonomix.photons";
import * as voids from "./photonomix.voids";
import * as constants from "./photonomix.constants";
import * as state from "./photonomix.state";
import * as emitters from "./photonomix.emitters";
import * as util from "./photonomix.util";

var photonomix = {
	motes:motes,
	markers:markers,
	photons:photons,
	voids:voids,
	emitters:emitters,
	util:util,
	constants:constants
}

window.photonomix = photonomix;


window.addEventListener("load", function() {
	photonomix.state = new state.State();
	display.init(photonomix.state);
});
