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

const ProfileMain = ({
  navigation,
}: StackTabScreenProps<'PostProfileDetail'>) => {
  const [isActive, setIsActive] = useState<string>('Posts');
  const [globalState, dispatch] = useStore();
  const [foodDonation, setFoodDonation] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const { app } = globalState;

  useEffect(() => {
    const rateAPI = new RatingAPI(app.token);
    async function getRatingProfile() {
      try {
        const res: IRating = await rateAPI.getRatingById(app.profile._id);
        if (res) {
          setFoodDonation(res.foodDonation);
          setReviews(res.reviews);
        }
      } catch (error) {
        Alert.alert('Oh uh! Some of the information could not loaded');
      }
    }
    if (app.token) {
      getRatingProfile();
    }
  }, [app.profile._id, app.token]);

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
    if (isActive === 'Posts') return <ImageTile donation={foodDonation} />;
    if (isActive === 'Reviews') return <ListReview reviews={reviews} />;
  };

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader
        nav={navigation}
        title="Donation Profile"
        disableBack={false}
      />
      <ScrollView style={[common.paddingHorizontalContainer]}>
        <ProfileSection />
        <View style={common.flexRow}>
          {tab.map(item =>
            isActive === item.name ? (
              <TabActive
                caption={item.name}
                action={() => setIsActive(item.name)}
              />
            ) : (
              <TabInActive
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
