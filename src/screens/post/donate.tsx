import React, { Fragment, useState } from 'react';
import Layout from '../../elements/layout';
import {
  Button,
  Image,
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
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { HandleImageUpload } from '../../libs/uploadimage';

const DonateForm = ({ navigation }: StackTabScreenProps<'DonateForm'>) => {
  const { heightOffset, onIncrementFocus } = useOffset();

  // form state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  // const handleImageUpload = () => {
  //   ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
  //     if (response.didCancel) {
  //       console.log('Image selection cancelled');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error:', response.error);
  //     } else if (response.assets && response.assets.length > 0) {
  //       const selectedAsset = response.assets[0];
  //       console.log('SELECTED ASSETS: ', selectedAsset);
  //       if (selectedAsset.uri) {
  //         RNFS.readFile(selectedAsset.uri, 'base64')
  //           .then(base64Image => {
  //             const imageType = selectedAsset.type;
  //             const base64ImageData = `data:${imageType};base64,${base64Image}`;
  //             setSelectedImage(base64ImageData);
  //             // You can call your upload function here with the base64ImageData
  //           })
  //           .catch(error => {
  //             console.log('Failed to convert image to base64:', error);
  //           });
  //       }
  //     }
  //   });
  // };

  const handleImageUpload = () =>
    HandleImageUpload()
      .then((base64ImageData: any) => {
        setSelectedImage(base64ImageData);
      })
      .catch(error => {
        // Handle any errors here
        // eslint-disable-next-line no-console
        console.log('Error:', error);
      });

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader nav={navigation} title="Donation Form" />
      <ScrollView style={common.paddingHorizontalContainer}>
        <View>
          <Button title="Select Image" onPress={handleImageUpload} />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
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
              if (key === 'Donation Name') setDonationName(event);
              if (key === 'Description') setDescription(event);
              if (key === 'Address') setAddressLine(event);
              if (key === 'Postcode') setPostcode(event);
              if (key === 'City') setCity(event);
              if (key === 'Contact No') setMobileNumber(event);
            }

            /**
             * simple function to provide the value for each input field
             * @returns string | undefined
             */
            function onDetermineValue(): string | undefined {
              if (key === 'Donation Name') return donationName;
              if (key === 'Description') return description;
              if (key === 'Address') return addressLine;
              if (key === 'Postcode') return addressPostcode;
              if (key === 'City') return addressCity;
              if (key === 'State') return addressState;
              if (key === 'Contact No') return mobileNumber;
            }

            /**
             * use to determine style on a few input
             * @returns any
             */
            function onDetermineValid(): StyleProp<ViewStyle> {
              if (key === 'Postcode') {
                return isValidPostcode ? form.input : form.inputInvalid;
              }
              if (key === 'Contact No') {
                return isValidPhone ? form.input : form.inputInvalid;
              }
              if (key === 'City') {
                return isValidCity ? form.input : form.inputInvalid;
              }
              return form.input;
            }

            /**
             * use to determine validity status on blur
             * @returns void | undefined
             */
            function onCheckValid(): void | undefined {
              if (key === 'Contact No') {
                const result: boolean = Validator.mobilePhone(mobileNumber);
                setIsValidPhone(result);
              }
              if (key === 'Postcode') {
                const result: boolean = Validator.postcode(addressPostcode);
                setIsValidPostcode(result);
              }
              if (key === 'City') {
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
