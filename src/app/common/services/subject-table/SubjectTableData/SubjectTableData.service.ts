import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, combineLatest, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { AppState, getStudentsData, getSubjectGrades } from "../../../../store";
import * as StudentsActions from "../../../../store/students/students.actions";
import * as GradesActions from "../../../../store/grades/grades.actions";
import * as EditableGradesActions from "../../../../store/editableGrades/editableGrades.actions";

import { Student } from "../../../entities/student";
import { Grade } from "../../../entities/grades";

@Injectable({
  providedIn: "root"
})
export class SubjectTableDataService {
  private tableDataSubscription: Subscription;
  private studentsWithGrades: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  private isDataReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subjectId: number;
  private dates: Date[] = [];
  private datesList: number[] = [];

  public isInited: boolean = false;

  constructor(
    private store: Store<AppState>,
  ) {}

  private addGradesToStudents([students, subjectGrades]: [Student[], Grade[]]): void {
    this.store.dispatch(EditableGradesActions.addEditableGrades({ grades: subjectGrades }));
    const studentsWithGrades: Student[] = students.map( student => {
      const currentStudent: Student = {...student};

      const studentsGrades: Grade[] = subjectGrades.filter( grade => grade.studentId === student.id);
      let gradesSum: number = 0;

      studentsGrades.forEach(grade => {
        if (!this.datesList.includes(grade.date)) {
          this.dates.push(new Date(grade.date));
          this.datesList.push(grade.date);

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

    this.studentsWithGrades.next(studentsWithGrades);
    this.isDataReady.next(true);
  }

  public initService(subjectId: number): void {
    this.isInited = true;

    this.subjectId = subjectId;
    this.store.dispatch(StudentsActions.getStudents());
    this.store.dispatch(GradesActions.getGrades());

    this.tableDataSubscription = combineLatest(
      this.store.pipe(
        select(getStudentsData),
        filter(students => students.length !== 0),
        take(1),
      ),
      this.store.pipe(
        select(getSubjectGrades, { subjectId: this.subjectId }),
        filter(grades => grades.length !== 0),
        take(1),
      ),
    ).subscribe((data) => this.addGradesToStudents(data));
  }

  public getStudentsWithGrades(): Observable<Student[]> {
    return this.studentsWithGrades.asObservable();
  }

  public getDataReadyObservable(): Observable<boolean> {
    return this.isDataReady.asObservable();
  }

  public getDates(): Date[] {
    return this.dates;
  }

  public resetService(): void {
    this.isInited = false;
    this.tableDataSubscription.unsubscribe();
    this.isDataReady = new BehaviorSubject(false);
    this.studentsWithGrades = new BehaviorSubject([]);
    this.subjectId = null;
    this.dates = [];
    this.datesList = [];
  }
}
