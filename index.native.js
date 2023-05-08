/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';
import './src/translations/i18n.config';

AppRegistry.registerComponent(appName, () => App);
