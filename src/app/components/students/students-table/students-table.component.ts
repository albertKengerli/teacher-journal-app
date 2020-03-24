import { Component, OnInit, ViewChild, OnDestroy, ElementRef, AfterViewInit } from "@angular/core";

import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Subscription, Observable, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { AppState, StudentsState, getStudentsState } from "../../../store";
import * as StudentsActions from "../../../store/students/students.actions";

import { Student } from "../../../common/entities/student";

import { StudentService } from "../../../common/services/student/student.service";
import { GradesService } from "../../../common/services/grades/grades.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";
import { OverlayService } from "../../../common/services/overlay/overlay.service";
import { TranslateService } from "@ngx-translate/core";

import { СolumnNames } from "../../../common/constants/tableColumnNames";

@Component({
  selector: "app-students-table",
  templateUrl: "./students-table.component.html",
  styleUrls: ["./students-table.component.scss"]
})
export class StudentsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private studentsState$: Observable<StudentsState>;
  private studentStateSubscription: Subscription;
  private searchBarSubscription: Subscription;

  public dataSource: MatTableDataSource<Student>;
  public dataLoaded: boolean = false;
  public columnsNamesList: String[] = [
    СolumnNames.Name,
    СolumnNames.Surname,
    СolumnNames.Address,
    СolumnNames.Description,
    СolumnNames.Delete,
  ];

  @ViewChild(MatSort, {static: true}) public sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild("searchBar") public searchBar: ElementRef;

  constructor(
    private studentService: StudentService,
    private gradesService: GradesService,
    private dialogService: DialogService,
    private overlayService: OverlayService,
    private translateService: TranslateService,
    private store: Store<AppState>,
  ) {}

  private getStudents(): void {
    this.studentsState$ = this.store.pipe(select(getStudentsState));
    this.studentStateSubscription = this.studentsState$
      .subscribe(studentsState => {
        this.updateStudents(studentsState.data);
      });
  }

  private updateStudents(students: Student[]): void {
    this.dataSource.data = students;
  }

  private dataSourceInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = this.translateService.instant("TABLE.PAGINATOR_LABEL");
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
    const confirmationMessage: string = this.translateService.instant(
      "DIALOG.DELETE_STUDENT",
      { name: student.name, surname: student.surname }
    );

    this.dialogService.confirmAction(confirmationMessage)
      .subscribe( answer => {
        if (answer) {
          this.store.dispatch(new StudentsActions.DeleteStudent(+student.id));
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
    this.studentStateSubscription.unsubscribe();
    this.searchBarSubscription.unsubscribe();
  }
}
