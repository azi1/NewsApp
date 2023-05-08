import React, {useCallback} from 'react';
import {I18nManager} from 'react-native';
import {Box, VStack, Divider, Switch, HStack, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {newsSlice} from '../../redux/slices/news';
import {useDispatch, useSelector} from '../../redux/store';
import {getSelectedLanguage} from '../../redux/selectors/news';
import {ENGLISH, ARABIC, isWeb} from '../../constants';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Settings = () => {
  const {t, i18n} = useTranslation('translation');
  const {setSelectedLanguage} = newsSlice.actions;
  const selectedLanguage = useSelector(getSelectedLanguage);
  const disptach = useDispatch();
  const onLanguageSwitch = useCallback(async () => {
    const lang = selectedLanguage === ENGLISH ? ARABIC : ENGLISH;
    await AsyncStorage.setItem('language', lang);
    disptach(setSelectedLanguage(lang));
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang).then(async () => {
        if (!isWeb) {
          await I18nManager.forceRTL(lang === ARABIC);
          RNRestart.Restart();
        } else {
          //@ts-ignore
          window.location.reload();
        }
      });
    }
  }, [selectedLanguage]);

  return (
    <Box flex={1} marginBottom="10" borderRadius="md" justifyContent="flex-end">
      <VStack space="4" divider={<Divider />}>
        <Box p="2" px="4" pt="4">
          <HStack
            _web={{
              direction: selectedLanguage === ARABIC ? 'row-reverse' : 'row',
            }}
            alignItems="center"
            justifyContent="space-between">
            <Text>{t('APP.LANGUAGE_SWITCH_OPTION')}</Text>
            <Switch
              size="md"
              onValueChange={onLanguageSwitch}
              value={selectedLanguage === ARABIC}
            />
          </HStack>
        </Box>
        <Box p="2" px="4" pt="4">
          <HStack
            _web={{
              direction: selectedLanguage === ARABIC ? 'row-reverse' : 'row',
            }}
            alignItems="center"
            justifyContent="space-between">
            <Text>{t('APP.THEME_SWITCH_OPTION')}</Text>
            <Switch size="md" />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};
