import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import button from '../../styles/button';
import text from '../../styles/text';

type Props = {
  buttonText: string;
  nav: any;
};

const ModalPrimaryButton = ({ buttonText, nav }: Props) => {
  return (
    <TouchableOpacity style={[button.modalPrimaryButton]} onPress={nav}>
      <Text style={[text.whiteButton]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ModalPrimaryButton;
