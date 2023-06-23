import {
  ME_REQUEST,
  ME_REQUEST_SUCCESS,
  ME_REQUEST_ERROR,
  UPDATE_COMMENT,
  SET_TOKEN,
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_ERROR,
  COMMENTS_REQUEST_SUCCESS,
  RISING_POSTS_REQUEST,
  RISING_POSTS_REQUEST_ERROR,
  RISING_POSTS_REQUEST_SUCCESS,
  RISING_POSTS_REQUEST_AFTER,
  RISING_POSTS_REQUEST_COUNT
} from "./actions";
import { MeRequestAction, MeRequestSuccessAction, MeRequestErrorAction } from "./userData/actions";
import { MeState, meReducer } from "./userData/reducers";
import { SetTokenAction } from "./token/actions";
import { UpdateCommentAction } from "./commentForm/actions";
import { PostsRequestAction, PostsRequestErrorAction, PostsRequestSuccessAction } from "./postsData/actions";
import { PostsState, postsReducer } from "./postsData/reducers";
import { CommentsRequestAction, CommentsRequestSuccessAction, CommentsRequestErrorAction } from "./commentsData/actions";
import { CommentsState, commentsReducer } from "./commentsData/reducers";
import { Reducer } from "redux";
import { RisingPostsState, risingPostsReducer } from "./risingPostsData/reducers";
import { RisingPostsRequestAction, RisingPostsRequestSuccessAction, RisingPostsRequestErrorAction, RisingPostsRequestAfterAction, RisingPostsRequestCountAction } from "./risingPostsData/actions";

export type RootState = {
  commentText: string;
  token: string;
  me: MeState;
  posts: PostsState;
  risingPosts: RisingPostsState;
  comments: CommentsState;
}

const initialState: RootState = {
  commentText: '',
  token: '',
  me: {
    loading: false,
    error: '',
    data: {
      name: '',
      iconImg: '',
    }
  },
  posts: {
    loading: false,
    error: '',
    data: [{
      id: '',
      author: '',
      title: '',
      rating: 0,
      avatar: '',
      previewImg: '',
      datePostUtc: 0,
    }]
  },
  risingPosts: {
    loading: false,
    error: '',
    after: '',
    count: 0,
    data: [{
      id: '',
      author: '',
      title: '',
      rating: 0,
      avatar: '',
      previewImg: '',
      datePostUtc: 0,
    }]
  },
  comments: {
    loading: false,
    error: '',
    data: [{
      id: '',
      parentId: '',
      name: '',
      replies: [],
      body: '',
      datePostUtc: 0,
    }]
  }
}

type RootAction = UpdateCommentAction
  | SetTokenAction
  | MeRequestAction
  | MeRequestSuccessAction
  | MeRequestErrorAction
  | PostsRequestAction
  | PostsRequestSuccessAction
  | PostsRequestErrorAction
  | RisingPostsRequestAction
  | RisingPostsRequestSuccessAction
  | RisingPostsRequestErrorAction
  | RisingPostsRequestAfterAction
  | RisingPostsRequestCountAction
  | CommentsRequestAction
  | CommentsRequestSuccessAction
  | CommentsRequestErrorAction
export const rootReducer: Reducer = (
  state: RootState = initialState,
  action: RootAction) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action)
      }
    case POSTS_REQUEST:
    case POSTS_REQUEST_SUCCESS:
    case POSTS_REQUEST_ERROR:
      return {
        ...state,
        posts: postsReducer(state.posts, action)
      }
    case RISING_POSTS_REQUEST:
    case RISING_POSTS_REQUEST_SUCCESS:
    case RISING_POSTS_REQUEST_ERROR:
    case RISING_POSTS_REQUEST_AFTER:
    case RISING_POSTS_REQUEST_COUNT:
      return {
        ...state,
        risingPosts: risingPostsReducer(state.risingPosts, action)
      }
    case COMMENTS_REQUEST:
    case COMMENTS_REQUEST_SUCCESS:
    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        comments: commentsReducer(state.comments, action)
      }
    default:
      return state;
  }
}