import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Details, Settings} from '../screens';
import {CustomTabBar} from '../components';
import type {StackNavigationOptions} from '@react-navigation/stack';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {Header} from '../components';
import {
  CutomTabBarProps,
  HomeStackParamsList,
  MainStackParamList,
} from '../types/navigation';

const homStackOptions: StackNavigationOptions = {
  headerShown: true,
};

const TabStackOptions: BottomTabNavigationOptions = {
  headerShown: false,
};
const Stack = createStackNavigator<HomeStackParamsList>();
const Tab = createBottomTabNavigator<MainStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const HomeStack = () => {
  const renderHomeScreenHeader = (title: string) => <Header title={title} />;

  const renderDetailsScreenHeader = (
    route: RouteProp<any>,
    navigation: NavigationProp<any>,
  ) => (
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
        options={() => {
          return {
            header: () => renderHomeScreenHeader('Dubbizle News'),
          };
        }}
        component={Home}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({navigation, route}) => {
          return {
            header: () => renderDetailsScreenHeader(route, navigation),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  const renderTabBar = (props: JSX.IntrinsicAttributes & CutomTabBarProps) => (
    <CustomTabBar {...props} />
  );
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
