// src/components/QrModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { QrCode, RefreshCw, X } from 'lucide-react-native'; // 아이콘들

interface QrModalProps {
    visible: boolean;
    onClose: () => void;
    onRefresh: () => void; // 새로고침 함수 추가
}

export default function QrModal({ visible, onClose, onRefresh }: QrModalProps) {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                className="flex-1 bg-black/60 items-center justify-center"
            >
                {/* 모달 본체 */}
                <View className="bg-white p-8 rounded-3xl items-center w-[85%]">
                    {/* 상단 제목과 닫기 버튼 */}
                    <View className="flex-row justify-between items-center w-full mb-6">
                        <Text className="text-lg font-bold text-gray-900">모바일 출입증</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color="#374151" />
                        </TouchableOpacity>
                    </View>

                    {/* QR 코드 영역 */}
                    <View className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-50">
                        <QrCode size={200} color="black" />
                    </View>

                    {/* 새로고침 버튼 */}
                    <TouchableOpacity
                        onPress={onRefresh}
                        className="mt-6 flex-row items-center bg-blue-50 px-5 py-2.5 rounded-full"
                    >
                        <RefreshCw size={16} color="#2563eb" />
                        <Text className="text-blue-600 font-bold ml-2">QR 새로고침</Text>
                    </TouchableOpacity>

                    <Text className="text-gray-400 mt-4 text-xs italic">
                        건물 출입 시 스캔하세요
                    </Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}