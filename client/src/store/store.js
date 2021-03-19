import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import blog from "./blog";
import auth from "./auth";
import recent from "./recent";

const reducer = combineReducers({
  blog,
  auth,
  recent,
});

const store = configureStore({ reducer });
export default store;
