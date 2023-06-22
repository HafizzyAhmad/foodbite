import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { color, common, header, image } from '../../styles';
import ProfileSection from '../profile';
import IMAGE from '../../constants/image';

function ProfileHeader(params: type) {
  // const image = { uri: IMAGE.profileBackground };
  return (
    <ImageBackground
      source={IMAGE.profileBackground}
      style={[image.profileHeader, common.center]}
      resizeMode="cover">
      <ProfileSection />
    </ImageBackground>
  );
}

export default ProfileHeader;
