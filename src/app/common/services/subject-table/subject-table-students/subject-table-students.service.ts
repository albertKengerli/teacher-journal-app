import { Injectable } from "@angular/core";
import { combineLatest, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { AppState, getStudentsData, getSubjectGrades } from "../../../../store";
import * as StudentsActions from "../../../../store/students/students.actions";
import * as GradesActions from "../../../../store/grades/grades.actions";
import * as EditableGradesActions from "../../../../store/editableGrades/editableGrades.actions";
import * as SubjectTableActions from "../../../../store/subjectTable/subjectTable.actions";

import { SubjectTableDatesService } from "../subject-table-dates/subject-table-dates.service";

import { Student } from "../../../entities/student";
import { Grade } from "../../../entities/grades";

import { calculateAverageGrade } from "../../../helpers/GradeUtility";

@Injectable({
  providedIn: "root"
})
export class SubjectTableStudentsService {
  private studentsDataSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private tableDatesService: SubjectTableDatesService,
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

      currentStudent.averageGrade = calculateAverageGrade(gradesSum, studentsGrades.length);

      return currentStudent;
    });

    this.store.dispatch(SubjectTableActions.addStudents({ studentsWithGrades }));
    this.tableDatesService.addDates(dates);
  }

  public initService(subjectId: number): void {
    this.store.dispatch(StudentsActions.getStudents());
    this.store.dispatch(GradesActions.getGrades());

    this.studentsDataSubscription = combineLatest(
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
    this.studentsDataSubscription.unsubscribe();
    this.store.dispatch(SubjectTableActions.resetSubjectTable());
  }
}
