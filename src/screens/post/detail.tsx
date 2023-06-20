import React, { useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import { color, common, image, text } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import BottomActionButton from '../../components/buttons/bottombutton';
import Formatter from '../../utils/formatter';
import Basic from '../../components/lists/basic';
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
import { IPostRating, IRating } from '../../types/stores/rating';
import TextButton from '../../components/buttons/textbutton';

const PostDetail = ({
  navigation,
  route,
}: StackTabScreenProps<'PostDetail'> | any) => {
  const {
    donation,
    type,
    address,
    postcode,
    city,
    state,
    mobileNumber,
    statusAvailability,
    items,
    geoLocation,
    createdById,
  } = route.params;
  const bannerImage = route.params?.image;
  const [globalState, dispatch] = useStore();
  const [rating, setRating] = useState<any>(null);

  const { latitude, longitude } = geoLocation;
  const { startDateTime, endDateTime } = statusAvailability;
  const { app } = globalState;

  useEffect(() => {
    const ratingAPI = new RatingAPI(app.token);
    async function viewPostedDetail() {
      try {
        const res: IPostRating = await ratingAPI.getRatingByPost(
          createdById.id,
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
  }, [app.token, createdById.id]);

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
    navigation.navigate('SubmitRating', createdById);
  };

  const handleButton = () => {
    console.log('SHOW ME THE WAY', latitude, longitude);
  };

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
          <Text
            style={[
              text.blackBodyReg,
              text.lineHeightL,
            ]}>{`Available from ${startDateTime} to ${endDateTime}`}</Text>
          <View style={common.paddingVerticalMedium}>
            <Text style={text.greyBodyReg}>DONATION ITEM</Text>
            {items.map((item: IFoodItem) => (
              <BasicList key={item.id} param={item.name} value={item.price} />
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
                    ]}>{`${createdById.username}`}</Text>
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
