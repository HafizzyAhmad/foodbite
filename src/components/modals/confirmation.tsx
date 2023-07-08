import React, { SetStateAction, Dispatch } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import modal from '../../styles/modal';
import Feather from 'react-native-vector-icons/Feather';
import text from '../../styles/text';
import common from '../../styles/common';
import ModalPrimaryButton from '../buttons/modalprimary';
import { colors } from '../../styles/color';

type Props = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  navigation?: () => void;
  title: string;
  caption: string;
  buttonCaption: string;
  buttonAction: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
  modalVisible,
  title,
  caption,
  buttonCaption,
  buttonAction,
  setModalVisible,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={[modal.modalCenter]}>
        <View style={[modal.modalView]}>
          <TouchableOpacity
            style={common.alignSelfEnd}
            onPress={() => setModalVisible(false)}>
            <Feather name="x" size={20} />
          </TouchableOpacity>
          <Feather name="alert-triangle" color={colors.baseYellow} size={50} />
          <Text style={[text.blackSectionTitle, common.marginVerticalMedium]}>
            {title}
          </Text>
          <Text
            style={[
              text.center,
              text.blackBodyReg,
              common.paddingHorizontalContainer,
            ]}>
            {caption}
          </Text>
          <ModalPrimaryButton buttonText={buttonCaption} nav={buttonAction} />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
