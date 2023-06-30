// Integration of Google map in React Native using react-native-maps
// https://aboutreact.com/react-native-map-example/
// Import React
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { common, image } from '../../styles';
import Geolocation from '@react-native-community/geolocation';
import * as geolib from 'geolib';
import { useStore } from '../../hooks';
import {
  getPostByCoordinate,
  getPostByCoordinateFailed,
  getPostByCoordinateSuccess,
} from '../../stores/post';
import PostAPI from '../../api/post';
import { HomeTabScreenProps } from '../../types/routes/main';
import MapCard from '../../components/cards/map';
import IMAGE from '../../constants/image';
import LogoHeader from '../../components/headers/logoheader';

const HomeMain = ({ navigation }: HomeTabScreenProps<'Home'>) => {
  const mapRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  const [globalState, dispatch] = useStore();

  const { app } = globalState;
  const postAPI = new PostAPI(app.token);

  const [currentRegion, setCurrentRegion] = useState<any>(null);
  const [distanceState, setDistance] = useState<number>(5);
  const [dataOnMap, setDataOnMap] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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
          // eslint-disable-next-line no-console
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateDistance = (latitudeDelta: number, longitudeDelta: number) => {
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
    setIsLoading(true);

    try {
      const param = {
        centerLat: currentRegion.latitude,
        centerLong: currentRegion.longitude,
        distance: distanceState,
      };
      const res = await postAPI.getPostByCoordinate(param);
      if (res) {
        const dataMap = res.filter(
          ({ statusAvailability }) =>
            statusAvailability.endDateTime >= new Date().toISOString(),
        );
        setDataOnMap(dataMap);
        dispatch(getPostByCoordinateSuccess());
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert('Oh uh!, Error to load location. Please try again');
      dispatch(getPostByCoordinateFailed());
      setIsLoading(false);
    }
  }

  const [carouselOffset] = useState(new Animated.Value(0));

  const handleMarkerPress = (index: number) => {
    Animated.timing(carouselOffset, {
      toValue: -index * width,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSelectedIndex(index);
  };

  useEffect(() => {
    carouselOffset.setValue(0);
  }, [carouselOffset]);

  const handleSelectLocation = (location: any) => {
    navigation.navigate('PostDetail', { ...location });
  };

  return (
    <View style={common.flex1}>
      <LogoHeader nav={navigation} />
      <MapView
        ref={mapRef}
        style={common.flexCenter}
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
            const { geoLocation, type } = location;
            return (
              //add logic to check type is donation/request
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(geoLocation.latitude),
                  longitude: parseFloat(geoLocation.longitude),
                }}
                onPress={() => handleMarkerPress(index)}>
                {type === 'Donation' ? (
                  index === selectedIndex ? (
                    <Image
                      source={IMAGE.donationMapSelectedIcon}
                      style={image.mapMarkerIcon}
                    />
                  ) : (
                    <Image
                      source={IMAGE.donationMapIcon}
                      style={image.mapMarkerIcon}
                    />
                  )
                ) : index === selectedIndex ? (
                  <Image
                    source={IMAGE.requestMapSelectedIcon}
                    style={image.mapMarkerIcon}
                  />
                ) : (
                  <Image
                    source={IMAGE.requestMapIcon}
                    style={image.mapMarkerIcon}
                  />
                )}
              </Marker>
            );
          })}
      </MapView>
      {dataOnMap !== undefined && dataOnMap.length > 0 && (
        <Animated.View
          style={[
            common.carouselContainer,
            { transform: [{ translateX: carouselOffset }] },
          ]}>
          {dataOnMap.map((location, index) => {
            return (
              <MapCard
                data={location}
                key={index}
                nav={() => handleSelectLocation(location)}
                fetching={isLoading}
              />
            );
          })}
        </Animated.View>
      )}
    </View>
  );
};
export default HomeMain;
