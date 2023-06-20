import { StyleSheet } from 'react-native';
import color from './color';
import common from './common';

const WITH_SHADOW = {
  shadowColor: color.bgBlack.backgroundColor,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 2,
};

export default StyleSheet.create({
  primary: {
    ...color.bgBrand,
    ...common.center,
    ...common.centerVertically,
    height: 45,
    borderRadius: 30,
    marginVertical: 20,
  },

  primaryDisable: {
    ...color.bgLighterGrey,
    ...common.center,
    ...common.centerVertically,
    height: 45,
    borderRadius: 30,
    marginVertical: 20,
  },

  primarySmall: {
    ...color.bgBrand,
    ...common.center,
    ...common.centerVertically,
    width: '50%',
    height: 45,
    borderRadius: 30,
    marginVertical: 20,
  },

  primarySmallDisable: {
    ...color.bgLighterGrey,
    ...common.center,
    ...common.centerVertically,
    width: '50%',
    height: 45,
    borderRadius: 30,
    marginVertical: 20,
  },

  secondary: {
    ...color.borderBrand,
    ...common.flexCenter,
    borderWidth: 1,
    height: 45,
    borderRadius: 30,
    marginVertical: 20,
  },

  modalPrimaryButton: {
    ...color.bgBrand,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 30,
    height: 45,
    width: '100%',
  },

  radioButtonContainer: {
    ...color.fontBrand,
    borderRadius: 50,
    borderWidth: 1,
    ...color.borderRed,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  bottomButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    width: '90%',
    marginBottom: 16,
    height: 50,
  },

  login: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 0.2,
    borderColor: '#000',
    borderRadius: 24,
  },

  simple: {
    width: 16,
    height: 16,
  },

  buttonIncrement: {
    borderRadius: 50,
  },

  optionActive: {
    ...color.bgLighterBrand,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    ...WITH_SHADOW,
  },

  state: {
    ...color.bgWhite,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 2,
    borderRadius: 8,
    ...WITH_SHADOW,
  },

  selectedState: {
    ...color.borderRed,
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
  },

  unselectedState: {
    ...color.borderBlack,
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
  },
});
