import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles.css";


import { Provider } from "react-redux";
import store from "./store";

import TodoApp from "./todo/TodoApp";

import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginApp from "./login/LoginApp";
import PrivateRoute from "./PrivateRoute";
import {history} from "./myHistory";
import RegisterApp from "./register/RegisterApp";
import {logout} from "./actions";
import ScheduleApp from "./schedule/ScheduleApp";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    <Switch>
      <PrivateRoute path="/todo">
        <TodoApp />
      </PrivateRoute>
      <Route path="/login">
        <LoginApp />
      </Route>
      <Route path="/register">
        <RegisterApp />
      </Route>
      <Route path="/schedule">
        <ScheduleApp />
      </Route>
      <Route>
        I'm the home page
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/todo">Todo</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/schedule">Schedule</Link>
        </div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </Route>
    </Switch>
    </Router>
  </Provider>,
  rootElement
);


