import axios from "axios";
import {
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS
} from "../actions";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { IPostsData } from "./reducers";

export type PostsRequestAction = {
  type: typeof POSTS_REQUEST;
}
export const postsRequest: ActionCreator<PostsRequestAction> = () => ({
  type: POSTS_REQUEST,
})

export type PostsRequestSuccessAction = {
  type: typeof POSTS_REQUEST_SUCCESS;
  data: IPostsData;
}
export const postsRequestSuccess: ActionCreator<PostsRequestSuccessAction> = (data: IPostsData) => ({
  type: POSTS_REQUEST_SUCCESS,
  data,
})

export type PostsRequestErrorAction = {
  type: typeof POSTS_REQUEST_ERROR;
  error: string;
}
export const postsRequestError: ActionCreator<PostsRequestErrorAction> = (error: string) => ({
  type: POSTS_REQUEST_ERROR,
  error,
})

export const postsRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  if (getState().token && getState().token.length > 0 && getState().token !== 'undefined') {
    dispatch(postsRequest())
    axios.get('https://oauth.reddit.com/best.json?sr_detail=true', {
      headers: { Authorization: `bearer ${getState().token}` }
    })
      .then((resp) => {
        const postsData = resp.data.data.children.map(
          (item: { data: any }) => ({
            id: item.data.id,
            author: item.data.author,
            title: item.data.title,
            rating: item.data.ups,
            avatar: item.data.sr_detail.icon_img
              ? item.data.sr_detail.icon_img
              : "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png",
            previewImg: item.data.preview
              ? item.data.preview.images?.[0].source.url.replace(
                /(\&amp\;)/g,
                "&"
              )
              : 'https://cdn.dribbble.com/userupload/6189449/file/original-95b7e7d207e93d84986b86368d205705.jpg?compress=1&resize=752x',
            datePostUtc: item.data.created_utc * 1000,
          })
        );
        dispatch(postsRequestSuccess(postsData))
      })
      .catch((error) => {
        console.log(error);
        dispatch(postsRequestError(String(error)))
      })
  }
}
