import 'react-native-gesture-handler'
import React from 'react'
import Toast from 'react-native-toast-message';

import MainNavigation from './navigation/Stack';

const App = () => {
  return (
    <>
      <MainNavigation />
      <Toast />
    </>
  )
};

export default App;
