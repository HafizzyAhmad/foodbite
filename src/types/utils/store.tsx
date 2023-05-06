export interface IStore {
  isReady: boolean;
  dispatch: (action: { type: string }) => void;
}
