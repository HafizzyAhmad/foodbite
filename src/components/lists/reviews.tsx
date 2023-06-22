import React from 'react';
import { Image, Text, View } from 'react-native';
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

const ListReview = ({ reviews }: any) => {
  console.log('CHECK REVIEW: ', reviews);

  const renderRating = (score: number) => {
    // const score = 2.4;
    const totalRating = 5;
    const fullRating = Math.floor(score);
    const hasHalfRating = score - fullRating >= 0.5;

    const love = Array(totalRating)
      .fill(null)
      .map((_, index) => {
        if (index < fullRating) {
          return <FullLove key={`love-${index}`} />;
        } else if (index === fullRating && hasHalfRating) {
          return <HalfLove key="love-half" />;
        } else {
          <EmptyLove key={`love-empty-${index}`} />;
        }
      });
    return love;
  };

  return reviews ? (
    reviews.map((item): any => (
      <View style={[common.flexRowSpaceBetween, common.paddingVerticalMedium]}>
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
            <View style={common.flexRow}>{renderRating(item.ratingValue)}</View>
          </View>
        </View>
      </View>
    ))
  ) : (
    <EmptySection caption="You do not have enough feedbacks" />
  );
};

export default ListReview;
