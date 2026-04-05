import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import googleAuthReducer from "./googleAuthSlice";

export const store = configureStore({
  reducer: {
    googleAuth : googleAuthReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;