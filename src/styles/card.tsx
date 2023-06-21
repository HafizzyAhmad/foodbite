import { StyleSheet } from 'react-native';
import color from './color';
import common from './common';

const BASE = {
  // marginHorizontal: 15,
  padding: 15,
  marginBottom: 15,
  borderRadius: 10,
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 10,
  shadowOpacity: 0.1,
};

export default StyleSheet.create({
  orderCard: {
    ...BASE,
    ...color.bgSecondaryBrand,
    paddingBottom: 70,
    marginRight: 20,
  },

  acceptedCard: {
    ...BASE,
    ...color.bgWhite,
    // ...common.flexRowSpaceBetween,
    // ...common.centerVertically,
  },

  orderStatusCard: {
    ...BASE,
    paddingBottom: 25,
  },

  profileCard: {
    ...common.paddingContainer,
    ...color.bgWhite,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 5,
    shadowOpacity: 0.1,
  },

  hiddenCard: {
    overflow: 'hidden',
  },

  expandCard: {
    height: undefined,
  },

  collapseCard: {
    height: 0,
  },

  postInfoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: 100,
    padding: 15,
  },
  tileCard: {
    height: 280,
    width: '50%',
    marginBottom: 5,
  },
  tileContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
    // paddingHorizontal: 10,
    paddingBottom: 15,
  },
});
