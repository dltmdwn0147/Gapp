// src/screens/MainScreen.tsx
import React from 'react'; // ✨ useState 제거
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/common/Header';
import LoginPrompt from '../components/main/LoginPrompt';
import BannerCarousel from '../components/main/BannerCarousel';
import DeptBannerCarousel from '../components/main/DeptBannerCarousel';
import MenuSection from '../components/main/MenuSection';
import { AuthContext } from '../contexts/AuthContext'; // ✨ AuthContext 임포트 경로 수정

export default function MainScreen() {
    // 🌟 전역 컨텍스트에서 로그인 상태를 가져옵니다.
    const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);

    return (
        <LinearGradient
            colors={['#cffafe', '#ecfeff', '#f8fafc']}
            // 🌟 locations를 지우고 start, end를 추가해 은은한 사선 그라데이션 완성!
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            className="flex-1 pt-10"
        >
            <Header />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                // ✨ 하단 여백: BottomNav가 떠있는 높이 + 여유공간을 고려해 120 정도 줍니다.
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* 🌟 LoginPrompt에 현재 상태와 상태를 바꿀 수 있는 함수(리모컨)를 던져줍니다 */}
                <LoginPrompt />

                {/* 🌟 로그인 상태에 따라 화면 배치 변경 */}
                {isLoggedIn ? (
                    // ✅ 로그인 후 배치: 학과 행사 -> 메뉴 -> 학교 행사
                    <>
                        <DeptBannerCarousel />
                        <MenuSection />
                        <BannerCarousel />
                    </>
                ) : (
                    // ✅ 로그인 전 배치: 학교 행사 -> 메뉴
                    <>
                        <BannerCarousel />
                        <MenuSection />
                    </>
                )}
            </ScrollView>

        </LinearGradient>
    );
}