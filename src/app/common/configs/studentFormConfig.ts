import { FormField } from "../entities/formField";
import { ValidationErrorTranslationKeys, validationExpressions } from "../constants/validation";

const name: FormField = new FormField({
  name: "name",
  label: "FORM.STUDENT_NAME_LABEL",
  placeholder: "FORM.STUDENT_NAME_PLACEHOLDER",
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: ValidationErrorTranslationKeys.AlphabetAndSpecialCharacters,
});

const surname: FormField = new FormField({
  name: "surname",
  label: "FORM.STUDENT_SURNAME_LABEL",
  placeholder: "FORM.STUDENT_SURNAME_PLACEHOLDER",
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: ValidationErrorTranslationKeys.AlphabetAndSpecialCharacters,
});

const address: FormField = new FormField({
  name: "address",
  label: "FORM.ADDRESS_LABEL",
  placeholder: "FORM.ADDRESS_PLACEHOLDER",
});

const description: FormField = new FormField({
  name: "description",
  type: "text-area",
  label: "FORM.STUDENT_DESCRIPTION_LABEL",
  placeholder: "FORM.STUDENT_DESCRIPTION_PLACEHOLDER",
});

export const studentFormFieldList: FormField[] = [ name, surname, address, description ];
