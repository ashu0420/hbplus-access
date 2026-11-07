import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

import auth from '@/config/auth.web';
import { isAllowedEmail } from '@/config/accessPolicy';

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account',
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.emailVerified || !isAllowedEmail(user.email)) {
        await signOut(auth);

        throw new Error(
            'Access restricted. Please login using your official domain email.'
        );
    }

    return user;
  }