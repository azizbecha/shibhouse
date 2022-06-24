import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "../../config";

const Home: React.FC = () => {

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
        navigation.navigate("Login")
    }

    const logOut = () => {
        auth()
        .signOut()
        .then(() =>{
            navigation.navigate("Login")
        });
    }
    
    return (
        <SafeAreaView>
            <Text>Home</Text>
            <Text>Logged in as: {userData?.email}</Text>
            <Button color={Colors.primary} mode='contained' onPress={() => logOut()}>Log out</Button>
        </SafeAreaView>    
    )
}

export default Home