import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react"
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native"
import { Colors } from "../../config";
import { styles } from "./styles";

const SplashScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        const SplashScreenTimerTask = setTimeout(() => navigation.push('home'), 1500);
        return () => {
            clearTimeout(SplashScreenTimerTask);
        };
    }, []);
    return (
        <SafeAreaView style={styles.fillScreen}>
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.dark}
                    showHideTransition={"slide"}
                />
                <Image
                    style={styles.logo}
                    source={require("../../assets/logo.png")}
                />
                <Text style={styles.bottomText}>Shibhouse</Text>
                <Text style={styles.sloganText}>
                    Re-taking voice conversations to the moon
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;