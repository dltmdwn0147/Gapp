import React from 'react';
import {
    Modal,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Pressable,
    View,
} from 'react-native';
import { UserInfo } from '../data/usersData';
import LoginFormContent from './LoginFormContent';

interface LoginModalProps {
    visible: boolean;
    onClose: () => void;
    onLoginSuccess: (user: UserInfo) => void;
}

/** 홈 화면 LoginPrompt 등 — 기존 RN Modal 방식 유지 (Android 동작 보존) */
export default function LoginModal({ visible, onClose, onLoginSuccess }: LoginModalProps) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
            presentationStyle="overFullScreen"
            statusBarTranslucent
        >
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        paddingHorizontal: 24,
                    }}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ width: '100%' }}
                    >
                        <Pressable onPress={(e) => e.stopPropagation()}>
                            <LoginFormContent onClose={onClose} onLoginSuccess={onLoginSuccess} />
                        </Pressable>
                    </KeyboardAvoidingView>
                </View>
            </Pressable>
        </Modal>
    );
}
