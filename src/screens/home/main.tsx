import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import common from '../../styles/common';
import { useStore } from '../../hooks';
import { logout } from '../../stores/app';
import ENV from '../../../env';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(ENV.MAPBOX_TOKEN);

const HomeMain: React.FC = () => {
  useEffect(() => {
    Mapbox.setTelemetryEnabled(false);
  });
  const [, dispatch] = useStore();
  return (
    <View style={common.flexCenter}>
      <Mapbox.MapView style={{ height: 300, width: 300 }} />
      <Text onPress={() => dispatch(logout())}>This is Home</Text>
    </View>
  );
};

export default HomeMain;
