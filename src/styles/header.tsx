import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  mainHeader: {
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 110 : 80,
  },

  arrowHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
});
