import {Pressable, Center} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';

type Props = {
  isSelected: Boolean;
  onPress: Function;
  item: {
    title: string;
    value: string;
  };
};

export const Chip = ({isSelected, onPress, item}: Props) => {
  const {t} = useTranslation('translation');
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
            {t(item.title)}
          </Center>
        );
      }}
    </Pressable>
  );
};
