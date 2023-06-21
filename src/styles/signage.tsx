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
  imageLabelPrimary: {
    paddingVertical: 3,
    width: '95%',
    ...color.bgLighterBrand,
    margin: 5,
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  imageLabelSecondary: {
    paddingVertical: 3,
    width: '95%',
    ...color.bgSecondaryBrand,
    margin: 5,
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
