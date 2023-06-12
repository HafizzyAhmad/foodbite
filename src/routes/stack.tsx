import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './tab';
import { RootStackParamList } from '../types/routes/main';
import DonateForm from '../screens/post/donate';
import RequestForm from '../screens/post/request';
import Complete from '../screens/post/complete';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

/**
 * This is the main function to link up movement from one screens to
 * another using stack navigation
 * PLEASE UPDATE EVERY QUARTER
 * @returns JSX.Element
 */
const StackNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Tab" component={TabNavigator} />
      <Screen name="DonateForm" component={DonateForm} />
      <Screen name="RequestForm" component={RequestForm} />
      <Screen name="Complete" component={Complete} />
    </Navigator>
  );
};

export default StackNavigator;
