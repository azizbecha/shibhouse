import { StyleSheet } from "react-native";
import { Colors } from "../../config";

export const styles = StyleSheet.create({
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