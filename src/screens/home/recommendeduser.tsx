import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { common, image, text } from '../../styles';
import { StackTabScreenProps } from '../../types/routes/main';
import Layout from '../../elements/layout';
import ArrowHeader from '../../components/headers/arrowheader';
import { RatingLoveLarge } from '../../utils/ratinglove';
import IMAGE from '../../constants/image';
import ImageTile from '../../components/images/tile';
import EmptySection from '../../components/emptysection';
import ListReview from '../../components/lists/reviews';
import { TabActive, TabInActive } from '../../components/tab';

const RecommendedUser = ({
  navigation,
  route,
}: StackTabScreenProps<'RecommendedUser'> | any) => {
  console.log('CHECK ROUTE PARAM: ', route.params);
  const { providerName, ratingScore, foodDonation, reviews } = route.params;

  const [isActive, setIsActive] = useState<string>('Posts');

  const tab = [
    {
      id: 1,
      name: 'Posts',
    },
    {
      id: 2,
      name: 'Reviews',
    },
  ];
  const determineTab = () => {
    if (isActive === 'Posts')
      return foodDonation.length > 0 ? (
        <ImageTile donation={foodDonation} nav={navigation} />
      ) : (
        <EmptySection caption="You do not have any post yet" />
      );
    if (isActive === 'Reviews')
      return reviews.length > 0 ? (
        <ListReview reviews={reviews} />
      ) : (
        <EmptySection caption="You do not enough feedback yet" />
      );
  };

  return (
    <Layout custom={common.basicLayout}>
      <ArrowHeader nav={navigation} disableBack={false} />

      <ImageBackground
        source={IMAGE.profileBackground}
        style={[image.recommendedBanner, common.center]}>
        <Text
          style={[
            text.blackScreenBrand,
            common.paddingVerticalSmall,
            text.alignSelfCenter,
          ]}>
          {providerName}
        </Text>
        <View style={[common.flexRow, common.center]}>
          {RatingLoveLarge(ratingScore)}
        </View>
        <Text style={[text.greyLabelText, text.alignSelfCenter]}>{`Rating: ${
          ratingScore === null
            ? 'Not enough rating to display'
            : ratingScore.toFixed(2)
        }`}</Text>
      </ImageBackground>
      <View style={[common.flexRow]}>
        {tab.map(item =>
          isActive === item.name ? (
            <TabActive
              key={item.id}
              caption={item.name}
              action={() => setIsActive(item.name)}
            />
          ) : (
            <TabInActive
              key={item.id}
              caption={item.name}
              action={() => setIsActive(item.name)}
            />
          ),
        )}
      </View>
      <ScrollView>{determineTab()}</ScrollView>
    </Layout>
  );
};

export default RecommendedUser;
