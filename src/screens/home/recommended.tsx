import React from 'react';
import Layout from '../../elements/layout';
import { common } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import { ScrollView, Text } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';

const Recommended = ({ navigation }: StackTabScreenProps<'Recommended'>) => {
  return (
    <Layout custom={common.basicLayout}>
      <ArrowHeader
        nav={navigation}
        title="Recommended Post"
        disableBack={false}
      />
      <ScrollView>
        <Text>Screen for Recommended donor</Text>
      </ScrollView>
    </Layout>
  );
};

export default Recommended;
