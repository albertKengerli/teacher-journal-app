import { createFeatureSelector, createSelector } from "@ngrx/store";

import { StudentsState } from "./students.state";

import { entitiesNames } from "../../common/constants/entitiesNames";

/* tslint:disable:typedef */
export const getStudentsState = createFeatureSelector<StudentsState>(entitiesNames.students);
export const getStudentsData = createSelector(
  getStudentsState,
  (state: StudentsState) => state.data,
);
