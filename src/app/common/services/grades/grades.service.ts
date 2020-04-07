import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";

import { Grade } from "../../entities/grades";

@Injectable({
  providedIn: "root"
})
export class GradesService {
  private url: string = "http://localhost:3004/grades";

  constructor(
    private http: HttpClient,
  ) { }

  public getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url);
  }

  public postGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.url, grade);
  }

  public getStudentGrades(studentId: number): Observable<Grade[]> {
    const currentUrl: string = `${this.url}?studentId=${studentId}`;
    return this.http.get<Grade[]>(currentUrl);
  }

  public getSubjectGrades(subjectId: number): Observable<Grade[]> {
    const currentUrl: string = `${this.url}?subjectId=${subjectId}`;
    return this.http.get<Grade[]>(currentUrl);
  }

  public deleteGrade(gradeId: number): Observable<object> {
    const currentURL: string = `${this.url}/${gradeId}`;
    return this.http.delete<object>(currentURL);
  }

  public deleteSubjectGrades(subjectId: number): void {
    this.getSubjectGrades(subjectId)
      .subscribe(grades => {
        grades.forEach(grade => {
          this.deleteGrade(grade.id).subscribe();
        });
      });
  }

  public deleteStudentGrades(studentId: number): void {
    this.getStudentGrades(studentId)
      .subscribe(grades => {
        grades.forEach(grade => {
          this.deleteGrade(grade.id).subscribe();
        });
      });
  }

  public updateGrade(gradeId: number, grade: Grade): Observable<Grade> {
    const updateURL: string = `${this.url}/${gradeId}`;
    return this.http.put<Grade>(updateURL, grade);
  }

  public getGradeByStudentSubjectDate(
    studentId: number,
    subjectId: number,
    date: number
  ): Observable<Grade[]> {
    const findGradeURL: string = `${this.url}?studentId=${studentId}&subjectId=${subjectId}&date=${date}`;
    return this.http.get<Grade[]>(findGradeURL);
  }
}
