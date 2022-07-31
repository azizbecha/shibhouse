import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { Button, Text } from "react-native-paper";

import PrivateRoute from "../../routes/PrivateRoute";
import { Colors } from "../../config";
import { styles } from "./styles";
import { greetingText } from "../../lib/greetingText";
import { RoomCard } from "../../components/RoomCard";

const Home: React.FC = () => {
  const logOut = () => {
      auth()
      .signOut()
      .then(() =>{
          Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Logged out successfully',
              position: 'bottom',
          });
      });
  }
    
  return (
    <PrivateRoute>
      <ScrollView style={styles.fillScreen}>
        <View style={styles.container}>
          <Text style={styles.greetingText}>{greetingText()}</Text>
          <Text style={{color: Colors.white, fontSize: 17, marginBottom: 10}}>Current rooms</Text>

          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          {/*<Button color={Colors.primary} mode='contained' onPress={() => logOut()}>Log out</Button>*/}
        </View>
      </ScrollView>
    </PrivateRoute>
  )
}

export default Home