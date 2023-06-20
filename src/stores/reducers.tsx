import { combineReducers } from './index';
import { appReducer } from './app';
import { postReducer } from './post';
import { rateReducer } from './rate';

export const appReducers = combineReducers({
  app: appReducer,
  post: postReducer,
  rate: rateReducer,
});
