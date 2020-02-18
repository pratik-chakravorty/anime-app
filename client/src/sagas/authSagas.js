import { takeLatest, call, put, all } from "redux-saga/effects";
import uuid from "uuid";
import {
  REGISTER_USER,
  USER_LOADED,
  LOGIN_USER,
  LOGOUT
} from "../actions/constants";

import { loadUserApi, registerUserApi, loginUserApi } from "../api";

import {
  loadUserSuccess,
  registerSuccess,
  loginSuccess,
  authError,
  loadUser
} from "../actions/authActions";

import { setAlert } from "../actions/alertAction";

function* registerUserSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(registerUserApi, body);
    yield put(registerSuccess(data));
    yield put(loadUser());
    yield put(
      setAlert(`User has been registered and logged in`, "success", {
        id: uuid.v4()
      })
    );
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      yield all(
        errors.map(error =>
          put(setAlert(error.msg, "error", { id: uuid.v4() }))
        )
      );
    }
  }
}

function* loginUserSaga(action) {
  const body = action.body;
  try {
    const { data } = yield call(loginUserApi, body);
    yield put(loginSuccess(data));
    yield put(loadUser());
    yield put(
      setAlert(`User has been logged in`, "success", {
        id: uuid.v4()
      })
    );
  } catch (err) {
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      yield all(
        errors.map(error =>
          put(setAlert(error.msg, "error", { id: uuid.v4() }))
        )
      );
    }
  }
}

function* userLoadedSaga(action) {
  try {
    const { data } = yield call(loadUserApi);
    yield put(loadUserSuccess(data));
  } catch (e) {
    yield put(authError());
  }
}

function* logoutSaga(action) {
  yield put(
    setAlert(`You have been logged out.`, "success", {
      id: uuid.v4()
    })
  );
}

function* authSagas() {
  yield takeLatest(REGISTER_USER, registerUserSaga);
  yield takeLatest(LOGIN_USER, loginUserSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(USER_LOADED, userLoadedSaga);
}

export default authSagas;
