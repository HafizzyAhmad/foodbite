import { Text, TouchableOpacity } from 'react-native';
import { button, text } from '../../styles';
import React from 'react';

type IWhiteButtonProps = {
  buttonText: string;
  nav: () => void;
};

const WhiteButton = ({ buttonText, nav }: IWhiteButtonProps) => {
  return (
    <TouchableOpacity style={button.buttonWhiteSmall} onPress={nav}>
      <Text style={[text.brandButton]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default WhiteButton;
