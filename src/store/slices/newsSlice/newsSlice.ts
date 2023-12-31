import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../instance';

type TNews = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

type NewsState = {
  news: TNews[]
  page: number
  count: number
  loading: boolean
  error: boolean
}

const initialState: NewsState = {
  news: [],
  page: 1,
  count: 10,
  loading: false,
  error: false
}

export const getNews = createAsyncThunk<TNews[], number, {rejectValue: string} >(
  'news/getNews',
  async (page, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/news/get?page=${page}&count=5`);
      return response.data;
    } catch (e) {
      rejectWithValue('Не удалось загрузить новости')
    }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getNews.pending, (state) => {
      state.loading = true;
      state.error = false
    })
    .addCase(getNews.fulfilled, (state, action) => {
      const uniqueKey = action.payload.filter(newsItem => 
        !state.news.some(existingItem => existingItem.id === newsItem.id)
      )
      state.news = [...state.news, ...uniqueKey];
      state.loading = false;
      state.page += 1
    })
    .addCase(getNews.rejected, (state) => {
      state.loading = false
      state.error = true
    })
  },
});

export default newsSlice.reducer;
