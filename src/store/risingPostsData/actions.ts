import { ActionCreator } from "redux";
import {
  RISING_POSTS_REQUEST,
  RISING_POSTS_REQUEST_SUCCESS,
  RISING_POSTS_REQUEST_ERROR,
  RISING_POSTS_REQUEST_AFTER,
  RISING_POSTS_REQUEST_COUNT
} from "../actions";
import { IRisingPostsData } from "./reducers";


export type RisingPostsRequestAction = {
  type: typeof RISING_POSTS_REQUEST;
}
export const risingPostsRequest: ActionCreator<RisingPostsRequestAction> = () => ({
  type: RISING_POSTS_REQUEST,
})

export type RisingPostsRequestSuccessAction = {
  type: typeof RISING_POSTS_REQUEST_SUCCESS;
  data: IRisingPostsData;
}
export const risingPostsRequestSuccess: ActionCreator<RisingPostsRequestSuccessAction> = (data: IRisingPostsData) => ({
  type: RISING_POSTS_REQUEST_SUCCESS,
  data,
})

export type RisingPostsRequestAfterAction = {
  type: typeof RISING_POSTS_REQUEST_AFTER;
  after: string;
}

export const risingPostsRequestAfter: ActionCreator<RisingPostsRequestAfterAction> = (after: string) => ({
  type: RISING_POSTS_REQUEST_AFTER,
  after,
})

export type RisingPostsRequestCountAction = {
  type: typeof RISING_POSTS_REQUEST_COUNT;
  count: number;
}

export const risingPostsRequestCount: ActionCreator<RisingPostsRequestCountAction> = (count: number) => ({
  type: RISING_POSTS_REQUEST_COUNT,
  count,
})

export type RisingPostsRequestErrorAction = {
  type: typeof RISING_POSTS_REQUEST_ERROR;
  error: string;
}
export const risingPostsRequestError: ActionCreator<RisingPostsRequestErrorAction> = (error: string) => ({
  type: RISING_POSTS_REQUEST_ERROR,
  error,
})
