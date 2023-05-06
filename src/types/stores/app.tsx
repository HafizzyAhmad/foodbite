export enum ReducerActionType {
  INIT_STATE = 'APP/INIT_STATE',
  INIT_FETCH_STATE = 'APP/INIT_FETCH_STATE',
  COMPLETE_FETCH_STATE = 'APP/COMPLETE_FETCH_STATE',
  LOGOUT = 'APP/LOGOUT',
}

export interface IAppStore {
  isInitializing: boolean;
  version: string;
  theme: string;
  isAuthenticated: boolean;
  token: string;
}

export type AppReducerAction = {
  type: ReducerActionType;
  payload?: any;
};
