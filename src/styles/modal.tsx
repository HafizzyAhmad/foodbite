import { StyleSheet } from 'react-native';
import common from './common';
import text from './text';

export default StyleSheet.create({
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalCloseButton: {
    alignSelf: 'flex-end',
  },

  textInputModal: {
    ...text.blackBodyReg,
    ...common.paddingHorizontalContainer,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    height: 40,
    width: '100%',
  },

  amountInputRMLabel: {
    padding: 13,
    height: 40,
    backgroundColor: 'black',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  amountInputModal: {
    ...text.blackBodyReg,
    textAlign: 'right',
    borderWidth: 0.8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    height: 40,
    width: '87%',
    padding: 6,
  },
});
