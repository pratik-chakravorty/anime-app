import animeSagas from "./animeSagas";
import authSagas from "./authSagas";
import profileSagas from "./profileSagas";
import postSagas from "./postSagas";

import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([animeSagas(), authSagas(), profileSagas(), postSagas()]);
}

export default rootSaga;
