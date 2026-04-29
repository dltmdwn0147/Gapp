const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// global.css 파일과 연결해 줍니다.
module.exports = withNativeWind(config, { input: "./global.css" });