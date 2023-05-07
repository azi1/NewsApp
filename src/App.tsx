import 'react-native-gesture-handler';
import React from 'react';
import AppRoutes from './routes';
import {Layout} from './components';
import {store} from './redux/store';
import {Provider} from 'react-redux';

export const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <AppRoutes />
      </Layout>
    </Provider>
  );
};

export default App;
