import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Grade } from "../../common/entities/grades";
import { GradesState } from "./grades.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";

import * as GradeUtility from "../../common/helpers/GradeUtility";

/* tslint:disable:typedef */
export const getGradesState = createFeatureSelector<GradesState>(EntitiesNames.Grades);

export const getGradesData = createSelector(
  getGradesState,
  (state: GradesState) => state.data,
);

export const getSubjectGrades = createSelector(
  getGradesState,
  (state: GradesState, props: { subjectId: number }) => {
    return state.data.filter(grade => grade.subjectId === props.subjectId);
  }
);

export const getGradeByProperties = createSelector(
  getGradesState,
  (state: GradesState, props: Grade) => {
    return state.data.find( grade => GradeUtility.areGradesInterchangeable(grade, props));
  }
);
