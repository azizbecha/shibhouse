import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message'

import { Colors } from "../../config";
import { styles } from "./styles";

const Login: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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

    if (userData) {
        navigation.navigate("Home")
    }

    const handleLogin = () => {
        if (email.trim() !== "") {
            if (password.trim() !== "") {
                auth().signInWithEmailAndPassword(email, password).then(() => {
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Logged in successfully',
                        position: 'bottom',
                    });
                    navigation.navigate("Home");
                }).catch((e) => {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please verify your informations',
                        position: 'bottom',
                    });
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please enter your password',
                    position: 'bottom',
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your email',
                position: 'bottom',
            });
        }
    }

    return (
        <SafeAreaView style={styles.fillScreen}>
            <View style={styles.container}>
                <Image 
                    source={require("../../assets/logo.png")}
                    style={{
                        width: "25%",
                        height: "30%",
                    }}
                />
                <Text style={styles.headerText}>Welcome back</Text>
                
                <View style={{width: '100%', marginBottom: 5}}>
                    <Text style={{color: "#fff"}}>
                        Email
                    </Text>
                </View>
                <TextInput
                    placeholder="Please enter your email"
                    underlineColor={"transparent"}
                    outlineColor={"transparent"}
                    activeOutlineColor={"transparent"}
                    activeUnderlineColor={Colors.primary}
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    selectionColor="#fff"
                    theme={{ 
                        colors: { 
                            text: "#fff"
                        }
                    }}
                    style={styles.input}
                    value={email}
                    onChangeText={value => setEmail(value)}
                />

                <View style={{width: '100%', marginBottom: 5}}>
                    <Text style={{color: "#fff"}}>
                        Password
                    </Text>
                </View>
                <TextInput
                    placeholder="Please enter your password"
                    underlineColor={"transparent"}
                    outlineColor={"transparent"}
                    activeOutlineColor={"transparent"}
                    activeUnderlineColor={Colors.primary}
                    placeholderTextColor="#666"
                    theme={{ colors: { text: "#fff" } }}
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={value => setPassword(value)}
                />

                <View style={{width: '100%', marginTop: 15}}>
                    <Button color={Colors.primary} uppercase={false} mode="contained" onPress={() => handleLogin()}>
                        Log in
                    </Button>
                </View>

                <View style={{width: '100%', marginTop: 10}}>
                    <Text style={{color: "#fff"}}>
                        Don't have an account ? <Text style={{color: "#fff", marginTop: 10}}>Register now</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login