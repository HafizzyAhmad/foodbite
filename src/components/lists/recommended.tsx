import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { common, image, text } from '../../styles';
import { IMAGE } from '../../constants';
import { RatingLove } from '../../utils/ratinglove';

const RecommendedDonor = ({ data, nav }: any) => {
  const { index, item } = data;

  return (
    <TouchableOpacity
      style={[
        common.flexRowSpaceBetween,
        common.paddingVerticalMedium,
        common.paddingHorizontalContainer,
      ]}
      onPress={() => nav.navigate('PostDetail', item.foodDonation[0])}>
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
