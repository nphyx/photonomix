let path = require("path");

module.exports = {
	entry:path.resolve(__dirname, "target/scripts/photonomix.js"),
	output:{
		filename:"photonomix.js",
		path:path.resolve(__dirname, "dist/scripts")
	}
}
