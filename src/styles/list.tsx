import { StyleSheet } from 'react-native';
import color from '../styles/color';
import common from './common';

export default StyleSheet.create({
  address: {
    marginBottom: 24,
  },

  horizontalLine: {
    borderBottomWidth: 1,
    ...color.borderGrey,
  },

  horizontalLineActive: {
    height: 2,
    ...color.bgBrand,
  },
  horizontalLineInactive: {
    height: 2,
    ...color.bgBlack,
  },
  profileMenu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // ...common.sectionSmall,
    borderBottomWidth: 0.3,
    borderColor: '#c4c4c4',
    paddingVertical: 16,
  },
  simpleRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...common.sectionSmall,
  },
});
