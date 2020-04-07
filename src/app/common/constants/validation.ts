export const validationExpressions: { [expressionName: string]: RegExp } = {
  numbers: /[0-9]*/i,
  alphabetAndSpecialCharacters: /^[a-z ,.'-]+$/i,
};

export enum ValidationErrorTranslationKeys {
  Numbers = "FORM.VALIDATION_ERRORS.ONLY_NUMBERS",
  AlphabetAndSpecialCharacters = "FORM.VALIDATION_ERRORS.ONLY_ALPHABET_AND_SPECIALS",
}
