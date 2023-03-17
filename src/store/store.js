import { legacy_createStore } from "redux";
import { reducer } from "./task/reducer";

const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
];

export default function configureStore() {
  return legacy_createStore(reducer, initialState);
}
