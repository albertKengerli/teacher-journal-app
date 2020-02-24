import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Student } from '../../../common/entities/student';

import { StudentService } from '../../../common/services/student.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit {
  students: Student[];
  dataSource: MatTableDataSource<Student>;

  columnsToDisplay: String[] = [
    'id',
    'name',
    'surname',
    'address',
    'description',
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.dataSourceInit();
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.updateStudents(students));
  }

  updateStudents(students: Student[]): void {
    this.students = students;
    this.dataSource.data = this.students;
  }

  dataSourceInit(): void {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
