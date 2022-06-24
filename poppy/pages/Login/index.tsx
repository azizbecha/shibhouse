import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { Colors } from "../../config";
import { styles } from "./styles";

const Login: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
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
                    underlineColor={Colors.primary}
                    outlineColor={Colors.primary}
                    activeOutlineColor={Colors.primary}
                    activeUnderlineColor={Colors.primary}
                    placeholderTextColor="#666"
                    //value={text}
                    //onChangeText={text => setText(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Please enter your password"
                    underlineColor={Colors.primary}
                    outlineColor={Colors.primary}
                    activeOutlineColor={Colors.primary}
                    activeUnderlineColor={Colors.primary}
                    selectionColor={Colors.primary}
                    placeholderTextColor="#666"
                    //value={text}
                    //onChangeText={text => setText(text)}
                    style={styles.input}
                    secureTextEntry
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