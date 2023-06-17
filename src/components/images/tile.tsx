import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';

const ImageTile = () => {
  return (
    <TouchableOpacity
      // key={item.merchantId}
      onPress={() => {
        console.log('View Donation');
      }}
      style={{
        height: 240,
        width: '50%',
        marginBottom: 5,
        // paddingLeft: 5,
      }}>
      <View>
        <Image
          source={{
            uri: 'https://unifi.com.my/sites/default/files/page/assets/images/myunifi/main-banner-1000x815/product-banner-UNI5G-1000x815.jpg',
          }}
          style={{
            width: '95%',
            height: 120,
            borderRadius: 8,
            margin: 5,
            marginBottom: 8,
          }}
        />
        <View style={{ padding: 8 }}>
          <Text numberOfLines={2}>{`Here is title`}</Text>
          <View>
            <Text numberOfLines={3} style={{ paddingTop: 5 }}>
              {'Here the description'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ImageTile;
