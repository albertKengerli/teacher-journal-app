import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SubjectsState } from "./subjects.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";

/* tslint:disable:typedef */
export const getSubjectsState = createFeatureSelector<SubjectsState>(EntitiesNames.Subjects);

export const getSubjectsData = createSelector(
  getSubjectsState,
  (state: SubjectsState) => state.data,
);

export const getSubjectByName = createSelector(
  getSubjectsState,
  (state: SubjectsState, props: { subjectName: string }) => {
    return state.data.find( subject => subject.name === props.subjectName);
  }
);
