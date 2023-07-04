import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import common from '../../styles/common';
import header from '../../styles/header';
import text from '../../styles/text';
import { ArrowLeft } from '../icon';

type Props = {
  iconName?: string;
  disableBack?: boolean;
  nav?: any;
  title?: string;
};
function ArrowHeader({ nav, title, disableBack }: Props) {
  return (
    <View style={[common.paddingHorizontalContainer, header.arrowContainer]}>
      {!disableBack && (
        <TouchableOpacity onPress={() => nav.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
      )}
      {title && (
        <Text style={[text.blackScreenBrand, common.paddingVerticalMedium]}>
          {title}
        </Text>
      )}
    </View>
  );
}

export default ArrowHeader;
