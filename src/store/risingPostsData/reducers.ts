import {
  RISING_POSTS_REQUEST,
  RISING_POSTS_REQUEST_AFTER,
  RISING_POSTS_REQUEST_COUNT,
  RISING_POSTS_REQUEST_ERROR,
  RISING_POSTS_REQUEST_SUCCESS
} from "../actions";
import {
  RisingPostsRequestAction,
  RisingPostsRequestAfterAction,
  RisingPostsRequestCountAction,
  RisingPostsRequestErrorAction,
  RisingPostsRequestSuccessAction
} from "./actions";


export type RisingPostsState = {
  loading: boolean;
  error: string;
  after: string;
  count: number;
  data: Array<IRisingPostsData>;
}

export interface IRisingPostsData {
  id: string;
  author: string;
  title: string;
  rating: number;
  avatar: string;
  previewImg: string;
  datePostUtc: number;
}

type RisingPostsAction = RisingPostsRequestAction
  | RisingPostsRequestSuccessAction
  | RisingPostsRequestErrorAction
  | RisingPostsRequestAfterAction
  | RisingPostsRequestCountAction

export const risingPostsReducer = (
  state: RisingPostsState,
  action: RisingPostsAction
) => {
  switch (action.type) {
    case RISING_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case RISING_POSTS_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case RISING_POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    case RISING_POSTS_REQUEST_AFTER:
      return {
        ...state,
        after: action.after,
        loading: false,
      }
    case RISING_POSTS_REQUEST_COUNT:
      return {
        ...state,
        count: action.count,
        loading: false,
      }
    default:
      return state;
  }
}