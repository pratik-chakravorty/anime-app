import {
  FETCH_ANIME,
  FETCH_ANIME_SUCCESS,
  FETCH_ANIME_DETAIL,
  FETCH_STUDIO_ANIME,
  FETCH_STUDIO_ANIME_SUCCESS,
  FETCH_ANIME_GENRE,
  FETCH_ANIME_DETAIL_SUCCESS
} from "./constants";

export const fetchAnime = (pageCount, append) => ({
  type: FETCH_ANIME,
  pageCount,
  append
});

export const fetchAnimeSuccess = (payload, pageCount, append) => ({
  type: FETCH_ANIME_SUCCESS,
  payload,
  pageCount,
  append
});

export const fetchAnimeDetails = id => ({
  type: FETCH_ANIME_DETAIL,
  id
});

export const fetchAnimeDetailSuccess = payload => ({
  type: FETCH_ANIME_DETAIL_SUCCESS,
  payload
});

export const fetchStudioAnime = (id, pageCount, append) => ({
  type: FETCH_STUDIO_ANIME,
  id,
  pageCount,
  append
});

export const fetchAnimeByGenre = (id, pageCount, append) => ({
  type: FETCH_ANIME_GENRE,
  id,
  pageCount,
  append
});

export const fetchAnimeByGenreSuccess = (payload, pageCount, append) => ({
  type: FETCH_STUDIO_ANIME_SUCCESS,
  payload,
  pageCount,
  append
});

export const fetchStudioAnimeSuccess = (payload, pageCount, append) => ({
  type: FETCH_STUDIO_ANIME_SUCCESS,
  payload,
  pageCount,
  append
});
