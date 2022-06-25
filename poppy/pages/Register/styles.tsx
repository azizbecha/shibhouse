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
        padding: '7%',
    },

    headerText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 25,
        marginTop: 20,
    },

    subHeaderText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "normal",
        marginTop: 10
    },

    input: {
        height: 30,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        borderColor: Colors.darker,
        backgroundColor: Colors.darker,
        color: "#fff",
        
    },
    row: {
        flex: 1,
        flexDirection: "row"
      },
      inputWrap: {
        flex: 1,
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 10,
        backgroundColor: Colors.secondary,
        marginRight: 10,
        justifyContent: 'center'
      },
      inputdate: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595",
        backgroundColor: Colors.primary
      },
      inputcvv: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595",
        backgroundColor: Colors.primary
      },
      label: {
        
      }
})