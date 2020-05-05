import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SubjectTableDataState } from "./subjectTableData.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";

export const getSubjectTableDataState = createFeatureSelector<SubjectTableDataState>(EntitiesNames.SubjectTableData);

export const getIsSubjectTableDataReady = createSelector(
  getSubjectTableDataState,
  (state) => state.dataReady,
);
