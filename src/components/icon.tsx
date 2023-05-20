import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import image from '../styles/image';

type IconRightProps = {
  iconRightName: string;
};

function ArrowLeft() {
  return <Ionicons name="md-arrow-back" size={30} color="#090A0A" />;
}

function IconHeaderRight({ iconRightName }: IconRightProps) {
  return <Ionicons name={iconRightName} size={30} color="#090A0A" />;
}

function DropDown() {
  return <Feather name="chevron-down" size={20} color="#20DD20" />;
}

function ChevronRight() {
  return <Feather name="chevron-right" size={20} color="black" />;
}

function EmptyIcon() {
  return <View style={image.emptyIcon} />;
}

export { ArrowLeft, IconHeaderRight, DropDown, ChevronRight, EmptyIcon };
