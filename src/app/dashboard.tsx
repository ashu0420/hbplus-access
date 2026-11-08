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
            <View style={styles.header}>
                <Text style={styles.logo}>HB+</Text>
                <Text style={styles.headerSubtitle}>Member Dashboard</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.welcome}>Welcome back,</Text>

                <Text style={styles.name}>
                    {user.displayName || 'Member'}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <Text style={styles.email}>{user.email}</Text>

                <View style={styles.status}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>Authorized Member</Text>
                </View>
            </View>

            <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>

            <Text style={styles.footer}>HB+ • Member Portal</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FA',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },

    header: {
        alignItems: 'center',
        marginBottom: 32,
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#2563EB',
        letterSpacing: 1,
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },

    card: {
        width: '100%',
        maxWidth: 420,
        backgroundColor: '#FFFFFF',
        padding: 28,
        borderRadius: 16,
        elevation: 2,
    },

    welcome: {
        fontSize: 15,
        color: '#64748B',
    },

    name: {
        fontSize: 26,
        fontWeight: '700',
        color: '#172033',
        marginTop: 6,
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 24,
    },

    label: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 1,
    },

    email: {
        fontSize: 15,
        color: '#334155',
        marginTop: 8,
    },

    status: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 24,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2563EB',
        marginRight: 8,
    },

    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
    },

    logoutButton: {
        width: '100%',
        maxWidth: 420,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    logoutText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
    },

    footer: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 32,
    },
});