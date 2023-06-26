import { Reducer } from 'react';
import {
  AppReducerAction,
  IAppStore,
  ReducerActionType,
} from '../types/stores/app';
import packageJSON from '../../package.json';
import { IAllStateStores } from '../types/stores/main';

export const appState: IAppStore = {
  isInitializing: false,
  version: packageJSON.version,
  theme: 'light',
  isAuthenticated: false,
  token: '',
  profile: null,
};

export const initState = (app: any) => {
  return { type: ReducerActionType.INIT_STATE, payload: app };
};

export const initFetchState = () => {
  return { type: ReducerActionType.INIT_FETCH_STATE };
};

export const completeFetchState = () => {
  return { type: ReducerActionType.COMPLETE_FETCH_STATE };
};

export const authenticateSuccess = (profile: any) => {
  return { type: ReducerActionType.AUTHENTICATION_SUCCESS, payload: profile };
};

export const updateProfileSuccess = (profile: any) => {
  return { type: ReducerActionType.UPDATE_PROFILE_SUCCESS, payload: profile };
};

export const logout = () => {
  return { type: ReducerActionType.LOGOUT };
};

export const appReducer: Reducer<IAllStateStores, AppReducerAction> = (
  state: IAllStateStores,
  action: AppReducerAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case ReducerActionType.INIT_STATE:
      return {
        ...payload,
        app: {
          ...payload.app,
          isInitializing: true,
          version: packageJSON.version,
        },
      };
    case ReducerActionType.INIT_FETCH_STATE:
      return {
        ...state,
        app: {
          ...state.app,
          isInitializing: true,
        },
      };
    case ReducerActionType.COMPLETE_FETCH_STATE:
      return { ...state, app: { ...state.app, isInitializing: false } };
    case ReducerActionType.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        app: {
          ...state.app,
          isAuthenticated: true,
          token: payload.token,
          profile: payload.user,
        },
      };
    case ReducerActionType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        app: {
          ...state.app,
          profile: payload,
        },
      };
    case ReducerActionType.LOGOUT:
      return {
        app: appState,
      };
    default:
      return state;
  }
};
