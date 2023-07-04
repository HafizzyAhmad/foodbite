export type IInputForm = {
  key: string;
  placeholder: string;
  lineNumber?: number;
  isMultiline?: boolean;
  limit?: number;
  data?: any;
  method: ([key]: any) => void;
  value?: any;
  type: string | number;
  isValid?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  minimumDate?: any;
  maximumDate?: any;
  visible?: boolean;
  toggleVisibility?: () => void;
  hideVisibility?: () => void;
};
