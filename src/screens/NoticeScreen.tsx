import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import NoticeItem from '../components/Notice/NoticeItem';

// 더미 데이터
const MOCK_NOTICES = [
    { id: '1', type: '공지', category: '학사', title: '2026학년도 하계 계절학기1 폐강(1차) 교과목, 개설교과목 공고 및 수강신청(2차)안내', department: '학사지원과', date: '2026.05.12' },
    { id: '2', type: '공지', category: '학사', title: '[타 대학 교류] 2026학년도 하계 계절학기 교류 수학 안내[울산대, 경남대]', department: '학사지원과', date: '2026.05.11' },
    { id: '3', type: '공지', category: '학사', title: '2026학년도 1학기 교직 적성 및 인성 검사 실시 안내', department: '학사지원과', date: '2026.05.11' },
    { id: '4', type: '공지', category: '교내기관', title: '[국립대학육성사업] 2026학년도 2학기 개척학기제 제안과제 공모', department: '학사지원과', date: '2026.04.22' },
    { id: '5', type: '공지', category: '장학', title: '2026학년도 1학기 졸업논문·졸업종합시험 등 시행 안내(구.경남과기대 포함)', department: '학사지원과', date: '2026.04.20' },
];

export default function NoticeScreen({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');

    // ✨ 1. 현재 선택된 탭 상태 관리
    const [activeTab, setActiveTab] = useState('전체');

    // ✨ 2. 카테고리 메뉴 목록
    const categories = ['전체', '학사', '장학', '교내기관', '외부기관'];

    return (
        <View className="flex-1 bg-white">
            {/* 커스텀 헤더 */}
            <View className="pt-12 pb-4 px-4 flex-row items-center border-b border-gray-100">
                <Text className="flex-1 text-center text-lg font-bold text-gray-900">학교 공지사항</Text>
            </View>

            {/* 검색 및 카테고리 영역 */}
            <View className="p-4 bg-gray-50">
                <View className="flex-row gap-2 mb-3">
                    <View className="flex-1 flex-row items-center bg-white border border-gray-200 rounded-xl px-3 h-11">
                        <Search size={18} color="#9ca3af" />
                        <TextInput
                            className="flex-1 ml-2 text-sm text-gray-900"
                            placeholder="제목으로 검색"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity className="w-11 h-11 bg-blue-600 items-center justify-center rounded-xl">
                        <Filter size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* ✨ 3. 가로 스크롤 탭 메뉴 추가 */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row mb-1"
                    contentContainerStyle={{ paddingRight: 20 }}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => setActiveTab(category)}
                            className={`px-5 py-2.5 rounded-full mr-2 border ${activeTab === category
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'bg-white border-gray-200'
                                }`}
                        >
                            <Text className={`text-[12px] font-bold ${activeTab === category ? 'text-white' : 'text-gray-500'
                                }`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 통계 요약 영역 */}
            <View className="px-5 py-2 bg-white border-b border-gray-50">
                <Text className="text-[11px] text-gray-400">
                    <Text className="text-blue-600 font-bold">{activeTab}</Text> 카테고리에 <Text className="text-blue-600 font-bold">879</Text>건의 공지사항이 있습니다.
                </Text>
            </View>

            {/* 리스트 영역 */}
            <FlatList
                data={MOCK_NOTICES} // 나중에 데이터를 실제로 필터링하려면 MOCK_NOTICES.filter(...) 사용
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NoticeItem {...item} />}
                contentContainerStyle={{ paddingBottom: 100 }} // 바텀 네비게이션 높이 고려
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}