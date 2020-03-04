import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import GRADES from "../../data/GRADES.json";

import { GradesObject, Grade } from "../../entities/grades";

@Injectable({
  providedIn: "root"
})
export class GradesService {
  private gradesSubject: BehaviorSubject<GradesObject>;
  private grades: GradesObject = {} as GradesObject;

  constructor() {
    for (const key of Object.keys(GRADES)) {
      this.grades[key] = GRADES[key].map((grade: Grade) => {
        return {
          student: grade.student,
          date: new Date(grade.date),
          grade: grade.grade,
        };
      });
    }

    this.gradesSubject = new BehaviorSubject(this.grades);
  }

  public getGrades(): Observable<GradesObject> {
    return this.gradesSubject.asObservable();
  }

  public addGrade(subject: string, grade: Grade): void {
    this.grades[subject].push(grade);
    this.gradesSubject.next(this.grades);
  }

  public static getStudentGrades(grades: Grade[], id: string): Grade[] {
    return grades.filter( grade => grade.student === id);
  }

  public static getSubjectGrades(grades: GradesObject, subjectID: string): Grade[] {
    return grades[subjectID];
  }

  public static getAverageGrade(grades: Grade[]): string {
    const sum: number = grades.reduce( (acc, grade) => acc += grade.grade, 0);
    const average: number = sum / grades.length;
    return average.toFixed(1);
  }
}
