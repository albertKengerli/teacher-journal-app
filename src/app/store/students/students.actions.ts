import { createAction, props } from "@ngrx/store";

import { Student } from "../../common/entities/student";

export const getStudents = createAction("[Students] GET_STUDENTS");
export const getStudentsSuccess = createAction(
  "[Students] GET_STUDENTS_SUCCESS",
  props<{ students: Student[] }>()
);

export const addStudent = createAction(
  "[Students] ADD_STUDENTS",
  props<{ student: Student }>()
);
export const addStudentSuccess = createAction(
  "[Students] ADD_STUDENTS_SUCCESS",
  props<{ student: Student }>()
);

export const deleteStudent = createAction(
  "[Students] DELETE_STUDENT",
  props<{ id: number }>()
);
export const deleteStudentSuccess = createAction(
  "[Students] DELETE_STUDENT_SUCCESS",
  props<{ id: number }>()
);

export const updateStudent = createAction(
  "[Students] UPDATE_STUDENT",
  props<{ id: number, student: Student }>()
);
export const updateStudentSuccess = createAction(
  "[Students] UPDATE_STUDENT_SUCCESS",
  props<{ id: number, student: Student }>()
);
