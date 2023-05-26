import React, { Fragment, useRef, useState } from 'react';
import Layout from '../../elements/layout';
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { common, list, text } from '../../styles';
import { Text } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import ArrowHeader from '../../components/headers/arrowheader';
import { MALAYSIA } from '../../constants';
import { IInputForm } from '../../types/forms/input';
import { useOffset } from '../../hooks/use-offset';
import Validator from '../../utils/validator';
import form from '../../styles/form';
import CustomPicker from '../../libs/picker';
import { HandleImageUpload } from '../../libs/uploadimage';
import DateTimePicker from '../../libs/pickerdate';
import { IFoodItem } from '../../types/stores/donate';
import Icon from 'react-native-vector-icons/Feather';
import { AddIcon, RemoveIcon } from '../../components/icon';
import BottomActionButton from '../../components/buttons/bottombutton';

const DonateForm = ({ navigation }: StackTabScreenProps<'DonateForm'>) => {
  const { heightOffset, onIncrementFocus } = useOffset();
  const textInputRef = useRef<TextInput>(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [isInserting, setIsInserting] = useState<boolean>(false);
  const [foodItem, setFoodItem] = useState<string>('');

  // form state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [donationName, setDonationName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [addressLine, setAddressLine] = useState<string>('');
  const [addressPostcode, setPostcode] = useState<string>('');
  const [addressCity, setCity] = useState<string>('');
  const [addressState, setAddressState] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const [food, setFood] = useState<IFoodItem[]>([]);

  // form validation
  const [isValidCity, setIsValidCity] = useState<boolean>(true);
  const [isValidPostcode, setIsValidPostcode] = useState<boolean>(true);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);

  const donationConfig: IInputForm[] = [
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
      key: 'Start Date',
      placeholder: 'Please insert start date',
      method: (date: string) => handleConfirmStart(date),
      limit: 12,
      type: 'datePicker',
      minimumDate: new Date(),
      maximumDate: new Date(2023, 11, 31),
      visible: isStartDatePickerVisible,
      toggleVisibility: () => showStartDatePicker(),
      hideVisibility: () => hideStartDatePicker(),
      value: selectedStartDate,
    },
    {
      key: 'End Date',
      placeholder: 'Please insert end date',
      method: (date: string) => handleConfirmEnd(date),
      limit: 12,
      type: 'datePicker',
      minimumDate: new Date(),
      maximumDate: new Date(2023, 11, 31),
      visible: isEndDatePickerVisible,
      toggleVisibility: () => showEndDatePicker(),
      hideVisibility: () => hideEndDatePicker(),
      value: selectedEndDate,
    },
  ];

  const addressConfig: IInputForm[] = [
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
      isMultiline: false,
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
      isMultiline: false,
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

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleConfirmStart = (date: any) => {
    // Validate the selected date against the minimum and maximum dates
    const minimumDate = new Date(); // Current date
    const maximumDate = new Date(2023, 11, 31); // December 31, 2023

    if (
      (minimumDate && date < minimumDate) ||
      (maximumDate && date > maximumDate)
    ) {
      // Date is outside the allowed range, handle the validation error
      // You can show an error message, reset the selected date, or take any other appropriate action
      return;
    }

    setSelectedStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmEnd = (date: any) => {
    // Validate the selected date against the minimum and maximum dates
    const minimumDate = new Date(); // Current date
    const maximumDate = new Date(2023, 11, 31); // December 31, 2023

    if (
      (minimumDate && date < minimumDate) ||
      (maximumDate && date > maximumDate)
    ) {
      // Date is outside the allowed range, handle the validation error
      // You can show an error message, reset the selected date, or take any other appropriate action
      return;
    }

    setSelectedEndDate(date);
    hideEndDatePicker();
  };

  const [foodItems, setFoodItems] = useState<IFoodItem[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [idCounter, setIdCounter] = useState(1);

  const handleAddItem = () => {
    if (name && price) {
      const newItem: IFoodItem = { id: idCounter.toString(), name, price };
      setFoodItems(prevItems => [...prevItems, newItem]);
      setName('');
      setPrice('');
      setIdCounter(prevCounter => prevCounter + 1);
    }
  };

  const handleRemoveItem = (id: string) => {
    setFoodItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    const param = {
      image: selectedImage,
      type: 'Donation',
      createdById: 'string',
      donation: {
        name: donationName,
        description: description,
      },
      address: addressLine,
      postcode: addressPostcode,
      city: addressCity,
      state: addressState,
      mobileNumber: mobileNumber,
      geoLocation: {
        latitude: '200000',
        longitude: '100000',
      },
      statusAvailability: {
        startDateTime: selectedStartDate,
        endDateTime: selectedEndDate,
        status: 'Submitted',
      },
      items: foodItems,
    };

    console.log('CHECK PARAMS: ', param);
  };

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader nav={navigation} title="Donation Form" />
      <ScrollView style={[common.paddingHorizontalContainer]}>
        <KeyboardAvoidingView
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? heightOffset : 0}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Text style={[text.blackHeadingBold, common.paddingBottomM]}>
            Introduction
          </Text>

          {donationConfig.map(({ key, placeholder, type, ...options }) => {
            /**
             * simple method to update use state hooks
             * @param event   string    value captured during change text
             */
            function onChangeValue(event: string): void | undefined {
              if (key === 'Donation Name') setDonationName(event);
              if (key === 'Description') setDescription(event);
            }

            /**
             * simple function to provide the value for each input field
             * @returns string | undefined
             */
            function onDetermineValue(): string | undefined {
              if (key === 'Donation Name') return donationName;
              if (key === 'Description') return description;
            }

            return (
              <View key={key} style={common.section}>
                <Text style={text.greyBodyReg}>{key}</Text>
                <Fragment>
                  {type === 'input' && (
                    <Fragment>
                      <TextInput
                        style={form.input}
                        value={onDetermineValue()}
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
                  )}
                  {type === 'picker' && (
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
                  {type === 'datePicker' && (
                    <DateTimePicker
                      isVisible={options.visible}
                      placeholder={placeholder}
                      isClose={options.hideVisibility}
                      method={options.method}
                      onToggleVisibility={options.toggleVisibility}
                      selectedDate={options.value}
                      minimumDate={options.minimumDate}
                      maximumDate={options.maximumDate}
                    />
                  )}
                </Fragment>
              </View>
            );
          })}
          <Text
            style={[
              text.blackHeadingBold,
              common.paddingBottomM,
              common.paddingTopL,
            ]}>
            Location
          </Text>
          {addressConfig.map(({ key, placeholder, type, ...options }) => {
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
                  {type === 'input' && (
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
                  )}
                  {type === 'picker' && (
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
                  {type === 'datePicker' && (
                    <DateTimePicker
                      isVisible={options.visible}
                      placeholder={placeholder}
                      isClose={options.hideVisibility}
                      method={options.method}
                      onToggleVisibility={options.toggleVisibility}
                      selectedDate={options.value}
                      minimumDate={options.minimumDate}
                      maximumDate={options.maximumDate}
                    />
                  )}
                </Fragment>
              </View>
            );
          })}
          <View style={[common.paddingTopL]}>
            <Text style={[text.blackHeadingBold]}>Donation Item</Text>
            <FlatList
              data={foodItems}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={common.paddingBottomS}
              renderItem={({ item }) => (
                <View
                  style={[
                    common.flexRowSpaceBetween,
                    common.centerVertically,
                    common.paddingVerticalSmall,
                  ]}>
                  <View style={[form.inputRow70Disable]}>
                    <Text style={[text.greyBodyReg]}>{item.name}</Text>
                  </View>
                  <View style={[form.inputRow20Disable]}>
                    <Text style={[text.greyBodyReg]}>{item.price}</Text>
                  </View>
                  <Pressable
                    onPress={() => handleRemoveItem(item.id)}
                    style={[]}>
                    <RemoveIcon />
                  </Pressable>
                </View>
              )}
            />
            <View style={[common.flexRowSpaceBetween, common.centerVertically]}>
              <TextInput
                style={form.inputRow70}
                value={name}
                onChangeText={foodName => setName(foodName)}
                placeholder="Name"
              />
              <TextInput
                style={form.inputRow20}
                keyboardType="decimal-pad"
                value={price}
                onChangeText={foodPrice => setPrice(foodPrice)}
                placeholder="Price"
              />
              <Pressable onPress={handleAddItem} style={[]}>
                <AddIcon />
              </Pressable>
            </View>
          </View>
          <View style={[common.paddingTopL]}>
            <Text style={[text.blackHeadingBold, common.paddingBottomM]}>
              Upload Image
            </Text>
            {selectedImage ? (
              <Fragment>
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: '100%', height: 200 }}
                />
                <Button title="Select New Image" onPress={handleImageUpload} />
              </Fragment>
            ) : (
              <View style={form.imageBlank}>
                <Pressable onPress={handleImageUpload}>
                  <Text style={[text.brandButton]}>Select Image</Text>
                </Pressable>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <BottomActionButton
        content={'Submit Donation'}
        onPress={handleSubmit}
        isInactive={false}
      />
    </Layout>
  );
};

export default DonateForm;
