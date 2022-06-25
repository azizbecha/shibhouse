import React, { useEffect, useState } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({children}) => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const [initializing, setInitializing] = useState(true);
    const [userData, setUserData] = useState<FirebaseAuthTypes.User | null>(null);

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUserData(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!userData) {
        navigation.navigate("Login");
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute