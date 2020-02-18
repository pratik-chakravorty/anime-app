import setAuthToken from "../helpers/setAuthToken";
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILES,
  GET_PROFILES_SUCCESS,
  CREATE_PROFILE,
  WATCHLIST_ADD,
  WATCHLIST_ADD_SUCCESS
} from "./constants";

//get current users profile
export const getCurrentProfile = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: GET_PROFILE
  };
};

export const getCurrentProfiles = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: GET_PROFILES
  };
};

//get current users profile success
export const getCurrentProfileSuccess = payload => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: GET_PROFILE_SUCCESS,
    payload
  };
};

export const getCurrentProfilesSuccess = payload => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: GET_PROFILES_SUCCESS,
    payload
  };
};

export const createProfile = values => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: CREATE_PROFILE,
    body: values
  };
};

export const addWatchList = body => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return {
    type: WATCHLIST_ADD,
    body
  };
};

export const addWatchListSuccess = payload => ({
  type: WATCHLIST_ADD_SUCCESS,
  payload
});
