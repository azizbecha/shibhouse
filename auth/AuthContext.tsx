import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from './Firebase';
import LoadingScreen from '../lib/LoadingScreen';

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {

    /*const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );*/
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({
        userProviderId: "",
        userId: "",
        userName: "",
        userEmail: "",
        userPhotoLink: "",
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const requiredData = {
            userProviderId: user.providerData[0].providerId,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            userPhotoLink: user.photoURL,
            }

            setUserData(requiredData)
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
            userData,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}