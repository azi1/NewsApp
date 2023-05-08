import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, Heading, FlatList, ScrollView, HStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../types/navigation';
import {getHeadlineNews, getTopicNews} from '../../redux/slices/news';
import {useSelector, useDispatch} from '../../redux/store';
import {
  getHeadlines,
  getIsLoading,
  getIsTopicLoading,
  getTopics,
  getIsTopicError,
  getSelectedLanguage,
  getIsError,
} from '../../redux/selectors/news';
import {
  CardWithImage,
  WebViewModal,
  CardWithImageLoader,
  Chip,
  NoDataFound,
} from '../../components';
import {ARABIC, cardWithImageLoaderCount, topics} from '../../constants';

type Props = StackScreenProps<HomeStackParamsList, 'Home'>;

export const Home: FC<Props> = () => {
  const {t} = useTranslation('translation');
  const dispatch = useDispatch();
  const headLines = useSelector(getHeadlines);
  const isLoading = useSelector(getIsLoading);
  const selectedTopicResult = useSelector(getTopics);
  const selectedTopicLoading = useSelector(getIsTopicLoading);
  const selectedTopicError = useSelector(getIsTopicError);
  const isTopHeadlineError = useSelector(getIsError);

  const selectedLanguage = useSelector(getSelectedLanguage);

  const [selectedArticle, setSelectedArticle] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('bitcoin');

  useEffect(() => {
    dispatch(getHeadlineNews());
    //@ts-ignore
    dispatch(getTopicNews('bitcoin'));
  }, [selectedLanguage]);

  const onSelectedItem = useCallback((item: any) => {
    setSelectedArticle(item);
    setShowModal(true);
  }, []);
  const renderItem = ({item, index}: any) => {
    return (
      <CardWithImage
        item={item}
        index={index}
        onPress={() => onSelectedItem(item)}
      />
    );
  };

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onSelect = useCallback((item: any) => {
    setSelectedTopic(item.value);
    //@ts-ignore
    dispatch(getTopicNews(item.value));
  }, []);

  return (
    <ScrollView>
      <Heading
        _ios={{
          textAlign: 'left',
        }}
        size="xl"
        fontWeight="200"
        padding={5}>
        {t('APP.HEADER1')}
      </Heading>

      <HStack mt="10" mb="10" justifyContent="center" flexWrap="wrap">
        {topics.map((topic, index) => (
          <Chip
            key={index}
            isSelected={topic.value === selectedTopic}
            onPress={onSelect}
            item={topic}
          />
        ))}
      </HStack>

      <Box>
        {selectedTopicLoading ? (
          <HStack w="100%">
            {cardWithImageLoaderCount.map(() => {
              return <CardWithImageLoader />;
            })}
          </HStack>
        ) : selectedTopicError ? (
          <NoDataFound text={t('APP.ERROR_MSG1')} />
        ) : (
          <FlatList
            data={selectedTopicResult}
            renderItem={renderItem}
            horizontal
          />
        )}
      </Box>
      <Heading
        _ios={{
          textAlign: 'left',
        }}
        size="xl"
        fontWeight="200"
        padding={5}>
        {t('APP.HEADER2')}
      </Heading>
      <Box>
        {isLoading ? (
          <HStack w="100%">
            {cardWithImageLoaderCount.map(() => {
              return <CardWithImageLoader />;
            })}
          </HStack>
        ) : isTopHeadlineError ? (
          <NoDataFound text={t('APP.ERROR_MSG1')} />
        ) : (
          <FlatList data={headLines} renderItem={renderItem} horizontal />
        )}
        {showModal && (
          <WebViewModal
            openModal={showModal}
            title={selectedArticle?.title}
            onClose={onCloseModal}
            url={selectedArticle?.url}
            isRTL={selectedLanguage === ARABIC}
          />
        )}
      </Box>
    </ScrollView>
  );
};
