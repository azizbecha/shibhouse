import 'react-native-gesture-handler'

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import SplashScreen from '../pages/Splash/index';
import Login from '../pages/Login'
import Home from '../pages/Home';
import Register from '../pages/Register';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false }}
          component={SplashScreen}
        />

        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />

        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />

        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation;