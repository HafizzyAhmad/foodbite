import React, { useState } from 'react';
import Layout from '../../elements/layout';
import ArrowHeader from '../../components/headers/arrowheader';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { common, text, form } from '../../styles';
import { StackTabScreenProps } from '../../types/routes/main';
import { EmptyLoveLarge, FullLoveLarge } from '../../components/icon';
import ListReview from '../../components/lists/reviews';

const SubmitRating = ({ navigation }: StackTabScreenProps<'SubmitRating'>) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const handleRating = (value: React.SetStateAction<number>) => {
    setRating(value);
  };
  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader
        nav={navigation}
        title="Rating and Feedback"
        disableBack={false}
      />
      <ScrollView style={[common.paddingHorizontalContainer]}>
        <View style={[common.flexRow, common.center]}>
          {[1, 2, 3, 4, 5].map(index => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRating(index)}
              style={common.paddingSmall}>
              {index <= rating ? <FullLoveLarge /> : <EmptyLoveLarge />}
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[form.inputLarge]}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Give your feedback here"
          multiline={true}
          maxLength={255}
        />
        <Text
          style={[
            text.blackHeadingBold,
            common.paddingBottomM,
            common.paddingTopL,
          ]}>
          Reviews
        </Text>
        <ListReview />
      </ScrollView>
    </Layout>
  );
};

export default SubmitRating;
