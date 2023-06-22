import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { card, common, image } from '../../styles';
import ImageLabel from '../labels/image';
import TitleDescription from '../cards/titledescription';
import EmptySection from '../emptysection';
import Formatter from '../../utils/formatter';

const ImageTile = ({ donation }: any) => {
  return donation ? (
    <View style={[card.tileContainer, common.paddingContainer]}>
      {donation.map(item => (
        <TouchableOpacity
          key={item._id}
          onPress={() => {
            console.log('View Donation');
          }}
          style={card.tileCard}>
          <View style={common.contentCenter}>
            <Image
              source={{
                uri: item?.image,
              }}
              style={image.tile}
            />
            <ImageLabel type={item.type} />
          </View>
          <TitleDescription
            title={item.donation?.name}
            description={item.donation?.description}
            createdDate={Formatter.dateTime(item.updated_at)}
          />
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    <EmptySection caption="You do not have any post yet" />
  );
};

export default ImageTile;
