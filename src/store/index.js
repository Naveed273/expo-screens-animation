import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./message";
import postsReducer from "./posts";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    posts: postsReducer,
  },
});
