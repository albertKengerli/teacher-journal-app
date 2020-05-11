import { Action, createReducer, on } from "@ngrx/store";

import * as EditableGradesActions from "./editableGrades.actions";
import { EditableGradesState, initialEditableGradesState } from "./editableGrades.state";

import { Grade } from "../../common/entities/grades";

const reducer = createReducer(
  initialEditableGradesState,

  on(EditableGradesActions.addEditableGrades, (state, { grades }) => {
    return {
      ...state,
      data: grades,
      initialData: grades,
    };
  }),

  on(EditableGradesActions.postEditableGrade, (state, { grade }) => {
    const newData: Grade[] = [...state.data, grade];

    return {
      ...state,
      data: newData,
    };
  }),

  on(EditableGradesActions.updateEditableGrade, (state, { id, newGrade }) => {
    const newData: Grade[] = [...state.data];

    const updatingGradeIndex: number = newData.findIndex( grade => grade.id === id);
    newData[updatingGradeIndex] = newGrade;

    return {
      ...state,
      data: newData,
    };
  }),

  on(EditableGradesActions.resetEditableGrades, (state) => {
    return initialEditableGradesState;
  }),
);

export function editableGradesReducer(state: EditableGradesState | undefined, action: Action) {
  return reducer(state, action);
}
