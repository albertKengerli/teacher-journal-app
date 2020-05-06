import { Student } from "../../common/entities/student";
import { SubjectTableDateObject } from "../../common/entities/subjectTable";
import { defaultColumnsNames } from "../../components/subjects/subject-table/subject-table.model";

export interface SubjectTableDataState {
  readonly students: Student[];
  readonly existingDates: Date[];
  readonly tableDates: SubjectTableDateObject[];
  readonly selectedDates: SubjectTableDateObject[];
  readonly columnNames: string[];
  readonly dataReady: boolean;
}

export const initialSubjectTableDataState: SubjectTableDataState = {
  students: [],
  existingDates: [],
  tableDates: [],
  selectedDates: [],
  columnNames: [...defaultColumnsNames],
  dataReady: false,
};
