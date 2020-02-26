import React from "react";
import {useSelector} from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "./selectors";

const TodoList = () => {

  const todos = useSelector(state => {
    const { visibilityFilter } = state;
    return getTodosByVisibilityFilter(state, visibilityFilter);
  });

  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
        : "No todos, yay!"}
    </ul>
  )};

export default TodoList;
