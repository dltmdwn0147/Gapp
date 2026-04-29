import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, NativeSyntheticEvent, Image, NativeScrollEvent } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { BannerItem } from '../types';

const { width: windowWidth } = Dimensions.get('window');

// 📏 기존 배너와 동일한 비율 유지
const CAROUSEL_WIDTH = windowWidth * 0.60;
const CAROUSEL_GAP = 12;
const SCREEN_PADDING = 20;

// ✨ 학과 행사 성격에 맞춘 새로운 데이터 세팅
const DEPT_BANNER_DATA: BannerItem[] = [
    {
        id: 1,
        bg: 'bg-indigo-700',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
        title: '코딩의 한계에\n도전하라',
        subtitle: '컴퓨터공학과 해커톤',
        date: '2025.07.05(토) - 07.06(일)',
        place: 'IT 교육관 301호',
        content: '24시간 동안 몰입하여 개발하고 상금도 쟁취할 수 있는 열정 넘치는 해커톤.'
    },
    {
        id: 2,
        bg: 'bg-rose-600',
        imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop',
        title: '함께 만드는\n즐거운 추억',
        subtitle: '학과 연합 MT',
        date: '2025.08.20(수) - 08.22(금)',
        place: '대성리 푸른 계곡',
        content: '여름 방학의 낭만을 가득 담은 학과 구성원들과의 즐거운 2박 3일 여행.'
    },
    {
        id: 3,
        bg: 'bg-cyan-600',
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop',
        title: '선배가 들려주는\n진짜 사회 이야기',
        subtitle: '졸업생 초청 멘토링',
        date: '2025.09.15(월) 18:00',
        place: '멀티미디어실',
        content: '현직에 계신 선배님들께 듣는 생생한 직무 분석과 취업 준비 노하우.'
    },
    {
        id: 4,
        bg: 'bg-violet-600',
        imageUrl: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=600&auto=format&fit=crop',
        title: '우리의 손으로\n이끄는 학과',
        subtitle: '정기 학생회 선거',
        date: '2025.11.10(월) - 11.12(수)',
        place: '학과 사무실 앞',
        content: '우리 학과의 내일을 책임질 차기 학생회를 직접 투표로 선정하는 시간.'
    },
    {
        id: 5,
        bg: 'bg-orange-500',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop',
        title: '전공 역량의\n결실',
        subtitle: '졸업 작품 전시회',
        date: '2025.12.01(월) - 12.03(수)',
        place: '학술 문화관 1층',
        content: '4년간의 학업을 마무리하며 직접 개발한 멋진 작품들을 선보이는 자리.'
    },
];

const INFINITE_MULTIPLIER = 200;
const bannerData = Array(INFINITE_MULTIPLIER).fill(DEPT_BANNER_DATA).flat();

export default function DeptBannerCarousel() {
    const MIDDLE_INDEX = DEPT_BANNER_DATA.length * (INFINITE_MULTIPLIER / 2);
    const [currentIndex, setCurrentIndex] = useState(MIDDLE_INDEX);
    const flatListRef = useRef<FlatList>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    }, [currentIndex, MIDDLE_INDEX]);

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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        let index = Math.round(contentOffset / (CAROUSEL_WIDTH + CAROUSEL_GAP));
        if (index !== currentIndex && index >= 0 && index < bannerData.length) {
            setCurrentIndex(index);
        }
    };

    return (
        <View className="my-4">

            <View
                style={{ paddingHorizontal: SCREEN_PADDING }}
                className="mb-3.5 flex-row items-center justify-between"
            >
                {/* 🌟 왼쪽: 아이콘과 타이틀 조합 */}
                <View className="flex-row items-center gap-1.5">
                    <Text className="text-xl font-extrabold text-gray-900 tracking-tight">
                        우리 학과 소식 🔥
                    </Text>
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
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING }}
                ItemSeparatorComponent={() => <View style={{ width: CAROUSEL_GAP }} />}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }: { item: BannerItem }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ width: CAROUSEL_WIDTH }}
                        className={`h-[400px] rounded-[24px] shadow-sm overflow-hidden ${item.bg}`}
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
                                    <Text className="text-[11px] text-white/90 ml-1">📍 {item.place}</Text>
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
                {DEPT_BANNER_DATA.map((_, index) => {
                    const realIndex = currentIndex % DEPT_BANNER_DATA.length;
                    return (
                        <View
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${realIndex === index ? 'w-4 bg-indigo-600' : 'w-1.5 bg-gray-300'}`}
                        />
                    );
                })}
            </View>
        </View>
    );
}