import { StudentsState } from "./students/students.state";
import { SubjectsState } from "./subjects/subjects.state";
import { GradesState } from "./grades/grades.state";
import { SubjectTableState } from "./subjectTable/subjectTable.state";

export interface AppState {
  students: StudentsState;
  subjects: SubjectsState;
  grades: GradesState;
  subjectTable: SubjectTableState;
}
