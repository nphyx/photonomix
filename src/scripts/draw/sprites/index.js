"use strict";
import * as motes from "./motes";
import * as emitters from "./emitters";
import * as photons from "./photons";
import * as voids from "./voids";
import * as markers from "./markers";
import * as ui from "./ui";
import * as util from "./util";

export {motes, emitters, photons, voids, markers, ui, util};

export function init(props) {
  motes.init(props);
  photons.init(props);
  emitters.init(props);
  voids.init(props);
  ui.init(props);
  markers.init(props);
}
