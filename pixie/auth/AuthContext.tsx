import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from './Firebase';
import LoadingScreen from '../components/LoadingScreen';
import getUserData from '../lib/getUserData';

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentUserData, setCurrentUserData] = useState<any>();

    useEffect(() => {
        onAuthStateChanged(auth, async (user: User) => {
            if (user) {
                setCurrentUserData(await getUserData(user.uid));
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        })
    }, [currentUser])

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <AuthContext.Provider
        value={{
            currentUser,
            currentUserData,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}