import { Reducer } from 'react';
import {
  IPostStore,
  PostReducerAction,
  PostReducerActionType,
} from '../types/stores/donate';
import { IAllStateStores } from '../types/stores/main';

export const postState: IPostStore = {
  isLoading: false,
  isError: false,
};

export const addPost = () => {
  return { type: PostReducerActionType.ADD_POST };
};

export const addPostSuccess = () => {
  return { type: PostReducerActionType.ADD_POST_SUCCESS };
};

export const addPostFailed = () => {
  return { type: PostReducerActionType.ADD_POST_FAILED };
};

export const getPostByCoordinate = () => {
  return { type: PostReducerActionType.GET_POST_BY_COORDINATE };
};

export const getPostByCoordinateSuccess = () => {
  return { type: PostReducerActionType.GET_POST_BY_COORDINATE_SUCCESS };
};

export const getPostByCoordinateFailed = () => {
  return { type: PostReducerActionType.GET_POST_BY_COORDINATE_FAILED };
};

export const postReducer: Reducer<IAllStateStores, PostReducerAction> = (
  state: IAllStateStores,
  action: PostReducerAction,
) => {
  const { type } = action;
  switch (type) {
    case PostReducerActionType.ADD_POST:
      return {
        ...state,
        post: {
          ...state.post,
          isLoading: true,
          isError: false,
        },
      };
    case PostReducerActionType.ADD_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          isLoading: false,
          isError: false,
        },
      };
    case PostReducerActionType.ADD_POST_FAILED:
      return {
        ...state,
        post: {
          ...state.post,
          isLoading: false,
          isError: true,
        },
      };
    case PostReducerActionType.GET_POST_BY_COORDINATE:
      return {
        ...state,
        post: {
          ...state.post,
          isLoading: true,
          isError: false,
        },
      };
    case PostReducerActionType.GET_POST_BY_COORDINATE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          isLoading: false,
          isError: false,
        },
      };
    case PostReducerActionType.GET_POST_BY_COORDINATE_FAILED:
      return {
        ...state,
        post: {
          ...state.post,
          isLoading: false,
          isError: true,
        },
      };
  }
};
