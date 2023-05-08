//@ts-nocheck
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Settings} from '../screens';
import {CustomTabBar} from '../components';

import {Header} from '../components';
import {CutomTabBarProps, MainStackParamList} from '../types/navigation';
import {withErrorHandling} from '../hocs';
import {useTranslation} from 'react-i18next';

const HomeWithErrorHandling = withErrorHandling(Home);

const Tab = createBottomTabNavigator<MainStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const AppRoutes = () => {
  const {t} = useTranslation('translation');
  const renderTabBar = (props: JSX.IntrinsicAttributes & CutomTabBarProps) => (
    <CustomTabBar {...props} />
  );
  const renderHomeScreenHeader = (title: string) => <Header title={title} />;
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          header: () => renderHomeScreenHeader(t('APP.TITLE')),
        })}
        tabBar={renderTabBar}>
        <Tab.Screen
          options={{tabBarLabel: t('APP.HOME_TAB')}}
          name="Home"
          component={HomeWithErrorHandling}
        />
        <Tab.Screen
          options={{tabBarLabel: t('APP.SETTINGS_TAB')}}
          name="settings"
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
