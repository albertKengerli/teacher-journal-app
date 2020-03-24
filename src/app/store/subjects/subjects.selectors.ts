import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SubjectsState } from "./subjects.state";

import { EntitiesNames } from "../../common/constants/entitiesNames";

/* tslint:disable:typedef */
export const getSubjectsState = createFeatureSelector<SubjectsState>(EntitiesNames.Subjects);

export const getSubjectByName = createSelector(
  getSubjectsState,
  (state: SubjectsState, props) => {
    return state.data.find( subject => subject.name === props.name);
  }
);
