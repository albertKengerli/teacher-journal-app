import { Student } from "../../common/entities/student";
import { SubjectTableDateObject } from "../../common/entities/subjectTable";
import { defaultColumnsNames } from "../../components/subjects/subject-table/subject-table.model";

export interface SubjectTableState {
  readonly students: Student[];
  readonly existingDates: Date[];
  readonly tableDates: SubjectTableDateObject[];
  readonly selectedDates: SubjectTableDateObject[];
  readonly columnNames: string[];
  readonly ready: boolean;
}

export const initialSubjectTableState: SubjectTableState = {
  students: [],
  existingDates: [],
  tableDates: [],
  selectedDates: [],
  columnNames: [...defaultColumnsNames],
  ready: false,
};
