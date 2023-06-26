import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/routes/main';
import RegisterProfile from '../screens/auth/register';
import LoginMain from '../screens/auth/login';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

/**
 * This is the main function to link up movement from one screens to
 * another using stack navigation
 * PLEASE UPDATE EVERY QUARTER
 * @returns JSX.Element
 */
const AuthStackNavigator: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="LoginMain" component={LoginMain} />
      <Screen name="RegisterProfile" component={RegisterProfile} />
    </Navigator>
  );
};

export default AuthStackNavigator;
