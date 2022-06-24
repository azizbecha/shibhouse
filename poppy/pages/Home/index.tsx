import React from "react";
import { SafeAreaView } from "react-native";

import auth from "@react-native-firebase/auth";
import { Button, Text } from "react-native-paper";
import Toast from "react-native-toast-message";

import PrivateRoute from "../../routes/PrivateRoute";
import { Colors } from "../../config";

const Home: React.FC = () => {
    const logOut = () => {
        auth()
        .signOut()
        .then(() =>{
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Logged out successfully',
                position: 'bottom',
            });
        });
    }
    
    return (
        <PrivateRoute>
            <SafeAreaView>
                <Text>Home</Text>
                <Button color={Colors.primary} mode='contained' onPress={() => logOut()}>Log out</Button>
            </SafeAreaView>
        </PrivateRoute>
    )
}

export default Home