import React from 'react';
import { View, Text } from 'react-native';
import { common, text } from '../styles';
import {
  CircleBackgroundLarge,
  EmptyLove,
  FullLove,
  HalfLove,
  UserIconLarge,
} from './icon';

const ProfileSection = ({ profile, score }: any) => {
  const renderRating = () => {
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
    <View style={[common.center]}>
      <CircleBackgroundLarge>
        <UserIconLarge />
      </CircleBackgroundLarge>
      <View style={common.paddingHorizontalContainer}>
        <Text
          style={[
            text.blackScreenBrand,
            common.paddingVerticalSmall,
            text.alignSelfCenter,
          ]}>
          {profile?.username}
        </Text>
        <Text style={[text.alignSelfCenter]}>{profile?.email}</Text>
        <Text
          style={[
            text.greyLabelText,
            text.alignSelfCenter,
          ]}>{`Rating: ${score.toFixed(2)}`}</Text>
        <View style={[common.flexRow, common.center]}>{renderRating()}</View>
      </View>
    </View>
  );
};

export default ProfileSection;
