import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// 배지 색상을 type에 따라 다르게 표시
const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    '공지': { bg: 'bg-blue-100', text: 'text-blue-600' },
    '취업': { bg: 'bg-green-100', text: 'text-green-600' },
    '장학': { bg: 'bg-amber-100', text: 'text-amber-600' },
    '행사': { bg: 'bg-purple-100', text: 'text-purple-600' },
};

import { DeptNoticeItemProps } from '../../types';

export default function DeptNoticeItem({ type, category, title, department, date }: DeptNoticeItemProps) {
    const color = TYPE_COLORS[type] ?? { bg: 'bg-gray-100', text: 'text-gray-500' };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="bg-white border-b border-gray-100 p-4 flex-row items-center"
        >
            {/* 왼쪽: 타입 배지 */}
            <View className="w-12 items-center justify-center mr-3">
                <View className={`${color.bg} px-1.5 py-0.5 rounded`}>
                    <Text className={`text-[10px] font-bold ${color.text}`}>{type}</Text>
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
