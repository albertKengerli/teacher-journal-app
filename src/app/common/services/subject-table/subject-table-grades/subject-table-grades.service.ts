import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { AppState } from "../../../../store";
import * as SubjectTableActions from "../../../../store/subjectTable/subjectTable.actions";

import { TranslateService } from "@ngx-translate/core";

import * as GradeUtility from "../../../helpers/GradeUtility";

@Injectable({
  providedIn: "root"
})
export class SubjectTableGradesService {

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService,
  ) { }

  private getGradeAsNumber(enteredGrade: string): number {
    if (enteredGrade === "") {
      return null;
    } else {
      return Number(enteredGrade);
    }
  }

  private validateEnteredValue(enteredValue: string): boolean {
    if (enteredValue === "" || GradeUtility.isGradeValid(Number(enteredValue))) {
      return true;
    } else {
      return false;
    }
  }

  private throwValidationError(): void {
    const alertMessage: string = this.translateService.instant("ALERT.SUBJECT_TABLE_GRADE_ERROR");
    throw alertMessage;
  }

  private updateTableState(studentId: number, date: number, newGrade: number): void {
    this.store.dispatch(SubjectTableActions.updateStudentsGrade({ studentId, date, newGrade }));
  }

  public updateGrade(studentId: number, date: number, enteredGrade: string): void {
    if (!this.validateEnteredValue(enteredGrade)) {
      this.throwValidationError();
    }

    const newGrade: number = this.getGradeAsNumber(enteredGrade);

    this.updateTableState(studentId, date, newGrade);
  }
}
