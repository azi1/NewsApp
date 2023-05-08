import {Pressable, Center} from 'native-base';
import React from 'react';

type Props = {
  isSelected: Boolean;
  onPress: Function;
  item: {
    title: string;
    value: string;
  };
};

export const Chip = ({isSelected, onPress, item}: Props) => {
  const onSelect = () => {
    onPress(item);
  };
  return (
    <Pressable minWidth="120" onPress={onSelect}>
      {({isHovered, isPressed}) => {
        return (
          <Center
            margin="3"
            borderRadius={25}
            borderWidth={1}
            borderColor={isSelected ? 'white' : 'black'}
            bg={
              isSelected
                ? 'red.700'
                : isPressed
                ? 'coolGray.200'
                : isHovered
                ? 'coolGray.200'
                : 'coolGray.100'
            }
            _text={{
              fontSize: 'md',
              padding: '2',
              color: isSelected ? 'white' : 'black',
            }}>
            {item.title}
          </Center>
        );
      }}
    </Pressable>
  );
};
