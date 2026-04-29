import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

// 가상의 식단 데이터 (실제 API 데이터로 교체하시면 됩니다)
const MOCK_MENU_DATA = [
    {
        id: '1',
        cafeteria: '학생식당',
        foodName: '치킨마요덮밥',
        // 임시 음식 이미지 (실제 이미지 URL로 교체)
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: '2',
        cafeteria: '가좌푸드코트',
        foodName: '투움바파스타',
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: '3',
        cafeteria: '칠암생활관식당',
        foodName: '돼지고기김치찌개',
        imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: '4',
        cafeteria: 'GNU컨벤션센터',
        foodName: '등심돈까스',
        imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=300&q=80',
    },
];

export default function TodayMenuSection() {
    // 현재 선택된 식당 탭의 ID 상태 관리 (기본값: 첫 번째 아이템)
    const [activeTab, setActiveTab] = useState('1');

    return (
        <View className="px-5 py-6 bg-white">
            {/* 1. 헤더 영역 (타이틀 & 더보기) */}
            <View className="flex-row justify-between items-end mb-4">
                <Text className="text-xl font-extrabold text-gray-900">오늘의 식단</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-[13px] text-gray-500 font-medium mb-1">
                        더보기 {'>'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 2. 가로 스크롤 메뉴 리스트 */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // 스크롤 시 양옆 여백을 주어 자연스럽게 보이도록 설정
                contentContainerStyle={{ paddingRight: 20 }}
            >
                {MOCK_MENU_DATA.map((item) => {
                    const isActive = activeTab === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.9}
                            onPress={() => setActiveTab(item.id)}
                            // 카드 전체 스타일 (테두리, 둥근 모서리)
                            className="w-[120px] mr-3 rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                        >
                            {/* 상단 탭 (식당 이름) */}
                            <View
                                className={`py-2.5 items-center ${isActive ? 'bg-blue-600' : 'bg-gray-100'
                                    }`}
                            >
                                <Text
                                    className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-600'
                                        }`}
                                >
                                    {item.cafeteria}
                                </Text>
                            </View>

                            {/* 중앙 음식 사진 */}
                            <Image
                                source={{ uri: item.imageUrl }}
                                className="w-full h-[110px]"
                                resizeMode="cover"
                            />

                            {/* 하단 텍스트 (메뉴 이름) */}
                            <View className="py-1 items-center">
                                <Text className="text-[13px] text-gray-800">
                                    {item.foodName}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* 3. 하단 날짜 및 식사 시간 (조식/중식/석식) 선택 영역 */}
            <View className="mt-5">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center mb-1.5"
                >
                    {/* 달력 아이콘 (이모지로 임시 대체, 필요시 vector-icons 사용) */}
                    <Text className="text-lg mr-2">📅</Text>
                    <Text className="text-[15px] font-bold text-gray-800">
                        5월 20일 (화) 중식
                    </Text>
                    {/* 화살표 아이콘 */}
                    <Text className="text-gray-400 ml-1 mt-0.5">∨</Text>
                </TouchableOpacity>

                {/* 안내 문구 */}
                <Text className="text-[11px] text-gray-400">
                    * 메뉴는 식당 사정에 따라 변경될 수 있습니다.
                </Text>
            </View>
        </View>
    );
}