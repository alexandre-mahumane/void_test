import { configureStore } from "@reduxjs/toolkit";
import progressoReducer from "./slice/slice";
export const store = configureStore({
  reducer: {
    progressoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
