/* this gets inlined into the header of the index */
"use strict";
if("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js")
		.then(
			(registration) => console.log("worker registered", registration.scope),
			(err) => console.log("worker registration failed", err)
		);
	});
}
