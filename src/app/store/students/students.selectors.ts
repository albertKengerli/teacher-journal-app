import { createFeatureSelector, createSelector } from "@ngrx/store";

import { StudentsState } from "./students.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";

/* tslint:disable:typedef */
export const getStudentsState = createFeatureSelector<StudentsState>(EntitiesNames.Students);
export const getStudentsData = createSelector(
  getStudentsState,
  (state: StudentsState) => state.data,
);
