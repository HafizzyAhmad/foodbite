import React from 'react';
import Layout from '../../elements/layout';
import ArrowHeader from '../../components/headers/arrowheader';
import { common, image, text } from '../../styles';
import AnimatedLottieView from 'lottie-react-native';
import IMAGE from '../../constants/image';
import { Text, View } from 'react-native';
import BottomActionButton from '../../components/buttons/bottombutton';
import { StackTabScreenProps } from '../../types/routes/main';
import Formatter from '../../utils/formatter';

const Complete = ({
  navigation,
  route,
}: StackTabScreenProps<'Complete'> | any) => {
  const { type, donation, statusAvailability } = route.params;

  return (
    <>
      <Layout custom={common.basicLayout}>
        <ArrowHeader disableBack={true} />
        <View style={common.center}>
          <AnimatedLottieView
            source={IMAGE.successAnimation}
            autoPlay
            loop
            style={[image.animation]}
          />
        </View>
        <View
          style={[
            common.centerVertically,
            common.paddingTopL,
            common.paddingHorizontalContainer,
          ]}>
          <Text
            style={[text.blackScreenBrand, text.center, text.lineHeightLarge]}>
            {type === 'Donation'
              ? `Your donation for ${donation.name} has been submitted`
              : `Your request for ${donation.name} has been submitted`}
          </Text>
          <Text
            style={[
              text.blackBodyReg,
              text.center,
              text.lineHeightLarge,
              common.paddingVerticalMedium,
            ]}>
            {`Donation will be available from\n${Formatter.dateTime(
              statusAvailability.startDateTime,
            )} to ${Formatter.dateTime(statusAvailability.endDateTime)}`}
          </Text>
        </View>
      </Layout>
      <BottomActionButton
        content={'Back to Home'}
        onPress={() => navigation.navigate('Home')}
        isInactive={false}
      />
    </>
  );
};

export default Complete;
