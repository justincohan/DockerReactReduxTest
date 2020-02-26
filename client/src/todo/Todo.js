import React from "react";
import {useDispatch} from "react-redux";
import cx from "classnames";
import {toggleTodo} from "./todoActions";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li className="todo-item" onClick={() => dispatch(toggleTodo(todo))}>
      {todo && todo.completed ? "👌" : "👋"}{" "}
      <span
        className={cx(
          "todo-item__text",
          todo && todo.completed && "todo-item__text--completed"
        )}
      >
      {todo.content}
    </span>
    </li>)
};

export default Todo;
