import { Text, View } from 'react-native';
import { signage, text } from '../../styles';
import React from 'react';

const ImageLabel = ({ type }: any) => {
  return (
    <View
      style={
        type === 'Donation'
          ? signage.imageLabelPrimary
          : signage.imageLabelSecondary
      }>
      <Text style={[text.whiteBodyReg, text.center]}>{type}</Text>
    </View>
  );
};

export default ImageLabel;
