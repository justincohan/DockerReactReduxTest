import {
  GET_TODOS, initialState,
  POST_TODO,
  PUT_TODO,
  RECEIVE_GET,
  RECEIVE_POST,
  RECEIVE_PUT,
} from "../constants";

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS: {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    }
    case RECEIVE_GET: {
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        allIds: action.allIds,
        byIds: action.byIds,
        lastUpdated: action.receivedAt
      });
    }

    case PUT_TODO: {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    }
    case RECEIVE_PUT: {
      const {id} = action.payload;
      return {
        ...state,
        isFetching: false,
        byIds: {
          ...state.byIds,
          [id]: action.payload
        }
      };
    }
    case POST_TODO: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECEIVE_POST: {
      const {id, content} = action.payload;
      return Object.assign({}, state, {
        isFetching: false,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      });
    }

    default:
      return state;
  }
}
