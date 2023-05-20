import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { card, common, image, text } from '../../styles';

type Props = {
  icon: any;
  label: string;
  caption: string;
  nav: () => void;
};

const PostCard = ({ icon, label, caption, nav }: Props) => {
  return (
    <Pressable
      style={[card.acceptedCard, common.flexRow, common.centerVertically]}
      onPress={nav}>
      <Image source={icon} style={[image.premiseType]} resizeMode="center" />
      <View style={[common.flexShrinkContainer, common.spacingLeft]}>
        <Text style={[text.blackBodyHighlight]}>{label}</Text>
        <Text style={[text.greyBodyReg]}>{caption}</Text>
      </View>
    </Pressable>
  );
};

export default PostCard;
