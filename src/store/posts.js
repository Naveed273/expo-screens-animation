import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ limit }, { dispatch, getState }) => {
    // const { message } = getState()
    // console.log({ message })
    // we can dispatch any action from here!
    // dispatch(setMessage())
    return fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}?delay=3`
    ).then((res) => res.json());
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default postsSlice.reducer;
