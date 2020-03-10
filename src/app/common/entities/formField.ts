export class FormField {
  public name: string = "EXAMPLE";
  public type: string = "text";
  public label: string = "EXAMPLE";
  public placeholder: string = "EXAMPLE";
  public required: boolean = false;
  public validation: boolean = false;
  public expression: RegExp = null;
  public errorMessage: string = null;

  constructor(params: Partial<FormField>) {
    Object.assign(this, params);
  }
}
