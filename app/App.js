/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Header
} from 'react-native-elements';

import Home from './views/Home';
import ContextService from './services/ContextService';

const App = () => {

  ContextService.init();

  return (
    <SafeAreaProvider >
      <StatusBar barStyle='dark-content' />
      <Header
        placement="center"
        backgroundColor="teal"
        centerComponent={{ text: 'Location Mapper', style: { color: '#fff', fontSize: 25 } }}
      />
      <Home />
    </SafeAreaProvider>
  );
};

export default App;
