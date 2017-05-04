"use strict";
import * as display from "./photonix.display.2d";
import * as motes from "./photonix.motes";
import * as constants from "./photonix.constants";

export const game = {
	display:display,
	motes:motes,
}
window.game = game;

window.addEventListener("load", function() {
});
