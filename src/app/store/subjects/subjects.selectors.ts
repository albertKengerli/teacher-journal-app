import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SubjectsState } from "./subjects.state";

import { entitiesNames } from "../../common/constants/entitiesNames";

/* tslint:disable:typedef */
export const getSubjectsState = createFeatureSelector<SubjectsState>(entitiesNames.subjects);

export const getSubjectByName = createSelector(
  getSubjectsState,
  (state: SubjectsState, props) => {
    return state.data.find( subject => subject.name === props.name);
  }
);
