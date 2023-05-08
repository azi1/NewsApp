import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import AppRoutes from './routes';
import {Layout} from './components';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {ENGLISH} from './constants';
import {newsSlice} from './redux/slices/news';

export const App = () => {
  const {i18n} = useTranslation('translation');
  useEffect(() => {
    (async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('language');
        const lang = selectedLanguage ? selectedLanguage : ENGLISH;
        i18n.changeLanguage(lang);
        store.dispatch(newsSlice.actions.setSelectedLanguage(lang));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <AppRoutes />
      </Layout>
    </Provider>
  );
};

export default App;
