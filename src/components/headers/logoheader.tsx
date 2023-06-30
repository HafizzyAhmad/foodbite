import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import color from '../../styles/color';
import header from '../../styles/header';
import image from '../../styles/image';
import common from '../../styles/common';
import { EmptyIcon, RecommendedIcon } from '../icon';
import IMAGE from '../../constants/image';

const LogoHeader = ({ nav }: any) => {
  return (
    <View
      style={[
        color.bgLightestBrand,
        header.mainHeader,
        common.flexRowSpaceBetween,
        common.centerVertically,
        common.paddingHorizontalContainer,
      ]}>
      <EmptyIcon />
      <View style={[common.centerVertically, common.width80P]}>
        <Image source={IMAGE.headerLogo} style={image.logo} />
      </View>
      <TouchableOpacity
        onPress={() => {
          nav.navigate('Recommended');
        }}
        style={[common.paddingSmall, color.bgWhite, common.borderRadius]}>
        <RecommendedIcon />
      </TouchableOpacity>
    </View>
  );
};

export default LogoHeader;
