import React from 'react';
import { Image, Text, View } from 'react-native';
import { common, image, text } from '../../styles';
import { CircleBackground, UserIcon } from '../icon';
import Formatter from '../../utils/formatter';
import EmptySection from '../emptysection';
import { RatingLove } from '../../utils/ratinglove';

const ListReview = ({ reviews }: any) => {
  return reviews ? (
    reviews.map((item): any => (
      <View style={[common.flexRowSpaceBetween, common.paddingContainer]}>
        <View style={[common.flexRow]} key={item.updated_at}>
          <CircleBackground>
            <UserIcon />
          </CircleBackground>
          <View style={common.paddingHorizontalContainer}>
            <Text
              style={[
                text.blackBodyHighlight,
                text.lineHeightL,
                common.paddingRightXSmall,
              ]}>
              {item.raterUserName ? item.raterUserName : item.ratorUserId}
            </Text>
            {item.image !== '' && (
              <Image source={{ uri: item.image }} style={image.imageRating} />
            )}
            <Text
              style={[
                text.blackBodyReg,
                text.lineHeightL,
                common.paddingRightXSmall,
              ]}>
              {item.feedback}
            </Text>
            <Text
              style={[
                text.greyLabelText,
                text.lineHeightL,
                common.paddingRightXSmall,
              ]}>
              {`Last updated on ${Formatter.dateTime(item.updated_at)}`}
            </Text>
            <View style={common.flexRow}>{RatingLove(item.ratingValue)}</View>
          </View>
        </View>
      </View>
    ))
  ) : (
    <EmptySection caption="You do not have enough feedbacks" />
  );
};

export default ListReview;
