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
  Alert,
} from 'react-native';
// Import Map and Marker
import MapView, { Circle, Marker } from 'react-native-maps';
import { text } from '../../styles';
import Geolocation from '@react-native-community/geolocation';
import Feather from 'react-native-vector-icons/Feather';
import * as geolib from 'geolib';
import { useStore } from '../../hooks';
import {
  getPostByCoordinate,
  getPostByCoordinateFailed,
  getPostByCoordinateSuccess,
} from '../../stores/post';
import PostAPI from '../../api/post';
import {
  HomeTabParamList,
  HomeTabScreenProps,
  RootStackParamList,
} from '../../types/routes/main';

const HomeMain = ({ navigation }: HomeTabScreenProps<'Home'>) => {
  const mapRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  const [globalState, dispatch] = useStore();

  const { app } = globalState;
  const postAPI = new PostAPI(app.token);

  const [currentRegion, setCurrentRegion] = useState<any>(null);
  const [distance, setDistance] = useState<number>(5);
  const [dataOnMap, setDataOnMap] = useState<any[]>([]);

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

    const getCurrentLocation = async () => {
      Geolocation.getCurrentPosition(
        async info => {
          const loadSelectedMarker = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };

          setCurrentRegion(loadSelectedMarker);
          // console.log('READY TO CALL API: ', loadSelectedMarker);

          calculateDistance(
            loadSelectedMarker.latitudeDelta,
            loadSelectedMarker.longitudeDelta,
          );
        },
        errorLoc => {
          console.log('geolocation info error', errorLoc);
          setCurrentRegion(INITIAL_REGION);

          // console.log('CALL API USING INITIAL REGION: ', INITIAL_REGION);

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

  const handleRegionChangeComplete = (region: any) => {
    setCurrentRegion(region);
    calculateDistance(region.latitudeDelta, region.longitudeDelta);
    dragMapEnds();
  };

  async function dragMapEnds() {
    dispatch(getPostByCoordinate());
    try {
      const param = {
        centerLat: currentRegion.latitude,
        centerLong: currentRegion.longitude,
        distance: distance,
      };
      const res = await postAPI.getPostByCoordinate(param);
      setDataOnMap(res);
      dispatch(getPostByCoordinateSuccess());
    } catch (error) {
      Alert.alert('Oh uh!, Error to load location. Please try again');
      dispatch(getPostByCoordinateFailed());
    }
  }

  const [carouselOffset] = useState(new Animated.Value(0));

  const handleMarkerPress = (index: number) => {
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
    navigation.navigate('PostDetail', { ...location });
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
        {dataOnMap.length > 0 &&
          dataOnMap.map((location, index) => {
            const { geoLocation } = location;
            return (
              //add logic to check type is donation/request
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(geoLocation.latitude),
                  longitude: parseFloat(geoLocation.longitude),
                }}
                onPress={() => handleMarkerPress(index)}>
                <Feather name="user" size={20} />
              </Marker>
            );
          })}
      </MapView>
      {dataOnMap !== undefined && dataOnMap.length > 0 && (
        <Animated.View
          style={[
            styles.carouselContainer,
            { transform: [{ translateX: carouselOffset }] },
          ]}>
          {dataOnMap.map((location, index) => {
            const { donation } = location;
            return (
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
                  <Text style={[text.blackBodyHighlight]}>{donation.name}</Text>
                  <Text style={[text.blackBodyReg]}>
                    {donation.description}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </Animated.View>
      )}
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
