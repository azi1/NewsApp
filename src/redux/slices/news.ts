//@ts-nocheck

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getHeadlineNews = createAsyncThunk(
  'news/getHeadlines',
  async (props, {getState}) => {
    const {selectedLangauge} = getState().news;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&language=${selectedLangauge}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': '7794df4c030f42ebad5a42ea5819b4b8',
          },
        },
      );
      const data = await response.json();
      if (data.status === 'ok') {
        return data;
      }
      throw new Error();
    } catch (error: any) {
      throw new Error(error);
    }
  },
);
export const getTopicNews = createAsyncThunk(
  'news/getTopicNews',
  async (searchValue, {getState}) => {
    const {selectedLangauge} = getState().news;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchValue}&language=${selectedLangauge}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': '7794df4c030f42ebad5a42ea5819b4b8',
          },
        },
      );
      const data = await response.json();
      if (data.status === 'ok') {
        return data;
      }
      throw new Error();
    } catch (error: any) {
      throw new Error(error);
    }
  },
);

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    headlineNews: [],
    loading: false,
    isError: false,
    isTopicLoading: false,
    isTopicError: false,
    topicNews: [],
    selectedLangauge: 'en',
  },
  reducers: {
    resetState(state) {
      state.loading = false;
      state.isError = false;
      state.headlineNews = [];
    },
    setSelectedLanguage(state, action) {
      state.selectedLangauge = action.payload;
    },
  },
  extraReducers: {
    [getHeadlineNews.pending]: state => {
      state.loading = true;
      state.isError = false;
    },
    [getHeadlineNews.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.headlineNews = payload.articles;
      if (payload.articles.length === 0) {
        state.isError = true;
      }
    },
    [getHeadlineNews.rejected]: state => {
      state.loading = false;
      state.isError = true;
    },
    [getTopicNews.pending]: state => {
      state.isTopicLoading = true;
      state.isTopicError = false;
    },
    [getTopicNews.fulfilled]: (state, {payload}) => {
      state.isTopicLoading = false;
      state.topicNews = payload.articles;
      if (payload.articles.length === 0) {
        state.isTopicError = true;
      }
    },
    [getTopicNews.rejected]: state => {
      state.isTopicLoading = false;
      state.isTopicError = true;
    },
  },
});
