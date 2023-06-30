import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { card, text } from '../../styles';
import { View } from 'react-native';

type IMapCard = {
  data: any;
  nav: () => void;
  fetching: boolean;
};

const MapCard = ({ data, nav, fetching }: IMapCard) => {
  return (
    <View style={card.carouselItem}>
      {fetching ? (
        <View style={card.postInfoCard}>
          <ActivityIndicator />
        </View>
      ) : (
        <Pressable onPress={nav} style={card.postInfoCard}>
          <Text style={[text.blackBodyHighlight]}>{data.name}</Text>
          <Text style={[text.blackBodyReg]}>{data.description}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default MapCard;
