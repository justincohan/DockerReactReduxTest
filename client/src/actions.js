import axios from 'axios';
import {history} from './MyHistory';

export const getHeaders = function getHeaders() {
  return { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('auth_token') } }
};

export const handleError = function handleError(error) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("auth_token");
    history.push('/login');
  }
};

export function logout() {
  return axios.post('http://127.0.0.1:8000/auth/token/logout/', {},
    getHeaders()).then(response => {
    localStorage.removeItem('auth_token');
    history.push('/login');
    return response;
  })
}


