import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { AppState, getEditableGradeById } from "../../../store";
import * as GradesActions from "../../../store/grades/grades.actions";

import { take, filter } from "rxjs/operators";

import { GradeOperations } from "../../constants/gradesConstants";

@Injectable({
  providedIn: "root"
})
export class GradesSenderService {
  private gradesToSend: { [operation: string]: Set<number> } = {
    [GradeOperations.Delete]: new Set(),
    [GradeOperations.Post]: new Set(),
    [GradeOperations.Update]: new Set(),
  };

  constructor(private store: Store<AppState>) { }

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

    // TODO create method for this pipe

    this.emptyPreparedGrades();
  }
}
