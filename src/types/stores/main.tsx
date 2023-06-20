import { IAppStore } from './app';
import { IPostStore } from './donate';
import { IRateStore } from './rating';

export interface IAllStateStores {
  app: IAppStore;
  post: IPostStore;
  rate: IRateStore;
}
