import { Action, createReducer, on } from "@ngrx/store";
import { formatDate } from "@angular/common";

import * as SubjectTableDataActions from "./subjectTable.actions";
import { SubjectTableState, initialSubjectTableState } from "./subjectTable.state";

import { Student } from "../../common/entities/student";
import { SubjectTableDateObject } from "../../common/entities/subjectTable";

import { defaultColumnsNames } from "../../components/subjects/subject-table/subject-table.model";
import { compareDates } from "../../common/helpers/sorting";
import {
  calculateAverageGrade,
  GradeSumAndLength,
  getGradeSumAndLengthForStudent,
} from "../../common/helpers/GradeUtility";

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
    SubjectTableDataActions.updateStudentsGrade,
    (state, { studentId, date, newGrade }) => {
      const students: Student[] = [...state.students];

      const updatedStudentIndex: number = students.findIndex(student => student.id === studentId);
      const studentToUpdate: Student = students.find(student => student.id === studentId);

      let updatedStudent: Student = Object.assign({}, studentToUpdate);

      if (newGrade === null) {
        delete updatedStudent[date];
      } else {
        updatedStudent[date] = newGrade;
      }
      const gradesObject: GradeSumAndLength = getGradeSumAndLengthForStudent(updatedStudent);

      updatedStudent.averageGrade = calculateAverageGrade(gradesObject.gradeSum, gradesObject.gradeQuantity);
      students[updatedStudentIndex] = updatedStudent;

      return {
        ...state,
        students,
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
