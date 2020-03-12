export const validationExpressions: { [expressionName: string]: RegExp } = {
  numbers: /[0-9]*/i,
  alphabetAndSpecialCharacters: /^[a-z ,.'-]+$/i,
};

export enum validationErrorMessages {
  numbers = "Only 0-9 without spaces is valid room",
  alphabetAndSpecialCharacters = "Only a-z, and special characters are allowed.",
}
