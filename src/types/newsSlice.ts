type Articles = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
type News = {
  status: string;
  totalResults: Number;
  articles: Articles[];
};
export type NewsState = {
  headlineNews: News[];
  loading: boolean;
  isError: boolean;
  isTopicLoading: boolean;
  isTopicError: boolean;
  topicNews: News[];
  selectedLangauge: string;
};

export interface IStore {
  news: NewsState;
}
