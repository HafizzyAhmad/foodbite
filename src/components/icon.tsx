import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import image from '../styles/image';
import { colors } from '../styles/color';

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

function UserIcon() {
  return <Feather name="user" size={25} color={'grey'} />;
}

function UserIconLarge() {
  return <Feather name="user" size={35} color={'grey'} />;
}

function AddIcon() {
  return <Feather name="plus-circle" size={25} color="#20DD20" />;
}

function RemoveIcon() {
  return <Feather name="minus-circle" size={25} color="#EC0000" />;
}

function FullLove() {
  return <Ionicons name="heart" size={20} color={'red'} />;
}
function FullLoveLarge() {
  return <Ionicons name="heart" size={40} color={'red'} />;
}

function HalfLove() {
  return <Ionicons name="heart-half" size={20} color={'red'} />;
}

function EmptyLove() {
  return <Ionicons name="heart-outline" size={20} color={'red'} />;
}
function EmptyLoveLarge() {
  return <Ionicons name="heart-outline" size={40} color={'red'} />;
}

function CircleBackground({ children }: any) {
  return <View style={image.profileBackground}>{children}</View>;
}

function CircleBackgroundLarge({ children }: any) {
  return <View style={image.profileBackgroundLarge}>{children}</View>;
}

function RecommendedIcon() {
  return <Ionicons name="ribbon-outline" size={25} color={colors.baseBrand} />;
}

export {
  ArrowLeft,
  IconHeaderRight,
  DropDown,
  ChevronRight,
  EmptyIcon,
  AddIcon,
  RemoveIcon,
  UserIcon,
  UserIconLarge,
  FullLove,
  HalfLove,
  EmptyLove,
  CircleBackground,
  FullLoveLarge,
  EmptyLoveLarge,
  CircleBackgroundLarge,
  RecommendedIcon,
};
