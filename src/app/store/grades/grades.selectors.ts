import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Grade } from "../../common/entities/grades";
import { GradesState } from "./grades.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";

import * as GradesFunctions from "../../common/helpers/gradeFunctions";

/* tslint:disable:typedef */
export const getGradesState = createFeatureSelector<GradesState>(EntitiesNames.Grades);

export const getGradeByProperties = createSelector(
  getGradesState,
  (state: GradesState, props: Grade) => {
    return state.data.find( grade => GradesFunctions.areGradesInterchangeable(grade, props));
  }
);
