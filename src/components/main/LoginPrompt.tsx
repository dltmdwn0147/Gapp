// src/components/LoginPrompt.tsx
import React, { useState } from 'react'; // 🌟 useState 추가
import { View, Text, TouchableOpacity } from 'react-native';
import { QrCode, LogOut } from 'lucide-react-native';
import LoginModal from '../../modals/LoginModal';
import QrModal from '../../modals/QrModal';

interface LoginPromptProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

export default function LoginPrompt({ isLoggedIn, setIsLoggedIn }: LoginPromptProps) {
    // 🌟 모달의 열림/닫힘 상태를 관리합니다.
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isQrVisible, setIsQrVisible] = useState(false);

    const handleRefreshQr = () => {
        // 여기에 새로고침 로직 (예: API 호출)을 넣으세요.
        console.log("QR 코드가 새로고침되었습니다.");
    };

    const studentInfo = {
        college: "IT 공과대학",
        department: "전자공학과",
        id: "221125139",
        name: "이승주"
    };

    // 로그아웃용 (임시)
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    // 로그인 성공 시 실행될 함수
    const handleLoginSuccess = () => {
        setIsModalVisible(false); // 모달 닫기
        setIsLoggedIn(true);      // 로그인 상태로 변경
    };

    // 1. 로그인 전 디자인
    if (!isLoggedIn) {
        return (
            <View className="mx-5 my-2 gap-y-3">
                {/* 1. 메인 로그인 카드 */}
                <View className="flex-row items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-gray-50">
                    <Text className="text-base font-medium text-gray-700 leading-tight">
                        {`로그인하고 맞춤 혜택을\n만나보세요!`}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)} // 🌟 클릭 시 모달 오픈
                        activeOpacity={0.7}
                        className="bg-orange-100 px-4 py-2 rounded-xl"
                    >
                        <Text className="font-bold text-orange-600">로그인</Text>
                    </TouchableOpacity>
                </View>

                {/* 🌟 실제 로그인 입력 모달 (배경 흐려지는 효과 포함) */}
                <LoginModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onLoginSuccess={handleLoginSuccess}
                    targetId={studentInfo.id}
                />
            </View>
        );
    }

    // 2. 로그인 후 디자인
    return (
        <View className="mx-5 my-2 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
                {/* 좌측: 학생 정보 */}
                <View className="flex-1 mr-4">
                    <View className="bg-blue-50 px-2 py-0.5 rounded self-start mb-1">
                        <Text className="text-blue-600 text-[9px] font-bold">{studentInfo.college}</Text>
                    </View>
                    <Text className="text-lg font-bold text-gray-900">{studentInfo.name}</Text>
                    <Text className="text-gray-400 text-xs mt-0.5">
                        {studentInfo.department} · {studentInfo.id}
                    </Text>
                </View>

                {/* 우측: 액션 버튼 (로그아웃 + QR) */}
                <View className="flex-row items-center gap-x-2">
                    <TouchableOpacity
                        onPress={() => setIsQrVisible(true)}
                        className="bg-blue-50 p-2.5 rounded-xl border border-blue-100"
                    >
                        <QrCode size={20} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="bg-gray-50 p-2.5 rounded-xl"
                    >
                        <LogOut size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>
            </View>
            <QrModal
                visible={isQrVisible}
                onClose={() => setIsQrVisible(false)}
                onRefresh={handleRefreshQr}
            />
        </View>

    );
}