import {Button, Center, Image, Text} from 'native-base';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {useDispatch} from '../../redux/store';
import {getHeadlineNews} from '../../redux/slices/news';
import {useTranslation} from 'react-i18next';

type Props = {
  route: RouteProp<any>;
};

export const ErrorMessage = ({route}: Props) => {
  const {t} = useTranslation('translation');
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
        {t('APP.ERROR_MSG2')}
      </Text>
      <Button variant="outline" width="30%" margin={10} onPress={onPress}>
        {t('APP.RETRY_BTN')}
      </Button>
    </Center>
  );
};
