import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { common, list, text } from '../styles';

type TabProps = {
  caption: string;
  action: () => void;
};

const TabActive = ({ caption, action }: TabProps) => (
  <View style={[common.widthHalf]}>
    <Pressable onPress={action} style={[common.center, common.paddingBottomS]}>
      <Text style={[text.brandButton]}>{caption}</Text>
    </Pressable>
    <View style={list.horizontalLineActive} />
  </View>
);

const TabInActive = ({ caption, action }: TabProps) => (
  <View style={[common.widthHalf]}>
    <Pressable onPress={action} style={[common.center, common.paddingBottomS]}>
      <Text style={[text.blackBodyReg]}>{caption}</Text>
    </Pressable>
    <View style={[list.horizontalLineInactive]} />
  </View>
);

export { TabActive, TabInActive };
