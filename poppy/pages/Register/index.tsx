import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Colors } from "../../config";
import ProtectedRoute from "../../routes/ProtectedRoute";
import { styles } from "./styles";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

import Toast from "react-native-toast-message" ;
import { capitalizeWord } from "../../lib/capitalizeWord";
import { getRandomColor } from "../../lib/getRandomColor";

const Register: React.FC = () => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const [firstname,setFirestname] = useState<string>("");
    const [lastname,setLastname] = useState<string>("");

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        auth().onAuthStateChanged(userState => {
            setUser(userState);
            console.log(userState);
        });
    }, []);

    const handleRegister = () => {
        if (firstname.trim() !== "") {
            if (lastname.trim() !== "") {
                if (email.trim() !== "") {
                    if (username.trim() !== "") {
                        if (password.trim() !== "") {
                            auth().createUserWithEmailAndPassword(email, password).then(() => {
                                auth().onAuthStateChanged(userState => {
                                    setUser(userState);
                                    console.log(user)
                                    const userDocument = firestore()
                                    .collection("users")
                                    .doc(userState?.uid)
                                    .set({
                                        id: userState?.uid,
                                        firstname: capitalizeWord(firstname.trim()),
                                        lastname: capitalizeWord(lastname.trim()),
                                        email: email,
                                        username: username,
                                        followers: [],
                                        following: [],
                                        claps: 0,
                                        joinDate: new Date(),
                                        avatarColor: getRandomColor()
                                    })
                                    .then(() => {
                                        Toast.show({
                                            type: 'success',
                                            text1: 'Success',
                                            text2: 'Registered successfully',
                                            position: 'bottom',
                                        });
                                        navigation.navigate("Home");
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    })
                                });
                            }).catch((e) => {
                                console.log(e);
                                if (e == "Error: [auth/email-already-in-use] The email address is already in use by another account.") {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: 'Email already in use',
                                        position: 'bottom',
                                    });
                                }

                                if (e == "Error: [auth/invalid-email] The email address is badly formatted.") {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: 'Invalid Email',
                                        position: 'bottom',
                                    });
                                }

                                if (e == "Error: [auth/weak-password] The password must be 6 characters long or more.") {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: 'Weak Password',
                                        position: 'bottom',
                                    });
                                }
                                if (e == "Error: [auth/invalid-email] The email address is badly formatted.") {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: 'Invalid Email',
                                        position: 'bottom',
                                    });
                                }
                            })
                        }
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Please fill your username',
                            position: 'bottom',
                        });
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please fill your email',
                        position: 'bottom',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Please fill your lastname',
                    position: 'bottom',
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fill your username',
                position: 'bottom',
            });
        }
    }

    return (
        <>
            <SafeAreaView style={styles.fillScreen}>
                <View style={styles.container}>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={{
                            width: "25%",
                            height: "30%",
                        }}
                    />
                    <Text style={styles.headerText}>Get Started</Text>
                    
                    <ScrollView style={{width: '100%'}}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <View style={{width: '100%', marginBottom: 5}}>
                            <Text style={{color: "#fff"}}>
                                Firstname
                            </Text>
                        </View>
                        <TextInput
                            placeholder="Please enter your firstname"
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
                            value={firstname}
                            onChangeText={value => setFirestname(value)}
                        />

                        <View style={{width: '100%', marginBottom: 5}}>
                            <Text style={{color: "#fff"}}>
                                Lastname
                            </Text>
                        </View>
                        <TextInput
                            placeholder="Please enter your lastname"
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
                            value={lastname}
                            onChangeText={value => setLastname(value)}
                        />
                        
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
                                Username
                            </Text>
                        </View>
                        <TextInput
                            placeholder="Please enter your username"
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
                            value={username}
                            onChangeText={value => setUsername(value)}
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
                            keyboardType="email-address"
                            selectionColor="#fff"
                            theme={{ 
                                colors: { 
                                    text: "#fff"
                                }
                            }}
                            style={styles.input}
                            value={password}
                            onChangeText={value => setPassword(value)}
                        />

                    <View style={{width: '100%', marginTop: 15}}>
                        <Button color={Colors.primary} uppercase={false} mode="contained" onPress={() => handleRegister()}>
                            Sign Up
                        </Button>
                    </View>

                    <View style={{width: '100%', marginTop: 10}}>
                        <Text style={{color: "#fff"}}>
                            Already have an account ? <Text style={{color: "#fff", marginTop: 10}} onPress={() => navigation.navigate("Login")}>Login now</Text>
                        </Text>
                    </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
        </>
    )
}

export default Register;