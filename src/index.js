import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function taskReducer(state, action) {
  switch (action.type) {
    case "task/completed":
      const newArray = [...state];
      const elementId = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elementId].completed = true;
      return newArray;
    default:
      return state;
  }
}

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

const store = createStore(taskReducer, [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
]);

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch({ type: "task/completed", payload: { id: taskId } });
  };

  return (
    <>
      <h1>APp</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.description}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Завершить</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
