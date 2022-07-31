import { StyleSheet } from "react-native";
import { Colors } from "../../config";

export const styles = StyleSheet.create({
    fillScreen: {
        flex: 1,
        backgroundColor: Colors.dark,
        color: "#fff"
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignContent: 'center',
        //alignItems: 'center',
        padding: '4%',
    },
    greetingText: {
        color: Colors.white,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: '5%',
    }
})