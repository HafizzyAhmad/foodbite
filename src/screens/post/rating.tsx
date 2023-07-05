import React, { useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import ArrowHeader from '../../components/headers/arrowheader';
import {
  Alert,
  Image,
  RefreshControl,
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
import TextButton from '../../components/buttons/textbutton';
import PrimarySmallButton from '../../components/buttons/primarysmall';
import TextButtonDanger from '../../components/buttons/textbuttondanger';
import BottomActionButton from '../../components/buttons/bottombutton';
import { IPostRating, ISubmitRating } from '../../types/stores/rating';
import {
  addRating,
  addRatingFailed,
  addRatingSuccess,
  getDonationRating,
  getDonationRatingFailed,
  getDonationRatingSuccess,
} from '../../stores/rate';
import RatingAPI from '../../api/rating';
import EmptySection from '../../components/emptysection';

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
  const [reviews, setReviews] = useState<any>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    async function onGetReviews() {
      const rateAPI = new RatingAPI(app.token);
      dispatch(getDonationRating());
      try {
        const res: IPostRating = await rateAPI.getRatingByPost(id);
        if (res) {
          dispatch(getDonationRatingSuccess());
          setRefreshing(false);
          setReviews(res.reviews);
        }
      } catch (error) {
        Alert.alert('Oh uh! We cannot retrieve all the reviews');
        dispatch(getDonationRatingFailed());
        setRefreshing(false);
      }
    }

    if (app.token) {
      onGetReviews();
    }
  }, [app.token, dispatch, id, isRefreshing]);

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

  async function onSubmit(data: ISubmitRating) {
    const rateAPI = new RatingAPI(app.token);
    setRefreshing(true);
    dispatch(addRating());
    try {
      const res: ISubmitRating = await rateAPI.submitRating(data);
      if (res) {
        dispatch(addRatingSuccess());
        setRefreshing(false);
        Alert.alert('Success! Thank you for your feedbacks');
        setRating(0);
        setFeedback('');
      }
    } catch (error) {
      dispatch(addRatingFailed());
      setRefreshing(false);
      Alert.alert('Oh uh! Something went wrong. Please try again later.');
    }
  }

  const handleSubmit = () => {
    const data = {
      userId: id,
      ratorUserId: app.profile._id,
      raterUserName: app.profile.username,
      ratingValue: rating,
      image: selectedImage,
      feedback: feedback,
    };
    onSubmit(data);
  };

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader
        nav={navigation}
        title="Rating and Feedback"
        disableBack={false}
      />
      <ScrollView
        style={[common.paddingHorizontalContainer]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }>
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
        {reviews.length === 0 ? (
          <EmptySection caption="This post do not have enough feedbacks" />
        ) : (
          <ListReview reviews={reviews} />
        )}
      </ScrollView>
      <BottomActionButton
        content={'Submit Rating'}
        onPress={handleSubmit}
        isInactive={rating === 0 || feedback === '' ? true : false}
      />
    </Layout>
  );
};

export default SubmitRating;
