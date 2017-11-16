"use strict";
var gulp = require("gulp");
var babel = require("gulp-babel");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var webpack = require("webpack");
var del = require("del");
var path = require("path");
//var appcache = require("gulp-appcache");
var SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var {exec, spawn} = require("child_process");

const webpackConfig = {
	entry:{
		"scripts/photonomix":path.resolve(__dirname, "src/scripts/photonomix.js")
		//"sw":path.resolve(__dirname, "src/scripts/sw.js"),
	},
	devtool:"source-map",
	output:{
		path:path.resolve(__dirname, "dist/"),
		filename:"[name].js",
	},
	plugins:[
		new webpack.optimize.DedupePlugin(),
		new UglifyJsPlugin({
			sourceMap:true,
			parallel:true,
			uglifyOptions:{
				ecma:8,
				warnings:true
			}
		}),
		new SWPrecacheWebpackPlugin({
			cacheId: "photonomix-cache",
			filename: "sw.js",
			minify: true,
			navigateFallback: "index.html",
			staticFileGlobs: ["dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}"],
			stripPrefix:"dist",
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
		})
  ]
}

gulp.task("manifest", function() {
	gulp.src("./src/photonomix.manifest")
	.pipe(gulp.dest("./dist"))
});

gulp.task("clean:scripts", function() {
	return del(["target/scripts/*", "dist/scripts/*"]);
});

gulp.task("clean:styles", function() {
	return del(["dist/styles/*"]);
});

gulp.task("clean:markup", function() {
	return del(["dist/*.html"]);
});

gulp.task("scripts", ["clean:scripts"], function() {
	return gulp.src(["src/scripts/*js", "src/scripts/*/*js"])
	.pipe(babel())
	.pipe(gulp.dest("target/scripts/"));
});

gulp.task("markup", ["clean:markup"], function() {
	return gulp.src(["src/markup/*pug"])
	.pipe(pug())
	.pipe(gulp.dest("dist"))
});

gulp.task("styles", ["clean:styles"], function() {
/*
	return gulp.src(["src/styles/*scss"])
	.pipe(sass().on("error", sass.logError))
	.pipe(gulp.dest("dist/styles/"))
	*/
});

/* jshint unused:false */
gulp.task("webpack", ["clean:scripts", "markup", "manifest"], function(callback) {
	webpack(webpackConfig, function(err, stats) {
		if(err) console.log(err);
		callback();
	});
});

gulp.task("deploy", function(cb) {
	exec("git subtree push --prefix dist hub gh-pages", function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task("local-server", function(cb) {
	const server = spawn("python", ["-m","http.server"], {
		cwd:"dist",
		detached:true
	});
	server.unref();
	cb();
});

gulp.task("default", ["webpack"]);
