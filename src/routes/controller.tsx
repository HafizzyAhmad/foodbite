import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stack';
import { useStore } from '../hooks';
import AuthStackNavigator from './stackauth';

/**
 * The main function to display the app after user launch the app
 * @returns JSX.Element
 */
const Controller: React.FC = () => {
  const [state] = useStore();

  return (
    <Fragment>
      <NavigationContainer>
        {!state.app.isAuthenticated ? (
          <AuthStackNavigator />
        ) : (
          <StackNavigator />
        )}
        {/* <StackNavigator /> */}
      </NavigationContainer>
    </Fragment>
  );
};

export default Controller;
