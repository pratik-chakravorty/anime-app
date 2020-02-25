import {
  ADD_POST,
  ADD_POST_SUCCESS,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  GET_POST_BY_ID_SUCCESS,
  GET_ALL_POSTS_SUCCESS
} from "../actions/constants";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: payload
      };
    case ADD_POST:
      return {
        ...state,
        loading: true
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        loading: true
      };
    case GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload
      };
    default:
      return state;
  }
}
