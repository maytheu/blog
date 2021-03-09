import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER = "/api/";

const slice = createSlice({
  name: "blog",
  initialState: { blog: {} },
  reducers: {
    viewPost: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export default slice.reducer;

const { viewPost } = slice.actions;

export const getViewPost = () => (dispatch) => {
  return axios.get(`${SERVER}view`).then((res) => dispatch(viewPost(res.data)));
};
