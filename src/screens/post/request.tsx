import React, { Fragment, useState } from 'react';
import Layout from '../../elements/layout';
import {
  Alert,
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
import { common, image, text } from '../../styles';
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
import { IFoodItem, IPost } from '../../types/stores/donate';
import { AddIcon, RemoveIcon } from '../../components/icon';
import BottomActionButton from '../../components/buttons/bottombutton';
import LocationPickerModal from '../../components/modals/picklocation';
import { useStore } from '../../hooks';
import { addPost, addPostFailed, addPostSuccess } from '../../stores/post';
import PostAPI from '../../api/post';

const RequestForm = ({ navigation }: StackTabScreenProps<'RequestForm'>) => {
  const [globalState, dispatch] = useStore();
  const { app } = globalState;
  const { heightOffset, onIncrementFocus } = useOffset();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const postAPI = new PostAPI(app.token);

  // form state
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [donationName, setDonationName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [addressLine, setAddressLine] = useState<string>('');
  const [addressPostcode, setPostcode] = useState<number>(0);
  const [addressCity, setCity] = useState<string>('');
  const [addressState, setAddressState] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');

  // location coordinate
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>([]);

  // form validation
  const [isValidCity, setIsValidCity] = useState<boolean>(true);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);

  const handleLocationSelect = (coordinate: {
    latitude: any;
    longitude: any;
  }) => {
    setSelectedLocation([coordinate.latitude, coordinate.longitude]);
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const donationConfig: IInputForm[] = [
    {
      key: 'Request Name',
      placeholder: 'Enter name of request',
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
      placeholder: 'Description of request',
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
      limit: 20,
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
      key: 'Add Precise Location',
      placeholder: 'Coordinate of your location',
      value: selectedLocation,
      method: () => setModalVisible(true),
      type: 'picklocation',
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
    setPrice('NA');
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

  async function onSubmit(params: IPost) {
    dispatch(addPost());
    try {
      const res: IPost = await postAPI.postForm(params);
      if (res) {
        dispatch(addPostSuccess());
        return true;
      }
    } catch (error) {
      dispatch(addPostFailed());
      Alert.alert('Oh uh! Something went wrong. Please try again later.');
      return false;
    }
  }

  const handleSubmit = async () => {
    const param = {
      image: selectedImage,
      type: 'Request',
      createdById: app.profile._id,
      createdByUserName: app.profile.username,
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
        latitude: selectedLocation[0],
        longitude: selectedLocation[1],
      },
      statusAvailability: {
        startDateTime: selectedStartDate,
        endDateTime: selectedEndDate,
        status: 'Submitted',
      },
      items: foodItems,
    };

    const excludedKeys = ['image']; // Specify the keys to exclude from empty string check
    const hasEmptyString = Object.entries(param).some(([key, value]) => {
      return (
        !excludedKeys.includes(key) &&
        (value === '' ||
          (key === 'items' && Array.isArray(value) && value.length === 0))
      );
    });

    if (hasEmptyString) {
      // At least one parameter has an empty string
      Alert.alert('Please fill in the information required');
    } else {
      // All parameters have a value
      // eslint-disable-next-line no-console
      console.log('All parameters have a value.');
      const success = await onSubmit(param);
      if (success) return navigation.navigate('Complete', { ...param });
    }
  };

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader nav={navigation} title="Request Form" disableBack={false} />
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
              if (key === 'Request Name') setDonationName(event);
              if (key === 'Description') setDescription(event);
            }

            /**
             * simple function to provide the value for each input field
             * @returns string | undefined
             */
            function onDetermineValue(): string | undefined {
              if (key === 'Request Name') return donationName;
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
            function onChangeValue(event: any): void | undefined {
              if (key === 'Request Name') setDonationName(event);
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
            function onDetermineValue(): any | undefined {
              if (key === 'Request Name') return donationName;
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
                  {type === 'picklocation' && (
                    <Pressable style={form.input} onPress={options.method}>
                      <Text
                        style={
                          options.value.length === 0
                            ? text.greyBodyReg
                            : text.blackBodyReg
                        }>
                        {options.value.length === 0
                          ? placeholder
                          : `${options.value[0].toFixed(
                              6,
                            )}, ${options.value[1].toFixed(6)}`}
                      </Text>
                    </Pressable>
                  )}
                </Fragment>
              </View>
            );
          })}
          <View style={[common.paddingTopL]}>
            <Text style={[text.blackHeadingBold]}>Request Item</Text>
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
                  <View style={[form.inputRow80Disable]}>
                    <Text style={[text.greyBodyReg]}>{item.name}</Text>
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
                style={form.inputRow80}
                value={name}
                onChangeText={foodName => setName(foodName)}
                placeholder="Name"
              />
              {/* <TextInput
                style={form.inputRow20}
                keyboardType="decimal-pad"
                value={price}
                onChangeText={foodPrice => setPrice(foodPrice)}
                placeholder="Price"
              /> */}
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
                  style={image.selectedThumbnail}
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
        content={'Submit Request'}
        onPress={handleSubmit}
        isInactive={false}
      />
      <LocationPickerModal
        visible={modalVisible}
        onClose={handleModalClose}
        onLocationSelect={handleLocationSelect}
      />
    </Layout>
  );
};

export default RequestForm;
