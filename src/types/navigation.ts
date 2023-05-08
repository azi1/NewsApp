import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  TabNavigationState,
  ParamListBase,
  NavigationHelpers,
} from '@react-navigation/native';

export type MainStackParamList = {
  Home: {};
  settings: {};
};

export type CutomTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};
