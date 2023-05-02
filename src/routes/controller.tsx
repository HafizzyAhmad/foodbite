import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stack';

/**
 * The main function to display the app after user launch the app
 * @returns JSX.Element
 */
const Controller: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Controller;
