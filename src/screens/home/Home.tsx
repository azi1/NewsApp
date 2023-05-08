import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Box,
  Heading,
  FlatList,
  ScrollView,
  HStack,
  Text,
  Center,
} from 'native-base';
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
} from '../../redux/selectors/news';
import {
  CardWithImage,
  WebViewModal,
  CardWithImageLoader,
  Chip,
} from '../../components';
import {cardWithImageLoaderCount, topics} from '../../constants';

type Props = StackScreenProps<HomeStackParamsList, 'Home'>;

export const Home: FC<Props> = () => {
  const dispatch = useDispatch();
  const headLines = useSelector(getHeadlines);
  const isLoading = useSelector(getIsLoading);
  const selectedTopicResult = useSelector(getTopics);
  const selectedTopicLoading = useSelector(getIsTopicLoading);
  const selectedTopicError = useSelector(getIsTopicError);

  const [selectedArticle, setSelectedArticle] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('bitcoin');

  useEffect(() => {
    dispatch(getHeadlineNews());
    //@ts-ignore
    dispatch(getTopicNews('bitcoin'));
  }, []);

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
      <Heading size="xl" fontWeight="200" padding={5}>
        Hot Topics
      </Heading>
      <Box width="100%">
        <Box>
          <HStack flexWrap="wrap">
            {topics.map((topic, index) => (
              <Chip
                key={index}
                isSelected={topic.value === selectedTopic}
                onPress={onSelect}
                item={topic}
              />
            ))}
          </HStack>
        </Box>
      </Box>
      <Box>
        {selectedTopicLoading ? (
          <HStack w="100%">
            {cardWithImageLoaderCount.map(() => {
              return <CardWithImageLoader />;
            })}
          </HStack>
        ) : selectedTopicError ? (
          <Center p="20" m="10" bg="coolGray.100" flex={1}>
            <Text textAlign="center" fontSize="md">
              No data found, please try again.
            </Text>
          </Center>
        ) : (
          <FlatList
            data={selectedTopicResult}
            renderItem={renderItem}
            horizontal
          />
        )}
      </Box>
      <Heading size="xl" fontWeight="200" padding={5}>
        Top Headlines
      </Heading>
      <Box>
        {isLoading ? (
          <HStack w="100%">
            {cardWithImageLoaderCount.map(() => {
              return <CardWithImageLoader />;
            })}
          </HStack>
        ) : (
          <FlatList data={headLines} renderItem={renderItem} horizontal />
        )}
        {showModal && (
          <WebViewModal
            openModal={showModal}
            title={selectedArticle?.title}
            onClose={onCloseModal}
            url={selectedArticle?.url}
          />
        )}
      </Box>
    </ScrollView>
  );
};
