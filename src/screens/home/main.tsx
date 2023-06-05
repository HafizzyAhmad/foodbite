// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect, useRef, useState } from 'react';
// Import required components
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';
// Import Map and Marker
import MapView, { Circle, Marker } from 'react-native-maps';
import { text } from '../../styles';
import Geolocation from '@react-native-community/geolocation';
import Feather from 'react-native-vector-icons/Feather';
import * as geolib from 'geolib';

const HomeMain = () => {
  const mapRef = useRef(null);
  const { width, height } = Dimensions.get('window');

  const [currentRegion, setCurrentRegion] = useState<any>(null);
  const [distance, setDistance] = useState<number>(0);

  const INITIAL_REGION = {
    latitude: 3.1161,
    longitude: 101.665742,
    latitudeDelta: 0.006,
    longitudeDelta: 0.003,
  };

  const LATITUDE_DELTA = 0.006;
  const LONGITUDE_DELTA = 0.003;

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Enable access location.',
          message: 'foodbite needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        async info => {
          const loadSelectedMarker = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };

          setCurrentRegion(loadSelectedMarker);
          console.log('READY TO CALL API: ', loadSelectedMarker);

          calculateDistance(
            loadSelectedMarker.latitudeDelta,
            loadSelectedMarker.longitudeDelta,
          );
        },
        errorLoc => {
          console.log('geolocation info error', errorLoc);
          setCurrentRegion(INITIAL_REGION);

          console.log('CALL API USING INITIAL REGION: ', INITIAL_REGION);

          calculateDistance(
            INITIAL_REGION.latitudeDelta,
            INITIAL_REGION.longitudeDelta,
          );
        },
        { enableHighAccuracy: false, timeout: 3000, maximumAge: 10000 },
      );
    };

    getCurrentLocation();
  }, []);

  const calculateDistance = (latitudeDelta, longitudeDelta) => {
    const screenDiagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const distancePerPixel = geolib.getDistance(
      { latitude: 0, longitude: 0 },
      { latitude: latitudeDelta, longitude: longitudeDelta },
    );

    const distance = (screenDiagonal * (distancePerPixel / width)) / 1000;
    setDistance(distance);
  };

  const handleRegionChangeComplete = region => {
    setCurrentRegion(region);
    calculateDistance(region.latitudeDelta, region.longitudeDelta);
  };

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

  console.log('CURRENT LOCATION: ', currentRegion);
  console.log('MAP DISTANCE: ', distance);

  const handleSelectLocation = location => {
    console.log('GO TO SCREEN DONATION/REQUEST INFO', location);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // onRegionChange={handleRegionChange}
        initialRegion={INITIAL_REGION}
        region={currentRegion}
        showsUserLocation
        onRegionChangeComplete={region => {
          if (currentRegion !== region) {
            setCurrentRegion(region);
          }
          handleRegionChangeComplete(region);
        }}>
        {currentRegion && (
          <Circle
            center={currentRegion}
            radius={1000}
            // fillColor="red"
            strokeColor="transparent"
            // strokeWidth={2}
          />
        )}
        {locations.map((location, index) => (
          //add logic to check type is donation/request
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => handleMarkerPress(index)}>
            <Feather name="user" size={20} />
          </Marker>
        ))}
      </MapView>
      <Animated.View
        style={[
          styles.carouselContainer,
          { transform: [{ translateX: carouselOffset }] },
        ]}>
        {locations.map((location, index) => (
          <View key={index} style={carouselItemStyle.carouselItem}>
            <Pressable
              onPress={() => handleSelectLocation(location)}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: '90%',
                height: 100,
                padding: 15,
              }}>
              <Text style={[text.blackBodyHighlight]}>{location.name}</Text>
            </Pressable>
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
    // backgroundColor: '#20DD20',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
