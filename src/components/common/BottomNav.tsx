import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Animated, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Calendar, User, Megaphone, Menu, GraduationCap, UserCircle2 } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../contexts/AuthContext';
import { BOTTOM_NAV_BAR_HEIGHT, BOTTOM_NAV_VERTICAL_PADDING } from '../../constants/layout';

const MENU_POPUP_WIDTH = 260;
const { width: WINDOW_WIDTH } = Dimensions.get('window');

export default function BottomNav({ state, navigation }: BottomTabBarProps) {
    const { isLoggedIn, setShowLoginModal } = React.useContext(AuthContext);
    const insets = useSafeAreaInsets();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const bottomInset = Math.max(insets.bottom, Platform.OS === 'ios' ? 8 : 0);
    const navBottomPadding = bottomInset + BOTTOM_NAV_VERTICAL_PADDING;
    const popupBottom = BOTTOM_NAV_BAR_HEIGHT + navBottomPadding + 44;

    const currentRouteName = state.routes[state.index].name;

    useEffect(() => {
        const backAction = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [isMenuOpen]);

    const menuAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(menuAnimation, {
            toValue: isMenuOpen ? 1 : 0,
            useNativeDriver: true,
            friction: 8,
            tension: 60,
        }).start();
    }, [isMenuOpen, menuAnimation]);

    const backdropOpacity = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const menuTranslateY = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 0],
    });

    const handleCalendarPress = () => {
        setIsMenuOpen(false);
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            console.log('학사일정 페이지로 이동');
        }
    };

    const handleMyPagePress = () => {
        if (isLoggedIn) {
            setIsMenuOpen(!isMenuOpen);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <View className="absolute bottom-0 left-0 right-0 z-50">
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: -20,
                    left: 0,
                    right: 0,
                    top: -1000,
                    zIndex: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    opacity: backdropOpacity,
                }}
                pointerEvents={isMenuOpen ? 'auto' : 'none'}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setIsMenuOpen(false)}
                    style={{ flex: 1 }}
                />
            </Animated.View>

            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: popupBottom,
                    left: (WINDOW_WIDTH - MENU_POPUP_WIDTH) / 2,
                    width: MENU_POPUP_WIDTH,
                    zIndex: 50,
                    opacity: menuAnimation,
                    transform: [{ translateY: menuTranslateY }],
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.15,
                    shadowRadius: 20,
                    elevation: 10,
                }}
                pointerEvents={isMenuOpen ? 'auto' : 'none'}
            >
                <View className="bg-white rounded-full flex-row items-center justify-center py-3 px-2 border border-gray-100">
                    <TouchableOpacity
                        className="flex-row items-center px-4"
                        onPress={() => { console.log('졸업 요건 클릭'); setIsMenuOpen(false); }}
                    >
                        <GraduationCap size={18} color="#4b5563" />
                        <Text className="ml-2 font-bold text-gray-700 text-[14px]">졸업 요건</Text>
                    </TouchableOpacity>
                    <View className="w-[1px] h-4 bg-gray-200" />
                    <TouchableOpacity
                        className="flex-row items-center px-4"
                        onPress={() => { console.log('학생 정보 클릭'); setIsMenuOpen(false); }}
                    >
                        <UserCircle2 size={18} color="#4b5563" />
                        <Text className="ml-2 font-bold text-gray-700 text-[14px]">학생 정보</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <View className="w-full items-center px-4 z-30" style={{ paddingBottom: navBottomPadding }}>
                <View
                    className="flex-row justify-around items-center bg-white rounded-full w-full border border-gray-50"
                    style={{
                        height: BOTTOM_NAV_BAR_HEIGHT,
                        elevation: 15,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.12,
                        shadowRadius: 16,
                    }}
                >
                    <TouchableOpacity
                        className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'Main' ? 'bg-blue-600' : 'bg-transparent'}`}
                        onPress={() => {
                            navigation.navigate('Main');
                            setIsMenuOpen(false);
                        }}
                    >
                        <Home size={24} color={currentRouteName === 'Main' ? 'white' : '#2563eb'} />
                        <Text className={`text-[11px] mt-1 font-bold ${currentRouteName === 'Main' ? 'text-white' : 'text-blue-600'}`}>홈</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleCalendarPress}
                        className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'Calendar' ? 'bg-blue-600' : 'bg-transparent'}`}
                    >
                        <Calendar size={24} color={currentRouteName === 'Calendar' ? 'white' : (isLoggedIn ? '#2563eb' : '#9ca3af')} />
                        <Text className={`text-[10px] mt-1 text-center leading-tight font-bold ${currentRouteName === 'Calendar' ? 'text-white' : (isLoggedIn ? 'text-blue-600' : 'text-gray-400')}`}>
                            {isLoggedIn ? `학사일정 및\n내 일정` : `학사일정 및\n개인일정`}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-1 items-center relative h-full">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className={`absolute items-center justify-center border-[6px] border-white ${isMenuOpen ? 'bg-blue-800' : (isLoggedIn ? 'bg-blue-600' : 'bg-gray-400')}`}
                            style={{
                                top: -28,
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                                elevation: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 6,
                            }}
                            onPress={handleMyPagePress}
                        >
                            <User size={32} color="white" />
                        </TouchableOpacity>
                        <Text className={`text-[11px] absolute bottom-3 font-bold ${isLoggedIn || isMenuOpen ? 'text-blue-600' : 'text-gray-400'}`}>마이페이지</Text>
                    </View>

                    <TouchableOpacity
                        className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'Notice' ? 'bg-blue-600' : 'bg-transparent'}`}
                        onPress={() => {
                            navigation.navigate('Notice');
                            setIsMenuOpen(false);
                        }}
                    >
                        <Megaphone size={24} color={currentRouteName === 'Notice' ? 'white' : '#2563eb'} />
                        <Text className={`text-[10px] mt-1 text-center leading-tight font-bold ${currentRouteName === 'Notice' ? 'text-white' : 'text-blue-600'}`}>
                            {isLoggedIn ? `학과 및\n학교공지` : `학교공지`}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'More' ? 'bg-blue-600' : 'bg-transparent'}`}>
                        <Menu size={24} color={currentRouteName === 'More' ? 'white' : '#2563eb'} />
                        <Text className={`text-[11px] mt-1 font-bold ${currentRouteName === 'More' ? 'text-white' : 'text-blue-600'}`}>더보기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
