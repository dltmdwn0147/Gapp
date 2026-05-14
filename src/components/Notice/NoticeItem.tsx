import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface NoticeItemProps {
    id: string;
    type: string;
    category: string;
    title: string;
    department: string;
    date: string;
}

export default function NoticeItem({ type, category, title, department, date }: NoticeItemProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="bg-white border-b border-gray-100 p-4 flex-row items-center"
        >
            {/* 왼쪽: 구분/번호 영역 */}
            <View className="w-12 items-center justify-center mr-3">
                <View className="bg-gray-100 px-1.5 py-0.5 rounded">
                    <Text className="text-[10px] text-gray-500 font-bold">{type}</Text>
                </View>
                <Text className="text-[9px] text-gray-400 mt-1 text-center" numberOfLines={1}>
                    {category}
                </Text>
            </View>

            {/* 중앙: 제목 및 정보 */}
            <View className="flex-1">
                <Text className="text-[14px] text-gray-900 font-medium leading-5 mb-1" numberOfLines={2}>
                    {title}
                </Text>
                <View className="flex-row items-center">
                    <Text className="text-[11px] text-blue-600 font-semibold">{department}</Text>
                    <Text className="text-[11px] text-gray-300 mx-1.5">|</Text>
                    <Text className="text-[11px] text-gray-400">{date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}