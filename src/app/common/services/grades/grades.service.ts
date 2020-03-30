import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";

import { Grade } from "../../entities/grades";
import { GradeOperations } from "../../constants/gradesConstants";

import { Store, select } from "@ngrx/store";
import { AppState, getEditableGradeById } from "../../../store";
import * as GradesActions from "../../../store/grades/grades.actions";
import { take, filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GradesService {
  private url: string = "http://localhost:3004/grades";

  private gradesToSend: { [operation: string]: Set<number> } = {
    [GradeOperations.Delete]: new Set(),
    [GradeOperations.Post]: new Set(),
    [GradeOperations.Update]: new Set(),
  };

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
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

  public prepareGradeForSending(gradeId: number, operation: string): void {
    this.gradesToSend[GradeOperations.Post].delete(gradeId);
    this.gradesToSend[GradeOperations.Update].delete(gradeId);
    this.gradesToSend[GradeOperations.Delete].delete(gradeId);

    if (operation !== GradeOperations.Remove) {
      this.gradesToSend[operation].add(gradeId);
    }
  }

  public emptyPreparedGrades(): void {
    this.gradesToSend[GradeOperations.Delete].clear();
    this.gradesToSend[GradeOperations.Post].clear();
    this.gradesToSend[GradeOperations.Update].clear();
  }

  public sendPreparedGrades(): void {
    this.gradesToSend[GradeOperations.Delete].forEach( gradeId => {
      this.store.dispatch(GradesActions.deleteGrade({ id: gradeId }));
    });

    this.gradesToSend[GradeOperations.Post].forEach( gradeId => {
      this.store.pipe(
        select(getEditableGradeById, { id: gradeId }),
        filter(grade => grade !== undefined),
        take(1),
      ).subscribe(grade => this.store.dispatch(GradesActions.addGrade({ grade })));
    });

    this.gradesToSend[GradeOperations.Update].forEach( gradeId => {
      this.store.pipe(
        select(getEditableGradeById, { id: gradeId }),
        filter(grade => grade !== undefined),
        take(1),
      )
        .subscribe(grade => this.store.dispatch(GradesActions.updateGrade({ id: gradeId, grade })));
    });

    this.emptyPreparedGrades();
  }
}
