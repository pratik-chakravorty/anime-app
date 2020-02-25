import { combineReducers } from "redux";
import animeReducer from "./animeReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  animeState: animeReducer,
  auth: authReducer,
  alerts: alertReducer,
  profile: profileReducer,
  post: postReducer
});

export default rootReducer;
