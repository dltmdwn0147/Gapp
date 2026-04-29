import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function Header() {
    return (
        <View className="flex-row items-center justify-between px-5 pt-5 pb-4">
            {/* 텍스트 대신 로고 이미지 적용 */}
            <Image
                source={require('../../../assets/GNU_logo.png')}
                // ✨ className 대신 style 속성으로 직접 너비와 높이를 부여합니다.
                style={{ width: 150, height: 36 }}
                resizeMode="contain"
            />

            <TouchableOpacity>
                <Text className="text-2xl">🔔</Text>
            </TouchableOpacity>
        </View>
    );
}