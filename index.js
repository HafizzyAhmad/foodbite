/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import 'react-native-gesture-handler'; // installation guide for reanimated carousell
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
