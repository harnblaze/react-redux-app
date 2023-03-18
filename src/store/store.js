import taskReducer from "./task";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";

export default function createStore() {
  return configureStore({
    reducer: taskReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}
