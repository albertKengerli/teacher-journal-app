import { createAction, props } from "@ngrx/store";

import { Student } from "../../common/entities/student";
import { SubjectTableDateObject } from "../../common/entities/subjectTable";

/* tslint:disable:typedef */
export const addStudents = createAction(
  "[Subject-Table Data] ADD_STUDENTS",
  props<{ studentsWithGrades: Student[] }>()
);

export const addDates = createAction(
  "[Subject-Table Data] ADD_DATES",
  props<{ newDates: Date[] }>()
);

export const selectDates = createAction(
  "[Subject-Table Data] SELECT_DATES",
  props<{ selectionStart: number, selectionEnd: number }>()
);

export const setColumnNames = createAction(
  "[Subject-Table Data] SET_COLUMN_NAMES"
);

export const resetSubjectTableData = createAction(
  "[Subject-Table Data] RESET"
);
