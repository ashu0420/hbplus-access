import { Platform } from 'react-native';
import type { User } from 'firebase/auth';

export async function signInWithGoogle(): Promise<User> {
    if (Platform.OS === 'web') {
        const { signInWithGoogle: webSignIn } =
            await import('./googleSignIn.web');

        return webSignIn();
    }

    const { signInWithGoogle: nativeSignIn } =
        await import('./googleSignIn.native');

    return nativeSignIn();
}