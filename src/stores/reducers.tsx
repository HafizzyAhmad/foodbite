import { combineReducers } from './index';
import { appReducer } from './app';
import { postReducer } from './post';

export const appReducers = combineReducers({
  app: appReducer,
  post: postReducer,
});
