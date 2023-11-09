import {combineReducers, configureStore} from "@reduxjs/toolkit";
import newsSlice from "./slices/newsSlice/newsSlice";
import themeSlice from "./slices/themeSlice/themeSlice";

const rootReducer = combineReducers({
  news: newsSlice,
  theme: themeSlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

