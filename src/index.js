import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import {
  changeTitle,
  createTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
  taskCompleted,
  taskDeleted,
} from "./store/task";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const tasks = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  console.log(tasks, error);
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const completeTask = (taskId) => {
    dispatch(taskCompleted(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  const addNewTask = () => {
    dispatch(createTask({ userId: 1, title: "lorem ipsum", completed: false }));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error.length > 0) {
    return <p>{error}</p>;
  }
  return (
    <>
      <h1>APp</h1>
      <button onClick={addNewTask}>Создать задание</button>
      <ul>
        {tasks.map((el) => (
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
  <Provider store={store}>
    <App />
  </Provider>
);
