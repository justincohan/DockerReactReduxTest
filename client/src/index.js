import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles.css";


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
import PrivateRoute from "./PrivateRoute";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
    <Switch>
      <PrivateRoute path="/todo">
        <TodoApp />
      </PrivateRoute>
      <Route path="/login">
        <LoginApp />
      </Route>
      <Route>
        I'm the home page
        <div>
          <Link to="/todo">Todo</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </Route>
    </Switch>
    </Router>
  </Provider>,
  rootElement
);


