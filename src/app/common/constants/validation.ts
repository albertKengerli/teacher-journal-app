export const validationExpressions: { [expressionName: string]: RegExp } = {
  numbers: /[0-9]*/i,
  alphabetAndSpecialCharacters: /^[a-z ,.'-]+$/i,
};

export enum validationErrorTranslationKeys {
  numbers = "FORM.VALIDATION_ERRORS.ONLY_NUMBERS",
  alphabetAndSpecialCharacters = "FORM.VALIDATION_ERRORS.ONLY_ALPHABET_AND_SPECIALS",
}
