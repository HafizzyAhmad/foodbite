import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import button from '../../styles/button';
import text from '../../styles/text';

type Props = {
  buttonText: string;
  nav: any;
};

const SecondaryButton = ({ buttonText, nav }: Props) => {
  return (
    <TouchableOpacity style={[button.secondary]} onPress={nav}>
      <Text style={[text.blackButton]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
