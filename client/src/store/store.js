import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import blog from "./blog";
import auth from "./auth";

const reducer = combineReducers({
  blog,
  auth,
});

const store = configureStore({ reducer });
export default store;
