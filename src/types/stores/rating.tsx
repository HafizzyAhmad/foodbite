import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { IPost } from './donate';

export enum RatingReducerActionType {
  ADD_RATING = 'RATE/ADD_RATING',
  ADD_RATING_SUCCESS = 'RATE/ADD_RATING_SUCCESS',
  ADD_RATING_FAILED = 'RATE/ADD_RATING_FAILED',
  FETCH_DONATION_RATING = 'RATE/FETCH_DONATION_RATING',
  FETCH_DONATION_RATING_SUCCESS = 'RATE/FETCH_DONATION_RATING_SUCCESS',
  FETCH_DONATION_RATING_FAILED = 'RATE/FETCH_DONATION_RATING_FAILED',
}

export interface IRating {
  userId: string;
  foodDonation: IPost[];
  ratingScore: Float;
  totalRaters: number;
  reviews: IUserRating[];
}

export interface IUserRating {
  _id: string;
  userId: string;
  ratorUserId: string;
  ratingValue: Float;
  image: string;
  feedback: string;
  created_at: string;
  updated_at: string;
}

export interface IPostRating {
  userId: string;
  ratingScore: Float;
  totalRaters: number;
  reviews: IUserRating[];
}

export interface ISubmitRating {
  userId: string;
  ratorUserId: string;
  ratingValue: number;
  image: string;
  feedback: string;
}

export interface IRateStore {
  isLoading: boolean;
  isError: boolean;
}

export type RatingReducerAction = {
  type: RatingReducerActionType;
  payload?: any;
};
