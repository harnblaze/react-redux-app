import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    received(state, action) {
      state.isLoading = false;
      state.entities = action.payload;
    },
    update(state, action) {
      const elementId = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementId] = {
        ...state.entities[elementId],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },

    taskFailed(state) {
      state.isLoading = false;
    },
    taskAdded(state, action) {
      state.entities.push(action.payload);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskRequested, taskFailed, taskAdded } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (e) {
    dispatch(taskFailed());
    dispatch(setError(e.message));
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const data = await todosService.add(task);
    dispatch(taskAdded(data));
  } catch (e) {
    dispatch(taskFailed());
    dispatch(setError(e.message));
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

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
