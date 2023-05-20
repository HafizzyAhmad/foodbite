import React, { useState } from 'react';
import Layout from '../../elements/layout';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { common } from '../../styles';
import { Text } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import ArrowHeader from '../../components/headers/arrowheader';
import { MALAYSIA } from '../../constants';
import { IInputForm } from '../../types/forms/input';
import { useOffset } from '../../hooks/use-offset';

const DonateForm = ({ navigation }: StackTabScreenProps<'DonateForm'>) => {
  const { heightOffset, onIncrementFocus } = useOffset();

  // form state
  const [addressName, setAddressName] = useState<string>('');
  const [addressLine, setAddressLine] = useState<string>('');
  const [addressPostcode, setPostcode] = useState<string>('');
  const [addressCity, setCity] = useState<string>('');
  const [addressState, setAddressState] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');

  // form validation
  const [isValidCity, setIsValidCity] = useState<boolean>(true);
  const [isValidPostcode, setIsValidPostcode] = useState<boolean>(true);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);

  const donateConfig: IInputForm[] = [
    {
      key: 'Donation Name',
      placeholder: 'Enter name of donation',
      lineNumber: 1,
      isMultiline: false,
      method: () => null,
      limit: 50,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter valid email address',
      secureTextEntry: false,
    },
    {
      key: 'Description',
      placeholder: 'Description of donation',
      lineNumber: 1,
      isMultiline: true,
      method: () => null,
      limit: 250,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter password',
      secureTextEntry: false,
    },
    {
      key: 'Address',
      placeholder: 'eg: A-0-0, Jalan Universiti, UTM Skudai',
      lineNumber: 1,
      isMultiline: true,
      method: () => null,
      limit: 250,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter password',
      secureTextEntry: false,
    },
    {
      key: 'Postcode',
      placeholder: 'eg: 00000',
      lineNumber: 1,
      isMultiline: true,
      method: () => null,
      limit: 5,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter password',
      secureTextEntry: false,
    },
    {
      key: 'City',
      placeholder: 'eg: Skudai',
      lineNumber: 1,
      isMultiline: true,
      method: () => null,
      limit: 10,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter password',
      secureTextEntry: false,
    },
    {
      key: 'State',
      placeholder: 'e.g. W.P. Kuala Lumpur',
      data: MALAYSIA,
      value: addressState,
      method: (state: string) => setAddressState(state),
      type: 'picker',
    },
    {
      key: 'Contact No',
      placeholder: '0123456789',
      lineNumber: 1,
      isMultiline: false,
      method: () => null,
      limit: 12,
      type: 'input',
      isValid: isValidPhone,
      errorMessage: '',
    },
  ];
  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader nav={navigation} title="Donation Form" />
      <ScrollView style={common.paddingHorizontalContainer}>
        <KeyboardAvoidingView
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? heightOffset : 0}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {donateConfig.map(({ key, placeholder, type, ...options }) => {})}
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

export default DonateForm;
