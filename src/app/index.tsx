import { View, Text, Pressable, StyleSheet } from 'react-native';
import firebaseApp from '@/config/firebase';

export default function LoginScreen() {
  console.log('Firebase initialized:', firebaseApp.name);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>HB+</Text>

        <Text style={styles.title}>Welcome to HB+</Text>

        <Text style={styles.subtitle}>
          Sign in with your official account to continue.
        </Text>

        <Pressable style={styles.googleButton}>
          <Text style={styles.googleText}>
            G    Continue with Google
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          Secure access for authorized members only.
        </Text>
      </View>
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

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    gap: 20,
    elevation: 3,
  },

  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2563EB',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#172033',
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 23,
  },

  googleButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  googleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  footer: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});