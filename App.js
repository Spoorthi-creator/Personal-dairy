
import * as React from 'react';
import { LogBox } from 'react-native';
import StackNavigation from './navigation/StackNavigation'
import { NavigationContainer } from '@react-navigation/native';


LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  
]);
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}