// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect, useState } from 'react';
// Import required components
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// Import Map and Marker
import MapView, { Circle, Marker } from 'react-native-maps';
import { text } from '../../styles';

const HomeMain = () => {
  const { width } = Dimensions.get('window');
  const locations = [
    {
      name: 'Location A',
      latitude: 3.1760404191846865,
      longitude: 101.72078233752916,
    },
    {
      name: 'Location B',
      latitude: 3.164549576339871,
      longitude: 101.71523119718769,
    },
  ];

  // const [region, setRegion] = useState({
  //   latitude: locations[0].latitude,
  //   longitude: locations[0].longitude,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  const [carouselOffset] = useState(new Animated.Value(0));

  const handleMarkerPress = index => {
    Animated.timing(carouselOffset, {
      toValue: -index * width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const carouselItemStyle = StyleSheet.create({
    carouselItem: {
      width: width, // Pass the width dynamically
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
  });

  useEffect(() => {
    carouselOffset.setValue(0);
  }, [carouselOffset]);

  const [currentLocation, setCurrentLocation] = useState<any>({
    latitude: 3.172157809479211,
    longitude: 101.72122372314334,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }); //Please enhance to use user's location on init
  const handleRegionChange = (region: { latitude: any; longitude: any }) => {
    const { latitude, longitude } = region;
    setCurrentLocation({ latitude, longitude });
  };

  console.log('CURRENT LOCATION: ', currentLocation);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onRegionChange={handleRegionChange}>
        {currentLocation && (
          <Circle
            center={currentLocation}
            radius={1000}
            // fillColor="red"
            // strokeColor="black"
            // strokeWidth={2}
          />
        )}
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => handleMarkerPress(index)}
          />
        ))}
      </MapView>
      <Animated.View
        style={[
          styles.carouselContainer,
          { transform: [{ translateX: carouselOffset }] },
        ]}>
        {locations.map((location, index) => (
          <View key={index} style={carouselItemStyle.carouselItem}>
            <Text style={text.whiteBodyHighlight}>{location.name}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselContainer: {
    // width: '90%',
    backgroundColor: '#20DD20',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
