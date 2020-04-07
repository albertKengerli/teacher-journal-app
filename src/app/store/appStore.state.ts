import { StudentsState } from "./students/students.state";
import { SubjectsState } from "./subjects/subjects.state";
import { GradesState } from "./grades/grades.state";

export interface AppState {
  students: StudentsState;
  subjects: SubjectsState;
  grades: GradesState;
}
