import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import {
  changeTitle,
  getTasks,
  taskCompleted,
  taskDeleted,
} from "./store/task";
import { Provider, useDispatch, useSelector } from "react-redux";

const store = configureStore();

const App = () => {
  const state = useSelector((state) => state.entities);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const completeTask = (taskId) => {
    dispatch(taskCompleted(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <h1>APp</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Завершить</button>
            <button onClick={() => dispatch(changeTitle(el.id))}>
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
