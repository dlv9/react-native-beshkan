import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { SocketStatus } from './components';
import { PlayerProvider, SocketProvider } from './context';

import { Files, IntroScreen } from './screens';
import { GetPrimaryColor } from './theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? GetPrimaryColor('main') : '#fff' }} >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? GetPrimaryColor('main') : '#fff'}
      />
      <SocketProvider>
        <SocketStatus />
        <PlayerProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={IntroScreen} />
              <Tab.Screen name="Settings" component={Files} />
            </Tab.Navigator>
          </NavigationContainer>
        </PlayerProvider>
      </SocketProvider>
    </SafeAreaView >
  );
};


export default App;
