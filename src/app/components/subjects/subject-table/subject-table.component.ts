import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormControl } from "@angular/forms";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { Subscription } from "rxjs";

import { SubjectTableService } from "../../../common/services/subject-table/subject-table.service";
import { GradesSenderService } from "../../../common/services/grades-sender/grades-sender.service";
import { TranslateService } from "@ngx-translate/core";

import { Store, select } from "@ngrx/store";
import { AppState, getEditableGradeIdByProperties } from "../../../store";
import * as EditableGradesActions from "../../../store/editableGrades/editableGrades.actions";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";
import { Grade } from "../../../common/entities/grades";

import { compareDates } from "../../../common/helpers/sorting";
import * as GradesFunctions from "../../../common/helpers/gradeFunctions";

import { СolumnNames } from "../../../common/constants/tableColumnNames";
import { GradeOperations } from "../../../common/constants/gradesConstants";

const defaultColumnsNames: string[] = [
  СolumnNames.Name,
  СolumnNames.Surname,
  СolumnNames.AverageGrade,
];

@Component({
  selector: "app-subject-table",
  templateUrl: "./subject-table.component.html",
  styleUrls: ["./subject-table.component.scss"]
})
export class SubjectTableComponent implements OnInit, OnDestroy {
  private subjectTableServiceSubscription: Subscription;
  private editingValue: string;
  private dates: Date[];

  @Input() public subject: Subject;
  @Output() public gradesChange: EventEmitter<null> = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  public dataSource: MatTableDataSource<Student>;
  public columnsNamesList: string[];
  public datesToRender: object[];
  public datePickControl: FormControl = new FormControl(new Date());

  constructor(
    private store: Store<AppState>,
    private subjectTableService: SubjectTableService,
    private gradesSenderService: GradesSenderService,
    private translateService: TranslateService,
    private datePipe: DatePipe,
  ) { }

  private tableInit(): void {
    this.paginator._intl.itemsPerPageLabel = this.translateService.instant("TABLE.PAGINATOR_LABEL");
  }

  private updateDataSource(data: Student[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  private manageDates(dates: Date[]): void {
    this.dates = dates;
    this.dates.sort(compareDates);
    this.datesToRender = this.dates.map(date => {
      const current: object = {
        string: this.datePipe.transform(date, "LL/dd"),
        number: date.getTime(),
      };
      return current;
    });
    const datesStringList: string[] = this.dates.map(date => this.datePipe.transform(date, "LL/dd"));
    this.columnsNamesList = [...defaultColumnsNames, ...datesStringList];
  }

  private isGradeValidForTable(gradeAsString: string, gradeAsNumber: number): boolean {
    if ( GradesFunctions.isGradeValid(gradeAsNumber) || gradeAsString === "") {
      return true;
    } else {
      return false;
    }
  }

  public ngOnInit(): void {
    this.tableInit();

    this.subjectTableServiceSubscription = this.subjectTableService.getStudentsWithGrades()
      .subscribe( data => {
        this.updateDataSource(data);
        this.manageDates(this.subjectTableService.getDates());
      });
  }

  public saveEditingCell(event: Event): void {
    const input: HTMLElement = event.target as HTMLElement;
    this.editingValue = input.textContent;
  }

  public handleGradeChange(studentId: number, date: number, event: Event): void {
    const input: HTMLElement = event.target as HTMLElement;

    if (input.textContent !== this.editingValue) {
      const gradeAsString: string = input.textContent.trim();
      const gradeAsNumber: number = gradeAsString === "" ? null : Number(gradeAsString);

      if (!this.isGradeValidForTable(gradeAsString, gradeAsNumber)) {
        input.textContent = this.editingValue;
        this.editingValue = null;

        const alertMessage: string = this.translateService.instant("ALERT.SUBJECT_TABLE_GRADE_ERROR");
        window.alert(alertMessage);
        throw alertMessage;
      }

      let gradeOperation: string;
      let id: number;
      let gradeAlreadyExists: boolean;
      const gradeIsDeleted: boolean = gradeAsNumber ? false : true;

      this.store.pipe(select(getEditableGradeIdByProperties, {
        studentId,
        subjectId: this.subject.id,
        date,
      })).subscribe( neededId => {
        if (neededId) {
          id = neededId;
          gradeAlreadyExists = true;
        } else {
          gradeAlreadyExists = false;
        }
      });

      if (gradeAlreadyExists && !gradeIsDeleted) {
        gradeOperation = GradeOperations.Update;
      }
      if (gradeAlreadyExists && gradeIsDeleted) {
        gradeOperation = GradeOperations.Delete;
      }
      if (!gradeAlreadyExists && !gradeIsDeleted) {
        gradeOperation = GradeOperations.Post;
        id = GradesFunctions.generateId(studentId, this.subject.id, date);
      }
      if (!gradeAlreadyExists && gradeIsDeleted) {
        gradeOperation = GradeOperations.Remove;
        id = GradesFunctions.generateId(studentId, this.subject.id, date);
      }

      const newGrade: Grade = {
        id,
        studentId: studentId,
        subjectId: this.subject.id,
        date,
        grade: gradeAsNumber,
      };

      switch (gradeOperation) {
        case GradeOperations.Update:
          this.store.dispatch(EditableGradesActions.updateEditableGrade({ id, newGrade }));
          break;
        case GradeOperations.Post:
          this.store.dispatch(EditableGradesActions.postEditableGrade({ grade: newGrade }));
          break;
        default:
          break;
      }

      input.textContent = gradeAsString;
      this.editingValue = null;

      this.gradesChange.emit();
      this.gradesSenderService.prepareGradeForSending(id, gradeOperation);
    }
  }

  public handleEnter(event: KeyboardEvent): void {
    const target: HTMLElement = event.target as HTMLElement;
    target.blur();
  }

  public addColumn(): void {
    const newDate: Date = this.datePickControl.value;
    const dateString: string = this.datePipe.transform(newDate, "LL/dd");

    if (this.columnsNamesList.includes(dateString)) {
      const errorMessage: string = "This date exists already! Choose different date";
      window.alert(errorMessage);
      throw errorMessage;
    }

    this.datesToRender.push({
      string: dateString,
      number: newDate.getTime(),
    });
    this.columnsNamesList.push(dateString);
    this.datePickControl.setValue(new Date());
  }

  public ngOnDestroy(): void {
    this.subjectTableServiceSubscription.unsubscribe();
  }
}
