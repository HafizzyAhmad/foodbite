import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { IAllStateStores } from '../types/stores/main';
import { initialState } from '../stores';
import { appReducers } from '../stores/reducers';
import Storage from '../libs/storage';
import { completeFetchState, initFetchState, initState } from '../stores/app';
import store from '../utils/store';

/**
 * initiate React context, be careful with the data type declared inside
 * this variable
 */

const Store: React.Context<[IAllStateStores, React.Dispatch<any>]> =
  createContext<[IAllStateStores, React.Dispatch<any>]>([
    initialState,
    () => null,
  ]);
Store.displayName = 'Store';

/**
 * to allow usage of useStore in different screens
 * @returns [IAllStateStores, React.Dispatch<any>]
 */
export const useStore: () => [IAllStateStores, React.Dispatch<any>] = () =>
  useContext(Store);

/**
 * the main function to use context, persist the data value
 * and update whenever mount
 * @param       param0      child component
 * @returns JSX.Element
 */
export const StoreProvider: ({ children }: any) => JSX.Element = ({
  children,
}) => {
  const [globalState, dispatch] = useReducer(appReducers, initialState);
  // console.log('CHECK STATE: ', globalState);

  async function getPersistState(): Promise<any> {
    try {
      const stores = await Storage.retrieveItem('stores');
      return stores ?? {};
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERROR PERSIST STATE: ', error);
    }
  }

  useEffect(() => {
    async function fetchState(): Promise<void> {
      dispatch(initFetchState());
      const persistValue: IAllStateStores = await getPersistState();
      dispatch(initState(persistValue));
      setTimeout(() => {
        dispatch(completeFetchState());
      }, 4900);
    }
    fetchState();
  }, []);

  useEffect(() => {
    if (globalState) {
      Storage.addItem('stores', globalState);
    }
  }, [globalState]);

  /**
   * this object is created as workaround to access useReducer
   * from outside React Component
   */
  useEffect(() => {
    if (!store.isReady) {
      store.isReady = true;
      store.dispatch = action => dispatch(action);
    }
  }, [dispatch]);

  return (
    <Store.Provider {...{ value: [globalState, dispatch] }}>
      {children}
    </Store.Provider>
  );
};
