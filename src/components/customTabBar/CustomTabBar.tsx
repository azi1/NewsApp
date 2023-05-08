import {HStack, Box, Pressable, useColorModeValue} from 'native-base';
import React, {FC} from 'react';
import {Animated} from 'react-native';
import {CutomTabBarProps} from '../../types/navigation';
import {useSelector} from '../../redux/store';
import {getSelectedLanguage} from '../../redux/selectors/news';
import {ARABIC} from '../../constants';

type Props = CutomTabBarProps;
export const CustomTabBar: FC<Props> = ({state, descriptors, navigation}) => {
  const selectedLanguage = useSelector(getSelectedLanguage);
  return (
    <HStack
      w="100%"
      _web={{
        flexDirection: selectedLanguage === ARABIC ? 'row-reverse' : 'row',
      }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const color = isFocused
          ? useColorModeValue('#000', '#e5e5e5')
          : useColorModeValue('#1f2937', '#a1a1aa');
        const borderColor = isFocused
          ? 'cyan.500'
          : useColorModeValue('coolGray.200', 'gray.400');
        const {options} = descriptors[route.key];
        const label: String =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as String)
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Box
            borderTopWidth="3"
            borderColor={borderColor}
            flex={1}
            alignItems="center"
            p="3">
            <Pressable onPress={onPress} onLongPress={onLongPress}>
              <Animated.Text
                style={{
                  color,
                }}>
                {label}
              </Animated.Text>
            </Pressable>
          </Box>
        );
      })}
    </HStack>
  );
};
