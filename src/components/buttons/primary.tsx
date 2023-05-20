import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import button from '../../styles/button';
import text from '../../styles/text';

type Props = {
  buttonText?: string | undefined;
  nav?: () => void;
  disable?: boolean;
};

const PrimaryButton = ({ buttonText, nav, disable }: Props) => {
  return (
    <TouchableOpacity
      style={disable ? button.primaryDisable : button.primary}
      disabled={disable}
      onPress={nav}>
      <Text style={[text.whiteButton]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
