import { StyleSheet, Dimensions } from 'react-native';
import color from './color';

const BASIC = {
  flex: 1,
};

export default StyleSheet.create({
  flexCenter: {
    ...BASIC,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerVertically: {
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  basicContainer: {
    ...BASIC,
    padding: 20,
    ...color.bgBrand,
  },
  basicLayout: {
    ...BASIC,
    ...color.bgLightestBrand,
  },
  basicContainerNoFlex: {
    padding: 24,
    flex: 1,
    ...color.bgLightestBrand,
  },
  basicContainerTitle: {
    paddingHorizontal: 24,
  },
  section: {
    // marginTop: 10,
    marginBottom: 10,
  },
  sectionSmall: {
    marginBottom: 8,
  },
  flex1: {
    flex: 1,
  },
  paddingSmall: {
    padding: 5,
  },
  paddingTopL: {
    paddingTop: 30,
  },
  paddingBottomS: {
    paddingBottom: 5,
  },
  paddingBottomM: {
    paddingBottom: 15,
  },
  paddingBottomL: {
    paddingBottom: 30,
  },
  paddingContainer: {
    padding: 15,
  },
  paddingHorizontalContainer: {
    paddingHorizontal: 15,
  },
  paddingVerticalXSmall: {
    paddingVertical: 5,
  },
  paddingVerticalSmall: {
    paddingVertical: 10,
  },
  paddingVerticalMedium: {
    paddingVertical: 15,
  },
  paddingVerticalLarge: {
    paddingVertical: 30,
  },
  paddingVerticalXXLarge: {
    paddingVertical: 60,
  },
  paddingRightXSmall: {
    paddingRight: 5,
  },
  paddingRightSmall: {
    paddingRight: 20,
  },
  marginBottomLarge: {
    marginBottom: 30,
  },
  marginVerticalXSmall: {
    marginVertical: 5,
  },
  marginVerticalSmall: {
    marginVertical: 10,
  },
  marginVerticalMedium: {
    marginVertical: 20,
  },
  marginTopM: {
    marginTop: 10,
  },
  marginBottomM: {
    marginBottom: 10,
  },
  width30: {
    width: 30,
  },
  widthHalf: {
    width: '50%',
  },
  spacingLeft: {
    top: 4,
    left: 8,
  },
  commonScreen: {
    paddingVertical: '40%',
  },

  borderRadius: {
    borderRadius: 50,
  },

  flexShrinkContainer: {
    flexShrink: 1,
    alignSelf: 'flex-start',
  },

  activityIndicatorSmall: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
  },
  horizontalContainerList: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  positionTop60: {
    top: '60%',
  },
});
