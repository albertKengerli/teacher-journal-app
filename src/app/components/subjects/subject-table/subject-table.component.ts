import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";

import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { Subscription, Subject as RxSubject } from "rxjs";
import { filter } from "rxjs/operators";

import { DatepickerDialogComponent } from "../../../shared/components/datepicker-dialog/datepicker-dialog.component";

import { SubjectTableDatesService } from "../../../common/services/subject-table/subject-table-dates/subject-table-dates.service";
import { SubjectTableGradesService } from "../../../common/services/subject-table/subject-table-grades/subject-table-grades.service";

import { Store, select } from "@ngrx/store";
import { AppState } from "../../../store";

import {
  getSubjectTableStudents,
  getSubjectTableSelectedDates,
  getSubjectTableColumnNames,
  getSubjectTableDatesQuantity,
  getSubjectTableExistingDates,
} from "../../../store/subjectTable/subjectTable.selectors";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";
import { SubjectTableDateObject } from "../../../common/entities/subjectTable";

import { subjectTablePaginationStep } from "./subject-table.model";
import { PaginatorSelection } from "../../../shared/components/paginator/paginator.model";
import { datepickerDimensions } from "../../../common/constants/dialogDimensions";

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

  public datesQuantity: number;
  public paginationStep: number = subjectTablePaginationStep;
  public paginationResetEvent$: RxSubject<void> = new RxSubject<void>();

  constructor(
    private store: Store<AppState>,
    private tableDatesService: SubjectTableDatesService,
    private tableGradesService: SubjectTableGradesService,
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

  public ngOnInit(): void {
    this.studentsSubscription = this.store.pipe(
      select(getSubjectTableStudents),
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
    const changeWasMade: boolean = gradeInput.textContent !== this.editingValue;

    if (changeWasMade) {
      const enteredGrade: string = gradeInput.textContent.trim();

      try {
        this.tableGradesService.updateGrade(studentId, this.subject.id, date, enteredGrade);
        gradeInput.textContent = "";
        this.gradesChange.emit();
      } catch (error) {
        gradeInput.textContent = this.editingValue;
        window.alert(error);
      }
    }
  }

  public handleEnterKey(event: KeyboardEvent): void {
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
        this.paginationResetEvent$.next();
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
