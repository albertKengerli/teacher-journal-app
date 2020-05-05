import { Student } from "../../common/entities/student";

export interface SubjectTableDataState {
  readonly students: Student[];
  readonly dates: Date[];
  readonly dataReady: boolean;
}

export const initialSubjectTableDataState: SubjectTableDataState = {
  students: [],
  dates: [],
  dataReady: false,
};
