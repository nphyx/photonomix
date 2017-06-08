"use strict";

export const MAX_POOL_SIZE = Math.pow(2, 20); // 1mb

function calculatePoolSize(itemLength) {
	return MAX_POOL_SIZE - (MAX_POOL_SIZE % itemLength);
}

function createFreedList(freedLength) {
	if(freedLength < Math.pow(2, 8)) return new Uint8Array(freedLength);
	else if(freedLength < Math.pow(2, 16)) return new Uint16Array(freedLength);
	else return new Uint32Array(freedLength);
}

export function BufferPool(itemLength, maxItems) {
	let size = 0|0;
	if(maxItems) {
		if(itemLength * maxItems > MAX_POOL_SIZE) {
			throw new Error("requested buffer size is too large");
		}
		else size = itemLength * maxItems;
	}
	else size = calculatePoolSize(itemLength);
	let buffer = new ArrayBuffer(size);
	let freedLength = (maxItems?maxItems:size/itemLength);
	let freed = createFreedList(freedLength);
	Object.defineProperties(this, {
		"itemLength":{get: () => itemLength},
		"buffer":{get: () => buffer},
		"size":{get: () => size},
		"freed":{get: () => freed},
	});
	this.next = 0;
	this.freedPos = 0;
	return this;
}

let offset = 0|0;
BufferPool.prototype.allocate = function() {
	if(this.freedPos > 0) offset = this.popFree();
	else if (this.next < this.size - 1) {
		offset = this.next;
		this.next = this.next + this.itemLength;
	}
	else throw new Error("pool buffer is full");
	return offset;
}

BufferPool.prototype.popFree = function() {
	this.freedPos--;
	offset = this.freed[this.freedPos]*this.itemLength;
	this.freed[this.freedPos] = 0;
	return offset;
}

BufferPool.prototype.free = function(offset) {
	this.freed[this.freedPos] = (offset === 0?offset:offset/this.itemLength);
	this.freedPos++;
}
