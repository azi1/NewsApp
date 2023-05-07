import {Skeleton, VStack, useMediaQuery} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';

export const CardWithImageLoader = () => {
  const {width} = useWindowDimensions();
  const [isSmallScreen] = useMediaQuery({
    minWidth: 280,
    maxWidth: 900,
  });
  return (
    <VStack
      w="90%"
      width={width / 1.5}
      borderWidth="1"
      space={8}
      overflow="hidden"
      rounded="md"
      shadow="2"
      m="3"
      _web={{
        shadow: 2,
        width: width / (isSmallScreen ? 1.5 : 4),
      }}
      _dark={{
        borderColor: 'coolGray.500',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}>
      <Skeleton h="40" />
      <Skeleton.Text px="4" />
      <Skeleton px="4" my="4" rounded="md" />
    </VStack>
  );
};
