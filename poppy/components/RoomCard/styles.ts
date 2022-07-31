import { StyleSheet } from "react-native";
import { Colors } from "../../config";

export const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.darker,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },

    shadow: {
        shadowColor: Colors.darker,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },

    headerText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },

    description: {
        color: Colors.white,
        marginBottom: 10,
    },

    textWhite: {
        color: "#fff",
    }
})