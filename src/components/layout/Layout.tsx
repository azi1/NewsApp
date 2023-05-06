import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';

type Props = {
  children: JSX.Element;
};

export const Layout = ({children}: Props) => {
  return (
    <NativeBaseProvider>
      <Box flex={1} safeAreaBottom safeAreaLeft safeAreaRight>
        {children}
      </Box>
    </NativeBaseProvider>
  );
};
