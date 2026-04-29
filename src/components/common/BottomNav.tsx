import React, { useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
// 아이콘 추가: GraduationCap, UserCircle2
import { Home, Calendar, User, Megaphone, Menu, GraduationCap, UserCircle2 } from 'lucide-react-native';
import LoginRequiredModal from '../../modals/LoginRequireModal'

interface BottomNavProps {
    isLoggedIn: boolean;
}

export default function CustomBottomNav({ isLoggedIn }: BottomNavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    // 메뉴가 열렸을 때 안드로이드 뒤로가기 버튼을 누르면 메뉴만 닫히도록 설정 (UX 최적화)
    React.useEffect(() => {
        const backAction = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [isMenuOpen]);

    const handleCalendarPress = () => {
        if (!isLoggedIn) {
            // 로그인 안 되어 있으면 모달 띄우기
            setIsLoginModalVisible(true);
        } else {
            // 로그인 되어 있으면 실제 학사일정 페이지로 이동 (나중에 구현)
            console.log("학사일정 페이지로 이동");
        }
    };

    const handleMyPagePress = () => {
        if (isLoggedIn) {
            // 1. 로그인 상태면 기존 메뉴 토글
            setIsMenuOpen(!isMenuOpen);
        } else {
            // 2. 로그아웃 상태면 지누 모달 띄우기
            setIsLoginModalVisible(true);
        }
    };

    return (
        <View className="absolute bottom-0 w-full z-50">
            {/* 1. 배경 흐림 효과 (Dim BackDrop) */}
            {isMenuOpen && (
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setIsMenuOpen(false)}
                    // 전체 화면을 덮는 어두운 배경 (블랙 투명도 40%)
                    className="absolute -bottom-5 left-0 right-0 -top-[1000px] bg-black/40 z-10"
                />
            )}

            {/* 2. 상단 마이페이지 팝업 메뉴 (아이콘 추가 완료!) */}
            {isMenuOpen && (
                <View
                    // z-40으로 올려서 바에 가려지지 않게 설정, 위치 조정
                    className="absolute bottom-[140px] left-1/2 -ml-[130px] w-[250px] z-50"
                >
                    {/* 메뉴 몸통: 흰색, 완전히 둥근 캡슐 형태, 예시처럼 그림자 강화 */}
                    <View className="bg-white rounded-full flex-row items-center justify-center py-2 px-1.5 shadow-2xl border border-gray-100">

                        {/* 졸업 요건: 학사모 아이콘 추가 */}
                        <TouchableOpacity
                            className="flex-row items-center px-4"
                            onPress={() => {
                                console.log("졸업 요건 클릭");
                                setIsMenuOpen(false); // 클릭 시 닫기
                            }}
                        >
                            <GraduationCap size={18} color="#4b5563" className="mr-2" />
                            <Text className="text-center font-bold text-gray-700 text-[14px]">졸업 요건</Text>
                        </TouchableOpacity>

                        {/* 수직 구분선 */}
                        <View className="w-[1px] h-4 bg-gray-200" />

                        {/* 학생 정보: 프로필 아이콘 추가 */}
                        <TouchableOpacity
                            className="flex-row items-center px-4"
                            onPress={() => {
                                console.log("학생 정보 클릭");
                                setIsMenuOpen(false); // 클릭 시 닫기
                            }}
                        >
                            <UserCircle2 size={18} color="#4b5563" className="mr-2" />
                            <Text className="text-center font-bold text-gray-700 text-[14px]">학생 정보</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* 3. 메인 바텀 네비게이션 바 (z-30 유지) */}
            <View className="w-full items-center px-4 pb-5 z-30">
                <View
                    className="flex-row justify-around items-center bg-white h-20 rounded-full w-full shadow-2xl border border-gray-50"
                    style={{ elevation: 15 }} // 안드로이드 그림자 강화
                >
                    {/* 홈 */}
                    <TouchableOpacity className="items-center justify-center flex-1 h-full">
                        <Home size={26} color="#2563eb" />
                        <Text className="text-[11px] mt-1.5 text-blue-600 font-semibold">홈</Text>
                    </TouchableOpacity>

                    {/* 학사일정 */}
                    <TouchableOpacity
                        onPress={handleCalendarPress} // 클릭 이벤트 연결
                        className="items-center justify-center flex-1 h-full"
                    >
                        <Calendar size={26} color={isLoggedIn ? "#2563eb" : "#9ca3af"} />
                        <Text
                            className={`text-[10px] mt-1 text-center leading-tight ${isLoggedIn ? "text-blue-600 font-bold" : "text-gray-500"
                                }`}
                        >
                            {isLoggedIn ? `학사일정 및\n내 일정` : `학사일정 및\n개인일정`}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-1 items-center relative h-full">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            // 🌟 배경색(bg-...)도 로그인 상태에 따라 파란색/회색으로 변경
                            className={`absolute -top-7 w-[70px] h-[70px] rounded-full items-center justify-center border-[6px] border-white shadow-lg ${isLoggedIn ? 'bg-blue-600' : 'bg-gray-400'
                                }`}
                            style={{ elevation: 8 }}
                            onPress={handleMyPagePress}
                        >
                            {/* 로그인 전/후 아이콘 변경 (선택사항) */}
                            {isLoggedIn ? (
                                <User size={32} color="white" />
                            ) : (
                                <User size={32} color="white" opacity={0.8} />
                            )}
                        </TouchableOpacity>

                        {/* 🌟 텍스트: 요청하신 조건부 스타일 적용 */}
                        <Text
                            className={`text-[11px] absolute bottom-3 ${isLoggedIn
                                ? "text-blue-600 font-bold"
                                : "text-gray-500"
                                }`}
                        >
                            마이페이지
                        </Text>
                    </View>

                    {/* 공지사항 */}
                    <TouchableOpacity className="items-center justify-center flex-1 h-full px-1">
                        <Megaphone size={26} color="#2563eb" />
                        {/* 2. 로그인 상태에 따라 글자를 바꾸고, 길어질 경우를 대비해 줄바꿈 및 가운데 정렬 */}
                        <Text className="text-[10px] mt-1 text-center leading-tight text-blue-600 font-bold">
                            {isLoggedIn
                                ? `학과 및\n학교공지`
                                : `학교공지`}
                        </Text>
                    </TouchableOpacity>

                    {/* 더보기 */}
                    <TouchableOpacity className="items-center justify-center flex-1 h-full">
                        <Menu size={26} color="#2563eb" />
                        <Text className="text-[11px] mt-1.5 text-blue-600 font-bold">더보기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <LoginRequiredModal
                visible={isLoginModalVisible}
                onClose={() => setIsLoginModalVisible(false)} // 돌아가기 누르면 닫기
                onLogin={() => {
                    setIsLoginModalVisible(false);
                    // 여기서 로그인 화면으로 이동시키는 navigation.navigate('Login') 등을 추가할 수 있습니다.
                    console.log("로그인 화면으로 이동");
                }}
            />
        </View>
    );
}