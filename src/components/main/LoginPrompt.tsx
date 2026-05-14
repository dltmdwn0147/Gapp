import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { QrCode, LogOut } from 'lucide-react-native';
import LoginModal from '../../modals/LoginModal';
import QrModal from '../../modals/QrModal';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginPrompt() {
    const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isQrVisible, setIsQrVisible] = useState(false);

    const handleRefreshQr = () => {
        console.log("QR 코드가 새로고침되었습니다.");
    };

    const studentInfo = {
        college: "IT 공과대학",
        department: "전자공학과",
        id: "221125139",
        name: "이승주"
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleLoginSuccess = () => {
        setIsModalVisible(false);
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return (
            <View style={styles.loginCardContainer}>
                <View style={styles.loginCard}>
                    <Text style={styles.loginText}>
                        {`로그인하고 맞춤 혜택을\n만나보세요!`}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)}
                        activeOpacity={0.7}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}>로그인</Text>
                    </TouchableOpacity>
                </View>

                <LoginModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onLoginSuccess={handleLoginSuccess}
                    targetId={studentInfo.id}
                />
            </View>
        );
    }

    return (
        <View style={styles.infoCard}>
            <View style={styles.infoRow}>
                <View style={styles.studentInfoArea}>
                    <View style={styles.collegeBadge}>
                        <Text style={styles.collegeText}>{studentInfo.college}</Text>
                    </View>
                    <Text style={styles.nameText}>{studentInfo.name}</Text>
                    <Text style={styles.idText}>
                        {studentInfo.department} · {studentInfo.id}
                    </Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        onPress={() => setIsQrVisible(true)}
                        style={styles.qrButton}
                    >
                        <QrCode size={20} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    >
                        <LogOut size={20} color="#9ca3af" />
                    </TouchableOpacity>
                </View>
            </View>
            <QrModal
                visible={isQrVisible}
                onClose={() => setIsQrVisible(false)}
                onRefresh={handleRefreshQr}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loginCardContainer: {
        marginHorizontal: 20,
        marginVertical: 8,
    },
    loginCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f9fafb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    loginText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        lineHeight: 22,
        flex: 1,
    },
    loginButton: {
        backgroundColor: '#ffedd5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    loginButtonText: {
        fontWeight: 'bold',
        color: '#ea580c',
    },
    infoCard: {
        marginHorizontal: 20,
        marginVertical: 8,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    studentInfoArea: {
        flex: 1,
        marginRight: 16,
    },
    collegeBadge: {
        backgroundColor: '#eff6ff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    collegeText: {
        color: '#2563eb',
        fontSize: 9,
        fontWeight: 'bold',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    idText: {
        color: '#9ca3af',
        fontSize: 12,
        marginTop: 2,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qrButton: {
        backgroundColor: '#eff6ff',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#dbeafe',
        marginRight: 8,
    },
    logoutButton: {
        backgroundColor: '#f9fafb',
        padding: 10,
        borderRadius: 12,
    }
});