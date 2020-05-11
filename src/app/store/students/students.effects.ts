import { Injectable } from "@angular/core";

import { Action } from "@ngrx/store";
import { Actions , Effect, ofType } from "@ngrx/effects";

import { Observable } from "rxjs";
import { switchMap, map, pluck, tap } from "rxjs/operators";

import * as StudentsActions from "./students.actions";

import { StudentService } from "../../common/services/student/student.service";
import { MatSnackBar } from "@angular/material/snack-bar";

enum StudentsNotifications {
  StudentAdded = "Student added!",
  StudentDeleted = "Student deleted!",
}

@Injectable()
export class StudentsEffects {

  @Effect()
  public getStudents$: Observable<Action> = this.actions$.pipe(
    ofType(StudentsActions.getStudents),
    switchMap(() => {
      return this.studentService.getStudents()
        .pipe(
          map(students => StudentsActions.getStudentsSuccess({ students }))
        );
    })
  );

  @Effect()
  public addStudent$: Observable<Action> = this.actions$.pipe(
    ofType(StudentsActions.addStudent),
    pluck("student"),
    switchMap(student => {
      return this.studentService.addStudent(student)
        .pipe(
          tap(() => this.notificate(StudentsNotifications.StudentAdded)),
          map(() => StudentsActions.addStudentSuccess({ student }))
        );
    })
  );

  @Effect()
  public deleteStudent$: Observable<Action> = this.actions$.pipe(
    ofType(StudentsActions.deleteStudent),
    pluck("id"),
    switchMap(id => {
      return this.studentService.deleteStudent(id)
        .pipe(
          tap(() => this.notificate(StudentsNotifications.StudentDeleted)),
          map(() => StudentsActions.deleteStudentSuccess({ id }))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private snackbar: MatSnackBar,
  ) { }

  private notificate(notification: string): void {
    this.snackbar.open(notification, "OK", {
      duration: 3500,
    });
  }
}
