import { StudentsState, initialStudentsState } from "./students.state";
import { Action, createReducer, on, ActionReducer } from "@ngrx/store";

import * as StudentsActions from "./students.actions";

import { Student } from "../../common/entities/student";

const reducer = createReducer(
  initialStudentsState,

  on(StudentsActions.getStudents, state => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(StudentsActions.getStudentsSuccess, (state, { students }) => {
    return {
      ...state,
      data: students,
      loading: false,
      loaded: true,
    };
  }),

  on(StudentsActions.addStudentSuccess, (state, { student }) => {
    const data: Student[] = [...state.data, student];

    return {
      ...state,
      data,
    };
  }),

  on(StudentsActions.deleteStudentSuccess, (state, { id }) => {
    const data: Student[] = [...state.data].filter(student => student.id !== id);

    return {
      ...state,
      data,
    };
  }),

  on(StudentsActions.updateStudentSuccess, (state, { id, student }) => {
    const data: Student[] = [...state.data];
    data[id] = student;

    return {
      ...state,
      data,
    };
  })
);

export function studentsReducer(state: StudentsState | undefined, action: Action) {
  return reducer(state, action);
}
