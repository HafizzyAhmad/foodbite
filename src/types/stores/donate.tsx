export enum PostReducerActionType {
  ADD_POST = 'POST/ADD_POST',
  ADD_POST_SUCCESS = 'POST/ADD_POST_SUCCESS',
  ADD_POST_FAILED = 'POST/ADD_POST_FAILED',
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

export interface IPostStore {
  isLoading: boolean;
  isError: boolean;
}

export type PostReducerAction = {
  type: PostReducerActionType;
  payload?: any;
};
