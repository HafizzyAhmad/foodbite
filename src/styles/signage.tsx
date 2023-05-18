import { StyleSheet } from 'react-native';
import color from './color';
import common from './common';

export default StyleSheet.create({
  order: {
    ...color.bgLightestGrey,
    ...common.paddingContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateFilter: {
    ...color.bgLightestGrey,
    ...common.flexRowSpaceBetween,
    ...common.paddingContainer,
    ...common.centerVertically,
  },

  labelGreen: {
    ...color.bgLightestSecondaryBrand,
    ...common.paddingSmall,
  },

  labelGrey: {
    ...color.bgLightestGrey,
    ...common.paddingSmall,
  },
  redDot: {
    ...color.bgBrand,
    borderRadius: 10,
    height: 10,
    width: 10,
  },
  unreadChatDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
