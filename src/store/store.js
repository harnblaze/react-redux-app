import taskReducer from "./task";
import { legacy_createStore } from "redux";

export default function configureStore() {
  return legacy_createStore(
    taskReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
