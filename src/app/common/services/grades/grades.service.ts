import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import GRADES from '../../data/GRADES.json';

import { GradesObject, Grade } from '../../entities/grades';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  gradesSubject: BehaviorSubject<GradesObject> = new BehaviorSubject(GRADES);

  getGrades(): Observable<GradesObject> {
    return this.gradesSubject.asObservable();
  }

  addGrade(subject: string, grade: Grade):void {
    GRADES[subject].push(grade);
    this.gradesSubject.next(GRADES);
  }

  static getStudentGrades(grades: Grade[], id: string): Grade[] {
    return grades.filter( grade => grade.student === id);
  }

  static getSubjectGrades(grades: GradesObject, subjectID: string): Grade[] {
    return grades[subjectID];
  }

  static getAverageGrade(grades: Grade[]): string {
    const sum = grades.reduce( (acc, grade) => acc += grade.grade, 0);
    const average = sum / grades.length;
    return average.toFixed(1);
  }
}
