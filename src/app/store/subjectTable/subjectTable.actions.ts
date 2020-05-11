import { createAction, props } from "@ngrx/store";

import { Student } from "../../common/entities/student";

export const addStudents = createAction(
  "[Subject-Table] ADD_STUDENTS",
  props<{ studentsWithGrades: Student[] }>()
);

export const addDates = createAction(
  "[Subject-Table] ADD_DATES",
  props<{ newDates: Date[] }>()
);

export const selectDates = createAction(
  "[Subject-Table] SELECT_DATES",
  props<{ selectionStart: number, selectionEnd: number }>()
);

export const setColumnNames = createAction(
  "[Subject-Table] SET_COLUMN_NAMES"
);

export const updateStudentsGrade = createAction(
  "[Subject-Table] UPDATE_STUDENTS_GRADE",
  props<{ studentId: number, date: number, newGrade: number }>()
);

export const resetSubjectTable = createAction(
  "[Subject-Table] RESET"
);
