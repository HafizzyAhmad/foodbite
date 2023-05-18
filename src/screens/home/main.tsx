import React from 'react';
import { View, Text } from 'react-native';
import common from '../../styles/common';
import { useStore } from '../../hooks';
import { logout } from '../../stores/app';

const HomeMain: React.FC = () => {
  const [, dispatch] = useStore();
  return (
    <View style={common.flexCenter}>
      <Text onPress={() => dispatch(logout())}>This is Home</Text>
    </View>
  );
};

export default HomeMain;
