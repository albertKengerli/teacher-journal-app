import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import STUDENTS from '../../../common/data/STUDENTS.json';
import { Student } from '../../../common/entities/student';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  students: Student[] = STUDENTS;
  dataSource = new MatTableDataSource(this.students);

  columnsToDisplay: String[] = [
    'id',
    'name',
    'surname',
    'address',
    'description',
  ];

  @ViewChild(
    MatSort,
    {static: true}
  )
  sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}
