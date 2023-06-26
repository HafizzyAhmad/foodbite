import React from 'react';
import { ImageBackground } from 'react-native';
import { common, image } from '../../styles';
import ProfileSection from '../profile';
import IMAGE from '../../constants/image';
import WhiteButton from '../buttons/whitebutton';

function ProfileHeader({ profile, score, nav }: any) {
  // const image = { uri: IMAGE.profileBackground };
  const handleAction = () => {
    nav.navigate('Setting');
  };
  return (
    <ImageBackground
      source={IMAGE.profileBackground}
      style={[image.profileHeader, common.center]}
      resizeMode="cover">
      <ProfileSection profile={profile} score={score} />
      <WhiteButton buttonText="Edit Profile" nav={handleAction} />
    </ImageBackground>
  );
}

export default ProfileHeader;
