//@ts-nocheck
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Details, Settings} from '../screens';
import {CustomTabBar} from '../components';
import type {StackNavigationOptions} from '@react-navigation/stack';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Header} from '../components';

const homStackOptions: StackNavigationOptions = {
  headerShown: true,
};

const TabStackOptions: BottomTabNavigationOptions = {
  headerShown: false,
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const HomeStack = () => {
  const renderHomeScreenHeader = ({options}) => (
    <Header title={options.headerTitle} />
  );

  const renderDetailsScreenHeader = ({route, navigation}) => (
    <Header
      title={route.name}
      showBackButton
      onGoBack={() => navigation.navigate('Home')}
    />
  );

  return (
    <Stack.Navigator screenOptions={homStackOptions}>
      <Stack.Screen
        name="Home"
        options={{
          header: renderHomeScreenHeader,
          headerTitle: 'Dubbizle News',
        }}
        component={Home}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          header: renderDetailsScreenHeader,
        }}
      />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  const renderTabBar = props => <CustomTabBar {...props} />;
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        initialRouteName="main"
        tabBar={renderTabBar}
        screenOptions={TabStackOptions}>
        <Tab.Screen
          options={{tabBarLabel: 'Home'}}
          name="main"
          component={HomeStack}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Settings'}}
          name="settings"
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
