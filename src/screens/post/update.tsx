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
  TextInput,
  View,
} from 'react-native';
import { common, image, text } from '../../styles';
import { Text } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import ArrowHeader from '../../components/headers/arrowheader';
import { useOffset } from '../../hooks/use-offset';
import form from '../../styles/form';
import { HandleImageUpload } from '../../libs/uploadimage';
import DateTimePicker from '../../libs/pickerdate';
import { IFoodItem, IPost } from '../../types/stores/donate';
import { AddIcon, RemoveIcon } from '../../components/icon';
import BottomActionButton from '../../components/buttons/bottombutton';
import LocationPickerModal from '../../components/modals/picklocation';
import { useStore } from '../../hooks';
import { addPost, addPostFailed, addPostSuccess } from '../../stores/post';
import PostAPI from '../../api/post';

const UpdateForm = ({
  navigation,
  route,
}: StackTabScreenProps<'UpdateForm'> | any) => {
  const {
    _id,
    address,
    city,
    donation,
    geoLocation,
    items,
    postcode,
    state,
    statusAvailability,
    type,
  } = route.params;

  const [globalState, dispatch] = useStore();
  const { app } = globalState;
  const { heightOffset } = useOffset();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    statusAvailability.startDateTime,
  );
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState<string>(
    statusAvailability.endDateTime,
  );
  const postAPI = new PostAPI(app.token);

  // form state
  const [selectedImage, setSelectedImage] = useState<string>(
    route.params.image,
  );
  const [donationName] = useState<string>(donation.name);
  const [description] = useState<string>(donation.description);
  const [addressLine] = useState<string>(address);
  const [addressPostcode] = useState<number>(postcode);
  const [addressCity] = useState<string>(city);
  const [addressState] = useState<string>(state);
  const [mobileNumber] = useState<string>(route.params.mobileNumber);

  // location coordinate
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>([
    geoLocation.latitude,
    geoLocation.longitude,
  ]);

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

  const donationConfig: any = [
    {
      key: 'Donation Name',
      placeholder: donationName,
      display: 'text',
    },
    {
      key: 'Description',
      placeholder: description,
      display: 'text',
    },
    {
      key: 'Start Date',
      placeholder: 'Please insert start date',
      method: (date: string) => handleConfirmStart(date),
      limit: 12,
      display: 'datePicker',
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
      display: 'datePicker',
      minimumDate: new Date(),
      maximumDate: new Date(2023, 11, 31),
      visible: isEndDatePickerVisible,
      toggleVisibility: () => showEndDatePicker(),
      hideVisibility: () => hideEndDatePicker(),
      value: selectedEndDate,
    },
  ];

  const addressConfig: any = [
    {
      key: 'Address',
      placeholder: addressLine,
      display: 'text',
    },
    {
      key: 'Postcode',
      placeholder: addressPostcode,
      display: 'text',
    },
    {
      key: 'City',
      placeholder: addressCity,
      display: 'text',
    },
    {
      key: 'State',
      placeholder: addressState,
      display: 'text',
    },
    {
      key: 'Contact No',
      placeholder: mobileNumber,
      display: 'text',
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

  const [foodItems, setFoodItems] = useState<IFoodItem[]>(items);
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

  async function onSubmit(params: IPost) {
    dispatch(addPost());
    try {
      const res: IPost = await postAPI.updatePostById(_id, params);
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
      type: type,
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
      <ArrowHeader nav={navigation} title="Update Post" disableBack={false} />
      <ScrollView style={[common.paddingHorizontalContainer]}>
        <KeyboardAvoidingView
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? heightOffset : 0}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Text
            style={[
              text.blackHeadingBold,
              common.paddingBottomM,
              common.paddingTopL,
            ]}>
            Information
          </Text>
          {donationConfig.map(
            ({ key, placeholder, display, ...options }: any) => {
              return (
                <View key={key} style={common.section}>
                  <Text style={text.greyBodyReg}>{key}</Text>
                  <Fragment>
                    {display === 'text' && (
                      <Text style={text.blackBodyHighlight}>{placeholder}</Text>
                    )}
                    {display === 'datePicker' && (
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
            },
          )}
          <Text
            style={[
              text.blackHeadingBold,
              common.paddingBottomM,
              common.paddingTopL,
            ]}>
            Location
          </Text>
          {addressConfig.map(({ key, placeholder, display }: any) => {
            return (
              <View key={key} style={common.section}>
                <Text style={text.greyBodyReg}>{key}</Text>
                {display === 'text' && (
                  <Text style={text.blackBodyHighlight}>{placeholder}</Text>
                )}
              </View>
            );
          })}
          {type === 'Donation' && (
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
              <View
                style={[common.flexRowSpaceBetween, common.centerVertically]}>
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
          )}
          {type === 'Request' && (
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
              <View
                style={[common.flexRowSpaceBetween, common.centerVertically]}>
                <TextInput
                  style={form.inputRow80}
                  value={name}
                  onChangeText={foodName => setName(foodName)}
                  placeholder="Name"
                />
                <Pressable onPress={handleAddItem} style={[]}>
                  <AddIcon />
                </Pressable>
              </View>
            </View>
          )}
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
        content={'Update Donation'}
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

export default UpdateForm;
