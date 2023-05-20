import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import text from '../styles/text';
import COLOR, { colors } from '../styles/color';
import { ICustomPicker } from '../types/libs/picker';

/**
 * please use this as footer button
 * @param       param0      refer the types in the stated file
 * @returns JSX.Element
 */
const CustomPicker = ({ placeholder, value, method, data }: ICustomPicker) => {
  return (
    <RNPickerSelect
      placeholder={{ label: placeholder }}
      value={value}
      onValueChange={method}
      style={{
        inputIOS: { ...text.blackBodyReg },
        inputAndroid: { ...text.blackBodyReg },
        inputIOSContainer: {
          padding: 16,
          ...COLOR.bgWhite,
          justifyContent: 'center',
          borderColor: colors.lighterGrey,
          borderWidth: 0.2,
          borderRadius: 3,
        },
      }}
      items={data.map((item: string) => {
        return { key: item, label: item, value: item };
      })}
    />
  );
};

export default CustomPicker;
