import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RowBottomAction from '../buttons/rowbutton';
import { common } from '../../styles';

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
    </Modal>
  );
};

export default LocationPickerModal;
