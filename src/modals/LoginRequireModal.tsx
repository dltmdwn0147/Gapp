import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { AuthContext } from '../contexts/AuthContext';
import { UserInfo } from '../data/usersData';
import LoginFormContent from './LoginFormContent';

type ModalStep = 'require' | 'login';

interface LoginRequiredModalProps {
    visible: boolean;
    onClose: () => void;
    onLoginSuccess?: (user: UserInfo) => void;
}

export default function LoginRequiredModal({ visible, onClose, onLoginSuccess }: LoginRequiredModalProps) {
    const { setIsLoggedIn, setUserInfo } = React.useContext(AuthContext);
    const insets = useSafeAreaInsets();
    const [step, setStep] = useState<ModalStep>('require');

    useEffect(() => {
        if (!visible) {
            setStep('require');
        }
    }, [visible]);

    const handleClose = useCallback(() => {
        setStep('require');
        onClose();
    }, [onClose]);

    const handleLoginSuccess = useCallback(
        (user: UserInfo) => {
            setUserInfo(user);
            setIsLoggedIn(true);
            setStep('require');
            onClose();
            onLoginSuccess?.(user);
        },
        [setUserInfo, setIsLoggedIn, onClose, onLoginSuccess],
    );

    const handleBackdropPress = useCallback(() => {
        if (step === 'login') {
            setStep('require');
        } else {
            handleClose();
        }
    }, [step, handleClose]);

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={handleBackdropPress}
            onBackButtonPress={handleBackdropPress}
            animationIn={step === 'require' ? 'slideInUp' : 'fadeIn'}
            animationOut={step === 'require' ? 'slideOutDown' : 'fadeOut'}
            backdropColor="black"
            backdropOpacity={0.5}
            statusBarTranslucent
            useNativeDriver={false}
            coverScreen
            hideModalContentWhileAnimating
            avoidKeyboard
            style={{
                margin: 0,
                justifyContent: step === 'require' ? 'flex-end' : 'center',
            }}
        >
            {step === 'require' ? (
                <View
                    className="bg-white rounded-t-[30px] px-6 pt-4 w-full items-center"
                    style={{ paddingBottom: insets.bottom + 24 }}
                >
                    <View className="w-12 h-1.5 bg-gray-300 rounded-full mb-6" />

                    <View className="w-full mb-4">
                        <Text className="text-lg font-bold text-gray-900">학생 전용</Text>
                    </View>

                    <View className="w-32 h-32 bg-gray-100 rounded-full items-center justify-center mb-6 overflow-hidden">
                        <Image
                            source={require('../../assets/sad_ginu.gif')}
                            style={{ width: '70%', height: '70%' }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="text-xl font-extrabold text-gray-900 mb-3 text-center">
                        학생만 이용할 수 있는 서비스예요.
                    </Text>

                    <Text className="text-[13px] text-gray-500 text-center mb-8 px-2 leading-relaxed">
                        경상국립대학교 학생만 이용할 수 있는 기능입니다.{'\n'}
                        로그인하시면 학과 일정, 졸업 요건 확인 등{'\n'}
                        다양한 혜택을 만나보실 수 있어요.
                    </Text>

                    <View className="w-full gap-3">
                        <TouchableOpacity
                            onPress={() => setStep('login')}
                            activeOpacity={0.8}
                            className="w-full bg-blue-600 py-4 rounded-2xl items-center justify-center"
                        >
                            <Text className="text-white font-bold text-base">로그인 하러 가기</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleClose}
                            activeOpacity={0.8}
                            className="w-full bg-gray-100 py-4 rounded-2xl items-center justify-center"
                        >
                            <Text className="text-gray-600 font-bold text-base">돌아가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ width: '100%', paddingHorizontal: 24 }}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                        bounces={false}
                    >
                        <LoginFormContent
                            onClose={() => setStep('require')}
                            onLoginSuccess={handleLoginSuccess}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
        </Modal>
    );
}
