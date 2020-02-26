import {
  initialState,
  POST_REGISTER,
  RECEIVE_REGISTER
} from "../constants";

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_REGISTER: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECEIVE_REGISTER: {
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false,
      });
    }

    default:
      return state;
  }
}
