import { Injectable } from "@angular/core";
import { combineLatest, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { AppState, getStudentsData, getSubjectGrades } from "../../../../store";
import * as StudentsActions from "../../../../store/students/students.actions";
import * as GradesActions from "../../../../store/grades/grades.actions";
import * as EditableGradesActions from "../../../../store/editableGrades/editableGrades.actions";
import * as SubjectTableDataActions from "../../../../store/subjectTableData/subjectTableData.actions";

import { Student } from "../../../entities/student";
import { Grade } from "../../../entities/grades";

@Injectable({
  providedIn: "root"
})
export class SubjectTableDataService {
  private tableDataSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {}

  private addGradesToStudents([students, subjectGrades]: [Student[], Grade[]]): void {
    this.store.dispatch(EditableGradesActions.addEditableGrades({ grades: subjectGrades }));

    const dates: Date[] = [];
    const datesList: number[] = [];

    const studentsWithGrades: Student[] = students.map( student => {
      const currentStudent: Student = {...student};

      const studentsGrades: Grade[] = subjectGrades.filter( grade => grade.studentId === student.id);
      let gradesSum: number = 0;

      studentsGrades.forEach(grade => {
        if (!datesList.includes(grade.date)) {
          dates.push(new Date(grade.date));
          datesList.push(grade.date);

        }
        currentStudent[grade.date] = grade.grade;
        gradesSum += grade.grade;
      });

      if (gradesSum === 0) {
        currentStudent.averageGrade = null;
      } else {
        currentStudent.averageGrade = Math.ceil(gradesSum / studentsGrades.length * 100) / 100;
      }

      return currentStudent;
    });

    this.store.dispatch(SubjectTableDataActions.addStudentsAndDates({ studentsWithGrades, dates }));
  }

  public initService(subjectId: number): void {
    this.store.dispatch(StudentsActions.getStudents());
    this.store.dispatch(GradesActions.getGrades());

    this.tableDataSubscription = combineLatest(
      this.store.pipe(
        select(getStudentsData),
        filter(students => students.length !== 0),
        take(1),
      ),
      this.store.pipe(
        select(getSubjectGrades, { subjectId }),
        filter(grades => grades.length !== 0),
        take(1),
      ),
    ).subscribe((data) => this.addGradesToStudents(data));
  }

  public resetService(): void {
    this.tableDataSubscription.unsubscribe();
    this.store.dispatch(SubjectTableDataActions.resetSubjectTableData());
  }
}
