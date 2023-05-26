import React from 'react';
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import form from '../styles/form';
import Formatter from '../utils/formatter';

const DateTimePicker = ({
  isVisible,
  onToggleVisibility,
  selectedDate,
  minimumDate,
  maximumDate,
  method,
  isClose,
}: any) => {
  return (
    <View>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="datetime"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={method}
        onCancel={isClose}
      />
      <Pressable onPress={onToggleVisibility} style={form.input}>
        <Text>{`${Formatter.dateTime(selectedDate)}`}</Text>
      </Pressable>
    </View>
  );
};

export default DateTimePicker;
