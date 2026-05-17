import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import LoginPrompt from '../components/main/LoginPrompt';
import BannerCarousel from '../components/main/BannerCarousel';
import DeptBannerCarousel from '../components/main/DeptBannerCarousel';
import MenuSection from '../components/main/MenuSection';
import { AuthContext } from '../contexts/AuthContext';
import { SCROLL_BOTTOM_PADDING } from '../constants/layout';

export default function MainScreen() {
    const { isLoggedIn } = React.useContext(AuthContext);
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={['#6daffc', '#a2defa', '#fcfcff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.screen, { paddingTop: insets.top }]}
        >
            <Header />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scroll}
                contentContainerStyle={{ paddingBottom: SCROLL_BOTTOM_PADDING + insets.bottom }}
            >
                <LoginPrompt />

                {isLoggedIn ? (
                    <>
                        <DeptBannerCarousel />
                        <MenuSection />
                        <BannerCarousel />
                    </>
                ) : (
                    <>
                        <BannerCarousel />
                        <MenuSection />
                    </>
                )}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
});
