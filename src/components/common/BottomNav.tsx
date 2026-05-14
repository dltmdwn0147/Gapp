import React, { useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Home, Calendar, User, Megaphone, Menu, GraduationCap, UserCircle2 } from 'lucide-react-native';
import LoginRequiredModal from '../../modals/LoginRequireModal';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'; // ✨ BottomTabBarProps 추가
import { AuthContext } from '../../contexts/AuthContext'; // ✨ AuthContext 임포트 경로 수정

export default function BottomNav({ state, navigation }: BottomTabBarProps) {
    const { isLoggedIn } = React.useContext(AuthContext); // ✨ 컨텍스트 사용
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    // ✨ 현재 활성화된 탭의 이름을 props에서 가져옵니다.
    const currentRouteName = state.routes[state.index].name;

    // 메뉴 닫기 핸들러 (UX 최적화)
    React.useEffect(() => {
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

    const handleCalendarPress = () => {
        setIsMenuOpen(false); // 메뉴 닫기 추가
        if (!isLoggedIn) {
            setIsLoginModalVisible(true);
        } else {
            console.log("학사일정 페이지로 이동");
        }
    };

    const handleMyPagePress = () => {
        if (isLoggedIn) {
            setIsMenuOpen(!isMenuOpen);
        } else {
            setIsLoginModalVisible(true);
        }
    };

    return (
        <View className="absolute bottom-0 w-full z-50">
            {/* 1. 배경 흐림 효과 */}
            {isMenuOpen && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setIsMenuOpen(false)}
                    className="absolute -bottom-5 left-0 right-0 -top-[1000px] bg-black/40 z-10"
                />
            )}

            {/* 2. 상단 마이페이지 팝업 메뉴 */}
            {isMenuOpen && (
                <View className="absolute bottom-[140px] left-1/2 -ml-[130px] w-[260px] z-50">
                    <View className="bg-white rounded-full flex-row items-center justify-center py-3 px-2 shadow-2xl border border-gray-100">
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
                </View>
            )}

            {/* 3. 메인 바텀 네비게이션 바 */}
            <View className="w-full items-center px-4 pb-5 z-30">
                <View
                    className="flex-row justify-around items-center bg-white h-20 rounded-full w-full shadow-2xl border border-gray-50"
                    style={{ elevation: 15 }}
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
                            className={`absolute -top-7 w-[70px] h-[70px] rounded-full items-center justify-center border-[6px] border-white shadow-lg ${isMenuOpen ? 'bg-blue-800' : (isLoggedIn ? 'bg-blue-600' : 'bg-gray-400')
                                }`}
                            style={{ elevation: 8 }}
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
                            setIsMenuOpen(false); // 메뉴 닫기
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

            <LoginRequiredModal
                visible={isLoginModalVisible}
                onClose={() => setIsLoginModalVisible(false)}
                onLogin={() => {
                    setIsLoginModalVisible(false);
                    console.log("로그인 화면으로 이동");
                }}
            />
        </View>
    );
}