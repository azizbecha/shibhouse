import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { Colors } from "../../config";
import { styles } from "./styles";

const Login: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <SafeAreaView style={styles.fillScreen}>
            <View style={styles.container}>
                <Image 
                    source={require("../../assets/logo.png")}
                    style={{
                        width: "25%",
                        height: "37%",
                    }}
                />
                <Text style={styles.headerText}>Welcome back</Text>

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
                    <Button color={Colors.primary} uppercase={false} mode="contained" onPress={() => console.log('Pressed')}>
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