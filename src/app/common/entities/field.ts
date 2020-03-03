export interface Field {
  name: string;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
  validation: boolean;
  expression?: RegExp;
  errorMessage?: string;
}
