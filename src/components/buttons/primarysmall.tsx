import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import button from '../../styles/button';
import text from '../../styles/text';

type Props = {
  buttonText?: string | undefined;
  nav?: () => void;
  disable?: boolean;
};

const PrimarySmallButton = ({ buttonText, nav, disable }: Props) => {
  return (
    <TouchableOpacity
      style={disable ? button.primarySmallDisable : button.primarySmall}
      disabled={disable}
      onPress={nav}>
      <Text style={[text.whiteButton]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default PrimarySmallButton;
