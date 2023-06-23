import { Reducer } from "redux";
import { UPDATE_COMMENT } from "../actions";
import { UpdateCommentAction } from "./actions";

export type CommentFromState = {
  commentText: string;
}

export const commentFormReducer = (
  state: CommentFromState,
  action: UpdateCommentAction
) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    default:
      return state;
  }
}