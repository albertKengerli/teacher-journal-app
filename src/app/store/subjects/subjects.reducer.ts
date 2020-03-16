import { Action, createReducer, on } from "@ngrx/store";

import * as SubjectsActions from "./subjects.actions";
import { SubjectsState, initialSubjectsState } from "./subjects.state";

import { Subject } from "../../common/entities/subject";

/* tslint:disable:typedef */
const reducer = createReducer(
  initialSubjectsState,

  on(SubjectsActions.getSubjects, state => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(SubjectsActions.getSubjectsSuccess, (state, { subjects }) => {
    return {
      ...state,
      subjects,
      loading: false,
      loaded: true,
    };
  }),

  on(SubjectsActions.addSubjectSuccess, (state, { subject }) => {
    const data: Subject[] = [...state.data, subject];

    return {
      ...state,
      data,
    };
  }),

  on(SubjectsActions.deleteSubjectSuccess, (state, { id }) => {
    const data: Subject[] = [...state.data].filter(subject => subject.id !== id);

    return {
      ...state,
      data,
    };
  }),

  on(SubjectsActions.updateSubjectSuccess, (state, { id, subject }) => {
    const data: Subject[] = [...state.data];
    data[id] = subject;

    return {
      ...state,
      data,
    };
  })
);

export function subjectsReducer(state: SubjectsState | undefined, action: Action) {
  return reducer(state, action);
}
