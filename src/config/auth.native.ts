import { initializeAuth } from 'firebase/auth';
// @ts-expect-error Firebase type declaration issue for getReactNativePersistence
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebase';

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
// console.log('Firebase Auth persistence:', auth);

export default auth;