import { Injectable } from "@angular/core";

import { Action } from "@ngrx/store";
import { Actions , createEffect, ofType } from "@ngrx/effects";

import { Observable } from "rxjs";
import { switchMap, map, pluck, mergeMap } from "rxjs/operators";

import * as GradesActions from "./grades.actions";

import { GradesService } from "../../common/services/grades/grades.service";

@Injectable()
export class GradesEffects {
  public getGrades$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.getGrades),
      switchMap(() => {
        return this.gradeService.getGrades()
          .pipe(
            map(grades => GradesActions.getGradesSuccess({ grades }))
          );
      })
    )
  );

  public addGrade$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.addGrade),
      pluck("grade"),
      mergeMap(grade => this.gradeService.postGrade(grade)),
      map((grade) => GradesActions.addGradeSuccess({ grade }))
    )
  );

  public deleteGrade$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.deleteGrade),
      pluck("id"),
      switchMap(id => {
        return this.gradeService.deleteGrade(id)
          .pipe(
            map(() => GradesActions.deleteGradeSuccess({ id }))
          );
      })
    )
  );

  public updateGrade$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GradesActions.updateGrade),
      switchMap( action => {
        return this.gradeService.updateGrade(action.id, action.grade)
          .pipe(
            map( grade => {
              const id: number = grade.id;
              return GradesActions.updateGradeSuccess({ id, grade });
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private gradeService: GradesService,
  ) { }

}
