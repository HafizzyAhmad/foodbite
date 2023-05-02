import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostMain from '../screens/post/main';
import ProfileMain from '../screens/profile/main';
import HomeMain from '../screens/home/main';
import { HomeTabParamList } from '../types/routes/main';

const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

/**
 * This is the main function to add and remove tab bar navigation
 * PLEASE UPDATE EVERY QUARTER
 * @returns JSX.Element
 */
const TabNavigator: React.FC = () => {
  return (
    <Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Screen name="Home" component={HomeMain} />
      <Screen name="Post" component={PostMain} />
      <Screen name="Profile" component={ProfileMain} />
    </Navigator>
  );
};

export default TabNavigator;
