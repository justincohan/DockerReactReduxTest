import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducerIndex'

const store = createStore(rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  ));

export default store;
