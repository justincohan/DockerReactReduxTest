import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import {fetchTodos} from "./actions";

const store = createStore(rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ));

//store.dispatch(fetchTodos());

export default store;
