import { FormField } from "../entities/formField";
import { ValidationErrorTranslationKeys, validationExpressions } from "../constants/validation";

const name: FormField = new FormField({
  name: "name",
  label: "FORM.SUBJECT_NAME_LABEL",
  placeholder: "FORM.SUBJECT_NAME_PLACEHOLDER",
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: ValidationErrorTranslationKeys.AlphabetAndSpecialCharacters,
});

const teacher: FormField = new FormField({
  name: "teacher",
  label: "FORM.TEACHER_LABEL",
  placeholder: "FORM.TEACHER_PLACEHOLDER",
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: ValidationErrorTranslationKeys.AlphabetAndSpecialCharacters,
});

const room: FormField = new FormField({
  name: "room",
  label: "FORM.ROOM_LABEL",
  placeholder: "402",
  validation: true,
  expression: validationExpressions.numbers,
  errorMessage: ValidationErrorTranslationKeys.Numbers,
});

const description: FormField = new FormField({
  name: "description",
  type: "text-area",
  label: "FORM.SUBJECT_DESCRIPTION_LABEL",
  placeholder: "FORM.SUBJECT_DESCRIPTION_PLACEHOLDER",
});

export const subjectFormFieldList: FormField[] = [ name, teacher, room, description ];
