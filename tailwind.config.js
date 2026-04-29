module.exports = {
  // Tailwind 디자인을 적용할 파일들의 경로를 지정합니다.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  // NativeWind 최신 버전을 사용하기 위한 필수 설정입니다.
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}