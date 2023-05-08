import {IStore} from '../../types/newsSlice';
export const getHeadlines = (state: IStore) => state.news.headlineNews;
export const getIsLoading = (state: IStore) => state.news.loading;
export const getIsError = (state: IStore) => state.news.isError;
export const getTopics = (state: IStore) => state.news.topicNews;
export const getIsTopicLoading = (state: IStore) => state.news.isTopicLoading;
export const getIsTopicError = (state: IStore) => state.news.isTopicError;
export const getSelectedLanguage = (state: IStore) =>
  state.news.selectedLangauge;
