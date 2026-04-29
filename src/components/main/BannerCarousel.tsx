// src/components/BannerCarousel.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, NativeSyntheticEvent, Image, NativeScrollEvent } from 'react-native';
import { Sparkles, ChevronRight } from 'lucide-react-native';
import { BannerItem } from '../../types';

const { width: windowWidth } = Dimensions.get('window');

// 📏 이미지 기반 비율 완벽 세팅
const CAROUSEL_WIDTH = windowWidth * 0.60;
const CAROUSEL_GAP = 12;
const SCREEN_PADDING = 20;

// ✨ 사진과 똑같이 나오도록 텍스트와 아이콘 데이터 세팅
// ✨ 무한 스크롤을 위해 원본 데이터를 저장합니다.
const ORIGINAL_BANNER_DATA: BannerItem[] = [
    {
        id: 1,
        bg: 'bg-blue-600',
        imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=600&auto=format&fit=crop',
        title: '개척의 길,\n함께 걷는 우리',
        subtitle: '2025 GNU FESTIVAL',
        date: '2025.06.20(금) - 06.22(일)',
        place: '가좌캠퍼스 일대',
        content: '버스킹 공연과 동아리 체험, 푸드트럭 등 즐길 거리가 가득한 대동제.'
    },
    {
        id: 2,
        bg: 'bg-slate-800',
        imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=600&auto=format&fit=crop',
        title: '미래를\n위한 지금',
        subtitle: '경상국립대학교',
        date: '2025.06.12(목) - 06.15(일)',
        place: '컨벤션 홀',
        content: '진로를 탐색하고 다양한 기업 채용 정보를 확인할 수 있는 취업 지원 프로그램.'
    },
    {
        id: 3,
        bg: 'bg-emerald-600',
        imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
        title: '너의 꿈을\n펼쳐라',
        subtitle: '취업 박람회',
        date: '2025.09.10(수) - 09.12(금)',
        place: '학생회관 대강당',
        content: '모의 면접과 이력서 첨삭 등 실질적인 취업 준비를 돕는 현장 매칭 박람회.'
    },
    {
        id: 4,
        bg: 'bg-amber-600',
        imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop',
        title: '책 읽는\n즐거움',
        subtitle: '학교 도서관 이벤트',
        date: '2025.10.01(수) - 10.31(금)',
        place: '중앙 도서관',
        content: '작가와의 만남과 다양한 독서 퀴즈 등 풍성한 즐길 거리가 가득한 도서관 축제.'
    },
    {
        id: 5,
        bg: 'bg-red-600',
        imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
        title: '개척의\n열정',
        subtitle: '체육 대회',
        date: '2025.11.05(수) - 11.07(금)',
        place: '대운동장',
        content: '학우들과 함께 단대별 대항전 및 다양한 스포츠 종목으로 열정을 발산하는 시간.'
    },
];

// ✨ 데이터를 200번 반복하여 총 1000개의 아이템으로 만들어 무한 스크롤처럼 보이게 합니다.
const INFINITE_MULTIPLIER = 200;
const bannerData = Array(INFINITE_MULTIPLIER).fill(ORIGINAL_BANNER_DATA).flat();

export default function BannerCarousel() {
    // ✨ 중간 지점부터 시작하여 양방향 스크롤이 가능하도록 설정
    const MIDDLE_INDEX = ORIGINAL_BANNER_DATA.length * (INFINITE_MULTIPLIER / 2);
    const [currentIndex, setCurrentIndex] = useState(MIDDLE_INDEX);
    const flatListRef = useRef<FlatList>(null);

    // ✨ 타이머를 저장할 ref (화면이 리렌더링되어도 값을 유지하기 위함)
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // ✨ 자동 넘김 시작 함수
    const startAutoPlay = useCallback(() => {
        stopAutoPlay(); // 중복 방지를 위해 기존 타이머가 있다면 먼저 제거
        timerRef.current = setInterval(() => {
            // 거꾸로 감기지 않고 항상 다음 아이템으로 자연스럽게 넘어갑니다.
            let nextIndex = currentIndex + 1;
            // 만약 배열의 끝에 도달했다면 다시 중간으로 조용히 리셋 (거의 발생하지 않음)
            if (nextIndex >= bannerData.length - 1) {
                nextIndex = MIDDLE_INDEX;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: false });
                setCurrentIndex(nextIndex);
                return;
            }
            const nextOffset = nextIndex * (CAROUSEL_WIDTH + CAROUSEL_GAP);
            flatListRef.current?.scrollToOffset({ offset: nextOffset, animated: true });
        }, 3000);
    }, [currentIndex, MIDDLE_INDEX]);

    // ✨ 자동 넘김 정지 함수
    const stopAutoPlay = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // 페이지가 처음 뜨거나 currentIndex가 바뀔 때 타이머 다시 시작
    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay(); // 컴포넌트가 사라질 때 타이머 청소
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
                    <Sparkles size={22} color="#3b82f6" /> {/* 시원한 파란색 포인트 아이콘 */}
                    <Text className="text-xl font-extrabold text-gray-900 tracking-tight">
                        학교행사
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

                // 처음부터 중간 지점에서 시작하도록 초기 인덱스 설정
                initialScrollIndex={MIDDLE_INDEX}
                // initialScrollIndex를 사용하려면 getItemLayout이 필수입니다.
                getItemLayout={(_, index) => ({
                    length: CAROUSEL_WIDTH + CAROUSEL_GAP,
                    offset: index * (CAROUSEL_WIDTH + CAROUSEL_GAP),
                    index,
                })}

                // ✨ 1. 스냅 간격 = 배너 너비 + 배너 간격
                snapToInterval={CAROUSEL_WIDTH + CAROUSEL_GAP}

                disableIntervalMomentum={true}

                // ✨ 2. 핵심! 스냅 시 화면 왼쪽에 딱 붙지 않고 20px 패딩을 유지하도록 설정
                snapToAlignment="start"
                decelerationRate="fast"
                onScroll={handleScroll}
                scrollEventThrottle={16}

                // ✨ 3. 앱 양끝 여백 (좌우 20px)
                contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING }}

                // ✨ 4. 아이템 사이의 간격을 컴포넌트로 깔끔하게 분리 (12px)
                ItemSeparatorComponent={() => <View style={{ width: CAROUSEL_GAP }} />}

                // 동일한 아이디가 반복되므로 인덱스를 키로 사용
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }: { item: BannerItem }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        // ✨ 5. marginRight 제거! (ItemSeparatorComponent가 간격을 대신 띄워줌)
                        style={{ width: CAROUSEL_WIDTH }}
                        className={`h-[400px] rounded-[24px] shadow-sm overflow-hidden ${item.bg}`}
                    >
                        {/* 배경 사진 절대 좌표 배치 */}
                        <Image
                            source={{ uri: item.imageUrl }}
                            resizeMode="cover"
                            className="absolute right-0 w-[60%] h-full opacity-40"
                        />

                        {/* 콘텐츠 영역 */}
                        <View className="flex-1 p-4 justify-between">
                            {/* 상단 텍스트 그룹 */}
                            <View>
                                <Text className="text-[10px] text-white/80 font-semibold mb-1 tracking-wider">
                                    {item.subtitle}
                                </Text>
                                <Text className="text-[20px] font-extrabold text-white leading-tight">
                                    {item.title}
                                </Text>

                                <View className="mt-4">
                                    <Text className="text-[10px] text-white/90">{item.date}</Text>
                                    <Text className="text-[10px] text-white/90 mt-0.5">{item.place}</Text>
                                </View>
                            </View>

                            {/* 하단 아이콘 영역 */}
                            <View className="mt-2">
                                <Text
                                    className="text-[13px] text-white/95 leading-relaxed"
                                >
                                    {item.content}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* 하단 점 (페이지네이션) */}
            <View className="flex-row justify-center mt-4 gap-1.5">
                {ORIGINAL_BANNER_DATA.map((_, index) => {
                    // 수많은 아이템 중 현재 위치가 원본의 몇 번째인지 계산
                    const realIndex = currentIndex % ORIGINAL_BANNER_DATA.length;
                    return (
                        <View
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${realIndex === index ? 'w-4 bg-blue-600' : 'w-1.5 bg-gray-300'
                                }`}
                        />
                    );
                })}
            </View>
        </View>
    );
}