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

  private validateGrade(grade: number): void {
    if (!GradeUtility.isGradeValid(grade) || isNaN(grade)) {
      const alertMessage: string = this.translateService.instant("ALERT.SUBJECT_TABLE_GRADE_ERROR");
      window.alert(alertMessage);
      throw alertMessage;
    }
  }

  private updateTableState(studentId: number, date: number, newGrade: number): void {
    this.store.dispatch(SubjectTableActions.updateStudentsGrade({ studentId, date, newGrade }));
  }

  public updateGrade(studentId: number, date: number, enteredGrade: string): void {
    const newGrade: number = Number(enteredGrade);
    this.validateGrade(newGrade);

    this.updateTableState(studentId, date, newGrade);
  }
}
