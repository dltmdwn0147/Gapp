import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    NativeSyntheticEvent,
    Image,
    NativeScrollEvent,
    StyleSheet,
} from 'react-native';
import { Sparkles, ChevronRight } from 'lucide-react-native';
import { BannerItem } from '../../types';
import {
    buildInfiniteData,
    getMiddleIndex,
    getBannerBackgroundColor,
} from '../../utils/bannerCarousel';

const { width: windowWidth } = Dimensions.get('window');

const CAROUSEL_WIDTH = windowWidth * 0.60;
const CAROUSEL_GAP = 12;
const SCREEN_PADDING = 20;
const ITEM_LENGTH = CAROUSEL_WIDTH + CAROUSEL_GAP;
const BANNER_HEIGHT = 400;

const ORIGINAL_BANNER_DATA: BannerItem[] = [
    {
        id: 1,
        bg: 'bg-blue-600',
        imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=600&auto=format&fit=crop',
        title: '개척의 길,\n함께 걷는 우리',
        subtitle: '2025 GNU FESTIVAL',
        date: '2025.06.20(금) - 06.22(일)',
        place: '가좌캠퍼스 일대',
        content: '버스킹 공연과 동아리 체험, 푸드트럭 등 즐길 거리가 가득한 대동제.',
    },
    {
        id: 2,
        bg: 'bg-slate-800',
        imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=600&auto=format&fit=crop',
        title: '미래를\n위한 지금',
        subtitle: '경상국립대학교',
        date: '2025.06.12(목) - 06.15(일)',
        place: '컨벤션 홀',
        content: '진로를 탐색하고 다양한 기업 채용 정보를 확인할 수 있는 취업 지원 프로그램.',
    },
    {
        id: 3,
        bg: 'bg-emerald-600',
        imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
        title: '너의 꿈을\n펼쳐라',
        subtitle: '취업 박람회',
        date: '2025.09.10(수) - 09.12(금)',
        place: '학생회관 대강당',
        content: '모의 면접과 이력서 첨삭 등 실질적인 취업 준비를 돕는 현장 매칭 박람회.',
    },
    {
        id: 4,
        bg: 'bg-amber-600',
        imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop',
        title: '책 읽는\n즐거움',
        subtitle: '학교 도서관 이벤트',
        date: '2025.10.01(수) - 10.31(금)',
        place: '중앙 도서관',
        content: '작가와의 만남과 다양한 독서 퀴즈 등 풍성한 즐길 거리가 가득한 도서관 축제.',
    },
    {
        id: 5,
        bg: 'bg-red-600',
        imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
        title: '개척의\n열정',
        subtitle: '체육 대회',
        date: '2025.11.05(수) - 11.07(금)',
        place: '대운동장',
        content: '학우들과 함께 단대별 대항전 및 다양한 스포츠 종목으로 열정을 발산하는 시간.',
    },
];

const bannerData = buildInfiniteData(ORIGINAL_BANNER_DATA);
const MIDDLE_INDEX = getMiddleIndex(ORIGINAL_BANNER_DATA.length);

export default function BannerCarousel() {
    const [currentIndex, setCurrentIndex] = useState(MIDDLE_INDEX);
    const flatListRef = useRef<FlatList>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const currentIndexRef = useRef(MIDDLE_INDEX);

    const scrollToIndex = useCallback((index: number, animated = true) => {
        flatListRef.current?.scrollToOffset({
            offset: index * ITEM_LENGTH,
            animated,
        });
    }, []);

    const startAutoPlay = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            let nextIndex = currentIndexRef.current + 1;
            if (nextIndex >= bannerData.length - 1) {
                nextIndex = MIDDLE_INDEX;
                scrollToIndex(nextIndex, false);
            } else {
                scrollToIndex(nextIndex, true);
            }
            currentIndexRef.current = nextIndex;
            setCurrentIndex(nextIndex);
        }, 3000);
    }, [scrollToIndex]);

    const stopAutoPlay = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        const t = setTimeout(() => scrollToIndex(MIDDLE_INDEX, false), 50);
        startAutoPlay();
        return () => {
            clearTimeout(t);
            stopAutoPlay();
        };
    }, [scrollToIndex, startAutoPlay, stopAutoPlay]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / ITEM_LENGTH);

        if (index !== currentIndexRef.current && index >= 0 && index < bannerData.length) {
            currentIndexRef.current = index;
            setCurrentIndex(index);
        }
    };

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_LENGTH);

        if (index <= ORIGINAL_BANNER_DATA.length || index >= bannerData.length - ORIGINAL_BANNER_DATA.length) {
            const resetIndex = MIDDLE_INDEX + (index % ORIGINAL_BANNER_DATA.length);
            currentIndexRef.current = resetIndex;
            setCurrentIndex(resetIndex);
            scrollToIndex(resetIndex, false);
        } else {
            currentIndexRef.current = index;
            setCurrentIndex(index);
        }
        startAutoPlay();
    };

    const renderBannerItem = ({ item }: { item: BannerItem }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.bannerCard,
                {
                    width: CAROUSEL_WIDTH,
                    backgroundColor: getBannerBackgroundColor(item.bg),
                },
            ]}
        >
            <Image
                source={{ uri: item.imageUrl }}
                resizeMode="cover"
                style={styles.bannerImage}
            />

            <View style={styles.bannerContent}>
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

                <View className="mt-2">
                    <Text className="text-[13px] text-white/95 leading-relaxed">
                        {item.content}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="my-4">
            <View
                style={{ paddingHorizontal: SCREEN_PADDING }}
                className="mb-3.5 flex-row items-center justify-between"
            >
                <View className="flex-row items-center gap-1.5">
                    <Sparkles size={22} color="#3b82f6" />
                    <Text className="text-xl font-extrabold text-gray-900 tracking-tight">학교행사</Text>
                </View>

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
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                removeClippedSubviews
                getItemLayout={(_, index) => ({
                    length: ITEM_LENGTH,
                    offset: index * ITEM_LENGTH,
                    index,
                })}
                snapToInterval={ITEM_LENGTH}
                disableIntervalMomentum
                snapToAlignment="start"
                decelerationRate="fast"
                onScroll={handleScroll}
                onScrollBeginDrag={stopAutoPlay}
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING }}
                ItemSeparatorComponent={() => <View style={{ width: CAROUSEL_GAP }} />}
                keyExtractor={(_, index) => `banner-${index}`}
                renderItem={renderBannerItem}
            />

            <View className="flex-row justify-center mt-4 gap-1.5">
                {ORIGINAL_BANNER_DATA.map((_, index) => {
                    const realIndex = currentIndex % ORIGINAL_BANNER_DATA.length;
                    return (
                        <View
                            key={index}
                            className={`h-1.5 rounded-full ${realIndex === index ? 'w-4 bg-blue-600' : 'w-1.5 bg-gray-300'}`}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bannerCard: {
        height: BANNER_HEIGHT,
        borderRadius: 24,
        overflow: 'hidden',
    },
    bannerImage: {
        position: 'absolute',
        right: 0,
        width: '60%',
        height: '100%',
        opacity: 0.4,
    },
    bannerContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
});
