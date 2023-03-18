import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import {
  changeTitle,
  getTasks,
  taskCompleted,
  taskDeleted,
} from "./store/task";

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.dispatch(getTasks());
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };

  return (
    <>
      <h1>APp</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Завершить</button>
            <button onClick={() => store.dispatch(changeTitle(el.id))}>
              Поменять название
            </button>
            <button onClick={() => deleteTask(el.id)}>Удалить задание</button>
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
