import axios from 'axios';
import {history} from './myHistory';

export const getHeaders = function getHeaders() {
  return { headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + localStorage.getItem('authToken') } }
};

export const handleError = function handleError(error) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem("authToken");
    history.push('/login');
  }
};

export function logout() {
  return axios.post('http://127.0.0.1:8000/auth/token/logout/', {},
    getHeaders()).then(response => {
    localStorage.removeItem('authToken');
    history.push('/login');
    return response;
  })
}


