import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { card, text } from '../../styles';
import { View } from 'react-native';
import TextButton from '../buttons/textbutton';
import Formatter from '../../utils/formatter';

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
          <Text numberOfLines={1} style={[text.blackBodyHighlight]}>
            {data.donation.name}
          </Text>
          <Text numberOfLines={1} style={[text.blackBodyReg]}>
            {data.address}
          </Text>
          <Text style={[text.greyLabelText]}>
            {`Available from ${Formatter.dateTime(
              data.statusAvailability.startDateTime,
            )}\nto ${Formatter.dateTime(data.statusAvailability.endDateTime)}`}
          </Text>
          <TextButton caption={`View ${data.type}`} />
        </Pressable>
      )}
    </View>
  );
};

export default MapCard;
