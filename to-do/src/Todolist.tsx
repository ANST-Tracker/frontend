import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string; //long id
  title: string;
  // description: string;
  // deadline: string; //date
  // tag: string;
  // status: string
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[]; //Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState("");
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    if (e.charCode === 13) {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
    }
    props.addTask(newTaskTitle.trim(), props.id);
    setNewTaskTitle("");
  };
  const onAllClickHandler = () => props.changeFilter(props.id, "all");
  const onActiveClickHandler = () => props.changeFilter(props.id, "active");
  const onCompletedClickHandler = () =>
    props.changeFilter(props.id, "completed");
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolist}>x</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
