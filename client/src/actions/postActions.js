import {
  SET_LIST_ALERT,
  GET_POST_BY_ID,
  GET_POST_BY_ID_SUCCESS,
  ADD_POST,
  ADD_POST_SUCCESS,
  GET_ALL_POSTS,
  GET_ALL_POSTS_SUCCESS
} from "./constants";
import setAuthToken from "../helpers/setAuthToken";

export const setListAlert = () => ({
  type: SET_LIST_ALERT
});

export const addPost = body => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: ADD_POST,
    body
  };
};

export const getAllPosts = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: GET_ALL_POSTS
  };
};
export const getAllPostsSuccess = payload => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: GET_ALL_POSTS_SUCCESS,
    payload
  };
};
export const addPostSuccess = payload => ({
  type: ADD_POST_SUCCESS,
  payload
});

export const getPostById = id => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: GET_POST_BY_ID,
    id
  };
};

export const getPostByIdSuccess = payload => ({
  type: GET_POST_BY_ID_SUCCESS,
  payload
});
