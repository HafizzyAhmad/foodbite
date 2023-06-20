import { Reducer } from 'react';
import { IAllStateStores } from '../types/stores/main';
import {
  IRateStore,
  RatingReducerAction,
  RatingReducerActionType,
} from '../types/stores/rating';

export const rateState: IRateStore = {
  isLoading: false,
  isError: false,
};

export const addRating = () => {
  return { type: RatingReducerActionType.ADD_RATING };
};

export const addRatingSuccess = () => {
  return { type: RatingReducerActionType.ADD_RATING_SUCCESS };
};

export const addRatingFailed = () => {
  return { type: RatingReducerActionType.ADD_RATING_FAILED };
};

export const getDonationRating = () => {
  return { type: RatingReducerActionType.FETCH_DONATION_RATING };
};

export const getDonationRatingSuccess = () => {
  return { type: RatingReducerActionType.FETCH_DONATION_RATING_SUCCESS };
};

export const getDonationRatingFailed = () => {
  return { type: RatingReducerActionType.FETCH_DONATION_RATING_FAILED };
};

export const rateReducer: Reducer<IAllStateStores, RatingReducerAction> = (
  state: IAllStateStores,
  action: RatingReducerAction,
) => {
  const { type } = action;
  switch (type) {
    case RatingReducerActionType.ADD_RATING:
      return {
        ...state,
        rate: {
          ...state.rate,
          isLoading: true,
          isError: false,
        },
      };
    case RatingReducerActionType.ADD_RATING_SUCCESS:
      return {
        ...state,
        rate: {
          ...state.rate,
          isLoading: false,
          isError: false,
        },
      };
    case RatingReducerActionType.ADD_RATING_FAILED:
      return {
        ...state,
        rate: {
          ...state.rate,
          isLoading: false,
          isError: true,
        },
      };
    case RatingReducerActionType.FETCH_DONATION_RATING:
      return {
        ...state,
        rate: {
          ...state.rate,
          isLoading: true,
          isError: false,
        },
      };
    case RatingReducerActionType.FETCH_DONATION_RATING_SUCCESS:
      return {
        ...state,
        rate: {
          ...state.rate,
          isLoading: false,
          isError: false,
        },
      };
    case RatingReducerActionType.FETCH_DONATION_RATING_FAILED:
      return {
        ...state,
        rate: {
          ...state.rate,
          isLoading: false,
          isError: true,
        },
      };
  }
};
