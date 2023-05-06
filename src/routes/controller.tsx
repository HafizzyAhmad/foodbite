import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stack';
import LoginMain from '../screens/auth/login';
import { useStore } from '../hooks';

/**
 * The main function to display the app after user launch the app
 * @returns JSX.Element
 */
const Controller: React.FC = () => {
  const [state] = useStore();
  // console.log('CHECK STATE: ', state);

  return (
    <Fragment>
      <NavigationContainer>
        {!state.app.isAuthenticated ? <LoginMain /> : <StackNavigator />}
      </NavigationContainer>
    </Fragment>
  );
};

export default Controller;
