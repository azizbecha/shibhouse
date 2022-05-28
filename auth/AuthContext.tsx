import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from './Firebase';
import LoadingScreen from '../lib/LoadingScreen';
import getUserData from '../lib/getUserData';

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentUserData, setCurrentUserData] = useState<any>();
    /*
    {
        userProviderId: "",
        userId: "",
        userName: "",
        userEmail: "",
        userPhotoLink: "",
    }
    */

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const x = {
                    userProviderId: user.providerData[0].providerId,
                    userId: user.uid,
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhotoLink: user.photoURL,
                }

                setCurrentUserData(await getUserData(user.uid))
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        })
    }, [])

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