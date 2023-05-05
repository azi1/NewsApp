import 'react-native-gesture-handler';
import React from 'react';
import AppRoutes from './routes';
import {Layout} from './components';

export const App = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
