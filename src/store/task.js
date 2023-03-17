import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
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
const { update, remove } = actions;

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
