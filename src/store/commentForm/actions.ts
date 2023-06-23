import { ActionCreator } from "redux";
import { UPDATE_COMMENT } from "../actions";

export type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  text: string;
}
export const updateComment: ActionCreator<UpdateCommentAction> = (text) => ({
  type: UPDATE_COMMENT,
  text,
});
