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
import { ChevronRight } from 'lucide-react-native';
import { BannerItem } from '../../types';
import { AuthContext } from '../../contexts/AuthContext';
import { DEPT_BANNER_DATA_BY_DEPT } from '../../data/deptBannerData';
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

export default function DeptBannerCarousel() {
    const { userInfo, isLoggedIn } = React.useContext(AuthContext);

    const userDept = isLoggedIn && userInfo?.department ? userInfo.department : '전자공학부';
    const currentDeptBannerData =
        DEPT_BANNER_DATA_BY_DEPT[userDept] || DEPT_BANNER_DATA_BY_DEPT['전자공학부'];

    const bannerData = React.useMemo(
        () => buildInfiniteData(currentDeptBannerData),
        [currentDeptBannerData],
    );

    const middleIndex = getMiddleIndex(currentDeptBannerData.length);

    const [currentIndex, setCurrentIndex] = useState(middleIndex);
    const flatListRef = useRef<FlatList>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const currentIndexRef = useRef(middleIndex);

    const scrollToIndex = useCallback((index: number, animated = true) => {
        flatListRef.current?.scrollToOffset({
            offset: index * ITEM_LENGTH,
            animated,
        });
    }, []);

    useEffect(() => {
        currentIndexRef.current = middleIndex;
        setCurrentIndex(middleIndex);
        const t = setTimeout(() => scrollToIndex(middleIndex, false), 100);
        return () => clearTimeout(t);
    }, [userDept, middleIndex, scrollToIndex]);

    const startAutoPlay = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            let nextIndex = currentIndexRef.current + 1;
            if (nextIndex >= bannerData.length - 1) {
                nextIndex = middleIndex;
                scrollToIndex(nextIndex, false);
            } else {
                scrollToIndex(nextIndex, true);
            }
            currentIndexRef.current = nextIndex;
            setCurrentIndex(nextIndex);
        }, 3500);
    }, [bannerData.length, middleIndex, scrollToIndex]);

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

    const handleScrollEnd = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_LENGTH);

            if (
                index <= currentDeptBannerData.length ||
                index >= bannerData.length - currentDeptBannerData.length
            ) {
                const resetIndex = middleIndex + (index % currentDeptBannerData.length);
                currentIndexRef.current = resetIndex;
                setCurrentIndex(resetIndex);
                scrollToIndex(resetIndex, false);
            } else {
                currentIndexRef.current = index;
                setCurrentIndex(index);
            }
            startAutoPlay();
        },
        [bannerData.length, currentDeptBannerData.length, middleIndex, scrollToIndex, startAutoPlay],
    );

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
            <Image source={{ uri: item.imageUrl }} resizeMode="cover" style={styles.bannerImage} />

            <View style={styles.bannerContent}>
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
                        <Text className="text-[11px] text-white/90 ml-1">{`📍 ${item.place}`}</Text>
                    </View>
                </View>

                <View className="mt-2 bg-black/10 p-3 rounded-2xl">
                    <Text className="text-[13px] text-white/95 leading-relaxed">{item.content}</Text>
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
                    <Text className="text-xl font-extrabold text-gray-900 tracking-tight">
                        우리 학과 소식 🔥
                    </Text>
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
                onScrollBeginDrag={stopAutoPlay}
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING }}
                ItemSeparatorComponent={() => <View style={{ width: CAROUSEL_GAP }} />}
                keyExtractor={(_, index) => `dept-banner-${index}`}
                renderItem={renderBannerItem}
            />

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

const styles = StyleSheet.create({
    bannerCard: {
        height: BANNER_HEIGHT,
        borderRadius: 24,
        overflow: 'hidden',
    },
    bannerImage: {
        position: 'absolute',
        right: 0,
        width: '65%',
        height: '100%',
        opacity: 0.3,
    },
    bannerContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
});
