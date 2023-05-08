import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
type Props = {
  children: JSX.Element;
};

export const Layout = ({children}: Props) => {
  return (
    <NativeBaseProvider>
      <Box
        _dark={{
          bg: 'coolGray.700',
        }}
        _light={{
          bg: 'coolGray.100',
        }}
        flex={1}
        safeAreaBottom
        safeAreaLeft
        safeAreaRight>
        {children}
      </Box>
    </NativeBaseProvider>
  );
};
