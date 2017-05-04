"use strict";
import * as display from "./photonomix.display.2d";
import * as motes from "./photonomix.motes";
import * as constants from "./photonomix.constants";

export const game = {
	display:display,
	motes:motes,
}
window.game = game;

window.addEventListener("load", function() {
});
