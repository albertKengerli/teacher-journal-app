import { FormField } from "../entities/formField";
import { validationErrorTranslationKeys, validationExpressions } from "../constants/validation";

enum TranslationKeys {
  NameLabel = "FORM.STUDENT_NAME_LABEL",
  NamePlaceholder = "FORM.STUDENT_NAME_PLACEHOLDER",
  SurnameLabel = "FORM.STUDENT_SURNAME_LABEL",
  SurnamePlaceholder = "FORM.STUDENT_SURNAME_PLACEHOLDER",
  AddressLabel = "FORM.ADDRESS_LABEL",
  AddressPlaceholder = "FORM.ADDRESS_PLACEHOLDER",
  DescriptionLabel = "FORM.STUDENT_DESCRIPTION_LABEL",
  DescriptionPlaceholder = "FORM.STUDENT_DESCRIPTION_PLACEHOLDER"
}

const name: FormField = new FormField({
  name: "name",
  label: TranslationKeys.NameLabel,
  placeholder: TranslationKeys.NamePlaceholder,
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: validationErrorTranslationKeys.alphabetAndSpecialCharacters,
});

const surname: FormField = new FormField({
  name: "surname",
  label: TranslationKeys.SurnameLabel,
  placeholder: TranslationKeys.SurnamePlaceholder,
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: validationErrorTranslationKeys.alphabetAndSpecialCharacters,
});

const address: FormField = new FormField({
  name: "address",
  label: TranslationKeys.AddressLabel,
  placeholder: TranslationKeys.AddressPlaceholder,
});

const description: FormField = new FormField({
  name: "description",
  type: "text-area",
  label: TranslationKeys.DescriptionLabel,
  placeholder: TranslationKeys.DescriptionPlaceholder,
});

export const studentFormFieldList: FormField[] = [ name, surname, address, description ];
