/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import appName from './app.json';
import iconFont from 'react-native-vector-icons/Fonts/Feather.ttf';
import './translations/i18n.config';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Feather;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
