import {
  initialState,
  POST_LOGIN,
  RECEIVE_LOGIN
} from "../constants";

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOGIN: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECEIVE_LOGIN: {
      return Object.assign({}, state, {
        isFetching: false,
      });
    }

    default:
      return state;
  }
}
