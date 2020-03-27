import { Action, createReducer, on } from "@ngrx/store";

import * as GradesActions from "./grades.actions";
import { GradesState, initialGradesState } from "./grades.state";

import { Grade } from "../../common/entities/grades";

/* tslint:disable:typedef */
const reducer = createReducer(
  initialGradesState,

  on(GradesActions.getGrades, state => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(GradesActions.getGradesSuccess, (state, { grades }) => {
    return {
      ...state,
      data: grades,
      loading: false,
      loaded: true,
    };
  }),

  on(GradesActions.addGradeSuccess, (state, { grade }) => {
    const data: Grade[] = [...state.data, grade];

    return {
      ...state,
      data,
    };
  }),

  on(GradesActions.deleteGradeSuccess, (state, { id }) => {
    const data: Grade[] = [...state.data].filter(grade => grade.id !== id);

    return {
      ...state,
      data,
    };
  }),

  on(GradesActions.updateGradeSuccess, (state, { id, grade }) => {
    const data: Grade[] = [...state.data];
    data[id] = grade;

    return {
      ...state,
      data,
    };
  })
);

export function gradesReducer(state: GradesState | undefined, action: Action) {
  return reducer(state, action);
}
