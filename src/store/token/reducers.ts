import { SET_TOKEN } from "../actions";
import { SetTokenAction } from "./actions";

export type tokenState = {
  token: string;
}

export const tokenReducer = (
  state: tokenState,
  action: SetTokenAction
) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    default:
      return state;
  }
}