import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Box, HStack, IconButton, Icon, Text, useMediaQuery} from 'native-base';

type Props = {
  title: string;
  showBackButton?: boolean;
  onGoBack?: () => void;
};

export const Header = ({title, showBackButton = false, onGoBack}: Props) => {
  const [isSmallScreen] = useMediaQuery({
    minHeight: 280,
    maxHeight: 480,
  });
  const size = isSmallScreen ? 'xl' : '2xl';
  return (
    <>
      <Box safeAreaTop bg="blue" />
      <HStack bg="blue" px="1" py="3" alignItems="center" w="100%">
        <HStack alignItems="center" justifyContent="center" w="10%">
          {showBackButton && (
            <IconButton
              icon={<Icon size={size} as={FeatherIcon} name="chevron-left" />}
              onPress={onGoBack}
            />
          )}
        </HStack>
        <HStack alignItems="center" justifyContent="center" w="80%">
          <Text fontSize={size}>{title}</Text>
        </HStack>
      </HStack>
    </>
  );
};
