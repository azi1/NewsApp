/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import appName from './src/app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
