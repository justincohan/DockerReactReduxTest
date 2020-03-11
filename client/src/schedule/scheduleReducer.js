import {
  GET_COACHES,
  GET_PERSONS,
  initialState, RECEIVE_COACHES,
  RECEIVE_PERSONS, SEARCH_COACHES, SEARCH_PERSONS,
} from "../constants";

export default function (state = initialState, action) {
  switch (action.type) {

    case SEARCH_PERSONS: {
      return Object.assign({}, state, {
        search_persons: action.search_persons
      });
    }
    case GET_PERSONS: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECEIVE_PERSONS: {
      console.log(action);
      console.log(state);
      return Object.assign({}, state, {
        isFetching: false,
        persons: action.persons
      });
    }

    case SEARCH_COACHES: {
      return Object.assign({}, state, {
        search_persons: action.search_coaches
      });
    }
    case GET_COACHES: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECEIVE_COACHES: {
      console.log(action);
      console.log(state);
      return Object.assign({}, state, {
        isFetching: false,
        coaches: action.coaches
      });
    }

    default:
      return state;
  }
}
