import {
  FETCH_ANIME,
  FETCH_ANIME_SUCCESS,
  FETCH_ANIME_DETAIL,
  FETCH_ANIME_DETAIL_SUCCESS,
  SEARCH_ANIME_SUCCESS,
  FETCH_STUDIO_ANIME,
  FETCH_STUDIO_ANIME_SUCCESS
} from "../actions/constants";
const initialState = {
  isLoading: true,
  showMoreLoading: false,
  animes: [],
  anime: {},
  pageCount: 1,
  searchedResults: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDIO_ANIME:
    case FETCH_ANIME:
      return {
        ...state,
        isLoading: true,
        showMoreLoading: true
      };
    case FETCH_STUDIO_ANIME_SUCCESS:
    case FETCH_STUDIO_ANIME_SUCCESS:
    case FETCH_ANIME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showMoreLoading: false,
        anime: {},
        pageCount: action.pageCount + 1,
        animes: action.append
          ? [...state.animes, ...action.payload]
          : action.payload
      };
    case FETCH_ANIME_DETAIL:
      return {
        ...state,
        animes: [],
        isLoading: true
      };
    case FETCH_ANIME_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        anime: action.payload
      };
    case SEARCH_ANIME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchedResults: action.payload
      };
    default:
      return state;
  }
}
