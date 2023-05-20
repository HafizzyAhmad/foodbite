import React, { Fragment, useState } from 'react';
import Layout from '../../elements/layout';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { common, text } from '../../styles';
import { Text } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import ArrowHeader from '../../components/headers/arrowheader';
import { MALAYSIA } from '../../constants';
import { IInputForm } from '../../types/forms/input';
import { useOffset } from '../../hooks/use-offset';
import Validator from '../../utils/validator';
import form from '../../styles/form';
import CustomPicker from '../../libs/picker';

const DonateForm = ({ navigation }: StackTabScreenProps<'DonateForm'>) => {
  const { heightOffset, onIncrementFocus } = useOffset();

  // form state
  const [donationName, setDonationName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
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
          {donateConfig.map(({ key, placeholder, type, ...options }) => {
            /**
             * simple method to update use state hooks
             * @param event   string    value captured during change text
             */
            function onChangeValue(event: string): void | undefined {
              if (key === 'addressForm.name') setAddressName(event);
              if (key === 'addressForm.address') setAddressLine(event);
              if (key === 'addressForm.postcode') setPostcode(event);
              if (key === 'addressForm.city') setCity(event);
              if (key === 'addressForm.mobile') setMobileNumber(event);
            }

            /**
             * simple function to provide the value for each input field
             * @returns string | undefined
             */
            function onDetermineValue(): string | undefined {
              if (key === 'addressForm.name') return addressName;
              if (key === 'addressForm.address') return addressLine;
              if (key === 'addressForm.postcode') return addressPostcode;
              if (key === 'addressForm.city') return addressCity;
              if (key === 'addressForm.state') return addressState;
              if (key === 'addressForm.mobile') return mobileNumber;
            }

            /**
             * use to determine style on a few input
             * @returns any
             */
            function onDetermineValid(): StyleProp<ViewStyle> {
              if (key === 'addressForm.postcode') {
                return isValidPostcode ? form.input : form.inputInvalid;
              }
              if (key === 'addressForm.mobile') {
                return isValidPhone ? form.input : form.inputInvalid;
              }
              if (key === 'addressForm.city') {
                return isValidCity ? form.input : form.inputInvalid;
              }
              return form.input;
            }

            /**
             * use to determine validity status on blur
             * @returns void | undefined
             */
            function onCheckValid(): void | undefined {
              if (key === 'addressForm.mobile') {
                const result: boolean = Validator.mobilePhone(mobileNumber);
                setIsValidPhone(result);
              }
              if (key === 'addressForm.postcode') {
                const result: boolean = Validator.postcode(addressPostcode);
                setIsValidPostcode(result);
              }
              if (key === 'addressForm.city') {
                const result: boolean = Validator.allChar(addressCity);
                setIsValidCity(result);
              }
            }

            return (
              <View key={key} style={common.section}>
                <Text style={text.greyBodyReg}>{key}</Text>
                <Fragment>
                  {type === 'input' ? (
                    <Fragment>
                      <TextInput
                        style={onDetermineValid()}
                        value={onDetermineValue()}
                        onBlur={onCheckValid}
                        onChangeText={onChangeValue}
                        placeholder={placeholder}
                        multiline={options.isMultiline}
                        numberOfLines={options.lineNumber}
                        maxLength={options.limit}
                        onFocus={() => onIncrementFocus()}
                      />
                      {!options.isValid && (
                        <Text
                          style={{
                            ...text.redErrorText,
                            ...common.spacingLeft,
                          }}>
                          {options.errorMessage}
                        </Text>
                      )}
                    </Fragment>
                  ) : (
                    <View style={form.picker}>
                      <CustomPicker
                        // key={t(key)}
                        placeholder={placeholder}
                        value={options.value}
                        method={options.method}
                        data={options.data}
                      />
                    </View>
                  )}
                </Fragment>
              </View>
            );
          })}
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

export default DonateForm;
