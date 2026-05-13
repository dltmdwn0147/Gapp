import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';

const ICON_SIZE = 200;

export default function SplashView({ onFinish }: { onFinish: () => void }) {
    // 1. 선언부 (여기서 값을 할당하는 건 OK)
    const iconOpacity = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(15);

    // 2. 스타일 정의 (value를 읽는 건 useAnimatedStyle 내부에서만!)
    const iconStyle = useAnimatedStyle(() => ({
        opacity: iconOpacity.value,
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textTranslateY.value }],
    }));

    useEffect(() => {
        // 3. 실행부: 반드시 useEffect 내부에서 .value를 수정해야 경고가 안 납니다.
        iconOpacity.value = withTiming(1, {
            duration: 1500,
            easing: Easing.out(Easing.quad)
        });

        textOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));

        textTranslateY.value = withDelay(800, withTiming(0, {
            duration: 800,
            easing: Easing.out(Easing.quad)
        }));

        const timer = setTimeout(() => {
            if (onFinish) onFinish();
        }, 3200);

        return () => clearTimeout(timer);
    }, [onFinish, iconOpacity, textOpacity, textTranslateY]); // 의존성 배열 추가

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={[styles.iconContainer, iconStyle]}>
                    <Image
                        source={require('../../../assets/gnu_ginu.png')}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </Animated.View>

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
        marginBottom: 30,
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        alignItems: 'center',
    },
    universityText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e3a8a',
        letterSpacing: 1.2,
    },
    sloganText: {
        fontSize: 14,
        color: '#60a5fa',
        marginTop: 6,
        letterSpacing: 0.8,
    },
});