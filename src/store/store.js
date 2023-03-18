import taskReducer from "./task";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errors";

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

export default function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
  });
}
