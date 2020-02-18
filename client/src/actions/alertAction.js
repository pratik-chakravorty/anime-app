import { SET_ALERT, REMOVE_ALERT } from "./constants";

export const setAlert = (msg, alertType, { id }) => {
  return {
    type: SET_ALERT,
    payload: { msg, alertType, id }
  };
};

export const removeAlert = id => ({
  type: REMOVE_ALERT,
  payload: id
});
