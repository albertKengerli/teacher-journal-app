import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { Subscription, Observable } from "rxjs";

import { DatepickerDialogComponent } from "../../../shared/components/datepicker-dialog/datepicker-dialog.component";

import { SubjectTableDatesService } from "../../../common/services/subject-table/subject-table-dates/subject-table-dates.service";
import { GradesSenderService } from "../../../common/services/grades-sender/grades-sender.service";
import { TranslateService } from "@ngx-translate/core";

import { Store, select } from "@ngrx/store";
import { AppState, getEditableGradeIdByProperties } from "../../../store";

import {
  getSubjectTableStudents,
  getSubjectTableSelectedDates,
  getSubjectTableColumnNames,
  getSubjectTableDatesQuantity,
  getSubjectTableExistingDates,
} from "../../../store/subjectTable/subjectTable.selectors";

import * as EditableGradesActions from "../../../store/editableGrades/editableGrades.actions";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";
import { Grade } from "../../../common/entities/grades";
import { SubjectTableDateObject } from "../../../common/entities/subjectTable";

import * as GradeUtility from "../../../common/helpers/GradeUtility";

import { GradeOperations } from "../../../common/constants/gradesConstants";

import { subjectTablePaginationStep } from "./subject-table.model";
import { PaginatorSelection } from "../../../shared/components/paginator/paginator.model";
import { datepickerDimensions } from "../../../common/constants/dialogDimensions";
import { filter, take } from "rxjs/operators";

@Component({
  selector: "app-subject-table",
  templateUrl: "./subject-table.component.html",
  styleUrls: ["./subject-table.component.scss"]
})
export class SubjectTableComponent implements OnInit, OnDestroy {
  private editingValue: string;
  private existingDates: Date[];

  private studentsSubscription: Subscription;
  private selectedDatesSubscription: Subscription;
  private columnNamesSubscription: Subscription;
  private datesQuantitySubscription: Subscription;
  private existingDatesSubscription: Subscription;

  @Input() public subject: Subject;
  @Output() public gradesChange: EventEmitter<null> = new EventEmitter();

  public dataSource: MatTableDataSource<Student>;
  public columnsNamesList: string[];
  public selectedDates: SubjectTableDateObject[];

  public datePickControl: FormControl = new FormControl(new Date());

  public datesQuantity: number;
  public paginationStep: number = subjectTablePaginationStep;

  constructor(
    private store: Store<AppState>,
    private tableDatesService: SubjectTableDatesService,
    private gradesSenderService: GradesSenderService,
    private translateService: TranslateService,
    private dialog: MatDialog,
  ) { }

  private updateDataSource(data: Student[]): void {
    this.dataSource = new MatTableDataSource(data);
  }

  private setSelectedDates(dates: SubjectTableDateObject[]): void {
    this.selectedDates = dates;
  }

  private setColumnNames(columnNames: string[]): void {
    this.columnsNamesList = columnNames;
  }

  private setDatesQuantity(quantity: number): void {
    this.datesQuantity = quantity;
  }

  private setExistingDates(dates: Date[]): void {
    this.existingDates = [...dates];
  }

  private isGradeValidForTable(gradeAsString: string, gradeAsNumber: number): boolean {
    if ( GradeUtility.isGradeValid(gradeAsNumber) || gradeAsString === "") {
      return true;
    } else {
      return false;
    }
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

  private cancelGradeChange(gradeInput: HTMLElement): void {
    gradeInput.textContent = this.editingValue;
    this.editingValue = null;

    const alertMessage: string = this.translateService.instant("ALERT.SUBJECT_TABLE_GRADE_ERROR");
    window.alert(alertMessage);
    throw alertMessage;
  }

  private getGradeId(studentId: number, subjectId: number, date: number): Observable<number> {
    return this.store.pipe(select(getEditableGradeIdByProperties, {
      studentId,
      subjectId: this.subject.id,
      date,
    }));
  }

  private updateEditableGrades(
    gradeId: number,
    studentId: number,
    subjectId: number,
    grade: number,
    date: number,
    gradeOperation: string
  ): void {
    const newGrade: Grade = {
      id: gradeId,
      studentId,
      subjectId,
      date,
      grade,
    };

    switch (gradeOperation) {
      case GradeOperations.Update:
        this.store.dispatch(EditableGradesActions.updateEditableGrade({ id: gradeId, newGrade }));
        break;
      case GradeOperations.Post:
        this.store.dispatch(EditableGradesActions.postEditableGrade({ grade: newGrade }));
        break;
      default:
        break;
    }
  }

  public ngOnInit(): void {
    this.studentsSubscription = this.store.pipe(
      select(getSubjectTableStudents),
      take(1),
    ).subscribe( students => this.updateDataSource(students));

    this.selectedDatesSubscription = this.store.pipe(
      select(getSubjectTableSelectedDates),
    ).subscribe( selectedDates => this.setSelectedDates(selectedDates));

    this.columnNamesSubscription = this.store.pipe(
      select(getSubjectTableColumnNames),
    ).subscribe( columnNames => this.setColumnNames(columnNames));

    this.datesQuantitySubscription = this.store.pipe(
      select(getSubjectTableDatesQuantity),
      filter(quantity => quantity >= 1)
    ).subscribe( quantity => this.setDatesQuantity(quantity));

    this.existingDatesSubscription = this.store.pipe(
      select(getSubjectTableExistingDates)
    ).subscribe( existingDates => this.setExistingDates(existingDates));
  }

  public managePaginationChange(newPagination: PaginatorSelection): void {
    this.tableDatesService.selectDates(newPagination.start, newPagination.end);
  }

  public saveEditingCell(event: Event): void {
    const input: HTMLElement = event.target as HTMLElement;
    this.editingValue = input.textContent;
  }

  public handleGradeChange(studentId: number, date: number, event: Event): void {
    const gradeInput: HTMLElement = event.target as HTMLElement;

    if (gradeInput.textContent !== this.editingValue) {
      const gradeAsString: string = gradeInput.textContent.trim();
      const gradeAsNumber: number = gradeAsString === "" ? null : Number(gradeAsString);

      if (!this.isGradeValidForTable(gradeAsString, gradeAsNumber)) {
        this.cancelGradeChange(gradeInput);
      }

      let gradeId: number;
      let gradeAlreadyExists: boolean;
      const gradeIsDeleted: boolean = gradeAsNumber ? false : true;

      this.getGradeId(studentId, this.subject.id, date)
        .subscribe( foundGradeId => {
          gradeId = foundGradeId;
          gradeAlreadyExists = gradeId ? true : false;
        });

      if (!gradeId) {
        gradeId = GradeUtility.generateId(studentId, this.subject.id, date);
      }

      const gradeOperation: string = this.getGradeOperationForSending(gradeAlreadyExists, gradeIsDeleted);

      if (!gradeIsDeleted) {
        this.updateEditableGrades(gradeId, studentId, this.subject.id, gradeAsNumber, date, gradeOperation);
      }

      gradeInput.textContent = gradeAsString;
      this.editingValue = null;

      this.gradesChange.emit();
      this.gradesSenderService.prepareGradeForSending(gradeId, gradeOperation);
    }
  }

  public handleEnter(event: KeyboardEvent): void {
    const target: HTMLElement = event.target as HTMLElement;
    target.blur();
  }

  public openDatepickerDialog(): void {
    const dialogRef: MatDialogRef<DatepickerDialogComponent> = this.dialog.open(DatepickerDialogComponent, {
      height: datepickerDimensions.height,
      width: datepickerDimensions.width,
      data: { dates: [...this.existingDates] },
    });

    dialogRef.afterClosed().subscribe(newDate => {
      if (newDate) {
        this.tableDatesService.addDates([newDate]);
      }
    });
  }

  public ngOnDestroy(): void {
    this.studentsSubscription.unsubscribe();
    this.selectedDatesSubscription.unsubscribe();
    this.columnNamesSubscription.unsubscribe();
    this.datesQuantitySubscription.unsubscribe();
    this.existingDatesSubscription.unsubscribe();
  }
}
