import React from "react";
import AddTodo from "./components/todo/AddTodo";
import TodoList from "./components/todo/TodoList";
import VisibilityFilters from "./components/todo/VisibilityFilters";
import "./styles.css";
import {fetchTodos} from "./redux/actions";
import store from "./redux/store";

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
