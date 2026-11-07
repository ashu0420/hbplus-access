import {
    initializeApp,
    getApp,
    getApps,
    type FirebaseOptions,
} from 'firebase/app';

// Validate required environment variables
function requiredEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

// Firebase project configuration
const firebaseConfig: FirebaseOptions = {
    apiKey: requiredEnv(
        'EXPO_PUBLIC_FIREBASE_API_KEY',
        process.env.EXPO_PUBLIC_FIREBASE_API_KEY
    ),
    authDomain: requiredEnv(
        'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
    ),
    projectId: requiredEnv(
        'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
        process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID
    ),
    storageBucket: requiredEnv(
        'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
        process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
    ),
    messagingSenderId: requiredEnv(
        'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    ),
    appId: requiredEnv(
        'EXPO_PUBLIC_FIREBASE_APP_ID',
        process.env.EXPO_PUBLIC_FIREBASE_APP_ID
    ),
};

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export default app;