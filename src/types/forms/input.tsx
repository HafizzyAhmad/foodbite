export type IInputForm = {
  key: string;
  placeholder: string;
  lineNumber?: number;
  isMultiline?: boolean;
  limit?: number;
  data?: any;
  method: ([key]: any) => void;
  value?: string;
  type: string;
  isValid?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  minimumDate?: any;
  maximumDate?: any;
  visible?: boolean;
  toggleVisibility?: () => void;
  hideVisibility?: () => void;
};
