import { Injectable } from "@angular/core";

import { take } from "rxjs/operators";

import { Store, select } from "@ngrx/store";

import { AppState } from "../../../../store";
import * as SubjectTableActions from "../../../../store/subjectTable/subjectTable.actions";
import * as EditableGradesActions from "../../../../store/editableGrades/editableGrades.actions";
import { getEditableGradeIdByProperties } from "../../../../store/editableGrades/editableGrades.selectors";

import { GradesSenderService } from "../../grades-sender/grades-sender.service";
import { TranslateService } from "@ngx-translate/core";

import { Grade } from "../../../entities/grades";
import * as GradeUtility from "../../../helpers/GradeUtility";
import { GradeOperations, GradesConstants } from "../../../constants/gradesConstants";

@Injectable({
  providedIn: "root"
})
export class SubjectTableGradesService {

  constructor(
    private store: Store<AppState>,
    private gradeSenderService: GradesSenderService,
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
    const alertMessage: string = this.translateService.instant(
      "ALERT.SUBJECT_TABLE_GRADE_ERROR",
      { min: GradesConstants.MinGrade, max: GradesConstants.MaxGrade}
    );
    throw alertMessage;
  }

  private getGradeOperationForSending(gradeAlreadyExists: boolean, gradeIsDeleted: boolean): string {
    if (gradeAlreadyExists && !gradeIsDeleted) {
      return GradeOperations.Update;
    }
    if (gradeAlreadyExists && gradeIsDeleted) {
      return GradeOperations.Delete;
    }
    if (!gradeAlreadyExists && !gradeIsDeleted) {
      return GradeOperations.Post;
    }
    if (!gradeAlreadyExists && gradeIsDeleted) {
      return GradeOperations.RevertOperation;
    }
  }

  private getGradeId(studentId: number, subjectId: number, date: number): Promise<number> {
    const result: Promise<number> = this.store.pipe(
      select(getEditableGradeIdByProperties, {
        studentId,
        subjectId: subjectId,
        date,
      }),
      take(1)
    ).toPromise();

    return result;
  }

  private updateEditableGradesState(newGrade: Grade, gradeOperation: string): void {
    switch (gradeOperation) {
      case GradeOperations.Update:
        this.store.dispatch(EditableGradesActions.updateEditableGrade({ id: newGrade.id, newGrade }));
        break;
      case GradeOperations.Post:
        this.store.dispatch(EditableGradesActions.postEditableGrade({ grade: newGrade }));
        break;
      default:
        break;
    }
  }

  private updateTableState(studentId: number, date: number, newGrade: number): void {
    this.store.dispatch(SubjectTableActions.updateStudentsGrade({ studentId, date, newGrade }));
  }

  private async updateGradesForSending(studentId: number, subjectId: number, date: number, grade: number): Promise<void> {
    let gradeId: number;
    let gradeAlreadyExists: boolean;

    const gradeIsDeleted: boolean = grade === null ? true : false;

    await this.getGradeId(studentId, subjectId, date)
    .then( foundGradeId => {
      gradeId = foundGradeId;
      gradeAlreadyExists = gradeId ? true : false;
    });

    if (gradeId === null) {
      gradeId = GradeUtility.generateId(studentId, subjectId, date);
    }

    const gradeOperation: string = this.getGradeOperationForSending(gradeAlreadyExists, gradeIsDeleted);

    if (!gradeIsDeleted) {
      const newGrade: Grade = {
        id: gradeId,
        date,
        studentId,
        subjectId,
        grade
      };

      this.updateEditableGradesState(newGrade, gradeOperation);
    }

    this.gradeSenderService.prepareGradeForSending(gradeId, gradeOperation);

    return;
  }

  public updateGrade(studentId: number, subjectId: number, date: number, enteredGrade: string): void {
    if (!this.validateEnteredValue(enteredGrade)) {
      this.throwValidationError();
    }

    const grade: number = this.getGradeAsNumber(enteredGrade);

    this.updateTableState(studentId, date, grade);
    this.updateGradesForSending(studentId, subjectId, date, grade);
  }
}
