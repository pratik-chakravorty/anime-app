import { SEARCH_ANIME, SEARCH_ANIME_SUCCESS } from "./constants";

export const searchAnime = searchTerm => ({
  type: SEARCH_ANIME,
  payload: searchTerm
});

export const searchAnimeSuccess = data => ({
  type: SEARCH_ANIME_SUCCESS,
  payload: data
});
