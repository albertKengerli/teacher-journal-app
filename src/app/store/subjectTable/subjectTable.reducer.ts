import { Action, createReducer, on } from "@ngrx/store";
import { formatDate } from "@angular/common";

import * as SubjectTableDataActions from "./subjectTable.actions";
import { SubjectTableState, initialSubjectTableState } from "./subjectTable.state";

import { SubjectTableDateObject } from "../../common/entities/subjectTable";

import { defaultColumnsNames } from "../../components/subjects/subject-table/subject-table.model";
import { compareDates } from "../../common/helpers/sorting";

const reducer = createReducer(
  initialSubjectTableState,

  on(
    SubjectTableDataActions.addStudents,
    (state, { studentsWithGrades }) => {
      return {
        ...state,
        students: studentsWithGrades,
        ready: true,
      };
    }
  ),

  on(
    SubjectTableDataActions.addDates,
    (state, { newDates }) => {
      const combinedDates: Date[] = [...state.existingDates, ...newDates];
      combinedDates.sort(compareDates);

      const newTableDates: SubjectTableDateObject[] = combinedDates.map(date => {
        const current: SubjectTableDateObject = {
          string: formatDate(date, "LL/dd", "en-US"),
          number: date.getTime(),
        };
        return current;
      });

      return {
        ...state,
        existingDates: combinedDates,
        tableDates: newTableDates,
      };
    },
  ),

  on(
    SubjectTableDataActions.selectDates,
    (state, { selectionStart, selectionEnd }) => {
      const selectedDates: SubjectTableDateObject[] = state.tableDates.slice(selectionStart, selectionEnd);

      return {
        ...state,
        selectedDates,
      };
    },
  ),

  on(
    SubjectTableDataActions.setColumnNames,
    (state) => {
      const dateColumnNames: string [] = state.selectedDates.map(selectedDate => {
        const currentDate: Date = new Date(selectedDate.number);
        const formattedDate: string = formatDate(currentDate, "LL/dd", "en-US");
        return formattedDate;
      });

      return {
        ...state,
        columnNames: [...defaultColumnsNames, ...dateColumnNames],
      };
    }
  ),

  on(
    SubjectTableDataActions.resetSubjectTable,
    () => ({
      ...initialSubjectTableState
    })
  ),
);

export function subjectTableReducer(state: SubjectTableState | undefined, action: Action) {
  return reducer(state, action);
}
