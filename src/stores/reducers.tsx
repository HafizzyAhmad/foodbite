import { combineReducers } from './index';
import { appReducer } from './app';

export const appReducers = combineReducers({
  app: appReducer,
});
