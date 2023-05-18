import { StyleSheet, Platform } from 'react-native';
// import color from '../styles/color';
import text from '../styles/text';

export default StyleSheet.create({
  pickerIOS: {
    ...text.blackBodyHighlight,
    alignItems: 'center',
    paddingRight: 30,
  },
  pickerAndroid: {
    ...text.blackBodyHighlight,
    paddingRight: 30,
    alignItems: 'center',
  },

  pickerIcon: {
    top: Platform.OS === 'android' ? 15 : 0,
  },
});
