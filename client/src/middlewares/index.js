import { removeAlert } from "../actions/alertAction";
export const setLocalStorageMiddleware = store => next => action => {
  if (action.type === "REGISTER_SUCCESS" || action.type === "LOGIN_SUCCESS") {
    localStorage.setItem("token", action.payload.token);
  }
  next(action);
};

export const removeLocalStorageMiddleware = store => next => action => {
  if (action.type === "LOGOUT") {
    localStorage.removeItem("token");
  }
  next(action);
};

export const removeAlertMiddleware = store => next => action => {
  if (action.type === "SET_ALERT") {
    setTimeout(() => {
      store.dispatch(removeAlert(action.payload.id));
    }, 2000);
  }
  next(action);
};
