import React from 'react';
import { View, Text } from 'react-native';
import { common, text } from '../styles';
import {
  CircleBackground,
  EmptyLove,
  FullLove,
  HalfLove,
  UserIcon,
} from './icon';

const ProfileSection = () => {
  const rating = 2.6;
  const renderRating = () => {
    const score = rating;
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

  return (
    <View style={[common.paddingVerticalSmall, common.flexRowSpaceBetween]}>
      <View style={[common.flexRow]}>
        <CircleBackground>
          <UserIcon />
        </CircleBackground>
        <View style={common.paddingHorizontalContainer}>
          <Text
            style={[
              text.blackBodyHighlight,
              text.lineHeightL,
              common.paddingRightXSmall,
            ]}>{`User name`}</Text>
          <Text>hafizzy01@yopmail.com</Text>
          <Text style={[text.greyLabelText]}>{`Rating: 2.43`}</Text>
          <View style={common.flexRow}>
            <Text>{`Test`}</Text>
          </View>
          <View style={common.flexRow}>{renderRating()}</View>
        </View>
      </View>
    </View>
  );
};

export default ProfileSection;
