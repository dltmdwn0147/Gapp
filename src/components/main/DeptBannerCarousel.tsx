import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, NativeSyntheticEvent, Image, NativeScrollEvent } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { BannerItem } from '../../types';

import { AuthContext } from '../../contexts/AuthContext';
import { DEPT_BANNER_DATA_BY_DEPT } from '../../data/deptBannerData';

const { width: windowWidth } = Dimensions.get('window');

// 📏 기존 배너와 동일한 비율 유지
const CAROUSEL_WIDTH = windowWidth * 0.60;
const CAROUSEL_GAP = 12;
const SCREEN_PADDING = 20;

const INFINITE_MULTIPLIER = 200;

export default function DeptBannerCarousel() {
    const { userInfo, isLoggedIn } = React.useContext(AuthContext);
    
    // 로그인 안 되어 있거나 정보가 없으면 기본값으로 전자공학부(또는 첫 번째 항목) 노출
    const userDept = isLoggedIn && userInfo?.department ? userInfo.department : '전자공학부';
    const currentDeptBannerData = DEPT_BANNER_DATA_BY_DEPT[userDept] || DEPT_BANNER_DATA_BY_DEPT['전자공학부'];

    // 부드러운 무한 스크롤을 위해 데이터 뻥튀기
    const bannerData = React.useMemo(() => {
        return Array(INFINITE_MULTIPLIER).fill(currentDeptBannerData).flat();
    }, [currentDeptBannerData]);

    const MIDDLE_INDEX = currentDeptBannerData.length * (INFINITE_MULTIPLIER / 2);
    
    const [currentIndex, setCurrentIndex] = useState(MIDDLE_INDEX);
    const flatListRef = useRef<FlatList>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 학과가 변경되면 스크롤 위치 초기화
    useEffect(() => {
        setCurrentIndex(MIDDLE_INDEX);
        // 레이아웃이 잡히기 전일 수 있으므로 약간의 딜레이 후 이동
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: MIDDLE_INDEX, animated: false });
        }, 100);
    }, [userDept, MIDDLE_INDEX]);

    const startAutoPlay = useCallback(() => {
        stopAutoPlay();
        timerRef.current = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= bannerData.length - 1) {
                nextIndex = MIDDLE_INDEX;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: false });
                setCurrentIndex(nextIndex);
                return;
            }
            const nextOffset = nextIndex * (CAROUSEL_WIDTH + CAROUSEL_GAP);
            flatListRef.current?.scrollToOffset({ offset: nextOffset, animated: true });
        }, 3500); // 학과 소식은 조금 더 천천히 읽을 수 있게 3.5초로 설정
    }, [currentIndex, MIDDLE_INDEX, bannerData.length]);

    const stopAutoPlay = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [startAutoPlay, stopAutoPlay]);

    const handleScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const xOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(xOffset / (CAROUSEL_WIDTH + CAROUSEL_GAP));

        // 너무 끝에 도달하면 중간으로 슬쩍 이동
        if (index <= currentDeptBannerData.length || index >= bannerData.length - currentDeptBannerData.length) {
            const resetIndex = MIDDLE_INDEX + (index % currentDeptBannerData.length);
            flatListRef.current?.scrollToIndex({ index: resetIndex, animated: false });
            setCurrentIndex(resetIndex);
        } else {
            setCurrentIndex(index);
        }
        startAutoPlay();
    }, [bannerData.length, currentDeptBannerData.length, MIDDLE_INDEX, startAutoPlay]);

    return (
        <View className="my-4">

            <View
                style={{ paddingHorizontal: SCREEN_PADDING }}
                className="mb-3.5 flex-row items-center justify-between"
            >
                {/* 🌟 왼쪽: 아이콘과 타이틀 조합 */}
                <View className="flex-row items-center gap-1.5">
                    {/* 태그를 바짝 붙여서 불필요한 공백 문자 생성을 방지합니다 */}
                    <Text className="text-xl font-extrabold text-gray-900 tracking-tight">우리 학과 소식 🔥</Text>
                </View>

                {/* 🌟 오른쪽: '더보기' 버튼 (사용자 경험 향상) */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg"
                >
                    <Text className="text-[12px] font-semibold text-gray-500 mr-0.5">더보기</Text>
                    <ChevronRight size={14} color="#6b7280" />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={bannerData}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={MIDDLE_INDEX}
                getItemLayout={(_, index) => ({
                    length: CAROUSEL_WIDTH + CAROUSEL_GAP,
                    offset: index * (CAROUSEL_WIDTH + CAROUSEL_GAP),
                    index,
                })}
                snapToInterval={CAROUSEL_WIDTH + CAROUSEL_GAP}
                disableIntervalMomentum={true}
                snapToAlignment="start"
                decelerationRate="fast"
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING }}
                ItemSeparatorComponent={() => <View style={{ width: CAROUSEL_GAP }} />}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }: { item: BannerItem }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ width: CAROUSEL_WIDTH }}
                        className={`h-[400px] rounded-[24px] overflow-hidden ${item.bg}`}
                    >
                        <Image
                            source={{ uri: item.imageUrl }}
                            resizeMode="cover"
                            className="absolute right-0 w-[65%] h-full opacity-30"
                        />

                        <View className="flex-1 p-5 justify-between">
                            <View>
                                <Text className="text-[11px] text-white/80 font-semibold mb-1.5 tracking-wider uppercase">
                                    {item.subtitle}
                                </Text>
                                <Text className="text-[22px] font-black text-white leading-tight">
                                    {item.title}
                                </Text>

                                <View className="mt-5">
                                    <View className="bg-white/20 self-start px-2 py-0.5 rounded-md mb-1.5">
                                        <Text className="text-[10px] text-white font-bold">{item.date}</Text>
                                    </View>
                                    <Text className="text-[11px] text-white/90 ml-1">
                                        {`📍 ${item.place}`}
                                    </Text>
                                </View>
                            </View>

                            <View className="mt-2 bg-black/10 p-3 rounded-2xl">
                                <Text className="text-[13px] text-white/95 leading-relaxed">
                                    {item.content}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 하단 점 (페이지네이션) */}
            <View className="flex-row justify-center mt-4 gap-1.5">
                {currentDeptBannerData.map((_, index) => {
                    const realIndex = currentIndex % currentDeptBannerData.length;
                    return (
                        <View
                            key={index}
                            className={`h-1.5 rounded-full ${realIndex === index ? 'w-4 bg-indigo-600' : 'w-1.5 bg-gray-300'}`}
                        />
                    );
                })}
            </View>
        </View>
    );
}