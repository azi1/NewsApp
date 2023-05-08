//@ts-nocheck

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getHeadlineNews = createAsyncThunk(
  'news/getHeadlines',
  async () => {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us',
        {
          method: 'GET',
          headers: {
            'X-Api-Key': '822447ffba844e92b40f1664cdfa4f7b',
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
  async searchValue => {
    console.log(searchValue, 'searcValue');
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${searchValue}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': '822447ffba844e92b40f1664cdfa4f7b',
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
  },
  reducers: {
    resetState(state) {
      state.loading = false;
      state.isError = false;
      state.headlineNews = [];
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
