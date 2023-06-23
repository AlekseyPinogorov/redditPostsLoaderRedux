import { Action, ActionCreator } from "redux";
import { SET_TOKEN } from "../actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";

export type SetTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
}
export const setToken: ActionCreator<SetTokenAction> = (token) => ({
  type: SET_TOKEN,
  token,
})

export const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
  const token = window.__token__ || localStorage.getItem("token")
  dispatch(setToken(token));
  if (token) {
    localStorage.setItem("token", token);
  }
}