export enum PostReducerActionType {
  ADD_POST = 'POST/ADD_POST',
  ADD_POST_SUCCESS = 'POST/ADD_POST_SUCCESS',
  ADD_POST_FAILED = 'POST/ADD_POST_FAILED',
  GET_POST_BY_COORDINATE = 'POST/GET_POST_BY_COORDINATE',
  GET_POST_BY_COORDINATE_SUCCESS = 'POST/GET_POST_BY_COORDINATE_SUCCESS',
  GET_POST_BY_COORDINATE_FAILED = 'GET_POST_BY_COORDINATE_FAILED',
}

export interface IFoodItem {
  id: string;
  name: string;
  price: string;
}

export interface IPost {
  image: string;
  type: string;
  createdById: string;
  donation: {
    name: string;
    description: string;
  };
  address: string;
  postcode: number;
  city: string;
  state: string;
  mobileNumber: string;
  geoLocation: {
    latitude: string;
    longitude: string;
  };
  statusAvailability: {
    startDateTime: string;
    endDateTime: string;
    status: string;
  };
  items: IFoodItem[];
}

export interface IPostTile {
  _id: string | undefined;
  image: string;
  type: string;
  donation: any;
  updated_at: string;
}

export interface IPostByCoordinateRequest {
  centerLat: number;
  centerLong: number;
  distance: number;
}

export interface IPostStore {
  isLoading: boolean;
  isError: boolean;
}

export type PostReducerAction = {
  type: PostReducerActionType;
  payload?: any;
};
