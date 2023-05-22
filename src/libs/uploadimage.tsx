/* eslint-disable no-console */
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

export const HandleImageUpload = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
        reject('Image selection cancelled');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
        reject('ImagePicker Error: ' + response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        console.log('SELECTED ASSETS:', selectedAsset);
        if (selectedAsset.uri) {
          RNFS.readFile(selectedAsset.uri, 'base64')
            .then(base64Image => {
              const imageType = selectedAsset.type;
              const base64ImageData = `data:${imageType};base64,${base64Image}`;
              resolve(base64ImageData);
            })
            .catch(error => {
              console.log('Failed to convert image to base64:', error);
              reject('Failed to convert image to base64: ' + error);
            });
        }
      }
    });
  });
};
