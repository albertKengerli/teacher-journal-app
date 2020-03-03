import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { SubjectTableService } from '../../../common/services/subject-table/subject-table.service';

import { StudentWithGrades } from '../../../common/entities/student';
import { Subject } from '../../../common/entities/subject';
import { Column } from '../../../common/entities/column';

import { defaultColumns } from "../../../common/constants/subjectTableDefaultColumns";
import { dateStringCompare } from '../../../common/helpers/sorting';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit, OnDestroy {
  @Input() subject: Subject;
  @Output() onNewData = new EventEmitter<StudentWithGrades[]>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  subjectTableServiceSubscription: Subscription;
  data: StudentWithGrades[];
  dataSource: MatTableDataSource<StudentWithGrades>;
  columnsToDisplay: string[];
  columns: Column[];
  editingValue: string;

  constructor(
    private subjectTableService: SubjectTableService
  ) { }

  ngOnInit(): void {
    this.columns = [...defaultColumns];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;

    this.subjectTableService.serviceInit(this.subject.id);

    this.subjectTableServiceSubscription = this.subjectTableService.getStudentsWithGrades()
      .subscribe( data => this.updateDataSource(data));
    this.subjectTableServiceSubscription.unsubscribe();

    this.tableInit();
  }

  private tableInit(): void {
    this.addDateColumns();
    this.columnsToDisplay = this.columns.map(column => column.name);
  }

  private addDateColumns(): void {
    const dates = this.subjectTableService.getDates();

    dates.sort(dateStringCompare);

    dates.forEach(date => {
      const newColumn = {
        name: date,
        header: date,
        pipe: 'studentGrade',
        gradeColumn: true,
      }

      this.columns.push(newColumn);
    })
  }

  private updateDataSource(data: StudentWithGrades[]): void {
    this.data = data;
    this.dataSource.data = this.data;
  }

  saveEditingCell(event: Event) {
    const input = event.target as HTMLElement;
    this.editingValue = input.textContent;
  }

  updateCellData(id: string, date: string, event: Event): void {
    const input = event.target as HTMLElement;

    if (input.textContent !== this.editingValue) {
      const newValue = Number(input.textContent);

      if ( isNaN(newValue) || newValue < 1 || newValue > 10 ) {
        console.log('Put a number from 1 to 10 to the table');
        input.textContent = '-';
        this.data[id].grades[date] = null;
        this.editingValue = null;
        this.onNewData.emit(this.data);
        return;
      }

      this.data[id].grades[date] = Number(newValue);
      this.editingValue = null;
      this.onNewData.emit(this.data);
    }
  }

  ngOnDestroy(): void {
    this.subjectTableServiceSubscription.unsubscribe();
  }
}
