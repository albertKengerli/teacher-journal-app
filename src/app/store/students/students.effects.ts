import { Injectable } from "@angular/core";

import { Action } from "@ngrx/store";
import { Actions , Effect, ofType } from "@ngrx/effects";

import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";

import * as StudentsActions from "./students.actions";

import { StudentService } from "../../common/services/student/student.service";

@Injectable()
export class StudentsEffects {

  @Effect()
  public getStudents$: Observable<Action> = this.actions$.pipe(
    ofType<StudentsActions.GetStudents>(StudentsActions.StudentsActionNames.GET_STUDENTS),
    switchMap(() => {
      return this.studentService.getStudents()
        .pipe(
          map(students => new StudentsActions.GetStudentsSuccess(students))
        );
    })
  );

  @Effect()
  public addStudent$: Observable<Action> = this.actions$.pipe(
    ofType<StudentsActions.AddStudent>(StudentsActions.StudentsActionNames.ADD_STUDENT),
    switchMap(action => {
      return this.studentService.addStudent(action.payload)
        .pipe(
          map(student => new StudentsActions.AddStudentSuccess(student))
        );
    })
  );

  @Effect()
  public deleteStudent$: Observable<Action> = this.actions$.pipe(
    ofType<StudentsActions.DeleteStudent>(StudentsActions.StudentsActionNames.DELETE_STUDENT),
    switchMap(action => {
      return this.studentService.deleteStudent(action.payload)
        .pipe(
          map(() => new StudentsActions.DeleteStudentSuccess(action.payload))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
  ) { }

}
