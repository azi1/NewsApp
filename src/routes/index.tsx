import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Details, Settings} from '../screens';
import type {StackNavigationOptions} from '@react-navigation/stack';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

const homStackOptions: StackNavigationOptions = {
  headerShown: false,
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
  return (
    <Stack.Navigator screenOptions={homStackOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator screenOptions={TabStackOptions}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
