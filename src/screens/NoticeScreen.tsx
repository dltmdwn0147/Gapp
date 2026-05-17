import React, { useState, useMemo, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Search, Filter, Lock, X, Check } from 'lucide-react-native';
import NoticeItem from '../components/Notice/NoticeItem';
import DeptNoticeItem from '../components/Notice/DeptNoticeItem';
import { MOCK_NOTICES } from '../data/noticeData';
import { DEPT_NOTICES_BY_DEPT } from '../data/deptNoticeData';
import { AuthContext } from '../contexts/AuthContext';

const UNIV_CATEGORIES = ['전체', '학사', '장학', '교내기관', '외부기관'];
const DEPT_CATEGORIES = ['전체', '학과', '채용', '행사', '장학'];

const YEARS = ['전체', '1학년', '2학년', '3학년', '4학년'];
const SORT_OPTIONS = ['최신순', '과거순'];

export default function NoticeScreen({ navigation }: any) {
    const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, setShowLoginModal } = useContext(AuthContext);

    const [mode, setMode] = useState<'dept' | 'univ'>('univ');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('전체');

    // 💡 [학년 및 정렬 상태 추가]
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedYear, setSelectedYear] = useState('전체');
    const [sortBy, setSortBy] = useState('최신순');

    // 화면에 포커스될 때 상태 초기화
    useFocusEffect(
        useCallback(() => {
            if (isLoggedIn) {
                setMode('dept');
            } else {
                setMode('univ');
            }
            setActiveTab('전체');
            setSearchQuery('');
            setSelectedYear('전체'); // 필터 리셋
            setSortBy('최신순');    // 정렬 리셋
        }, [isLoggedIn])
    );


    const categories = mode === 'dept' ? DEPT_CATEGORIES : UNIV_CATEGORIES;

    const handleModeChange = (newMode: 'dept' | 'univ') => {
        if (newMode === 'dept' && !isLoggedIn) {
            setShowLoginModal(true);
            return;
        }
        setMode(newMode);
        setActiveTab('전체');
        setSearchQuery('');
        setSelectedYear('전체'); // 모드 전환 시 필터 리셋
        setSortBy('최신순');
    };

    // 💡 [필터링 및 정렬 로직 업데이트]
    const filteredData = useMemo(() => {
        let source = MOCK_NOTICES;
        if (mode === 'dept') {
            const userDept = userInfo?.department || '';
            source = DEPT_NOTICES_BY_DEPT[userDept] || [];
        }

        // 1. 카테고리, 검색어, 학년 필터링 적용
        let result = source.filter(item => {
            const matchesTab = activeTab === '전체' || item.category === activeTab;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

            // 데이터에 targetYear가 없거나 '전체'일 경우 프리패스, 지정되어 있다면 매칭 확인
            const matchesYear =
                selectedYear === '전체' ||
                !item.targetYear ||
                item.targetYear === '전체' ||
                item.targetYear === selectedYear;

            return matchesTab && matchesSearch && matchesYear;
        });

        // 2. 최신순 / 과거순 정렬 적용
        return result.sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return sortBy === '최신순'
                ? b.date.localeCompare(a.date)
                : a.date.localeCompare(b.date);
        });
    }, [mode, activeTab, searchQuery, userInfo, selectedYear, sortBy]);

    // 기본값이 아닌 필터가 활성화되었는지 판별
    const isFilterActive = selectedYear !== '전체' || sortBy !== '최신순';

    return (
        <View className="flex-1 bg-white">

            {/* ─── 상단 헤더 ─── */}
            <View className="pt-12 pb-4 px-4 flex-row items-center justify-between border-b border-gray-100">
                <View className="flex-1 pr-2">
                    <Text className="text-xs text-blue-600 font-bold mb-0.5" numberOfLines={1}>
                        {mode === 'dept' ? `경상국립대학교 ${userInfo?.department || '학과'}` : '경상국립대학교'}
                    </Text>
                    <Text className="text-xl font-bold text-gray-900">
                        {mode === 'dept' ? '학과 공지사항' : '학교 공지사항'}
                    </Text>
                </View>

                {/* 토글 스위치 (전체 영역 클릭 가능 - 고품격 디자인 업그레이드) */}
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => handleModeChange(mode === 'dept' ? 'univ' : 'dept')}
                    className="flex-row items-center bg-slate-100 p-1 rounded-full w-[140px] h-[40px] border border-slate-200/50"
                >
                    <View
                        className="flex-1 flex-row items-center justify-center h-full gap-1"
                        style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            backgroundColor: mode === 'dept' ? '#2563eb' : 'transparent',
                        }}
                    >
                        {!isLoggedIn && <Lock size={10} color={mode === 'dept' ? 'white' : '#94a3b8'} />}
                        <Text className={`text-[11px] font-bold tracking-tight ${mode === 'dept' ? 'text-white' : 'text-slate-400'}`}>학과</Text>
                    </View>

                    <View
                        className="flex-1 items-center justify-center h-full"
                        style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            backgroundColor: mode === 'univ' ? '#2563eb' : 'transparent',
                        }}
                    >
                        <Text className={`text-[11px] font-bold tracking-tight ${mode === 'univ' ? 'text-white' : 'text-slate-400'}`}>학교</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* ─── 검색 & 카테고리 ─── */}
            <View className="p-4 bg-gray-50/50">
                <View className="flex-row gap-2 mb-3">
                    <View className="flex-1 flex-row items-center bg-white border border-gray-200 rounded-xl px-3 h-11">
                        <Search size={18} color="#9ca3af" />
                        <TextInput
                            className="flex-1 ml-2 text-sm text-gray-900"
                            placeholder={mode === 'dept' ? '전공 공지, 채용 정보 검색...' : '제목으로 검색'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
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
                            <Text className={`text-[12px] font-bold ${activeTab === category ? 'text-white' : 'text-gray-500'}`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* ─── 결과 요약 ─── */}
            <View className="px-5 py-3 bg-white border-b border-gray-100 flex-row justify-between items-center">
                <Text className="text-[12px] text-gray-500 font-medium">
                    총 <Text className="text-blue-600 font-extrabold">{filteredData.length}</Text>건의 공지사항
                </Text>

                {/* 우측 컨트롤 영역 (배지 + 필터 버튼) */}
                <View className="flex-row items-center gap-2">
                    {/* 💡 [적용된 상태 요약 텍스트 노출] */}
                    <Text className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md overflow-hidden">
                        {selectedYear} • {sortBy}
                    </Text>

                    {/* 💡 [필터 버튼 활성화 조건 추가] */}
                    <TouchableOpacity
                        onPress={() => setShowFilterModal(true)}
                        className={`w-8 h-8 items-center justify-center rounded-lg border ${isFilterActive ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'
                            }`}
                    >
                        <Filter size={14} strokeWidth={2.5} color={isFilterActive ? 'white' : '#4b5563'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ─── 리스트 ─── */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    mode === 'dept'
                        ? <DeptNoticeItem {...item} />
                        : <NoticeItem {...item} />
                }
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center pt-20">
                        <Text className="text-gray-400">조건에 맞는 검색 결과가 없습니다.</Text>
                    </View>
                }
            />

            {/* ─── 💡 [추가] 상세 필터 바텀 시트 모달 ─── */}
            <Modal
                isVisible={showFilterModal}
                onBackdropPress={() => setShowFilterModal(false)}
                onBackButtonPress={() => setShowFilterModal(false)}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropColor="black"
                backdropOpacity={0.4}
                statusBarTranslucent={true}
                useNativeDriver={false}
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <View className="bg-white rounded-t-3xl p-6 pb-10">
                    {/* 모달 상단부 */}
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-bold text-gray-900">상세 필터</Text>
                        <TouchableOpacity onPress={() => setShowFilterModal(false)} className="p-1">
                            <X size={22} color="#1f2937" />
                        </TouchableOpacity>
                    </View>

                    {/* 1. 학년 필터 섹션 */}
                    <Text className="text-sm font-bold text-gray-800 mb-3">대상 학년</Text>
                    <View className="flex-row flex-wrap gap-2 mb-6">
                        {YEARS.map((year) => (
                            <TouchableOpacity
                                key={year}
                                onPress={() => setSelectedYear(year)}
                                className={`px-4 py-2 rounded-xl border ${selectedYear === year ? 'bg-blue-50 border-blue-600' : 'bg-white border-gray-200'
                                    }`}
                            >
                                <Text className={`text-xs font-semibold ${selectedYear === year ? 'text-blue-600' : 'text-gray-600'}`}>
                                    {year}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 2. 정렬 방식 섹션 */}
                    <Text className="text-sm font-bold text-gray-800 mb-3">정렬 기준</Text>
                    <View className="flex-row gap-6 mb-6">
                        {SORT_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setSortBy(option)}
                                className="flex-row items-center"
                                activeOpacity={0.7}
                            >
                                <View className={`w-5 h-5 rounded-full border mr-2 items-center justify-center ${sortBy === option ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                                    }`}>
                                    {sortBy === option && <Check size={12} color="white" />}
                                </View>
                                <Text className={`text-sm ${sortBy === option ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 닫기 및 적용 버튼 */}
                    <TouchableOpacity
                        onPress={() => setShowFilterModal(false)}
                        className="w-full bg-blue-600 py-3.5 rounded-xl items-center justify-center mt-2"
                    >
                        <Text className="text-white font-bold text-base">필터 적용하기</Text>
                    </TouchableOpacity>
                </View>
            </Modal>



        </View>
    );
}