export enum ReducerActionType {
  INIT_STATE = 'APP/INIT_STATE',
  INIT_FETCH_STATE = 'APP/INIT_FETCH_STATE',
  COMPLETE_FETCH_STATE = 'APP/COMPLETE_FETCH_STATE',
  AUTHENTICATION_SUCCESS = 'APP/AUTHENTICATION_SUCCESS',
  LOGOUT = 'APP/LOGOUT',
}

export interface IAppStore {
  isInitializing: boolean;
  version: string;
  theme: string;
  isAuthenticated: boolean;
  token: string;
  profile: any;
}

export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  token: string;
  user: IUserProfileLogin;
}

export interface IAuthRegisterResponse {
  token: string;
  user: IUserProfileRegister;
}

export interface IUserProfileLogin {
  _id: string;
  username: string;
  email: string;
  role: string;
  password: null;
  created_at: string;
  updated_at: string;
}

export interface IUserProfileRegister {
  _id: string;
  username: string;
  email: string;
  role: string;
  profile: any;
  password: null;
  created_at: string;
  updated_at: string;
}

export type AppReducerAction = {
  type: ReducerActionType;
  payload?: any;
};
