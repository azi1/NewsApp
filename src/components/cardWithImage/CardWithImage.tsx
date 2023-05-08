import React from 'react';
import {
  Box,
  AspectRatio,
  Center,
  Stack,
  Heading,
  Image,
  Text,
  useMediaQuery,
  Pressable,
} from 'native-base';
import {useWindowDimensions} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  item: {
    urlToImage: string;
    source: {
      name: string;
    };
    author: string;
    description: string;
    title: string;
  };
  index: any;
  onPress: () => void;
};

export const CardWithImage = ({item, index, onPress}: Props) => {
  const {t} = useTranslation('translation');
  const {width} = useWindowDimensions();
  const [isSmallScreen] = useMediaQuery({
    minWidth: 280,
    maxWidth: 900,
  });
  return (
    <Pressable onPress={onPress}>
      <Box
        key={index}
        width={width / 1.5}
        margin="3"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          width: width / (isSmallScreen ? 1.5 : 4),
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              src={item.urlToImage}
              resizeMethod="auto"
              resizeMode="stretch"
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            {item.source.name}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading isTruncated noOfLines={2} size="md" ml="-1">
              {item.title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {item.author || 'NA'}
            </Text>
          </Stack>
          <Text isTruncated fontWeight="400">
            {item.description || t('APP.CARD_DESCRIPTION_PLACEHOLDER')}
          </Text>
        </Stack>
      </Box>
    </Pressable>
  );
};
