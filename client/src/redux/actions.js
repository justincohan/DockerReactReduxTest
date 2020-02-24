import {
  GET_TODOS,
  POST_LOGIN,
  POST_TODO,
  PUT_TODO,
  RECEIVE_GET, RECEIVE_LOGIN,
  RECEIVE_POST,
  RECEIVE_PUT,
  SET_FILTER
} from "./actionTypes";
import axios from 'axios';

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
      { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token' + localStorage.getItem('auth_token') } }
    ).then(response => {
      dispatch(receivePut(response.data));
      return response
    });
  }
}

export function addTodo(content) {
  return function(dispatch) {
    dispatch(postTodo());

    return axios.post(
      api,
      {content},
      { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('auth_token') } }
    ).then(response => {
      dispatch(receivePost(response.data));
      return response
    });
  }
}

export function fetchTodos() {
  return function(dispatch) {
    dispatch(getTodos());
    axios.get(api, { headers: {'Authorization': 'Token ' + localStorage.getItem('auth_token')}})
      .then(
        response => response.data,
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveGet(json))
      )
  }
}

function postLogin() {
  return {
    type: POST_LOGIN
  }
}

function receiveLogin(json) {
  return {
    type: RECEIVE_LOGIN,
    payload: json
  }
}

export function login(details) {
  return function(dispatch) {
    dispatch(postLogin());
    return axios.post('http://127.0.0.1:8000/auth/token/login/', details,
      { headers: { 'Content-Type': 'application/json' } }).then(response => {
        console.log('response', response);
        localStorage.setItem('auth_token', response.data.auth_token);
        dispatch(receiveLogin());
        return response;
    })
  }
}
