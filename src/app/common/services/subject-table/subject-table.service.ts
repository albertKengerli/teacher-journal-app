import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";

import { Store, select } from "@ngrx/store";
import { AppState, getStudentsData } from "../../../store";
import * as StudentsActions from "../../../store/students/students.actions";

import { Student } from "../../entities/student";
import { Grade } from "../../entities/grades";

import { GradesService } from "../grades/grades.service";

@Injectable({
  providedIn: "root"
})
export class SubjectTableService {
  private studentsWithGrades: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  private subjectID: number;
  private dates: Date[] = [];
  private datesList: number[] = [];

  constructor(
    private gradesService: GradesService,
    private store: Store<AppState>,
  ) {}

  private addGradesToStudents([students, subjectGrades]: [Student[], Grade[]]): void {
    const studentsWithGrades: Student[] = students.map( student => {
      const currentStudent: Student = {...student};

      const studentsGrades: Grade[] = subjectGrades.filter( grade => grade.studentID === student.id);
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
  }

  public serviceInit(subjectID: number): void {
    this.subjectID = subjectID;
    this.store.dispatch(new StudentsActions.GetStudents());

    combineLatest(
      this.store.pipe(select(getStudentsData)),
      this.gradesService.getSubjectGrades(this.subjectID)
    ).subscribe((data) => this.addGradesToStudents(data));
  }

  public getStudentsWithGrades(): Observable<Student[]> {
    return this.studentsWithGrades.asObservable();
  }

  public getDates(): Date[] {
    return this.dates;
  }

}
