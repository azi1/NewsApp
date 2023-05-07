import {Button, Center, Image, Text} from 'native-base';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {useDispatch} from '../../redux/store';
import {getHeadlineNews} from '../../redux/slices/news';
type Props = {
  route: RouteProp<any>;
};

export const ErrorMessage = ({route}: Props) => {
  const dispatch = useDispatch();
  const onPress = () => {
    if (route.name === 'Home') {
      dispatch(getHeadlineNews());
    }
  };
  return (
    <Center flex={1}>
      <Image
        source={require('../../assets/img/sad-icon.png')}
        width={200}
        height={200}
        margin={10}
      />
      <Text textAlign="center" fontSize="md">
        Oops, something went wrong please try again.
      </Text>
      <Button variant="outline" width="30%" margin={10} onPress={onPress}>
        Retry
      </Button>
    </Center>
  );
};
