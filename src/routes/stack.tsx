import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './tab';
import { RootStackParamList } from '../types/routes/main';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

/**
 * This is the main function to link up movement from one screens to
 * another using stack navigation
 * PLEASE UPDATE EVERY QUARTER
 * @returns JSX.Element
 */
const StackNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Tab" component={TabNavigator} />
    </Navigator>
  );
};

export default StackNavigator;
