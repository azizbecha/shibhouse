import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react"
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { Colors } from "../config";

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
                    source={require("../assets/logo.png")}
                />
                <Text style={styles.bottomText}>Shibhouse</Text>
                <Text style={styles.sloganText}>
                    Re-taking voice conversations to the moon
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1,
        backgroundColor: Colors.dark
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '2%',
    },
    logo: {
        height: '100%',
        width: "90%",
        position: 'absolute',
        bottom: '8%',
    },
    bottomText: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        bottom: '6.5%',
        color: '#fff',
    },
    sloganText: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: 16,
        bottom: '2.5%',
        color: '#fff',
        opacity: 0.4,
    },
});

export default SplashScreen;