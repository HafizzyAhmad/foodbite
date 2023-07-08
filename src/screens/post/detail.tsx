/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import { button, common, image, modal, signage, text } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import BottomActionButton from '../../components/buttons/bottombutton';
import Formatter from '../../utils/formatter';
import BasicList from '../../components/lists/basic';
import { IFoodItem, IPost } from '../../types/stores/donate';
import {
  CircleBackground,
  Close,
  EmptyLove,
  FullLove,
  HalfLove,
  UserIcon,
} from '../../components/icon';
import RatingAPI from '../../api/rating';
import { useStore } from '../../hooks';
import { IPostRating } from '../../types/stores/rating';
import TextButton from '../../components/buttons/textbutton';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import PostAPI from '../../api/post';
import ConfirmationModal from '../../components/modals/confirmation';

const PostDetail = ({
  navigation,
  route,
}: StackTabScreenProps<'PostDetail'> | any) => {
  const { _id, createdById } = route.params;

  const [globalState] = useStore();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [post, setPost] = useState<IPost | any>();
  const [rating, setRating] = useState<any>();

  console.log('VIEW POST DETAIL: ', post);

  const bannerImage = post?.image || '';
  const { name, description } = post?.donation || {};
  const { latitude, longitude } = post?.geoLocation || {};
  const { startDateTime, endDateTime } = post?.statusAvailability || {};
  const { app } = globalState;

  const ratingAPI = new RatingAPI(app.token);
  const postAPI = new PostAPI(app.token);

  const [modalVisible, setModalVisible] = useState(false);
  const zoomAnimatedValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    async function getInformation() {
      setIsLoading(true);
      try {
        const [getPost, getRating]: [IPost, IPostRating] = await Promise.all([
          postAPI.getPostById(_id),
          ratingAPI.getRatingByPost(
            createdById.id ? createdById.id : createdById,
          ),
        ]);

        if (getPost) {
          setPost(getPost);
        }

        if (getRating) {
          setRating(getRating);
        }
      } catch (error) {
        Alert.alert('Oh uh! Some of the information could not loaded');
      } finally {
        setIsLoading(false);
      }
    }

    if (app.token) {
      getInformation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, app.token, createdById]);

  const renderRating = () => {
    const score = rating?.ratingScore;
    const totalRating = 5;
    const fullRating = Math.floor(score);
    const hasHalfRating = score - fullRating >= 0.5;

    const love = Array(totalRating)
      .fill(null)
      .map((_, index) => {
        if (index < fullRating) {
          return <FullLove key={`love-${index}`} />;
        } else if (index === fullRating && hasHalfRating) {
          return <HalfLove key="love-half" />;
        } else {
          <EmptyLove key={`love-empty-${index}`} />;
        }
      });
    return love;
  };

  const viewDetails = () => {
    navigation.navigate('SubmitRating', {
      id: createdById.id ? createdById.id : createdById,
    });
  };

  const handleButton = () => {
    const url = `https://maps.google.com/maps?q=${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log('Maps app is not available.');
        }
      })
      .catch(error =>
        console.log('An error occurred while opening the maps app:', error),
      );
  };

  const today = new Date().toISOString();

  const [showModalDeletePost, setShowModalDeletePost] = useState(false);

  const deletePost = async () => {
    setShowModalDeletePost(false);
    try {
      const res = await postAPI.deletePostById(_id);
      if (res) {
        navigation.goBack();
        Alert.alert('Success', 'Your registration has been completed', [
          { text: 'Bring me to Login', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert('Oh uh! Something went wrong', error as string);
    }
  };

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader nav={navigation} title={name} disableBack={false} />
      <ScrollView style={[common.paddingHorizontalContainer]}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Pressable onPress={handlePress}>
              <Image
                source={{ uri: bannerImage }}
                style={[image.selectedThumbnail]}
              />
            </Pressable>
            <View style={common.paddingVerticalMedium}>
              <Text style={text.blackHeadingBold}>{description}</Text>
              <View style={common.paddingVerticalMedium}>
                <Text style={text.greyBodyReg}>THE LOCATION</Text>
                <Text
                  style={[
                    text.blackBodyHighlight,
                    text.lineHeightL,
                  ]}>{`${post?.address},`}</Text>
                <Text
                  style={[
                    text.blackBodyReg,
                    text.lineHeightL,
                  ]}>{`${post?.postcode}, ${post?.city}, ${post?.state}`}</Text>
                <Text
                  style={[
                    text.blackBodyHighlight,
                    text.lineHeightL,
                  ]}>{`${post?.mobileNumber}`}</Text>
              </View>
              <View style={signage.postStatus}>
                {startDateTime > today && endDateTime > today ? (
                  <Text style={[text.yellowLabelText]}>Upcoming</Text>
                ) : startDateTime < today && endDateTime > today ? (
                  <Text style={[text.greenLabelText]}>Ongoing</Text>
                ) : (
                  startDateTime < today &&
                  endDateTime < today && (
                    <Text style={text.redLabelText}>Expired</Text>
                  )
                )}
              </View>
              {post && (
                <Text
                  style={[
                    text.blackBodyReg,
                    text.lineHeightL,
                  ]}>{`Available from ${Formatter?.dateTime(
                  startDateTime,
                )} to ${Formatter?.dateTime(endDateTime)}`}</Text>
              )}
              <View style={common.paddingVerticalMedium}>
                <Text style={text.greyBodyReg}>{`${
                  post?.type === 'Donation' ? 'DONATION' : 'REQUEST'
                } ITEM`}</Text>
                {post?.items.map((item: IFoodItem) => (
                  <BasicList
                    key={item.id}
                    param={item.name}
                    value={item.price}
                    type={post?.type}
                  />
                ))}
              </View>
              <View style={common.paddingVerticalMedium}>
                <Text style={text.greyBodyReg}>POSTED BY</Text>
                <View
                  style={[
                    common.paddingVerticalSmall,
                    common.flexRowSpaceBetween,
                  ]}>
                  <View style={[common.flexRow, common.centerVertically]}>
                    <CircleBackground>
                      <UserIcon />
                    </CircleBackground>
                    <View style={common.paddingHorizontalContainer}>
                      <Text
                        style={[
                          text.blackBodyHighlight,
                          text.lineHeightL,
                          common.paddingRightXSmall,
                        ]}>{`${post?.createdByUserName}`}</Text>
                      <Text
                        style={[
                          text.greyLabelText,
                        ]}>{`Rating: ${rating?.ratingScore.toFixed(2)}`}</Text>
                      <View style={common.flexRow}>{renderRating()}</View>
                    </View>
                  </View>
                  <TextButton caption="View Feedback" onPress={viewDetails} />
                </View>
              </View>
            </View>
            {post?.createdById === app.profile._id && (
              <View style={common.centerVertically}>
                <Pressable
                  onPress={() => navigation.navigate('UpdateForm', post)}
                  style={button.primarySmall}>
                  <Text style={text.whiteButton}>{`Update Post`}</Text>
                </Pressable>
                <Text
                  onPress={() => setShowModalDeletePost(true)}
                  style={button.footerWithoutBorder}>{`Delete Post`}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
      <BottomActionButton
        content={'Show Me The Way'}
        onPress={handleButton}
        isInactive={false}
      />
      <Modal
        visible={modalVisible}
        // transparent={true}
        onRequestClose={handleClose}>
        {/* <View style={{ flex: 1, backgroundColor: 'black' }}> */}
        <ReactNativeZoomableView
          maxZoom={30}
          initialZoom={1}
          // Give these to the zoomable view so it can apply the boundaries around the actual content.
          // Need to make sure the content is actually centered and the width and height are
          // measured when it's rendered naturally. Not the intrinsic sizes.
          // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
          // Therefore, we'll feed the zoomable view the 300x100 size.
          contentWidth={300}
          contentHeight={300}
          panBoundaryPadding={50}
          zoomAnimatedValue={zoomAnimatedValue}>
          <Image style={image.fullImage} source={{ uri: bannerImage }} />
        </ReactNativeZoomableView>
        <Pressable style={modal.modalClose} onPress={handleClose}>
          <CircleBackground>
            <Close />
          </CircleBackground>
        </Pressable>
        {/* </View> */}
      </Modal>
      <ConfirmationModal
        setModalVisible={setShowModalDeletePost}
        modalVisible={showModalDeletePost}
        title="Delete Post?"
        caption="Are you sure you want to delete this post"
        buttonCaption="Yes Proceed"
        buttonAction={deletePost}
      />
    </Layout>
  );
};

export default PostDetail;
