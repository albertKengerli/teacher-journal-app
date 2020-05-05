import { createAction, props } from "@ngrx/store";

import { Student } from "../../common/entities/student";

/* tslint:disable:typedef */
export const addStudentsAndDates = createAction(
  "[Subject-Table Data] ADD_DATA",
  props<{ studentsWithGrades: Student[], dates: Date[] }>()
);

export const resetSubjectTableData = createAction("[Subject-Table Data] RESET");
