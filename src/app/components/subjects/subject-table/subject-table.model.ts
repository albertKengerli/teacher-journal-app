import { СolumnNames } from "../../../common/constants/tableColumnNames";

export const defaultColumnsNames: string[] = [
  СolumnNames.Name,
  СolumnNames.Surname,
  СolumnNames.AverageGrade,
];

export const subjectTablePaginationStep: number = 5;

export interface SubjectTableDateObject {
  string: string;
  number: number;
}
