import 'react-native-gesture-handler'

import React from 'react'
import { Button, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import SplashScreen from '../pages/Splash/index';

const Stack = createNativeStackNavigator();

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