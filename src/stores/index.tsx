import { IAllStateStores } from '../types/stores/main';
import { appState } from './app';

const initialState: IAllStateStores = {
  app: { ...appState },
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
