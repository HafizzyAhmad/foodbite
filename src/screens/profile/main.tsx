import React, { useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import { common } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import { Alert, ScrollView, Text, View } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import ProfileSection from '../../components/profile';
import { TabActive, TabInActive } from '../../components/tab';
import ImageTile from '../../components/images/tile';
import ListReview from '../../components/lists/reviews';
import RatingAPI from '../../api/rating';
import { useStore } from '../../hooks';
import { IPostRating, IRating } from '../../types/stores/rating';
import ProfileHeader from '../../components/headers/profileheader';

const ProfileMain = ({
  navigation,
}: StackTabScreenProps<'PostProfileDetail'>) => {
  const [isActive, setIsActive] = useState<string>('Posts');
  const [globalState, dispatch] = useStore();
  const [foodDonation, setFoodDonation] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [score, setScore] = useState<number>(0);
  const { app } = globalState;

  useEffect(() => {
    const rateAPI = new RatingAPI(app.token);
    async function getRatingProfile() {
      try {
        const res: IRating = await rateAPI.getRatingById(app.profile._id);
        if (res) {
          console.log('CHECK FOOD DONMATION: ', res.foodDonation);

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
  }, [app.profile?._id, app.token]);

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
      return <ImageTile donation={foodDonation} nav={navigation} />;
    if (isActive === 'Reviews') return <ListReview reviews={reviews} />;
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
