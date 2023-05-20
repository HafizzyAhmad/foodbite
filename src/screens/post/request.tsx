import React from 'react';
import Layout from '../../elements/layout';
import { View } from 'react-native';
import { common } from '../../styles';
import { Text } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import ScreenHeader from '../../components/headers/screenheader';

const RequestForm = ({ navigation }: StackTabScreenProps<'RequestForm'>) => {
  return (
    <Layout custom={[common.basicLayout]}>
      <ScreenHeader nav={navigation} title="Request Help Form" />
      <View>
        <Text>Form for Request</Text>
      </View>
    </Layout>
  );
};

export default RequestForm;
