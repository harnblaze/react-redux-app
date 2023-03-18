import taskReducer from "./task";
import { configureStore } from "@reduxjs/toolkit";

export default function createStore() {
  return configureStore({
    reducer: taskReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
  });
}
