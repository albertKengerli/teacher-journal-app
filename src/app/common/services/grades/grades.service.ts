import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import GRADES from "../../data/GRADES.json";

import { GradesObject, Grade } from "../../entities/grades";

@Injectable({
  providedIn: "root"
})
export class GradesService {
  public gradesSubject: BehaviorSubject<GradesObject> = new BehaviorSubject(GRADES);

  public getGrades(): Observable<GradesObject> {
    return this.gradesSubject.asObservable();
  }

  public addGrade(subject: string, grade: Grade): void {
    GRADES[subject].push(grade);
    this.gradesSubject.next(GRADES);
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
