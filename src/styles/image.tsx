import { StyleSheet } from 'react-native';
import common from './common';
import color, { colors } from './color';

export default StyleSheet.create({
  logo: {
    height: '40%',
    width: '50%',
  },
  login: {
    height: '7%',
    width: '70%',
  },
  inventory: {
    width: 50,
    height: 90,
  },
  animation: {
    height: 300,
  },
  emptyImageContainer: {
    alignSelf: 'center',
    height: '50%',
    width: '50%',
    aspectRatio: 1,
    flex: 1,
    // resizeMode: 'stretch',
    alignItems: 'center',
  },
  selectedThumbnail: {
    width: '100%',
    height: 200,
  },
  selectedImageRating: {
    borderRadius: 8,
    borderColor: colors.baseGrey,
    borderWidth: 1,
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  imageRating: {
    borderRadius: 8,
    borderColor: colors.baseGrey,
    borderWidth: 1,
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  premiseType: {
    width: 30,
    height: 30,
    tintColor: '#292929',
  },
  emptyIcon: {
    height: '10%',
    width: '10%',
  },
  squareImage: {
    width: '100%',
    height: 350,
  },
  commonScreen: {
    width: '100%',
    height: '40%',
    // height: '100%',
  },
  profileBackground: {
    ...common.center,
    ...color.bgLightestGrey,
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  profileBackgroundLarge: {
    ...common.center,
    ...color.bgLightestGrey,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  tile: {
    width: '95%',
    height: 130,
    borderRadius: 8,
    margin: 5,
    marginBottom: 8,
  },

  profileHeader: {
    width: '100%',
    height: 250,
  },
  recommendedBanner: {
    width: '100%',
    height: 150,
  },
  mapMarkerIcon: {
    height: 40,
    width: 40,
  },
  badgeImage: {
    height: 60,
    width: 60,
  },
});
