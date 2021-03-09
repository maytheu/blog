import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import blog from "./blog";

const reducer = combineReducers({
  blog,
});

const store = configureStore({ reducer });
export default store;
