import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER = "/api/";

const slice = createSlice({
  name: "blog",
  initialState: { blog: {} },
  reducers: {
    viewPosts: (state, action) => {
      state.blog = action.payload;
    },
    post: (state, action) => {
      state.blog = action.payload;
    },
    like: (state, action) => {
      state.blog = action.payload;
    },
    dislike: (state, action) => {
      state.blog = action.payload;
    },
    comment: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export default slice.reducer;

const { viewPosts, post, like, dislike, comment } = slice.actions;

export const getViewPost = () => (dispatch) => {
  return axios
    .get(`${SERVER}view`)
    .then((res) => dispatch(viewPosts(res.data)));
};

export const getPost = (id) => (dispatch) => {
  return axios
    .get(`${SERVER}post?id=${id}`)
    .then((res) => dispatch(post(res.data)));
};

export const getLike = (title) => (dispatch) => {
  return axios
    .get(`${SERVER}like?title=${title}`)
    .then((res) => dispatch(like(res.data)));
};

export const getDislike = (title) => (dispatch) => {
  return axios
    .get(`${SERVER}dislike?title=${title}`)
    .then((res) => dispatch(dislike(res.data)));
};

export const getComment = (id) => (dispatch) => {
  return axios
    .post(`${SERVER}post_comment?id=${id}`)
    .then((res) => dispatch(comment(res.data)));
};
