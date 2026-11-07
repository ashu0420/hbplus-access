import {
    GoogleOneTapSignIn,
    isSuccessResponse,
    isNoSavedCredentialFoundResponse,
    isCancelledResponse,
} from 'react-native-nitro-google-signin';

import {
    GoogleAuthProvider,
    signInWithCredential,
    signOut,
} from 'firebase/auth';

import auth from '@/config/auth.native';
import { isAllowedEmail } from '@/config/accessPolicy';

// Configure Google Sign-In using Firebase configuration.
GoogleOneTapSignIn.configure({
    webClientId: 'autoDetect',
});

export async function signInWithGoogle() {
    await GoogleOneTapSignIn.checkPlayServices();

    let response = await GoogleOneTapSignIn.signIn();

    if (isNoSavedCredentialFoundResponse(response)) {
        response = await GoogleOneTapSignIn.createAccount();
    }

    if (isNoSavedCredentialFoundResponse(response)) {
        response = await GoogleOneTapSignIn.presentExplicitSignIn();
    }

    if (isCancelledResponse(response)) {
        throw new Error('Google sign-in was cancelled.');
    }

    if (!isSuccessResponse(response)) {
        throw new Error('Google sign-in failed.');
    }

    const { idToken } = response.data;

    if (!idToken) {
        throw new Error('Google did not provide an ID token.');
    }

    // Convert Google authentication into Firebase authentication.
    const credential = GoogleAuthProvider.credential(idToken);

    const result = await signInWithCredential(auth, credential);

    // Validate the allowed email domain.
    if (
        !result.user.emailVerified ||
        !isAllowedEmail(result.user.email)
    ) {
        await signOut(auth);
        await GoogleOneTapSignIn.signOut();

        throw new Error(
            'Access restricted. Please use your authorized email.'
        );
    }

    return result.user;
  }