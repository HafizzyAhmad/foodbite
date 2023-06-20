import { IAllStateStores } from '../types/stores/main';
import { appState } from './app';
import { postState } from './post';
import { rateState } from './rate';

const initialState: IAllStateStores = {
  app: { ...appState },
  post: { ...postState },
  rate: { ...rateState },
};

const combineReducers = (reducers: any) => {
  return (state: any, action: any) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};

export { initialState, combineReducers };
