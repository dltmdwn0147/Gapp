import "./global.css";
import React, { useState } from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import { StatusBar } from "expo-status-bar";

// ✨ 라이브러리(NativeWind/Reanimated) 내부 충돌로 발생하는 경고 메시지 숨기기
LogBox.ignoreLogs(['[Reanimated] Reading from `value` during component render.', '[Reanimated] Writing to `value` during component render.']);

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // ✨ Tab Navigator 추가

import SplashView from './src/components/common/SplashView';
import MainScreen from "./src/screens/MainScreen";
import NoticeScreen from "./src/screens/NoticeScreen";
import BottomNav from "./src/components/common/BottomNav";
import { AuthContext } from './src/contexts/AuthContext'; // ✨ 외부 Context 임포트

const Tab = createBottomTabNavigator(); // ✨ Stack 대신 Tab 사용

// ✨ 바텀 네비게이션 렌더링 함수를 외부로 분리 (성능 및 컨텍스트 안정성)
const renderTabBar = (props: any) => <BottomNav {...props} />;

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✨ 컨텍스트 값을 메모이제이션하여 불필요한 하위 리렌더링 방지
  const authContextValue = React.useMemo(() => ({
    isLoggedIn,
    setIsLoggedIn
  }), [isLoggedIn]);

  const handleSplashFinish = () => {
    setIsAppReady(true);
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <View style={styles.container}>
          {!isAppReady ? (
            <SplashView onFinish={handleSplashFinish} />
          ) : (
            <Tab.Navigator
              tabBar={renderTabBar}
              screenOptions={{ headerShown: false }}
            >
              <Tab.Screen name="Main" component={MainScreen} />
              <Tab.Screen name="Notice" component={NoticeScreen} />
            </Tab.Navigator>
          )}
          <StatusBar style="dark" />
        </View>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});