import { createAction, props } from "@ngrx/store";

import { Grade } from "../../common/entities/grades";

export const addEditableGrades = createAction(
  "[Editable Grades] ADD_GRADES",
  props<{ grades: Grade []}>()
);

export const updateEditableGrade = createAction(
  "[Editable Grades] UPDATE_GRADE",
  props<{ id: number, newGrade: Grade }>()
);

export const postEditableGrade = createAction(
  "[Editable Grades] ADD_GRADE",
  props<{ grade: Grade }>()
);

export const resetEditableGrades = createAction("[Editable Grades] RESET");
