import { combineReducers } from "redux";
import visibilityFilter from "./todo/visibilityFilter";
import todos from "./todo/todoReducer";
import register from "./register/registerReducer";
import login from "./login/loginReducer";

export default combineReducers({ todos, register, login, visibilityFilter });
