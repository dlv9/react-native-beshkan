
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {IntroScreen} from './screens';
import {GetPrimaryColor} from './theme/colors';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? GetPrimaryColor('main') : '#fff'}
      />
      <IntroScreen />
    </SafeAreaView>
  );
};


export default App;
