import React from 'react';
import { Pressable, Text } from 'react-native';
import { text } from '../../styles';

type TextButtonProps = {
  caption: string;
  onPress?: () => void;
};

const TextButtonDanger = ({ caption, onPress }: TextButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={text.redButton}>{caption}</Text>
    </Pressable>
  );
};

export default TextButtonDanger;
