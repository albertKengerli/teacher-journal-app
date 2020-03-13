import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormControl } from "@angular/forms";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { Subscription } from "rxjs";

import { SubjectTableService } from "../../../common/services/subject-table/subject-table.service";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";
import { Grade } from "../../../common/entities/grades";

import { compareDates } from "../../../common/helpers/sorting";

import { columnNames } from "../../../common/constants/tableColumnNames";

const defaultColumnsNames: string[] = [
  columnNames.name,
  columnNames.surname,
  columnNames.averageGrade,
];

@Component({
  selector: "app-subject-table",
  templateUrl: "./subject-table.component.html",
  styleUrls: ["./subject-table.component.scss"]
})
export class SubjectTableComponent implements OnInit, OnDestroy {
  private subjectTableServiceSubscription: Subscription;
  private data: Student[];
  private editingValue: string;
  private dates: Date[];

  @Input() public subject: Subject;
  @Output() public onNewData: EventEmitter<Grade> = new EventEmitter<Grade>();
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  public dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  public columnsNamesList: string[];
  public datesToRender: object[];
  public datePickControl: FormControl = new FormControl(new Date());

  constructor(
    private subjectTableService: SubjectTableService,
    private datePipe: DatePipe,
  ) { }

  private tableInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private updateDataSource(data: Student[]): void {
    this.data = data;
    this.dataSource.data = this.data;
    this.manageDates(this.subjectTableService.getDates());
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

  public ngOnInit(): void {
    this.tableInit();
    this.subjectTableService.serviceInit(this.subject.id);
    this.subjectTableServiceSubscription = this.subjectTableService.getStudentsWithGrades()
      .subscribe( data => this.updateDataSource(data));
  }

  public saveEditingCell(event: Event): void {
    const input: HTMLElement = event.target as HTMLElement;
    this.editingValue = input.textContent;
  }

  public handleGradeChange(studentID: number, date: number, event: Event): void {
    const input: HTMLElement = event.target as HTMLElement;

    if (input.textContent !== this.editingValue) {
      const newValue: string = input.textContent.trim();

      if ( (isNaN(+newValue) || +newValue < 1 || +newValue > 10) && newValue !== "" ) {
        input.textContent = "";
        this.editingValue = null;
        const alertMessage: string = "Put a number from 1 to 10 to the cell or leave it empty to delete the grade";
        window.alert(alertMessage);
        throw alertMessage;
      }

      const newGrade: Grade = {
        studentID: studentID,
        subjectID: this.subject.id,
        date: date,
        grade: +newValue,
      };

      input.textContent = newValue;
      this.editingValue = null;
      this.onNewData.emit(newGrade);
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
