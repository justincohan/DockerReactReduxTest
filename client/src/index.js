import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import TodoApp from "./TodoApp";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginApp from "./LoginApp";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
    <Switch>
      <Route path="/todo">
        <TodoApp />
      </Route>
      <Route>
        <LoginApp />
      </Route>
    </Switch>
    </Router>
  </Provider>,
  rootElement
);


