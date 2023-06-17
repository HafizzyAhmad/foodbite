import React, { useState } from 'react';
import Layout from '../../elements/layout';
import { common } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import { ScrollView, Text, View } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import ProfileSection from '../../components/profile';
import { TabActive, TabInActive } from '../../components/tab';
import ImageTile from '../../components/images/tile';

const PostProfileDetail = ({
  navigation,
}: StackTabScreenProps<'PostProfileDetail'>) => {
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
    if (isActive === 'Posts') return <ImageTile />;
    if (isActive === 'Reviews') return <Text>Component Reviews</Text>;
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

export default PostProfileDetail;
