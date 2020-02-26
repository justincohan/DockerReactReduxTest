import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import VisibilityFilters from "./VisibilityFilters";
import "../styles.css";
import {fetchTodos} from "./todoActions";
import store from "../store";

export default function TodoApp() {
  React.useEffect(() => {
    store.dispatch(fetchTodos());
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
