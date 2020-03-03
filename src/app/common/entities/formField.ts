export interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
  validation: boolean;
  expression: RegExp;
  errorMessage: string;
}

export class FormFieldCreator {
  private _config: FormField = {
    name: "EXAMPLE",
    type: "text",
    label: "EXAMPLE",
    placeholder: "EXAMPLE",
    required: false,
    validation: false,
    expression: undefined,
    errorMessage: undefined,
  };

  constructor(setupParams: object) {
    for (const key of Object.keys(setupParams)) {
      this._config[key] = setupParams[key];
    }
  }

  get config(): FormField {
    return this._config;
  }
}
