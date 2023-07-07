import React, { useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import { common } from '../../styles';
import { Alert, ScrollView, View } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import { TabActive, TabInActive } from '../../components/tab';
import ImageTile from '../../components/images/tile';
import ListReview from '../../components/lists/reviews';
import RatingAPI from '../../api/rating';
import { useStore } from '../../hooks';
import { IRating } from '../../types/stores/rating';
import ProfileHeader from '../../components/headers/profileheader';
import EmptySection from '../../components/emptysection';
import { useIsFocused } from '@react-navigation/native';

const ProfileMain = ({
  navigation,
}: StackTabScreenProps<'PostProfileDetail'> | any) => {
  const [isActive, setIsActive] = useState<string>('Posts');
  const [globalState] = useStore();
  const [foodDonation, setFoodDonation] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [score, setScore] = useState<number>(0);
  const { app } = globalState;
  const isFocused = useIsFocused();

  useEffect(() => {
    const rateAPI = new RatingAPI(app.token);
    async function getRatingProfile() {
      try {
        const res: IRating = await rateAPI.getRatingById(app.profile._id);
        if (res) {
          setFoodDonation(res.foodDonation);
          setReviews(res.reviews);
          setScore(res.ratingScore);
        }
      } catch (error) {
        Alert.alert('Oh uh! Some of the information could not loaded');
      }
    }
    if (app.token) {
      getRatingProfile();
    }
  }, [app.profile._id, app.token, isFocused]);

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
    <Layout custom={[common.basicLayout]}>
      <ScrollView>
        <ProfileHeader profile={app.profile} score={score} nav={navigation} />
        {/* <ProfileSection /> */}
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
        {determineTab()}
      </ScrollView>
    </Layout>
  );
};

export default ProfileMain;
