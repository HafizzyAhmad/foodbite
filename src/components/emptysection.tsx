import React from 'react';
import { View, Text } from 'react-native';
import text from '../styles/text';
import common from '../styles/common';

type EmptySection = {
  caption: string;
};

function EmptySection({ caption }: EmptySection) {
  return (
    <View style={[common.flexCenter, common.paddingVerticalXXLarge]}>
      <Text style={text.greyBodyReg}>{caption}</Text>
    </View>
  );
}

export default EmptySection;
