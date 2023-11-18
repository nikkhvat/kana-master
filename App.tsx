import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/Home/Index';
import LearnScreen from './pages/Learn/index';
import { RootStackParamList } from './types';

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Learn" component={LearnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
