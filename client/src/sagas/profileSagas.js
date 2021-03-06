import { takeLatest, put, call } from "redux-saga/effects";
import uuid from "uuid";
import {
  GET_PROFILE,
  GET_PROFILES,
  CREATE_PROFILE,
  WATCHLIST_ADD,
  WATCHLIST_REMOVE,
  GET_PROFILE_BY_ID
} from "../actions/constants";

import { setAlert } from "../actions/alertAction";
import {
  getCurrentProfileApi,
  getAllProfilesApi,
  getProfileByIdApi,
  createProfileApi,
  addWatchListApi,
  removeWatchlistApi
} from "../api";
import {
  getCurrentProfile,
  getCurrentProfileSuccess,
  getProfilesSuccess,
  addWatchListSuccess,
  removeWatchListSuccess
} from "../actions/profileActions";

function* getProfileSaga() {
  try {
    const { data } = yield call(getCurrentProfileApi);
    yield put(getCurrentProfileSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* getProfilesSaga() {
  try {
    const { data } = yield call(getAllProfilesApi);
    yield put(getProfilesSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* createProfileSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(createProfileApi, body);
    console.log("data", data);
    yield put(getCurrentProfileSuccess(data));
    yield put(setAlert("Profile Created", "success", { id: uuid.v4() }));
  } catch (err) {
    yield put(
      setAlert("Profile creation/updation failed", "error", { id: uuid.v4() })
    );
  }
}

function* addWatchListSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(addWatchListApi, body);
    yield put(addWatchListSuccess(data));
    yield put(
      setAlert("Anime added to watchlist", "success", { id: uuid.v4() })
    );
    yield put(getCurrentProfile());
  } catch (err) {
    console.log(err);
  }
}

function* removeWatchListSaga(action) {
  const { id } = action;
  try {
    yield call(removeWatchlistApi, id);
    yield put(removeWatchListSuccess(id));
    yield put(setAlert("Removed from watchlist", "success", { id: uuid.v4() }));
  } catch (e) {
    yield put(setAlert("Failed to remove", "error", { id: uuid.v4() }));
  }
}

function* getProfileByIdSaga(action) {
  const { id } = action;
  try {
    const { data } = yield call(getProfileByIdApi, id);
    yield put(getCurrentProfileSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
  yield takeLatest(GET_PROFILE_BY_ID, getProfileByIdSaga);
  yield takeLatest(CREATE_PROFILE, createProfileSaga);
  yield takeLatest(GET_PROFILES, getProfilesSaga);
  yield takeLatest(WATCHLIST_ADD, addWatchListSaga);
  yield takeLatest(WATCHLIST_REMOVE, removeWatchListSaga);
}

export default profileSaga;
