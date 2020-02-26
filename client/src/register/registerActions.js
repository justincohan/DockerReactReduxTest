import axios from "axios";
import {POST_REGISTER, RECEIVE_REGISTER} from "../constants";

function postRegister() {
  return {
    type: POST_REGISTER
  }
}

function receiveRegister(json) {
  return {
    type: RECEIVE_REGISTER,
    payload: json
  }
}

export function register(details) {
  return function(dispatch) {
    dispatch(postRegister());
    return axios.post('http://127.0.0.1:8000/auth/users/', details,
      { headers: { 'Content-Type': 'application/json' } }).then(response => {
      localStorage.setItem('auth_token', response.data.auth_token);
      dispatch(receiveRegister());
      return response;
    })
  }
}
