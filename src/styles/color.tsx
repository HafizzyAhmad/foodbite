import { StyleSheet } from 'react-native';

export const colors = {
  white: '#FFFFFF',
  black: '#1E212B',
  baseBrand: '#20DD20',
  lighterBrand: '#90ee90',
  lightestBrand: '#F0FFF0',
  secondaryBrand: '#FF69B4',
  lightestSecondaryBrand: '#fff0f8',
  baseRed: '#EC0000',
  baseOrange: '#FF8427',
  baseYellow: '#FFC800',
  lightestYellow: '#FFEFD7',
  baseGrey: '#72777A',
  lightestGrey: '#F2F4F5',
  lighterGrey: '#BBBBBB',
};

export default StyleSheet.create({
  fontBlack: { color: colors.black },
  fontWhite: { color: colors.white },
  fontGrey: { color: colors.baseGrey },
  fontGreen: { color: colors.secondaryBrand },
  fontYellow: { color: colors.baseYellow },
  fontBrand: { color: colors.baseBrand },

  bgBlack: { backgroundColor: colors.black },
  bgWhite: { backgroundColor: colors.white },
  bgYellow: { backgroundColor: colors.baseYellow },
  bgBrand: { backgroundColor: colors.baseBrand },
  bgSecondaryBrand: { backgroundColor: colors.secondaryBrand },
  bgLighterBrand: { backgroundColor: colors.lighterBrand },
  bgLightestBrand: { backgroundColor: colors.lightestBrand },
  bgLighterGrey: { backgroundColor: colors.lighterGrey },
  bgLightestGrey: { backgroundColor: colors.lightestGrey },
  bgLightestSecondaryBrand: { backgroundColor: colors.lightestSecondaryBrand },
  bgLightestYellow: { backgroundColor: colors.lightestYellow },

  borderGrey: { borderColor: colors.lighterGrey },
  borderBlack: { borderColor: colors.black },
  borderRed: { borderColor: colors.baseBrand },
});
