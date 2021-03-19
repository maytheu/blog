import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER = "/api/";

const slice = createSlice({
  name: "recent",
  initialState: { recent: {} },
  reducers: {
    artices: (state, action) => {
      state.recent = action.payload;
    },
  },
});

export default slice.reducer;

const { artices } = slice.actions;

export const getRecent = () => (dispatch) => {
  return axios
    .get(`${SERVER}recent`)
    .then((res) => dispatch(artices(res.data)));
};
