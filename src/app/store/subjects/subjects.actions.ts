import { createAction, props } from "@ngrx/store";

import { Subject } from "../../common/entities/subject";

export const getSubjects = createAction("[Subjects] GET_SUBJECTS");
export const getSubjectsSuccess = createAction(
  "[Subjects] GET_SUBJECTS_SUCCESS",
  props<{ subjects: Subject[] }>()
);

export const addSubject = createAction(
  "[Subjects] ADD_SUBJECTS",
  props<{ subject: Subject }>()
);
export const addSubjectSuccess = createAction(
  "[Subjects] ADD_SUBJECTS_SUCCESS",
  props<{ subject: Subject }>()
);

export const deleteSubject = createAction(
  "[Subjects] DELETE_SUBJECT",
  props<{ id: number }>()
);
export const deleteSubjectSuccess = createAction(
  "[Subjects] DELETE_SUBJECT_SUCCESS",
  props<{ id: number }>()
);

export const updateSubject = createAction(
  "[Subjects] UPDATE_SUBJECT",
  props<{ id: number, subject: Subject }>()
);
export const updateSubjectSuccess = createAction(
  "[Subjects] UPDATE_SUBJECT_SUCCESS",
  props<{ id: number, subject: Subject }>()
);
