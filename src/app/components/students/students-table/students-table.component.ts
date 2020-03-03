import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { Student } from '../../../common/entities/student';

import { StudentService } from '../../../common/services/student/student.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements OnInit, OnDestroy {
  students: Student[];
  dataSource: MatTableDataSource<Student>;
  studentServiceSubscription: Subscription;

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

  ngOnDestroy(): void {
    this.studentServiceSubscription.unsubscribe();
  }

  private getStudents(): void {
    this.studentServiceSubscription = this.studentService.getStudents()
      .subscribe(students => this.updateStudents(students));
  }

  private updateStudents(students: Student[]): void {
    this.students = students;
    this.dataSource.data = this.students;
  }

  private dataSourceInit(): void {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
