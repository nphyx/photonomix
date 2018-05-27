let path = require("path");

module.exports = {
	entry:path.resolve(__dirname, "target/scripts/index.js"),
	devtool:"source-map",
	output:{
		filename:"index.js",
		path:path.resolve(__dirname, "dist/scripts")
	}
}
