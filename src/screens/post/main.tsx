import React from 'react';
import { View, Text, Image } from 'react-native';
import type { HomeTabScreenProps } from '../../types/routes/main';
import common from '../../styles/common';
import { color, image, text } from '../../styles';
import Layout from '../../elements/layout';
import PostCard from '../../components/cards/post';
import IMAGE from '../../constants/image';

const PostMain = ({ navigation }: HomeTabScreenProps<'FoodBite'>) => {
  const post = [
    {
      icon: IMAGE.donationIcon,
      label: 'I Have Food to Donate',
      caption:
        'Submit a food donation post so that people know where to get from you',
      onNav: () => navigation.navigate('DonateForm'),
    },
    {
      icon: IMAGE.requestHelpIcon,
      label: 'I Need Food',
      caption:
        "Don't worry, Request help from people and someone might help you",
      onNav: () => navigation.navigate('RequestForm'),
    },
  ];
  return (
    <Layout custom={[common.basicLayout, common.paddingContainer]}>
      <Text style={[text.blackHeadlineBold, common.paddingTopL]}>
        Feel Free to <Text style={[color.fontBrand]}>Donate</Text> or even{' '}
        <Text style={[color.fontBrand]}>Request for Help</Text>
        {'.'}
      </Text>
      <Image
        source={IMAGE.mainPost}
        resizeMode="contain"
        style={[image.commonScreen, common.centerVertically]}
      />
      {post.map(item => (
        <View key={item.label}>
          <PostCard
            icon={item.icon}
            label={item.label}
            caption={item.caption}
            nav={item.onNav}
          />
        </View>
      ))}
    </Layout>
  );
};

export default PostMain;
