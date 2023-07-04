import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RowBottomAction from '../buttons/rowbutton';
import { common, form } from '../../styles';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import CONFIG from '../../../config';

type IPropsLocationPickerModal = {
  visible: boolean;
  onClose: () => void;
  onLocationSelect?: any;
};

const LocationPickerModal = ({
  visible,
  onClose,
  onLocationSelect,
}: IPropsLocationPickerModal) => {
  const [currentRegion, setCurrentRegion] = useState<any>(null);
  const [selectedCoordinate, setSelectedCoordinate] = useState<any>(null);

  const INITIAL_REGION = {
    latitude: 3.1161,
    longitude: 101.665742,
    latitudeDelta: 0.006,
    longitudeDelta: 0.003,
  };

  useEffect(() => {
    if (visible) {
      Geolocation.getCurrentPosition(
        info => {
          const { latitude, longitude } = info.coords;
          setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setSelectedCoordinate({ latitude, longitude });
        },
        error => {
          // eslint-disable-next-line no-console
          console.log('Error getting current position:', error);
        },
        { enableHighAccuracy: false, timeout: 5000 },
      );
    }
  }, [visible]);

  const handleMapPress = (event: { nativeEvent: { coordinate: any } }) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoordinate(coordinate);
  };

  const handleLocationSelect = () => {
    if (selectedCoordinate) {
      onLocationSelect(selectedCoordinate);
      setSelectedCoordinate(null);
    }
  };

  const handleSearch = async (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => {
    const LATITUDE_DELTA = 0.006;
    const LONGITUDE_DELTA = 0.003;
    const regionSearch = {
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setCurrentRegion(regionSearch);
    // calculateDistance(LATITUDE_DELTA, LONGITUDE_DELTA);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <MapView
        showsUserLocation
        initialRegion={INITIAL_REGION}
        style={common.flex1}
        onPress={handleMapPress}
        region={currentRegion}>
        {selectedCoordinate && (
          <Marker
            coordinate={{
              latitude: selectedCoordinate.latitude,
              longitude: selectedCoordinate.longitude,
            }}
          />
        )}
      </MapView>
      <RowBottomAction
        textPrimary={`Select Location`}
        textSecondary={`Cancel`}
        navPrimary={handleLocationSelect}
        navSecondary={onClose}
      />
      <View style={form.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Type a place"
          onPress={(data, details = null) => handleSearch(data, details)}
          query={{ key: CONFIG.GOOGLE_PLACES_API_KEY }}
          fetchDetails={true}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
        />
      </View>
    </Modal>
  );
};

export default LocationPickerModal;
