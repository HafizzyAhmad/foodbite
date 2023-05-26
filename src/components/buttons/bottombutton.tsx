import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import text from '../../styles/text';
import color from '../../styles/color';
import button from '../../styles/button';

function BottomActionButton({ content, onPress, isInactive }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isInactive}
      style={[
        isInactive ? color.bgLighterGrey : color.bgBrand,
        button.bottomButton,
      ]}>
      <Text style={[text.whiteButton, text.center]}>{content}</Text>
    </TouchableOpacity>
  );
}

export default BottomActionButton;
