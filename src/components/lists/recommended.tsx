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
      onPress={() => nav.navigate('RecommendedUser', item)}>
      <View style={[common.flexRow, common.centerVertically]}>
        <ImageBackground
          source={IMAGE.badgeRanking}
          style={[common.center, image.badgeImage]}>
          <Text style={text.brandButton}>{`${index + 1}`}</Text>
        </ImageBackground>
        <View style={common.paddingHorizontalContainer}>
          <Text style={text.blackBodyHighlight}>{item.providerName}</Text>
          <Text
            style={
              text.greyLabelText
            }>{`Peoples like ${item.ratingScore.toFixed(1)} out of 5`}</Text>
          <Text style={text.greyLabelText}>{`${item.totalRators} voted`}</Text>
          <View style={common.flexRow}>{RatingLove(item.ratingScore)}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedDonor;
