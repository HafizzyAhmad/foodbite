import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import text from '../../styles/text';
import button from '../../styles/button';
import { common } from '../../styles';

function RowBottomAction({
  textPrimary,
  textSecondary,
  navPrimary,
  navSecondary,
}: any) {
  return (
    <View
      style={[common.flexRowSpaceBetween, common.paddingHorizontalContainer]}>
      <TouchableOpacity style={[button.secondary]} onPress={navSecondary}>
        <Text style={[text.brandButton]}>{textSecondary}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[button.primary, common.widthHalf]}
        onPress={navPrimary}>
        <Text style={[text.whiteButton]}>{textPrimary}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RowBottomAction;
