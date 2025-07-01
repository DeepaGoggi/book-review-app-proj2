import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
const preloadedState = {};

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
  preloadedState,
});
