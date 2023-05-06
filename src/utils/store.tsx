import { IStore } from '../types/utils/store';

/**
 * this object is created as workaround to access useReducer
 * from outside React Component
 */
const store: IStore = {
  isReady: false,
  dispatch: () => null,
};

export default store;
