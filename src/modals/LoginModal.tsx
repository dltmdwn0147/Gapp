// src/components/LoginModal.tsx
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, Modal, TextInput,
    KeyboardAvoidingView, Platform, Keyboard, Pressable
} from 'react-native';
import { User, Lock, X } from 'lucide-react-native';

interface LoginModalProps {
    visible: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
    targetId: string;
}

export default function LoginModal({ visible, onClose, onLoginSuccess, targetId }: LoginModalProps) {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (studentId === targetId && password.length > 0) {
            onLoginSuccess();
            setStudentId('');
            setPassword('');
        } else if (studentId !== targetId) {
            alert('등록되지 않은 학번입니다.');
        } else {
            alert('비밀번호를 입력해주세요.');
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* 1. Pressable로 변경하여 클릭 이벤트 핸들링 최적화 */}
            <Pressable
                onPress={Keyboard.dismiss}
                style={{ flex: 1 }}
            >
                <View className="flex-1 justify-center items-center bg-black/60 px-6">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ width: '100%' }} // flex: 1을 빼고 width만 주어 레이아웃 충돌 방지
                    >
                        {/* 2. 모달 본체에 Pressable 추가 및 stopPropagation 적용 */}
                        <Pressable onPress={(e) => e.stopPropagation()}>
                            <View className="bg-white rounded-3xl p-8 shadow-2xl relative w-full">

                                <TouchableOpacity
                                    onPress={onClose}
                                    className="absolute right-4 top-1 p-2"
                                >
                                    <X size={24} color="#9ca3af" />
                                </TouchableOpacity>

                                <View className="items-center mb-8">
                                    <Text className="text-2xl font-bold text-gray-900">로그인</Text>
                                    <Text className="text-gray-400 mt-2">학번과 비밀번호를 입력하세요</Text>
                                </View>

                                <View className="gap-y-4">
                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                        <User size={20} color="#6b7280" className="mr-3" />
                                        <TextInput
                                            placeholder="학번 (ID)"
                                            value={studentId}
                                            onChangeText={setStudentId}
                                            keyboardType="numeric"
                                            className="flex-1 text-base text-gray-900"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>

                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                        <Lock size={20} color="#6b7280" className="mr-3" />
                                        <TextInput
                                            placeholder="비밀번호"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={true}
                                            className="flex-1 text-base text-gray-900"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={handleLogin}
                                    activeOpacity={0.8}
                                    className="bg-blue-600 mt-8 py-4 rounded-2xl items-center shadow-lg shadow-blue-200"
                                >
                                    <Text className="text-white font-bold text-lg">로그인하기</Text>
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                    </KeyboardAvoidingView>
                </View>
            </Pressable>
        </Modal>
    );
}