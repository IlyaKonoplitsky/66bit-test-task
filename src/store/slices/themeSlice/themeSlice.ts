import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {$api} from "../instance.ts";

export type TTheme = {
  id: number;
  title: string;
  textColor: string;
  mainColor: string;
  secondColor: string;
};

export type TGetThemes = {
  themeName: string;
};

type ThemeState = {
  name: TTheme | null;
  loading: boolean;
  error: boolean;
}

const initialState: ThemeState = {
  name: null,
  loading: false,
  error: false,
};

export const getTheme = createAsyncThunk<TTheme, TGetThemes, { rejectValue: string }>(
  'theme/getTheme',
  async (name, {rejectWithValue}) => {
    try {
      const response = await $api.get(`/theme/get?name=${name}`);
      localStorage.setItem('theme', (response.data.name));
      return response.data;
    } catch (e) {
      rejectWithValue('Не удалось загрузить темы')
    }
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getTheme.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getTheme.fulfilled, (state, action) => {
      state.loading = false;
      state.name = action.payload;
      state.error = false
    })
    .addCase(getTheme.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default themeSlice.reducer
