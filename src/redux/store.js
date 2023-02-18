import { configureStore } from "@reduxjs/toolkit";
import typingReducer from "./slice/typingSlice"
export const store = configureStore({
  reducer: {
    typing: typingReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});
