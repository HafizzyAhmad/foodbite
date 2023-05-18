import { StyleSheet } from 'react-native';
import color from './color';

const boldFont = 'Montserrat-Bold';
const mediumFont = 'Montserrat-Medium';
const regularFont = 'Montserrat-Regular';

const XXLARGE = 28;
const XLARGE = 18;
const LARGE = 16;
const REGULAR = 14;
const SMALL = 12;

const titleScreen = { fontSize: REGULAR, fontFamily: regularFont };
const largeTitle = { fontSize: XXLARGE, fontFamily: boldFont };
const largeTitleRegular = { fontSize: XLARGE, fontFamily: mediumFont };
const sectionTitle = { fontSize: XLARGE, fontFamily: boldFont };
const headingBody = { fontSize: LARGE, fontFamily: mediumFont };
const headingBodyBold = { fontSize: LARGE, fontFamily: boldFont };
const body = { fontSize: REGULAR, fontFamily: regularFont };
const bodyHighlight = { fontSize: REGULAR, fontFamily: mediumFont };
const captionBold = { fontSize: SMALL, fontFamily: boldFont };
const caption = { fontSize: SMALL, fontFamily: regularFont };

export default StyleSheet.create({
  center: { textAlign: 'center' },
  alignSelfCenter: { alignSelf: 'center' },
  alignItemCenter: { alignItems: 'center' },
  justify: { textAlign: 'justify' },
  right: { textAlign: 'right' },
  lineHeightLarge: { lineHeight: 30 },
  lineHeightBody: { lineHeight: 20 },

  blackHeadlineBold: { ...largeTitle, ...color.fontBlack },
  blackHeadlineRegular: { ...largeTitleRegular, ...color.fontBlack },
  blackTitleScreen: { ...titleScreen, ...color.fontBlack },
  blackSectionTitle: { ...sectionTitle, ...color.fontBlack },
  blackHeading: { ...headingBody, ...color.fontBlack },
  blackHeadingBold: { ...headingBodyBold, ...color.fontBlack },
  blackBodyHighlight: { ...bodyHighlight, ...color.fontBlack },
  blackBodyReg: { ...body, ...color.fontBlack },
  blackButton: { ...headingBodyBold, ...color.fontBlack },

  greyBodyReg: { ...body, ...color.fontGrey },
  greyLabelText: { ...caption, ...color.fontGrey },

  whiteHeadlineBold: { ...largeTitle, ...color.fontWhite },
  whiteTitleScreen: { ...titleScreen, ...color.fontWhite },
  whiteSectionTitle: { ...sectionTitle, ...color.fontWhite },
  whiteHeading: { ...headingBody, ...color.fontWhite },
  whiteBodyHighlight: { ...bodyHighlight, ...color.fontWhite },
  whiteBodyReg: { ...body, ...color.fontWhite },
  whiteButton: { ...headingBodyBold, ...color.fontWhite },

  yellowStatus: { ...captionBold, ...color.fontYellow },

  greenHeadline: { ...largeTitle, ...color.fontGreen },

  lineHeightXXL: { lineHeight: 36 },
  lineHeightXL: { lineHeight: 27 },
  lineHeightL: { lineHeight: 24 },
  lineHeightM: { lineHeight: 21 },
  lineHeightS: { lineHeight: 18 },

  redBodyReg: { ...body, ...color.fontBrand },
  greenBodyReg: { ...body, ...color.fontGreen },

  redErrorText: { ...caption, ...color.fontBrand },
});
