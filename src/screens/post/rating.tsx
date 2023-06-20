import React, { Fragment, useState } from 'react';
import Layout from '../../elements/layout';
import ArrowHeader from '../../components/headers/arrowheader';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { common, text, form, image } from '../../styles';
import { StackTabScreenProps } from '../../types/routes/main';
import { EmptyLoveLarge, FullLoveLarge } from '../../components/icon';
import ListReview from '../../components/lists/reviews';
import { useStore } from '../../hooks';
import { HandleImageUpload } from '../../libs/uploadimage';
import PrimaryButton from '../../components/buttons/primary';
import TextButton from '../../components/buttons/textbutton';
import PrimarySmallButton from '../../components/buttons/primarysmall';
import TextButtonDanger from '../../components/buttons/textbuttondanger';
import BottomActionButton from '../../components/buttons/bottombutton';
import { ISubmitRating } from '../../types/stores/rating';

const SubmitRating = ({
  navigation,
  route,
}: StackTabScreenProps<'SubmitRating'> | any) => {
  const [globalState, dispatch] = useStore();
  const { app } = globalState;
  const { id } = route.params;

  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleRating = (value: React.SetStateAction<number>) => {
    setRating(value);
  };

  const handleImageUpload = () =>
    HandleImageUpload()
      .then((base64ImageData: any) => {
        setSelectedImage(base64ImageData);
        setImageName('Uploaded_Image.png');
      })
      .catch(error => {
        // Handle any errors here
        // eslint-disable-next-line no-console
        console.log('Error:', error);
      });

  async function onSubmit(data: ISubmitRating) {}

  const handleSubmit = () => {
    const data = {
      userId: id,
      ratorUserId: app.profile._id,
      ratingValue: rating,
      image: selectedImage,
      feedback: feedback,
    };

    console.log('CHECK DATA: ', data);
  };

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader
        nav={navigation}
        title="Rating and Feedback"
        disableBack={false}
      />
      <ScrollView style={[common.paddingHorizontalContainer]}>
        <View style={[common.flexRow, common.center]}>
          {[1, 2, 3, 4, 5].map(index => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRating(index)}
              style={common.paddingSmall}>
              {index <= rating ? <FullLoveLarge /> : <EmptyLoveLarge />}
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[form.inputLarge]}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Give your feedback here"
          multiline={true}
          maxLength={255}
        />
        {selectedImage ? (
          <View style={[common.flexRow, common.paddingVerticalSmall]}>
            <Image
              source={{ uri: selectedImage }}
              style={[image.selectedImageRating]}
            />
            <View style={common.paddingHorizontalContainer}>
              <Text style={text.blackBodyHighlight}>{imageName}</Text>
              <TextButton caption="Change Image" onPress={handleImageUpload} />
              <TextButtonDanger
                caption="Reset Image"
                onPress={() => setSelectedImage('')}
              />
            </View>
          </View>
        ) : (
          <View style={common.centerVertically}>
            <PrimarySmallButton
              buttonText={'Upload Image'}
              nav={handleImageUpload}
              disable={false}
            />
          </View>
        )}
        <Text
          style={[
            text.blackHeadingBold,
            common.paddingBottomM,
            common.paddingTopL,
          ]}>
          Reviews
        </Text>
        <ListReview />
      </ScrollView>
      <BottomActionButton
        content={'Submit Rating'}
        onPress={handleSubmit}
        isInactive={rating === 0 ? true : false}
      />
    </Layout>
  );
};

export default SubmitRating;
