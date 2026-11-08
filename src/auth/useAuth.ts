import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import auth from '@/config/auth';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('Firebase restored user:', currentUser?.email ?? 'No user');
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return { user, loading };
}