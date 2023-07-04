import React, { useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import { common, image, signage, text } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import { Alert, Image, Linking, ScrollView, Text, View } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import BottomActionButton from '../../components/buttons/bottombutton';
import Formatter from '../../utils/formatter';
import BasicList from '../../components/lists/basic';
import { IFoodItem } from '../../types/stores/donate';
import {
  CircleBackground,
  EmptyLove,
  FullLove,
  HalfLove,
  UserIcon,
} from '../../components/icon';
import RatingAPI from '../../api/rating';
import { useStore } from '../../hooks';
import { IPostRating } from '../../types/stores/rating';
import TextButton from '../../components/buttons/textbutton';

const PostDetail = ({
  navigation,
  route,
}: StackTabScreenProps<'PostDetail'> | any) => {
  const {
    type,
    donation,
    address,
    postcode,
    city,
    state,
    mobileNumber,
    statusAvailability,
    items,
    geoLocation,
    createdById,
    createdByUserName,
  } = route.params;

  const bannerImage = route.params?.image;
  const [globalState] = useStore();
  const [rating, setRating] = useState<any>(null);

  const { latitude, longitude } = geoLocation;
  const { startDateTime, endDateTime } = statusAvailability;
  const { app } = globalState;

  useEffect(() => {
    const ratingAPI = new RatingAPI(app.token);
    async function viewPostedDetail() {
      try {
        const res: IPostRating = await ratingAPI.getRatingByPost(
          createdById.id ? createdById.id : createdById,
        );
        if (res) {
          setRating(res);
        }
      } catch (error) {
        Alert.alert('Oh uh! Some of the information could not loaded');
      }
    }
    if (app.token) {
      viewPostedDetail();
    }
  }, [app.token, createdById, createdById.id]);

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

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader nav={navigation} title={donation.name} disableBack={false} />
      <ScrollView style={[common.paddingHorizontalContainer]}>
        <Image
          source={{ uri: bannerImage }}
          style={[image.selectedThumbnail]}
        />
        <View style={common.paddingVerticalMedium}>
          <Text style={text.blackHeadingBold}>{donation.description}</Text>
          <View style={common.paddingVerticalMedium}>
            <Text style={text.greyBodyReg}>THE LOCATION</Text>
            <Text
              style={[
                text.blackBodyHighlight,
                text.lineHeightL,
              ]}>{`${address},`}</Text>
            <Text
              style={[
                text.blackBodyReg,
                text.lineHeightL,
              ]}>{`${postcode}, ${city}, ${state}`}</Text>
            <Text
              style={[
                text.blackBodyHighlight,
                text.lineHeightL,
              ]}>{`${mobileNumber}`}</Text>
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
          <Text
            style={[
              text.blackBodyReg,
              text.lineHeightL,
            ]}>{`Available from ${Formatter.dateTime(
            startDateTime,
          )} to ${Formatter.dateTime(endDateTime)}`}</Text>
          <View style={common.paddingVerticalMedium}>
            <Text style={text.greyBodyReg}>{`${
              type === 'Donation' ? 'DONATION' : 'REQUEST'
            } ITEM`}</Text>
            {items.map((item: IFoodItem) => (
              <BasicList
                key={item.id}
                param={item.name}
                value={item.price}
                type={type}
              />
            ))}
          </View>
          <View style={common.paddingVerticalMedium}>
            <Text style={text.greyBodyReg}>POSTED BY</Text>
            <View
              style={[common.paddingVerticalSmall, common.flexRowSpaceBetween]}>
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
                    ]}>{`${
                    createdByUserName
                      ? createdByUserName
                      : createdById.username
                      ? createdById.username
                      : createdById
                  }`}</Text>
                  <Text
                    style={[
                      text.greyLabelText,
                    ]}>{`Rating: ${rating?.ratingScore}`}</Text>
                  <View style={common.flexRow}>{renderRating()}</View>
                </View>
              </View>
              <TextButton caption="View Feedback" onPress={viewDetails} />
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomActionButton
        content={'Show Me The Way'}
        onPress={handleButton}
        isInactive={false}
      />
    </Layout>
  );
};

export default PostDetail;
