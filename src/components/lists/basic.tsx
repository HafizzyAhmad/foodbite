import React from 'react';
import { Text, View } from 'react-native';
import { common } from '../../styles';

const BasicList = ({ param, value }: any) => {
  return (
    <View style={[common.flexRowSpaceBetween, common.paddingTopSmall]}>
      <Text>{param}</Text>
      <Text>
        {value === '0.00' || value === 0 || value === null ? 'FREE' : value}
      </Text>
    </View>
  );
};

export default BasicList;
