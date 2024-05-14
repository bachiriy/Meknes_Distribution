const { join } = require("path");
const isDev = require("electron-is-dev");

let config = {
	appName: "Meknes Distribution",
	icon: join(__dirname, "..", "/md-icon.png"),
	tray: null,
	isQuiting: false,
	mainWindow: null,
	popupWindow: null,
	isDev,
};

module.exports = config;
