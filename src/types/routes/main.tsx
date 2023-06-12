import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
// import { IOrderResponse } from '../stores/order';

/**
 * specify undefined inside the component indicates that the route
 * doesn't have params. For more info about React Navigation Typescript
 * checking, go to this url https://reactnavigation.org/docs/typescript
 */

export type HomeTabParamList = {
  Home: undefined;
  FoodBite: undefined;
  Profile: undefined;
};

/**
 * specify undefined inside the component indicates that the route
 * doesn't have params. For more info about React Navigation Typescript
 * checking, go to this url https://reactnavigation.org/docs/typescript
 */

export type RootStackParamList = {
  Tab: NavigatorScreenParams<HomeTabParamList>;
  DonateForm: any;
  RequestForm: any;
  Complete: undefined;
};

/**
 * type checking navigation between stack to stack (key stack)
 * follow documentation from React Navigation, refer here
 * https://reactnavigation.org/docs/typescript#organizing-types
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

/**
 * type checking nesting navigation from tab to stack (key tab)
 * follow documentation from React Navigation, refer here
 * https://reactnavigation.org/docs/typescript#organizing-types
 */
export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * type checking nesting navigation from stack to tab (key stack)
 * follow documentation from React Navigation, refer here
 * https://reactnavigation.org/docs/typescript#organizing-types
 */
export type StackTabScreenProps<T extends keyof RootStackParamList> =
  CompositeScreenProps<
    StackScreenProps<RootStackParamList, T>,
    BottomTabScreenProps<HomeTabParamList>
  >;

/**
 * Specifying a global type for your root navigator would
 * avoid manual annotations in many places
 */
declare global {
  namespace ReactNavigation {
    type RootParamListProps = RootStackParamList;
  }
}
