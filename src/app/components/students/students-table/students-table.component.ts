import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Subscription } from "rxjs";

import { Student } from "../../../common/entities/student";

import { StudentService } from "../../../common/services/student/student.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";

@Component({
  selector: "app-students-table",
  templateUrl: "./students-table.component.html",
  styleUrls: ["./students-table.component.scss"]
})
export class StudentsTableComponent implements OnInit, OnDestroy {
  private studentServiceSubscription: Subscription;

  public students: Student[];
  public dataSource: MatTableDataSource<Student>;
  public columnsToDisplay: String[] = [
    "id",
    "name",
    "surname",
    "address",
    "description",
    "delete",
  ];

  @ViewChild(MatSort, {static: true}) public sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

  constructor(
    private studentService: StudentService,
    private dialogService: DialogService,
  ) {}

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

  public deleteStudent(student: Student): void {
    this.dialogService.confirmAction(`Do you really want to delete ${student.name} ${student.surname} from students list?`)
      .subscribe( answer => {
        if (answer) {
          this.studentService.deleteStudent(+student.id).subscribe(() => this.getStudents());
        } else {
          return;
        }
      });
  }

  public ngOnInit(): void {
    this.dataSourceInit();
    this.getStudents();
  }

  public ngOnDestroy(): void {
    this.studentServiceSubscription.unsubscribe();
  }
}
