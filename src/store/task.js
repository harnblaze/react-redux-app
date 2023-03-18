import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";

const initialState = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    set(state, action) {
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
const { update, remove, set } = actions;

export const getTasks = () => async (dispatch) => {
  try {
    const data = await todosService.fetch();
    dispatch(set(data));
  } catch (e) {
    console.log(e);
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
