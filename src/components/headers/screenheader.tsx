import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import common from '../../styles/common';
import header from '../../styles/header';
import text from '../../styles/text';
import { ArrowLeft, IconHeaderRight } from '../icon';

type Props = {
  iconName?: string;
  disableBack?: boolean;
  nav?: any;
  title?: string;
};
function ScreenHeader({ iconName, disableBack, nav, title }: Props) {
  return (
    <View
      style={[header.arrowHeaderContainer, common.paddingHorizontalContainer]}>
      {!disableBack ? (
        <TouchableOpacity onPress={() => nav.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
      ) : (
        <View style={common.width30} />
      )}
      <Text style={[text.blackTitleScreen]}>{title}</Text>
      {iconName ? (
        <TouchableOpacity onPress={() => nav.navigate('')}>
          <IconHeaderRight iconRightName={iconName} />
        </TouchableOpacity>
      ) : (
        <View style={common.width30} />
      )}
    </View>
  );
}

export default ScreenHeader;
