import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
// ✨ 지긋지긋했던 이 라이브러리를 드디어 멋지게 씁니다!
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';

// 📐 로딩 화면 디자인 비율
const ICON_SIZE = 200; // GNU 캐릭터 크기

export default function SplashView({ onFinish }: { onFinish: () => void }) {
    // ✨ 애니메이션을 위한 공유 값 (Shared Value)
    const iconOpacity = useSharedValue(0); // 캐릭터 투명도
    const textOpacity = useSharedValue(0); // 글자 투명도
    const textTranslateY = useSharedValue(15); // 글자가 밑에서 위로 올라오는 애니메이션

    // ✨ 캐릭터가 서서히 나타나는 애니메이션 스타일
    const iconStyle = useAnimatedStyle(() => {
        return {
            opacity: iconOpacity.value,
        };
    });

    // ✨ 글자가 서서히 나타나며 위로 올라오는 애니메이션 스타일
    const textStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
            transform: [{ translateY: textTranslateY.value }],
        };
    });

    useEffect(() => {
        console.log("로딩 화면이 실행되었습니다!");

        // ✨ 캐릭터가 나타나는 애니메이션 (0초부터 시작)
        iconOpacity.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.quad) });

        // ✨ 글자 애니메이션 수정: 
        // 0.8초 기다린 후(withDelay), 스르륵 나타나기(withTiming)
        textOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));

        // ✨ 글자 올라오는 애니메이션 수정:
        // 0.8초 기다린 후(withDelay), 원래 위치(0)로 올라오기(withTiming)
        textTranslateY.value = withDelay(800, withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) }));

        // ✨ 3.2초 뒤에 메인 화면으로 전환
        const timer = setTimeout(() => {
            if (onFinish) {
                onFinish();
            }
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* 🦕 귀여운 GNU 캐릭터 */}
                <Animated.View style={[styles.iconContainer, iconStyle]}>
                    <Image
                        // ✨ assets 폴더 안의 이미지 경로를 정확히 입력하세요!
                        source={require('../../../assets/gnu_ginu.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* 📝 경상국립대학교 글자 */}
                <Animated.View style={[styles.textContainer, textStyle]}>
                    <Text style={styles.universityText}>경상국립대학교</Text>
                    <Text style={styles.sloganText}>개척의 길, 함께 걷는 우리</Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // ✨ 메인 페이지 배경색과 비슷하게 이쁜 하늘색
        backgroundColor: '#e0f2fe',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    iconContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30, // 캐릭터와 글자 사이 간격
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        alignItems: 'center',
    },
    universityText: {
        fontSize: 24, // 큼직한 학교 이름
        fontWeight: 'bold',
        color: '#1e3a8a', // 진한 파란색
        letterSpacing: 1.2,
    },
    sloganText: {
        fontSize: 14,
        color: '#60a5fa', // 연한 파란색
        marginTop: 6,
        letterSpacing: 0.8,
    },
});