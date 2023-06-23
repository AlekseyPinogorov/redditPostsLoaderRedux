import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ICommentsData } from "./reducers";
import {
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_ERROR,
  COMMENTS_REQUEST_SUCCESS
} from "../actions";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";

export type CommentsRequestAction = {
  type: typeof COMMENTS_REQUEST;
}
export const commentsRequest: ActionCreator<CommentsRequestAction> = () => ({
  type: COMMENTS_REQUEST,
})

export type CommentsRequestSuccessAction = {
  type: typeof COMMENTS_REQUEST_SUCCESS;
  data: ICommentsData;
}
export const commentsRequestSuccess: ActionCreator<CommentsRequestSuccessAction> = (data: ICommentsData) => ({
  type: COMMENTS_REQUEST_SUCCESS,
  data,
})

export type CommentsRequestErrorAction = {
  type: typeof COMMENTS_REQUEST_ERROR;
  error: string;
}
export const commentsRequestError: ActionCreator<CommentsRequestErrorAction> = (error: string) => ({
  type: COMMENTS_REQUEST_ERROR,
  error,
})

function filtredCommentData(arr: any) {
  return arr.map(
    (item: { data: any }) => ({
      id: item.data.id,
      parentId: item.data.parent_id,
      name: item.data.author,
      replies: item.data.replies
        ? filtredCommentData(item.data.replies.data.children)
        : null,
      body: item.data.body,
      datePostUtc: item.data.created_utc * 1000,
    })
  );
}

export const commentsRequestAsync = (id: string): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  if (getState().token && getState().token.length > 0 && getState().token !== 'undefined') {
    dispatch(commentsRequest())
    axios.get(`https://oauth.reddit.com/comments/${id}`, {
      headers: { Authorization: `bearer ${getState().token}` }
    })
      .then((resp) => {
        const commentsData = filtredCommentData(resp.data[1].data.children);
        dispatch(commentsRequestSuccess(commentsData))
      })
      .catch((error) => {
        console.log(error);
        dispatch(commentsRequestError(String(error)))
      })
  }
}
