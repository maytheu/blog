import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER = "/api/";
const ADMIN_SERVER = "/api/user/";

const slice = createSlice({
  name: "auth",
  initialState: { auth: {} },
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
    },
    auth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export default slice.reducer;

const { login, auth } = slice.actions;

export const getLogin = (data) => (dispatch) => {
  return axios
    .post(`${SERVER}sign_in`, data)
    .then((res) => dispatch(login(res.data)));
};

export const getAuth = () => (dispatch) => {
  return axios
    .get(`${ADMIN_SERVER}auth`)
    .then((res) => dispatch(auth(res.data)));
};
