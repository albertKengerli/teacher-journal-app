import { Action, createReducer, on } from "@ngrx/store";

import * as SubjectTableDataActions from "./subjectTableData.actions";
import { SubjectTableDataState, initialSubjectTableDataState } from "./subjectTableData.state";

const reducer = createReducer(
  initialSubjectTableDataState,

  on(
    SubjectTableDataActions.addStudentsAndDates,
    (state, { studentsWithGrades, dates }) => {
      return {
        ...state,
        students: studentsWithGrades,
        dates,
        dataReady: true,
      };
    }
  ),

  on(
    SubjectTableDataActions.resetSubjectTableData,
    (state) => {
      return {
        ...state,
        students: [],
        dates: [],
        dataReady: false,
      };
    }
  ),
);

export function subjectTableDataReducer(state: SubjectTableDataState | undefined, action: Action) {
  return reducer(state, action);
}
