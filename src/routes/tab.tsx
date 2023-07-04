/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostMain from '../screens/post/main';
import ProfileMain from '../screens/profile/main';
import HomeMain from '../screens/home/main';
import { HomeTabParamList } from '../types/routes/main';
import Feather from 'react-native-vector-icons/Feather';

const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();

/**
 * This is the main function to add and remove tab bar navigation
 * PLEASE UPDATE EVERY QUARTER
 * @returns JSX.Element
 */
const TabNavigator: React.FC = () => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#20DD20',
        tabBarIcon: ({ color }) => {
          function getIcon(name: string): string {
            const path: { [key: string]: string } = {
              Home: 'home',
              FoodBite: 'heart',
              Profile: 'smile',
            };
            return path[name];
          }
          return (
            <Feather
              name={getIcon(route.name) as string}
              color={color}
              size={24}
            />
          );
        },
      })}>
      <Screen name="Home" component={HomeMain} />
      <Screen name="FoodBite" component={PostMain} />
      <Screen name="Profile" component={ProfileMain} />
    </Navigator>
  );
};

export default TabNavigator;
