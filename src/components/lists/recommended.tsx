import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { common, image, text } from '../../styles';
import {
  CircleBackground,
  EmptyLove,
  FullLove,
  HalfLove,
  UserIcon,
} from '../icon';
import Formatter from '../../utils/formatter';
import EmptySection from '../emptysection';
import { IMAGE } from '../../constants';
import { RatingLove } from '../../utils/ratinglove';

const RecommendedDonor = ({ data, nav }: any) => {
  const { index, item } = data;
  console.log('CHECK DATA: ', item);

  return (
    <TouchableOpacity
      style={[
        common.flexRowSpaceBetween,
        common.paddingVerticalMedium,
        common.paddingHorizontalContainer,
      ]}
      onPress={() => console.log('ITEM YANG DITEKAN: ', item.foodDonation[0])}>
      <View style={[common.flexRow, common.centerVertically]}>
        <ImageBackground
          source={IMAGE.badgeRanking}
          style={[common.center, image.badgeImage]}>
          <Text style={text.brandButton}>{`${index + 1}`}</Text>
        </ImageBackground>
        <View style={common.paddingHorizontalContainer}>
          <Text style={text.blackBodyHighlight}>
            {item.foodDonation[0].donation.name}
          </Text>
          <Text style={text.greyLabelText}>{`By ${item.providerName}`}</Text>
          <View style={common.flexRow}>{RatingLove(item.ratingScore)}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedDonor;
