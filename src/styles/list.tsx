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
