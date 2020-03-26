import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpClient } from "@angular/common/http";

import { Grade } from "../../entities/grades";
import * as GradeFunctions from "../../helpers/gradeFunctions";

enum GradeOperations {
  Delete = "toDelete",
  Post = "toPost",
  Put = "toPut"
}

@Injectable({
  providedIn: "root"
})
export class GradesService {
  private url: string = "http://localhost:3004/grades";
  private gradesToSend: { [operation: string]: Grade[] } = {
    [GradeOperations.Delete]: [],
    [GradeOperations.Post]: [],
    [GradeOperations.Put]: [],
  };

  constructor(private http: HttpClient) { }

  private addGradeForOperation(gradeToAdd: Grade, operation: string): void {
    const operationArray: Grade[] = this.gradesToSend[operation];

    for (let i: number = 0; i < operationArray.length; i++) {
      let currentGrade: Grade = operationArray[i];
      if (GradeFunctions.areGradesInterchangeable(currentGrade, gradeToAdd)) {
        operationArray[i] = gradeToAdd;
        return;
      }
    }

    operationArray.push(gradeToAdd);
  }

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

  public prepareGradeForSending(grade: Grade): void {
    if (!grade.grade) {
      this.addGradeForOperation(grade, GradeOperations.Delete);
      return;
    } else {
      this.getGradeByStudentSubjectDate(grade.studentId, grade.subjectId, grade.date)
          .subscribe(answer => {
            if (answer.length === 0) {
              this.addGradeForOperation(grade, GradeOperations.Post);
            } else {
              this.addGradeForOperation(grade, GradeOperations.Put);
            }
          });
    }
  }

  public emptyPreparedGrades(): void {
    this.gradesToSend[GradeOperations.Delete] = [];
    this.gradesToSend[GradeOperations.Post] = [];
    this.gradesToSend[GradeOperations.Put] = [];
  }

  public sendPreparedGrades(): void {
    this.gradesToSend[GradeOperations.Delete].forEach(grade => {
      this.getGradeByStudentSubjectDate(grade.studentId, grade.subjectId, grade.date)
        .subscribe(answer => {
          this.deleteGrade(answer[0].id).subscribe();
        });
    });

    this.gradesToSend[GradeOperations.Post].forEach(grade => {
      this.postGrade(grade).subscribe();
    });

    this.gradesToSend[GradeOperations.Put].forEach(grade => {
      this.getGradeByStudentSubjectDate(grade.studentId, grade.subjectId, grade.date)
        .subscribe(answer => {
          this.updateGrade(answer[0].id, grade).subscribe();
        });
    });

    this.emptyPreparedGrades();
  }
}
