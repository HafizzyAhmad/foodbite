import React, { useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import { common } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import RecommendedDonor from '../../components/lists/recommended';
import RatingAPI from '../../api/rating';
import { useStore } from '../../hooks';
import { IRecommendedRating } from '../../types/stores/rating';

const Recommended = ({ navigation }: StackTabScreenProps<'Recommended'>) => {
  const [globalState] = useStore();
  const { app } = globalState;

  const [recommended, setRecommended] = useState<IRecommendedRating[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ratingAPI = new RatingAPI(app.token);

  async function getRecommendedRating() {
    setIsLoading(true);
    try {
      const res: any = await ratingAPI.getRecommendedRating();

      const removeNoRating = res.filter(
        ({ ratingScore }: any) => ratingScore > 0,
      );
      const removeNoDonation = removeNoRating.filter(
        ({ foodDonation }: any) => foodDonation.length > 0,
      );

      if (res) {
        setRecommended(removeNoDonation);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert('Oh uh! Something went wrong. Please try again later');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (app.token) {
      getRecommendedRating();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.token]);

  return (
    <Layout custom={common.basicLayout}>
      <ArrowHeader nav={navigation} title="Recommended" disableBack={false} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={recommended}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          renderItem={recommended => (
            <RecommendedDonor data={recommended} nav={navigation} />
          )}
          refreshing={isLoading}
          onRefresh={() => getRecommendedRating()}
        />
      )}
    </Layout>
  );
};

export default Recommended;
