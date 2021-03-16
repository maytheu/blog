import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER = "/api/";
const ADMIN_SERVER = "/api/user/";

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
    allPost: (state, action) => {
      state.blog = action.payload;
    },
    postBlog: (state, action) => {
      state.blog = action.payload;
    },
    editBlog: (state, action) => {
      state.blog = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
  deleteComment: (state, action) => {
    state.blog = action.payload;
  },
});

export default slice.reducer;

const {
  viewPosts,
  post,
  like,
  dislike,
  comment,
  allPost,
  postBlog,
  editBlog,
  deleteBlog,
  deleteComment,
} = slice.actions;

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

export const getComment = (id, data) => (dispatch) => {
  return axios
    .post(`${SERVER}post_comment?id=${id}`, data)
    .then((res) => dispatch(comment(res.data)));
};

export const getAllPost = () => (dispatch) => {
  return axios
    .get(`${ADMIN_SERVER}view`)
    .then((res) => dispatch(allPost(res.data)));
};

export const getPostBlog = (data) => (dispatch) => {
  return axios
    .post(`${ADMIN_SERVER}post`, data)
    .then((res) => dispatch(postBlog(res.data)));
};

export const getEditBlog = (data, id) => (dispatch) => {
  return axios
    .post(`${ADMIN_SERVER}edit?id=${id}`, data)
    .then((res) => dispatch(editBlog(res.data)));
};

export const getDeleteBlog = (id) => (dispatch) => {
  return axios
    .get(`${ADMIN_SERVER}delete?id=${id}`)
    .then((res) => dispatch(deleteBlog(res.data)));
};

export const getDeleteComment = (id) => (dispatch) => {
  return axios
    .get(`${ADMIN_SERVER}comment_delete?id=${id}`)
    .then((res) => dispatch(deleteComment(res.data)));
};
