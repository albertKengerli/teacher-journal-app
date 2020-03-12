import { Component, OnInit, ViewChild, OnDestroy, ElementRef, AfterViewInit } from "@angular/core";

import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Subscription, Observable, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from "rxjs/operators";

import { Student } from "../../../common/entities/student";

import { StudentService } from "../../../common/services/student/student.service";
import { GradesService } from "../../../common/services/grades/grades.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";

import { columnNames } from "../../../common/constants/tableColumnNames";

@Component({
  selector: "app-students-table",
  templateUrl: "./students-table.component.html",
  styleUrls: ["./students-table.component.scss"]
})
export class StudentsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private studentServiceSubscription: Subscription;
  private searchBarSubscription: Subscription;

  public dataSource: MatTableDataSource<Student>;
  public columnsNamesList: String[] = [
    columnNames.id,
    columnNames.name,
    columnNames.surname,
    columnNames.address,
    columnNames.description,
    columnNames.delete,
  ];

  @ViewChild(MatSort, {static: true}) public sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild("searchBar") public searchBar: ElementRef;

  constructor(
    private studentService: StudentService,
    private gradesService: GradesService,
    private dialogService: DialogService,
  ) {}

  private getStudents(): void {
    this.studentServiceSubscription = this.studentService.getStudents()
      .subscribe(students => this.updateStudents(students));
  }

  private updateStudents(students: Student[]): void {
    this.dataSource.data = students;
  }

  private dataSourceInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private searchFieldInit(): void {
    const searchBarObservable: Observable<Student[]> = fromEvent<KeyboardEvent>(this.searchBar.nativeElement, "keyup")
    .pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(350),
      distinctUntilChanged(),
      switchMap(query => this.studentService.searchStudent(query))
    );

    this.searchBarSubscription = searchBarObservable
    .subscribe(students => this.updateStudents(students));
  }

  public deleteStudent(student: Student): void {
    this.dialogService.confirmAction(`Do you really want to delete ${student.name} ${student.surname} from students list?`)
      .subscribe( answer => {
        if (answer) {
          this.studentService.deleteStudent(+student.id).subscribe(() => this.getStudents());
          this.gradesService.deleteStudentGrades(+student.id);
        } else {
          return;
        }
      });
  }

  public ngOnInit(): void {
    this.dataSourceInit();
    this.getStudents();
  }

  public ngAfterViewInit(): void {
    this.searchFieldInit();
  }

  public ngOnDestroy(): void {
    this.studentServiceSubscription.unsubscribe();
    this.searchBarSubscription.unsubscribe();
  }
}
