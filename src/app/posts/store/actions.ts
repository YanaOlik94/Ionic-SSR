import {createAction, props} from "@ngrx/store";
import {PostInterface} from "../types/post.interface";
import {ActionTypes} from "./action.types";

export const getPosts = createAction(
  ActionTypes.GET_POSTS
);

export const getPostsSuccess = createAction(
  ActionTypes.GET_POSTS_SUCCESS,
  props<{ posts: PostInterface[] }>()
);

export const getPostsFailure = createAction(
  ActionTypes.GET_POSTS_FAILURE,
  props<{ error: string }>()
);

export const addPost = createAction(
  ActionTypes.ADD_POST,
  props<{ post: PostInterface }>()
)

export const getPost = createAction(
  ActionTypes.GET_POST_BY_ID,
  props<{  post: PostInterface }>()
)

