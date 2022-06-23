import 'react-native-gesture-handler'

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SplashScreen from '../pages/Splash';
import { Button, Text, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  return (
    <View>
      <Text>Home</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="splash"
          options={{ headerShown: false }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={Home}
        />
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation;