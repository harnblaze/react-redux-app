import taskReducer from "./task";
import { legacy_createStore } from "redux";

export default function configureStore() {
  return legacy_createStore(taskReducer);
}
