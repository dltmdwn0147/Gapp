// ✨ 1. Reanimated import는 무조건 1빠로! (아까 해결한 에러)
import 'react-native-reanimated';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";
import "./global.css"; // NativeWind CSS 설정

// ✨ 2. 방금 만든 SplashView 컴포넌트 불러오기
import SplashView from './src/components/common/SplashView';
// ✨ 기존 메인 화면 불러오기
import MainScreen from "./src/screens/MainScreen";

export default function App() {
  // ✨ 3. 앱이 준비되었는지(메인 화면을 보여줄지) 결정하는 상태
  const [isAppReady, setIsAppReady] = useState(false);

  // ✨ 4. SplashView에서 3.2초 뒤에 이 함수를 호출해서 메인 화면으로 전환시킵니다.
  const handleSplashFinish = () => {
    setIsAppReady(true);
  };

  return (
    <View style={styles.container}>
      {/* 5. 앱 준비 상태에 따라 화면을 다르게 보여줍니다. */}
      {!isAppReady ? (
        // ✨ 앱이 켜질 때 1빠로 나오는 화면 (애니메이션 로딩)
        <SplashView onFinish={handleSplashFinish} />
      ) : (
        // ✨ 3.2초 뒤에 나타나는 실제 메인 화면
        <>
          <MainScreen />
          <StatusBar style="dark" />
        </>
      )}
    </View>
  );
}

// ✨ NativeWind가 잘 작동하도록 최상단 View를 꽉 차게 설정
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});