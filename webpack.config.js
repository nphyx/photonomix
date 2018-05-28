let path = require("path");
let SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")

module.exports = {
  entry: {
    "scripts/index": path.resolve(__dirname, "src/scripts/index.js")
    //"sw":path.resolve(__dirname, "src/scripts/sw.js"),
  },
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js"
  },
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: "photonomix-cache",
      filename: "sw.js",
      minify: true,
      navigateFallback: "index.html",
      staticFileGlobs: ["dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,manifest}"],
      stripPrefix: "dist/",
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ]
}
