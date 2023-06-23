import {
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS
} from "../actions";
import {
  PostsRequestAction,
  PostsRequestSuccessAction,
  PostsRequestErrorAction
} from "./actions";

export type PostsState = {
  loading: boolean;
  error: string;
  data: Array<IPostsData>;
}

export interface IPostsData {
  id: string;
  author: string;
  title: string;
  rating: number;
  avatar: string;
  previewImg: string;
  datePostUtc: number;
}

type PostsAction = PostsRequestAction
  | PostsRequestSuccessAction
  | PostsRequestErrorAction

export const postsReducer = (
  state: PostsState,
  action: PostsAction
) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    default:
      return state;
  }
}