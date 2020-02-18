import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADED_SUCCESS,
  AUTH_ERROR,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT
} from "./constants";

import setAuthToken from "../helpers/setAuthToken";

//auth error
export const authError = () => ({
  type: AUTH_ERROR
});

//load user
export const loadUser = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: USER_LOADED
  };
};

export const loadUserSuccess = payload => ({
  type: USER_LOADED_SUCCESS,
  payload
});
//register user
export const register = ({ name, email, password }) => ({
  type: REGISTER_USER,
  body: { name, email, password }
});

export const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload
});

//login user
export const login = ({ email, password }) => ({
  type: LOGIN_USER,
  body: { email, password }
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
});

//logout
export const logout = () => ({
  type: LOGOUT
});
