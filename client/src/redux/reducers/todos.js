import {
  GET_TODOS,
  POST_LOGIN,
  POST_TODO,
  PUT_TODO,
  RECEIVE_GET,
  RECEIVE_LOGIN,
  RECEIVE_POST,
  RECEIVE_PUT
} from "../actionTypes";

const initialState = {
  isFetching: true,
  didInvalidate: false,
  allIds: [],
  byIds: {}
};
console.log('initial', initialState);

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



    case POST_LOGIN: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case RECEIVE_LOGIN: {
      console.log(action);
      return Object.assign({}, state, {});
    }

    default:
      return state;
  }
}
