"use strict";
/**
 * An offscreen draw buffer, which will be drawn to a composite buffer for display
 * onscreen.
 * @param {string} context [2d|webGL]
 * @return {DrawBuffer}
 */
export function DrawBuffer(compositeMethod = "source-over", context = "2d") {
	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext(context);
	this.offsetX = 0;
	this.offsetY = 0;
	this.compositeMethod = compositeMethod;
	Object.defineProperties(this, {
		width:{get:() => this.canvas.width, set:(v) => this.canvas.width = v},
		height:{get:() => this.canvas.height, set:(v) => this.canvas.height = v},
	});
	return this;
}

/**
 * A canvas to draw a BufferGroup into.
 * @param {HTMLElement} container the containing element for the canvas
 * @return {CompositeBuffer}
 */
export function CompositeBuffer(container) {
	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.container = container;
	this.container.appendChild(this.canvas);
	Object.defineProperties(this, {
		width:{get:() => this.canvas.width, set:(v) => this.canvas.width = v},
		height:{get:() => this.canvas.height, set:(v) => this.canvas.height = v},
	});
	return this;
}

export const composite = (function() {
	let i, len, buffer, targetContext;
	return function composite(sourceBuffers, targetBuffer) {
		targetContext = targetBuffer.context;
		for(i = 0, len = sourceBuffers.length; i < len; ++i) {
			buffer = sourceBuffers[i];
			if(targetContext.globalCompositeOperation !== buffer.compositeMethod)
				targetContext.globalCompositeOperation = buffer.compositeMethod;
			targetContext.drawImage(buffer.canvas, buffer.offsetX, buffer.offsetY, buffer.width, buffer.height);
		}
	}
})();
