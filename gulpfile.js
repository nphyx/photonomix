"use strict";
var gulp = require("gulp");
var babel = require("gulp-babel");
var pug = require("gulp-pug");
/*
var babelRegister = require("babel-core/register");
var exec = require("child_process").exec;
var mocha = require("gulp-mocha");
var istanbul = require("gulp-babel-istanbul");
*/

gulp.task("scripts", function() {
	return gulp.src(["src/scripts/*js"])
	.pipe(babel())
	.pipe(gulp.dest("dist/scripts/"));
});

gulp.task("markup", function() {
	return gulp.src(["src/markup/*pug"])
	.pipe(pug())
	.pipe(gulp.dest("dist"))
});
