import { Injectable } from "@angular/core";

import { Action } from "@ngrx/store";
import { Actions , createEffect, ofType } from "@ngrx/effects";

import { Observable } from "rxjs";
import { switchMap, map, pluck, tap } from "rxjs/operators";

import * as SubjectsActions from "./subjects.actions";

import { SubjectService } from "../../common/services/subject/subject.service";

import { MatSnackBar } from "@angular/material/snack-bar";

enum SubjectsNotifications {
  SubjectAdded = "Subject added!",
  SubjectDeleted = "Subject deleted!",
  SubjectUpdated = "Subject updated!",
}

@Injectable()
export class SubjectsEffects {
  public getSubjects$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectsActions.getSubjects),
      switchMap(() => {
        return this.subjectService.getSubjects()
          .pipe(
            map(subjects => SubjectsActions.getSubjectsSuccess({ subjects }))
          );
      })
    )
  );

  public addSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectsActions.addSubject),
      pluck("subject"),
      switchMap(subject => {
        return this.subjectService.addSubject(subject)
          .pipe(
            tap(() => this.notificate(SubjectsNotifications.SubjectAdded)),
            map(() => SubjectsActions.addSubjectSuccess({ subject }))
          );
      })
    )
  );

  public deleteSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectsActions.deleteSubject),
      pluck("id"),
      switchMap(id => {
        return this.subjectService.deleteSubject(id)
          .pipe(
            tap(() => this.notificate(SubjectsNotifications.SubjectDeleted)),
            map(() => SubjectsActions.deleteSubjectSuccess({ id }))
          );
      })
    )
  );

  public updateSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectsActions.updateSubject),
      switchMap( action => {
        return this.subjectService.updateSubject(action.id, action.subject)
          .pipe(
            tap(() => this.notificate(SubjectsNotifications.SubjectUpdated)),
            map( subject => {
              const id: number = subject.id;
              return SubjectsActions.updateSubjectSuccess({ id, subject });
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService,
    private snackbar: MatSnackBar,
  ) { }

  private notificate(notification: string): void {
    this.snackbar.open(notification, "OK", {
      duration: 3500,
    });
  }
}
