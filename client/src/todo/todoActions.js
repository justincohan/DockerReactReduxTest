import {GET_TODOS, POST_TODO, PUT_TODO, RECEIVE_GET, RECEIVE_POST, RECEIVE_PUT, SET_FILTER} from "../constants";
import axios from 'axios';
import {getHeaders, handleError} from "../actions";
const api = 'http://127.0.0.1:8000/todo/';

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

function putTodo() {
  return {
    type: PUT_TODO
  }
}

function receivePut(json) {
  return {
    type: RECEIVE_PUT,
    payload: json
  }
}

function postTodo() {
  return {
    type: POST_TODO
  }
}

function receivePost(json) {
  return {
    type: RECEIVE_POST,
    payload: json
  }
}

function getTodos() {
  return {
    type: GET_TODOS
  }
}

function receiveGet(json) {
  let byIds = {};
  json.map(child => byIds[child.id] = child);
  return {
    type: RECEIVE_GET,
    allIds: json.map(child => child.id),
    byIds,
    receivedAt: Date.now()
  }
}

export function toggleTodo(content) {
  content.completed = !content.completed;
  return updateTodo(content);
}

export function updateTodo(content) {
  return function(dispatch) {
    dispatch(putTodo());
    return axios.put(
      api + content.id + '/',
      content,
      getHeaders()
    ).then(response => {
      dispatch(receivePut(response.data));
      return response
    }, handleError);
  }
}

export function addTodo(content) {
  return function(dispatch) {
    dispatch(postTodo());

    return axios.post(
      api,
      {content},
      getHeaders()
    ).then(response => {
      dispatch(receivePost(response.data));
      return response
    }, handleError);
  }
}

export function fetchTodos() {
  return function(dispatch) {
    dispatch(getTodos());
    axios.get(api, getHeaders())
      .then(
        response => response.data,
        handleError
      )
      .then(json =>
        dispatch(receiveGet(json))
      )
  }
}
