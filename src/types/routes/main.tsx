import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';

/**
 * specify undefined inside the component indicates that the route
 * doesn't have params. For more info about React Navigation Typescript
 * checking, go to this url https://reactnavigation.org/docs/typescript
 */

export type HomeTabParamList = {
  Home: undefined;
  Post: undefined;
  Profile: undefined;
};

/**
 * specify undefined inside the component indicates that the route
 * doesn't have params. For more info about React Navigation Typescript
 * checking, go to this url https://reactnavigation.org/docs/typescript
 */

export type RootStackParamList = {
  Tab: NavigatorScreenParams<HomeTabParamList>;
  Address: undefined;
};

/**
 * follow documentation from React Navigation, refer here
 * https://reactnavigation.org/docs/typescript#organizing-types
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

/**
 * follow documentation from React Navigation, refer here
 * https://reactnavigation.org/docs/typescript#organizing-types
 */
export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

/**
 * Specifying a global type for your root navigator would
 * avoid manual annotations in many places
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
