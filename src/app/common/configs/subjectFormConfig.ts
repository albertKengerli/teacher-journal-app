import { FormField } from "../entities/formField";
import { ValidationErrorTranslationKeys, validationExpressions } from "../constants/validation";

enum TranslationKeys {
  NameLabel = "FORM.SUBJECT_NAME_LABEL",
  NamePlaceholder = "FORM.SUBJECT_NAME_PLACEHOLDER",
  TeacherLabel = "FORM.TEACHER_LABEL",
  TeacherPlaceholder = "FORM.TEACHER_PLACEHOLDER",
  RoomLabel = "FORM.ROOM_LABEL",
  DescriptionLabel = "FORM.SUBJECT_DESCRIPTION_LABEL",
  DescriptionPlaceholder = "FORM.SUBJECT_DESCRIPTION_PLACEHOLDER"
}

const name: FormField = new FormField({
  name: "name",
  label: TranslationKeys.NameLabel,
  placeholder: TranslationKeys.NamePlaceholder,
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: ValidationErrorTranslationKeys.AlphabetAndSpecialCharacters,
});

const teacher: FormField = new FormField({
  name: "teacher",
  label: TranslationKeys.TeacherLabel,
  placeholder: TranslationKeys.TeacherPlaceholder,
  required: true,
  validation: true,
  expression: validationExpressions.alphabetAndSpecialCharacters,
  errorMessage: ValidationErrorTranslationKeys.AlphabetAndSpecialCharacters,
});

const room: FormField = new FormField({
  name: "room",
  label: TranslationKeys.RoomLabel,
  placeholder: "402",
  validation: true,
  expression: validationExpressions.numbers,
  errorMessage: ValidationErrorTranslationKeys.Numbers,
});

const description: FormField = new FormField({
  name: "description",
  type: "text-area",
  label: TranslationKeys.DescriptionLabel,
  placeholder: TranslationKeys.DescriptionPlaceholder,
});

export const subjectFormFieldList: FormField[] = [ name, teacher, room, description ];
