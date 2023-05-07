import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box, Heading, FlatList, ScrollView, HStack} from 'native-base';
import type {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../types/navigation';
import {getHeadlineNews} from '../../redux/slices/news';
import {useSelector} from '../../redux/store';
import {getHeadlines, getIsLoading} from '../../redux/selectors/news';
import {useDispatch} from '../../redux/store';
import {
  CardWithImage,
  WebViewModal,
  CardWithImageLoader,
} from '../../components';
import {cardWithImageLoaderCount} from '../../constants';

type Props = StackScreenProps<HomeStackParamsList, 'Home'>;

export const Home: FC<Props> = () => {
  const dispatch = useDispatch();
  const headLines = useSelector(getHeadlines);
  const isLoading = useSelector(getIsLoading);
  const [selectedArticle, setSelectedArticle] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getHeadlineNews());
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

  return (
    <ScrollView>
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
