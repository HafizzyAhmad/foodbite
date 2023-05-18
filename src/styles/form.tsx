import { StyleSheet } from 'react-native';
import COLOR, { colors } from './color';
import text from './text';

const BASIC_SHADOW = {
  borderRadius: 4,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 1,
};

export default StyleSheet.create({
  loan: {
    ...text.blackBodyReg,
    ...COLOR.bgWhite,
    width: '80%',
    padding: 8,
    ...BASIC_SHADOW,
  },
  address: {
    ...text.blackTitleScreen,
    ...COLOR.bgWhite,
    padding: 16,
    marginTop: 4,
    ...BASIC_SHADOW,
    borderColor: colors.lighterGrey,
    borderWidth: 1,
  },
  addressInvalid: {
    ...BASIC_SHADOW,
    ...text.blackTitleScreen,
    ...COLOR.bgWhite,
    padding: 16,
    marginTop: 4,
    borderColor: colors.baseRed,
    borderWidth: 0.5,
  },
  picker: {
    ...COLOR.bgWhite,
    ...BASIC_SHADOW,
  },
  promo: {
    ...text.greyLabelText,
    width: '80%',
  },
});
