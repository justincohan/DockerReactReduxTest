import React from "react";
import {useSelector} from "react-redux";
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../../redux/selectors";

const TodoList = () => {

  const todos = useSelector(state => {
    const { visibilityFilter } = state;
    const todos = getTodosByVisibilityFilter(state, visibilityFilter);
    return todos;
  });

  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
        : "No todos, yay!"}
    </ul>
  )};

export default TodoList;
