export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
};

export const SET_FILTER = "SET_FILTER";
export const PUT_TODO = 'PUT_TODO';
export const RECEIVE_PUT = 'RECEIVE_PUT';
export const POST_TODO = 'POST_TODO';
export const RECEIVE_POST = 'RECEIVE_POST';
export const GET_TODOS = 'GET_TODOS';
export const RECEIVE_GET = 'RECEIVE_GET';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const POST_LOGIN = 'POST_LOGIN';
export const RECEIVE_REGISTER = 'RECEIVE_REGISTER';
export const POST_REGISTER = 'POST_REGISTER';

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  allIds: [],
  byIds: {}
};
