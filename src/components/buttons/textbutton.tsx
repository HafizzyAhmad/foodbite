import React from 'react';
import { Pressable, Text } from 'react-native';
import { text } from '../../styles';

type TextButtonProps = {
  caption: string;
  onPress?: () => void;
};

const TextButton = ({ caption, onPress }: TextButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={text.brandButton}>{caption}</Text>
    </Pressable>
  );
};

export default TextButton;
