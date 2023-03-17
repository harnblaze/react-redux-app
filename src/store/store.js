import taskReducer from "./task";
import { applyMiddleware, compose, legacy_createStore } from "redux";
import { thunk } from "./middleware/thunk";

const middlewareEnhancer = applyMiddleware(thunk);

export default function configureStore() {
  return legacy_createStore(
    taskReducer,
    compose(
      middlewareEnhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
