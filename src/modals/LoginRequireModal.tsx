// src/modals/LoginRequireModal.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import LoginModal from './LoginModal';
import { AuthContext } from '../contexts/AuthContext';
import { UserInfo } from '../data/usersData';

interface LoginRequiredModalProps {
    visible: boolean;
    onClose: () => void;
    onLoginSuccess?: (user: UserInfo) => void; // 로그인 성공 후 콜백 (선택)
}

export default function LoginRequiredModal({ visible, onClose, onLoginSuccess }: LoginRequiredModalProps) {
    const { setIsLoggedIn, setUserInfo } = React.useContext(AuthContext);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLoginSuccess = (user: UserInfo) => {
        setUserInfo(user);
        setIsLoggedIn(true);
        setShowLoginForm(false);
        onClose();
        onLoginSuccess?.(user);
    };

    return (
        <>
            <Modal
                isVisible={visible}
                onBackdropPress={onClose}
                onBackButtonPress={onClose}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropColor="black"
                backdropOpacity={0.5}
                statusBarTranslucent={true}
                useNativeDriver={false}
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <View className="bg-white rounded-t-[30px] px-6 pb-10 pt-4 w-full items-center">

                    {/* 상단 회색 손잡이 */}
                    <View className="w-12 h-1.5 bg-gray-300 rounded-full mb-6" />

                    {/* 타이틀 */}
                    <View className="w-full mb-4">
                        <Text className="text-lg font-bold text-gray-900">학생 전용</Text>
                    </View>

                    {/* 캐릭터 */}
                    <View className="w-32 h-32 bg-gray-100 rounded-full items-center justify-center mb-6 overflow-hidden">
                        <Image
                            source={require('../../assets/sad_ginu.gif')}
                            style={{ width: '70%', height: '70%' }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* 안내 문구 */}
                    <Text className="text-xl font-extrabold text-gray-900 mb-3 text-center">
                        학생만 이용할 수 있는 서비스예요.
                    </Text>

                    <Text className="text-[13px] text-gray-500 text-center mb-8 px-2 leading-relaxed">
                        경상국립대학교 학생만 이용할 수 있는 기능입니다.{'\n'}
                        로그인하시면 학과 일정, 졸업 요건 확인 등{'\n'}
                        다양한 혜택을 만나보실 수 있어요.
                    </Text>

                    {/* 버튼 영역 */}
                    <View className="w-full gap-3">
                        <TouchableOpacity
                            onPress={() => {
                                onClose();
                                setShowLoginForm(true);
                            }}
                            activeOpacity={0.8}
                            className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center"
                        >
                            <Text className="text-white font-bold text-base">로그인 하러 가기</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onClose}
                            activeOpacity={0.8}
                            className="w-full bg-gray-100 py-4 rounded-2xl items-center justify-center"
                        >
                            <Text className="text-gray-600 font-bold text-base">돌아가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* 로그인 모달 */}
            <LoginModal
                visible={showLoginForm}
                onClose={() => setShowLoginForm(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
}