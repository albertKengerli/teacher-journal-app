import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SubjectTableState } from "./subjectTable.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";

export const getSubjectTableDataState = createFeatureSelector<SubjectTableState>(EntitiesNames.SubjectTable);

export const getIsSubjectTableReady = createSelector(
  getSubjectTableDataState,
  (state) => state.ready,
);

export const getSubjectTableStudents = createSelector(
  getSubjectTableDataState,
  (state) => state.students,
);

export const getSubjectTableSelectedDates = createSelector(
  getSubjectTableDataState,
  (state) => state.selectedDates,
);

export const getSubjectTableColumnNames = createSelector(
  getSubjectTableDataState,
  (state) => state.columnNames,
);

export const getSubjectTableDatesQuantity = createSelector(
  getSubjectTableDataState,
  (state) => state.tableDates.length,
);

export const getSubjectTableExistingDates = createSelector(
  getSubjectTableDataState,
  (state) => state.existingDates,
);
