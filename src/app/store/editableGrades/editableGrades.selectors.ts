import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EditableGradesState } from "./editableGrades.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";
import { Grade } from "../../common/entities/grades";

/* tslint:disable:typedef */
export const getEditableGradesState = createFeatureSelector<EditableGradesState>(EntitiesNames.EditableGrades);

export const getEditableGradeIdByProperties = createSelector(
  getEditableGradesState,

  (state: EditableGradesState, props: {
    studentId: number,
    subjectId: number,
    date: number,
  }) => {
    const requiredGrade: Grade = state.initialData.find( grade => {
      if (
        grade.studentId === props.studentId &&
        grade.subjectId === props.subjectId &&
        grade.date === props.date
      ) {
        return true;
      }
    });

    return requiredGrade?.id || null;
  }
);

export const getEditableGradeById = createSelector(
  getEditableGradesState,

  (state: EditableGradesState, props: {id: number}) => {
    return state.data.find(grade => grade.id === props.id);
  },
);
