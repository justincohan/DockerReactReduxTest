import axios from "axios";
import {POST_LOGIN, RECEIVE_LOGIN} from "../constants";

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
      localStorage.setItem('auth_token', response.data.auth_token);
      dispatch(receiveLogin());
      return response;
    })
  }
}
