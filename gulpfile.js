"use strict"
var gulp = require("gulp")
var pug = require("gulp-pug")
var webpack = require("webpack")
var fsm = require("fs-magic")
var path = require("path")
var {exec, spawn} = require("child_process")
const webpackConfig = require("./webpack.config.js");

const distFolders = [
  "dist/scripts",
  "dist/styles",
  "dist/assets"
]

const distFiles = [
  "dist/index.html",
  "dist/sw.js",
  "dist/sw.map.js"
]

const distMask = 0o755

/**
 * Set up filesystem structure in dist.
 */
gulp.task("fs", async () => {
  await Promise.all(distFolders.map(async (dir) => {
    try {
      console.log("creating", dir)
      await fsm.mkdirp.call(null, dir, distMask, true)
    }
    catch(e) {
      console.log(e.message)
    }
  }))
})

gulp.task("clean", async () => {
  await Promise.all([...distFolders, ...distFiles].map(async (dir) => {
    try {
      console.log("cleaning ", dir)
      await fsm.rmrf.call(null, dir)
    }
    catch(e) {
      console.log(e.message)
    }
  }))
})

gulp.task("markup", () => {
  return gulp.src(["src/markup/*pug"])
    .pipe(pug())
    .pipe(gulp.dest("dist"))
})

gulp.task("assets", () => {
  return gulp.src("src/assets/*.*")
    .pipe(gulp.dest("dist/assets/"))
})

gulp.task("styles", () => {
  return gulp.src("src/styles/*.*")
    .pipe(gulp.dest("dist/styles/"))
})

gulp.task("webpack", (cb) => {
  webpack(webpackConfig, function(err) {
    if(err) console.log(err)
    cb()
  })
})

gulp.task("manifest", async () => {
  await fsm.copy("src/photonomix.manifest", "dist/photonomix.manifest")
})

gulp.task("deploy", function(cb) {
  exec("git subtree push --prefix dist hub gh-pages", (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task("local-server", function(cb) {
  const server = spawn("python", ["-m","http.server"], {
    cwd: "dist",
    detached: true
  })
  server.unref()
  cb()
})

gulp.task("default", gulp.series("clean", "fs", "manifest", "webpack", "assets", "markup", "styles"))
