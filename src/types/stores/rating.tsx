import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { IPost } from './donate';

export enum RatingReducerActionType {}

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

export type RatingReducerAction = {
  type: RatingReducerActionType;
  payload?: any;
};
