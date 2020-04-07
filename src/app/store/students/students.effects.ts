import { Injectable } from "@angular/core";

import { Action } from "@ngrx/store";
import { Actions , Effect, ofType } from "@ngrx/effects";

import { Observable } from "rxjs";
import { switchMap, map, pluck } from "rxjs/operators";

import * as StudentsActions from "./students.actions";

import { StudentService } from "../../common/services/student/student.service";

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
          map(() => StudentsActions.deleteStudentSuccess({ id }))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
  ) { }

}
