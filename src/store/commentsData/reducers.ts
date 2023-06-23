import {
  CommentsRequestAction,
  CommentsRequestErrorAction,
  CommentsRequestSuccessAction
} from "./actions";
import {
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_ERROR,
  COMMENTS_REQUEST_SUCCESS
} from "../actions";

export type CommentsState = {
  loading: boolean;
  error: string;
  data: Array<ICommentsData>;
}

export interface ICommentsData {
  id: string;
  parentId: string;
  name: string;
  replies: Array<ICommentsData>;
  body: string;
  datePostUtc: number;
}


type CommentsAction = CommentsRequestAction
  | CommentsRequestSuccessAction
  | CommentsRequestErrorAction

export const commentsReducer = (
  state: CommentsState,
  action: CommentsAction
) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    default:
      return state;
  }
}