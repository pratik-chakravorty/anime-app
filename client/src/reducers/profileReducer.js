import {
  GET_PROFILES,
  GET_PROFILES_SUCCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE,
  WATCHLIST_ADD_SUCCESS,
  WATCHLIST_REMOVE_SUCCESS
} from "../actions/constants";

const initialState = {
  profile: {},
  profiles: {},
  loading: false,
  error: {}
};

export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case WATCHLIST_ADD_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          watchlist: [...state.profile.watchlist, payload]
        }
      };
    case WATCHLIST_REMOVE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          watchlist: state.profile.watchlist.filter(
            item => item.mal_id !== payload
          )
        }
      };
    default:
      return state;
  }
}
