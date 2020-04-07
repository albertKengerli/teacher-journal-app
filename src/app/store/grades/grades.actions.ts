import { createAction, props } from "@ngrx/store";

import { Grade } from "../../common/entities/grades";

/* tslint:disable:typedef */
export const getGrades = createAction("[Grades] GET_GRADES");
export const getGradesSuccess = createAction(
  "[Grades] GET_GRADES_SUCCESS",
  props<{ grades: Grade[] }>()
);

export const addGrade = createAction(
  "[Grades] ADD_GRADE",
  props<{ grade: Grade }>()
);
export const addGradeSuccess = createAction(
  "[Grades] ADD_GRADE_SUCCESS",
  props<{ grade: Grade }>()
);

export const deleteGrade = createAction(
  "[Grades] DELETE_GRADE",
  props<{ id: number }>()
);
export const deleteGradeSuccess = createAction(
  "[Grades] DELETE_GRADE_SUCCESS",
  props<{ id: number }>()
);

export const updateGrade = createAction(
  "[Grades] UPDATE_GRADE",
  props<{ id: number, grade: Grade }>()
);
export const updateGradeSuccess = createAction(
  "[Grades] UPDATE_GRADE_SUCCESS",
  props<{ id: number, grade: Grade }>()
);
