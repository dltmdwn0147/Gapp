const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// 기존 NativeWind 설정과 결합하여 내보내기
module.exports = withNativeWind(config, { input: "./global.css" });