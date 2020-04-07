import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { AppState, getEditableGradeById } from "../../../store";
import * as GradesActions from "../../../store/grades/grades.actions";

import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

import { Grade } from "../../entities/grades";
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

  private getGradeFromEditableGrades(gradeId: number): Observable<Grade> {
    return this.store.pipe(
      select(getEditableGradeById, { id: gradeId }),
      filter(grade => grade !== undefined),
      take(1),
    );
  }

  public prepareGradeForSending(gradeId: number, operation: string): void {
    for (const gradeOperation of Object.keys(this.gradesToSend)) {
      this.gradesToSend[gradeOperation].delete(gradeId);
    }

    if (operation !== GradeOperations.RevertOperation) {
      this.gradesToSend[operation].add(gradeId);
    }
  }

  public emptyPreparedGrades(): void {
    for (const gradeOperation of Object.keys(this.gradesToSend)) {
      this.gradesToSend[gradeOperation].clear();
    }
  }

  public sendPreparedGrades(): void {
    this.gradesToSend[GradeOperations.Delete].forEach( gradeId => {
      this.store.dispatch(GradesActions.deleteGrade({ id: gradeId }));
    });

    this.gradesToSend[GradeOperations.Post].forEach( gradeId => {
      this.getGradeFromEditableGrades(gradeId)
        .subscribe(gradeForSending => this.store.dispatch(GradesActions.addGrade({ grade: gradeForSending })));
    });

    this.gradesToSend[GradeOperations.Update].forEach( gradeId => {
      this.getGradeFromEditableGrades(gradeId)
        .subscribe(gradeForSending => this.store.dispatch(GradesActions.updateGrade({ id: gradeId, grade: gradeForSending })));
    });

    this.emptyPreparedGrades();
  }
}
