import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stack';
import { useStore } from '../hooks';

/**
 * The main function to display the app after user launch the app
 * @returns JSX.Element
 */
const Controller: React.FC = () => {
  const [state, dispatch] = useStore();
  // console.log('CHECK STATE: ', state);

  return (
    <Fragment>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Fragment>
  );
};

export default Controller;
