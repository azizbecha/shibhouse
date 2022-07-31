import React from "react"
import { TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"
import { Colors } from "../../config"
import { styles } from "./styles"
import Icon from 'react-native-vector-icons/FontAwesome5';


export const RoomCard = () => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.headerText}>Bitcoin is falling</Text>
                <Text style={styles.description}>Let's talk a bit about the crypto market and its future</Text>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
                    <View style={{marginRight: 5,backgroundColor: Colors.primary, borderRadius: 5, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2}}><Text style={{color: "#fff", fontWeight: "bold"}}>#btc</Text></View>
                    <View style={{marginRight: 5,backgroundColor: Colors.primary, borderRadius: 5, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2}}><Text style={{color: "#fff", fontWeight: "bold"}}>#eth</Text></View>
                    <View style={{marginRight: 5,backgroundColor: Colors.primary, borderRadius: 5, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2}}><Text style={{color: "#fff", fontWeight: "bold"}}>#doge</Text></View>
                </View>
                <View>
                    <Icon name="comments" size={30} color="#900" />
                    <Text>Chat allowed</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}