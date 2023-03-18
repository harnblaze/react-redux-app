import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { createAction } from "@reduxjs/toolkit/";

const initialState = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      return (state = action.payload);
    },
    update(state, action) {
      const elementId = state.findIndex((el) => el.id === action.payload.id);
      state[elementId] = {
        ...state[elementId],
        ...action.payload,
      };
    },
    remove(state, action) {
      return state.filter((el) => el.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received } = actions;

const taskRequested = createAction("task/requested");
const taskFailed = createAction("task/requestFailed");

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (e) {
    dispatch(taskFailed(e.message));
  }
};

export const changeTitle = (id) => (dispatch) => {
  dispatch(update({ id, title: `new title for task ${id} ` }));
};

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function taskDeleted(id) {
  return remove({ id });
}

export default taskReducer;
