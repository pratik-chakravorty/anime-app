import { takeLatest, put, call } from "redux-saga/effects";
import uuid from "uuid";
import {
  GET_PROFILE,
  GET_PROFILES,
  CREATE_PROFILE,
  WATCHLIST_ADD
} from "../actions/constants";

import { setAlert } from "../actions/alertAction";
import {
  getCurrentProfileApi,
  getAllProfilesApi,
  createProfileApi,
  addWatchListApi
} from "../api";
import {
  getCurrentProfile,
  getCurrentProfileSuccess,
  getCurrentProfilesSuccess,
  addWatchListSuccess
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
    yield put(getCurrentProfilesSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* createProfileSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(createProfileApi, body);
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

function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
  yield takeLatest(CREATE_PROFILE, createProfileSaga);
  yield takeLatest(GET_PROFILES, getProfilesSaga);
  yield takeLatest(WATCHLIST_ADD, addWatchListSaga);
}

export default profileSaga;
