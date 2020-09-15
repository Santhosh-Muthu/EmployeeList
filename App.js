/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Store as store } from './App/stores/store';
import Router from './App/route/navigation';

const App = () => {
  return (
    <Provider store={store}>
       <Router />
    </Provider>
  );
};

export default App;
