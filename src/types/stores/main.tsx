import { IAppStore } from './app';
import { IPostStore } from './donate';

export interface IAllStateStores {
  app: IAppStore;
  post: IPostStore;
}
