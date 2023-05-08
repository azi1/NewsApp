import {Center, Text} from 'native-base';
import React from 'react';

type Props = {
  text: string;
};

export const NoDataFound = ({text}: Props) => {
  return (
    <Center p="20" m="10" bg="coolGray.100" flex={1}>
      <Text textAlign="center" fontSize="md">
        {text}
      </Text>
    </Center>
  );
};
