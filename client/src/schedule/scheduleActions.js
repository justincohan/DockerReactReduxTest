import {
  GET_COACHES,
  GET_PERSONS, RECEIVE_COACHES,
  RECEIVE_PERSONS, SEARCH_COACHES, SEARCH_PERSONS,
} from "../constants";
import axios from 'axios';
import {getHeaders, handleError} from "../actions";
const api = 'http://127.0.0.1:8000/person/';

export function searchCoaches(search) {
  return {
    type: SEARCH_COACHES,
    search_coaches: search
  }
}

function getCoaches() {
  return {
    type: GET_COACHES
  }
}

function receiveCoaches(json) {
  return {
    type: RECEIVE_COACHES,
    coaches: json,
  }
}

export function searchPersons(search) {
  return {
    type: SEARCH_PERSONS,
    search_persons: search
  }
}

function getPersons() {
  return {
    type: GET_PERSONS
  }
}

function receivePersons(json) {
  return {
    type: RECEIVE_PERSONS,
    persons: json,
  }
}


export function fetchPersons() {
  return function(dispatch) {
    dispatch(getPersons());
    axios.get(api, getHeaders())
      .then(
        response => response.data,
        handleError
      )
      .then(json =>
        dispatch(receivePersons(json))
      )
  }
}

export function fetchCoaches() {
  return function(dispatch) {
    dispatch(getCoaches());
    axios.get('http://127.0.0.1:8000/coach/', getHeaders())
      .then(
        response => response.data,
        handleError
      )
      .then(json =>
        dispatch(receiveCoaches(json))
      )
  }
}
