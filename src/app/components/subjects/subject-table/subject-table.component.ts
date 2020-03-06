import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { DatePipe } from "@angular/common";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

import { Subscription } from "rxjs";

import { SubjectTableService } from "../../../common/services/subject-table/subject-table.service";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";

import { compareDates } from "../../../common/helpers/sorting";

const defaultColumns: string[] = [
  "name", "surname", "averageGrade"
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
  @Output() public onNewData: EventEmitter<Student[]> = new EventEmitter<Student[]>();
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  public dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  public columnsToDisplay: string[];
  public datesObject: object[];

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
    this.datesObject = this.dates.map(date => {
      const current: object = {
        string: this.datePipe.transform(date, "LL/dd"),
        number: date.getTime(),
      };
      return current;
    });
    const stringDates: string[] = this.dates.map(date => this.datePipe.transform(date, "LL/dd"));
    this.columnsToDisplay = [...defaultColumns, ...stringDates];
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

  public updateCellData(id: string, date: string, event: Event): void {
    const input: HTMLElement = event.target as HTMLElement;

    if (input.textContent !== this.editingValue) {
      const newValue: string = input.textContent.trim();

      if ( isNaN(+newValue) || +newValue < 1 || +newValue > 10 ) {
        console.log("Put a number from 1 to 10 to the table");
        input.textContent = "";
        this.data[id][date] = undefined;
        this.editingValue = undefined;
        this.onNewData.emit(this.data);
        return;
      }

      this.data[id][date] = newValue;
      input.textContent = newValue;
      this.editingValue = undefined;
      this.onNewData.emit(this.data);
    }
  }

  public ngOnDestroy(): void {
    this.subjectTableServiceSubscription.unsubscribe();
  }
}
