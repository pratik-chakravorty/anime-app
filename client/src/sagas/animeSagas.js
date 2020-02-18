import {
  fetchTopAnime,
  fetchAnimeDetails,
  searchAnime,
  fetchStudioAnimesApi,
  fetchAnimeByGenreApi,
  fetchAnimeRecommendationsApi
} from "../api";
import {
  fetchAnimeSuccess,
  fetchAnimeDetailSuccess,
  fetchStudioAnimeSuccess,
  fetchAnimeByGenreSuccess
} from "../actions/fetchAnime";

import { searchAnimeSuccess } from "../actions/searchAction";
import {
  FETCH_STUDIO_ANIME,
  FETCH_ANIME_GENRE,
  FETCH_ANIME,
  FETCH_ANIME_DETAIL,
  SEARCH_ANIME
} from "../actions/constants";
import { call, put, takeLatest } from "redux-saga/effects";

function* fetchAnimeSaga(action) {
  try {
    const {
      data: { top }
    } = yield call(fetchTopAnime, action.pageCount);
    yield put(fetchAnimeSuccess(top, action.pageCount, action.append));
  } catch (e) {
    console.error(e);
  }
}

function* searchAnimeSaga(action) {
  try {
    const {
      data: { results }
    } = yield call(searchAnime, action.payload);
    yield put(searchAnimeSuccess(results));
  } catch (e) {
    console.error(e);
  }
}

function* fetchAnimeDetailsSaga(action) {
  try {
    const { data } = yield call(fetchAnimeDetails, action.id);
    const {
      data: { recommendations }
    } = yield call(fetchAnimeRecommendationsApi, action.id);
    const result = { ...data, recommendations: recommendations.slice(0, 6) };
    yield put(fetchAnimeDetailSuccess(result));
  } catch (e) {
    console.error(e);
  }
}

function* fetchStudioAnimeSaga(action) {
  try {
    const {
      data: { anime }
    } = yield call(fetchStudioAnimesApi, action.id, action.pageCount);
    yield put(fetchStudioAnimeSuccess(anime, action.pageCount, action.append));
  } catch (e) {
    console.error(e);
  }
}

function* fetchAnimeByGenreSaga(action) {
  try {
    const {
      data: { anime }
    } = yield call(fetchAnimeByGenreApi, action.id, action.pageCount);
    yield put(fetchAnimeByGenreSuccess(anime, action.pageCount, action.append));
  } catch (e) {
    console.error(e);
  }
}

function* animeSagas() {
  yield takeLatest(FETCH_ANIME, fetchAnimeSaga);
  yield takeLatest(FETCH_ANIME_DETAIL, fetchAnimeDetailsSaga);
  yield takeLatest(SEARCH_ANIME, searchAnimeSaga);
  yield takeLatest(FETCH_STUDIO_ANIME, fetchStudioAnimeSaga);
  yield takeLatest(FETCH_ANIME_GENRE, fetchAnimeByGenreSaga);
}

export default animeSagas;
