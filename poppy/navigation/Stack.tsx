import 'react-native-gesture-handler'

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import SplashScreen from '../pages/Splash/index';
import Login from '../pages/Login'

const Stack = createNativeStackNavigator();

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
          name="login"
          options={{ headerShown: false }}
          component={Login}
        />
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation;