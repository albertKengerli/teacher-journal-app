import { Component, OnInit, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { SubjectTableService } from '../../../common/services/subject-table.service';

import { StudentWithGrades } from '../../../common/entities/student';
import { Subject } from '../../../common/entities/subject';

import { dateStringCompare } from '../../../common/helpers/sorting';
import { calculateAverageGrade } from '../../../common/helpers/average';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit {
  @Input() subject: Subject;
  data: StudentWithGrades[];
  dataSource: MatTableDataSource<StudentWithGrades>;
  columnsToDisplay: string[];
  columns = [
    {
      name: 'name',
      header: 'Name',
      value: (student: StudentWithGrades) => student.name,
    },
    {
      name: 'surname',
      header: 'Last name',
      value: (student: StudentWithGrades) => student.surname,
    },
    {
      name: 'averageGrade',
      header: 'Average Mark',
      value: (student: StudentWithGrades) => calculateAverageGrade(student.grades),
    }
  ];

  constructor(
    private subjectTableService: SubjectTableService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.subjectTableService.serviceInit(this.subject.id);

    this.subjectTableService.getStudentsWithGrades()
      .subscribe( data => this.updateData(data));

    this.tableInit();
  }

  tableInit(): void {
    this.addDateColumns();
    this.columnsToDisplay = this.columns.map(column => column.name);
  }

  addDateColumns(): void {
    const dates = this.subjectTableService.getDates();

    dates.sort(dateStringCompare);

    dates.forEach(date => {
      const newColumn = {
        name: date,
        header: date,
        value: (student: StudentWithGrades) => {
          return student.grades.hasOwnProperty(date) ?
            student.grades[date].toString() :
            "";
        },
      }

      this.columns.push(newColumn);
    })
  }

  updateData(data: StudentWithGrades[]): void {
    this.data = data;
    this.dataSource.data = this.data;
  }
}
