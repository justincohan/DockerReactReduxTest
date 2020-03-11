import { combineReducers } from "redux";
import visibilityFilter from "./todo/visibilityFilter";
import todos from "./todo/todoReducer";
import register from "./register/registerReducer";
import login from "./login/loginReducer";
import schedule from "./schedule/scheduleReducer";

export default combineReducers({ todos, schedule, register, login, visibilityFilter });
