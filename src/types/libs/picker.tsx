export interface ICustomPicker {
  placeholder: string;
  value: string | undefined;
  data: any[];
  method: (key: string) => void;
}
