import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '@/auth/useAuth';
import { Redirect, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import auth from '@/config/auth';
import { isAllowedEmail } from '@/config/accessPolicy';

export default function DashboardScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
      };
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Checking authentication...</Text>
            </View>
        );
    }
    if (!user) {
        return <Redirect href="/" />;
    }

    if (!isAllowedEmail(user.email)) {
        return <Redirect href="/" />;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to HBPlus!</Text>
            <Text>{user?.displayName}</Text>
            <Text>{user?.email}</Text>
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={{ color: 'white' }}>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    logoutButton: {
        marginTop: 24,
        backgroundColor: '#DC2626',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
});