import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Animated } from 'react-native';
import { Home, Calendar, User, Megaphone, Menu, GraduationCap, UserCircle2 } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'; // ✨ BottomTabBarProps 추가
import { AuthContext } from '../../contexts/AuthContext'; // ✨ AuthContext 임포트 경로 수정

export default function BottomNav({ state, navigation }: BottomTabBarProps) {
    const { isLoggedIn, setShowLoginModal } = React.useContext(AuthContext); // ✨ 컨텍스트 사용
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // ✨ 현재 활성화된 탭의 이름을 props에서 가져옵니다.
    const currentRouteName = state.routes[state.index].name;

    // 메뉴 닫기 핸들러 (UX 최적화)
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

    // ✨ 팝업 메뉴 애니메이션 처리
    const menuAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(menuAnimation, {
            toValue: isMenuOpen ? 1 : 0,
            useNativeDriver: true,
            friction: 8,
            tension: 60,
        }).start();
    }, [isMenuOpen]);

    const backdropOpacity = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    const menuTranslateY = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 0] // 살짝 아래에서 위로 올라옴
    });

    const handleCalendarPress = () => {
        setIsMenuOpen(false); // 메뉴 닫기 추가
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            console.log("학사일정 페이지로 이동");
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
        <View className="absolute bottom-0 w-full z-50">
            {/* 1. 배경 흐림 효과 (부드러운 페이드 인/아웃 - NativeWind Interop 에러 방지를 위해 인라인 스타일 적용) */}
            <Animated.View
                className="absolute -bottom-5 left-0 right-0 -top-[1000px] z-10"
                style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                    opacity: backdropOpacity 
                }}
                pointerEvents={isMenuOpen ? 'auto' : 'none'}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setIsMenuOpen(false)}
                    style={{ flex: 1 }}
                />
            </Animated.View>

            {/* 2. 상단 마이페이지 팝업 메뉴 (페이드 인 & 슬라이드 업) */}
            <Animated.View 
                className="absolute bottom-[140px] left-1/2 -ml-[130px] w-[260px] z-50"
                style={{
                    opacity: menuAnimation,
                    transform: [{ translateY: menuTranslateY }],
                    // shadow-2xl로 인한 Navigation Context 에러 우회용 인라인 그림자 스타일
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
                        onPress={() => { console.log("졸업 요건 클릭"); setIsMenuOpen(false); }}
                    >
                        <GraduationCap size={18} color="#4b5563" />
                        <Text className="ml-2 font-bold text-gray-700 text-[14px]">졸업 요건</Text>
                    </TouchableOpacity>
                    <View className="w-[1px] h-4 bg-gray-200" />
                    <TouchableOpacity
                        className="flex-row items-center px-4"
                        onPress={() => { console.log("학생 정보 클릭"); setIsMenuOpen(false); }}
                    >
                        <UserCircle2 size={18} color="#4b5563" />
                        <Text className="ml-2 font-bold text-gray-700 text-[14px]">학생 정보</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* 3. 메인 바텀 네비게이션 바 */}
            <View className="w-full items-center px-4 pb-5 z-30">
                <View
                    className="flex-row justify-around items-center bg-white h-20 rounded-full w-full border border-gray-50"
                    style={{ 
                        elevation: 15,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.12,
                        shadowRadius: 16,
                    }}
                >
                    {/* 홈 버튼 */}
                    <TouchableOpacity
                        className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'Main' ? 'bg-blue-600' : 'bg-transparent'}`}
                        onPress={() => {
                            navigation.navigate('Main');
                            setIsMenuOpen(false); // 메뉴 닫기
                        }}
                    >
                        <Home size={24} color={currentRouteName === 'Main' ? "white" : "#2563eb"} />
                        <Text className={`text-[11px] mt-1 font-bold ${currentRouteName === 'Main' ? 'text-white' : 'text-blue-600'}`}>홈</Text>
                    </TouchableOpacity>

                    {/* 학사일정 버튼 */}
                    <TouchableOpacity
                        onPress={handleCalendarPress}
                        className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'Calendar' ? 'bg-blue-600' : 'bg-transparent'}`}
                    >
                        <Calendar size={24} color={currentRouteName === 'Calendar' ? "white" : (isLoggedIn ? "#2563eb" : "#9ca3af")} />
                        <Text className={`text-[10px] mt-1 text-center leading-tight font-bold ${currentRouteName === 'Calendar' ? 'text-white' : (isLoggedIn ? 'text-blue-600' : 'text-gray-400')}`}>
                            {isLoggedIn ? `학사일정 및\n내 일정` : `학사일정 및\n개인일정`}
                        </Text>
                    </TouchableOpacity>

                    {/* 마이페이지 (중앙 돌출) */}
                    <View className="flex-1 items-center relative h-full">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className={`absolute -top-7 w-[70px] h-[70px] rounded-full items-center justify-center border-[6px] border-white ${isMenuOpen ? 'bg-blue-800' : (isLoggedIn ? 'bg-blue-600' : 'bg-gray-400')
                                }`}
                            style={{ 
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
                        <Text className={`text-[11px] absolute bottom-3 font-bold ${isLoggedIn || isMenuOpen ? "text-blue-600" : "text-gray-400"}`}>마이페이지</Text>
                    </View>

                    {/* 공지사항 버튼 */}
                    <TouchableOpacity
                        className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'Notice' ? 'bg-blue-600' : 'bg-transparent'}`}
                        onPress={() => {
                            navigation.navigate('Notice');
                            setIsMenuOpen(false);
                        }}
                    >
                        <Megaphone size={24} color={currentRouteName === 'Notice' ? "white" : "#2563eb"} />
                        <Text className={`text-[10px] mt-1 text-center leading-tight font-bold ${currentRouteName === 'Notice' ? 'text-white' : 'text-blue-600'}`}>
                            {isLoggedIn ? `학과 및\n학교공지` : `학교공지`}
                        </Text>
                    </TouchableOpacity>

                    {/* 더보기 버튼 */}
                    <TouchableOpacity className={`items-center justify-center flex-1 h-[80%] rounded-full mx-1 ${currentRouteName === 'More' ? 'bg-blue-600' : 'bg-transparent'}`}>
                        <Menu size={24} color={currentRouteName === 'More' ? "white" : "#2563eb"} />
                        <Text className={`text-[11px] mt-1 font-bold ${currentRouteName === 'More' ? 'text-white' : 'text-blue-600'}`}>더보기</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}