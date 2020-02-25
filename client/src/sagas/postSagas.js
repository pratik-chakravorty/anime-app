import { call, takeLatest, put } from "redux-saga/effects";
import uuid from "uuid";
import {
  GET_POST_BY_ID,
  SET_LIST_ALERT,
  ADD_POST,
  GET_ALL_POSTS
} from "../actions/constants";

import {
  addPostSuccess,
  getPostByIdSuccess,
  getAllPostsSuccess
} from "../actions/postActions";
import { addPostApi, getAllPostApi, getPostById } from "../api";
import { setAlert } from "../actions/alertAction";

function* alertSaga() {
  yield put(
    setAlert("No recommendation list added", "error", {
      id: uuid.v4()
    })
  );
}

function* addPostSaga(action) {
  const { body } = action;
  try {
    const { data } = yield call(addPostApi, body);
    console.log(data);
    yield put(addPostSuccess(data));
    yield put(setAlert("Post added", "success", { id: uuid.v4() }));
  } catch (e) {
    yield put(setAlert("Failed to add post", "error", { id: uuid.v4() }));
    console.log(e);
  }
}

function* getAllPostSaga() {
  try {
    const { data } = yield call(getAllPostApi);
    yield put(getAllPostsSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* getPostByIdSaga(action) {
  const { id } = action;
  try {
    const { data } = yield call(getPostById, id);
    yield put(getPostByIdSuccess(data));
  } catch (e) {
    console.log(e);
  }
}

function* postSagas() {
  yield takeLatest(GET_ALL_POSTS, getAllPostSaga);
  yield takeLatest(SET_LIST_ALERT, alertSaga);
  yield takeLatest(GET_POST_BY_ID, getPostByIdSaga);
  yield takeLatest(ADD_POST, addPostSaga);
}

export default postSagas;
