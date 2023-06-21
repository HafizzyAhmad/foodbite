import React from 'react';
import { Text, View } from 'react-native';
import { common, text } from '../../styles';

const TitleDescription = ({ title, description, createdDate }: any) => {
  return (
    <View style={common.paddingSmall}>
      <Text numberOfLines={1} style={[text.blackBodyHighlight]}>
        {title}
      </Text>
      <Text
        numberOfLines={3}
        style={[common.paddingVerticalXSmall, text.blackBodyReg]}>
        {description}
      </Text>
      <Text style={[text.greyLabelText]}>{createdDate}</Text>
    </View>
  );
};

export default TitleDescription;
