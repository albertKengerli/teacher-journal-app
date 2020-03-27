import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormControl } from "@angular/forms";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { Subscription } from "rxjs";

import { SubjectTableService } from "../../../common/services/subject-table/subject-table.service";
import { GradesService } from "../../../common/services/grades/grades.service";
import { TranslateService } from "@ngx-translate/core";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";
import { Grade } from "../../../common/entities/grades";

import { compareDates } from "../../../common/helpers/sorting";

import { СolumnNames } from "../../../common/constants/tableColumnNames";

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
    private subjectTableService: SubjectTableService,
    private gradesService: GradesService,
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

  private isGradeValid(grade: string): boolean {
    if ( (isNaN(+grade) || +grade < 1 || +grade > 10) && grade !== "") {
      return false;
    } else {
      return true;
    }
  }

  public ngOnInit(): void {
    this.tableInit();
    this.subjectTableService.serviceInit(this.subject.id);
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

      //TODO use gradeFunctions
      if (!this.isGradeValid(gradeAsString)) {
        input.textContent = "";
        this.editingValue = null;
        const alertMessage: string = this.translateService.instant("ALERT.SUBJECT_TABLE_GRADE_ERROR");
        window.alert(alertMessage);
        throw alertMessage;
      }

      const newValue: number = gradeAsString === "" ? null : Number(gradeAsString);

      const newGrade: Grade = {
        studentId: studentId,
        subjectId: this.subject.id,
        date: date,
        grade: newValue,
      };

      input.textContent = gradeAsString;
      this.editingValue = null;
      this.gradesChange.emit();
      this.gradesService.prepareGradeForSending(newGrade);
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
