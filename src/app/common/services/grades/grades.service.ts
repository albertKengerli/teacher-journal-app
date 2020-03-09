import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// import { tap } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";

import { Grade } from "../../entities/grades";

@Injectable({
  providedIn: "root"
})
export class GradesService {
  private url: string = "http://localhost:3004/grades";

  constructor(private http: HttpClient) { }

  public getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url);
  }

  public addGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.url, grade);
  }

  public getStudentGrades(studentID: number): Observable<Grade[]> {
    const currentUrl: string = `${this.url}?studentID=${studentID}`;
    return this.http.get<Grade[]>(currentUrl);
  }

  public getSubjectGrades(subjectID: number): Observable<Grade[]> {
    const currentUrl: string = `${this.url}?subjectID=${subjectID}`;
    return this.http.get<Grade[]>(currentUrl);
  }

  public deleteGrade(gradeID: number): Observable<object> {
    const currentURL: string = `${this.url}/${gradeID}`;
    return this.http.delete<object>(currentURL);
  }

  public deleteSubjectGrades(subjectID: number): void {
    this.getSubjectGrades(subjectID)
      .subscribe(grades => {
        grades.forEach(grade => {
          this.deleteGrade(grade.id).subscribe();
        });
      });
  }

  public deleteStudentGrades(studentID: number): void {
    this.getStudentGrades(studentID)
      .subscribe(grades => {
        grades.forEach(grade => {
          this.deleteGrade(grade.id).subscribe();
        });
      });
  }

  public updateGrade(gradeID: number, grade: Grade): Observable<Grade> {
    const updateURL: string = `${this.url}/${gradeID}`;
    return this.http.put<Grade>(updateURL, grade);
  }

  public getGradeByStudentSubjectDate(
    studentID: number,
    subjectID: number,
    date: number
  ): Observable<Grade[]> {
    const findGradeURL: string = `${this.url}?studentID=${studentID}&subjectID=${subjectID}&date=${date}`;
    return this.http.get<Grade[]>(findGradeURL);
  }

  public static getAverageGrade(grades: Grade[]): string {
    const sum: number = grades.reduce( (acc, grade) => acc += grade.grade, 0);
    const average: number = sum / grades.length;
    return average.toFixed(1);
  }
}
