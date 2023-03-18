import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";

const initialState = { entities: [], isLoading: true, error: null };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      state.isLoading = false;
      state.entities = action.payload;
      console.log(state.entities);
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
      return state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskRequested, taskFailed } = actions;

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
