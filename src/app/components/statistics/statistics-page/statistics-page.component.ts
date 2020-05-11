import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription, zip } from "rxjs";
import { filter } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { AppState, getStudentsData, getSubjectsData, getGradesData } from "../../../store";
import * as StudentsActions from "../../../store/students/students.actions";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";
import { Grade } from "../../../common/entities/grades";
import { DropdownGroup, DropdownOutputEntity } from "../../../common/entities/dropdown";

import { DropdownService } from "../../../common/services/dropdown/dropdown.service";

import { getTimestampFromFormattedDate } from "../../../common/helpers/date";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.scss"]
})
export class StatisticsPageComponent implements OnInit, OnDestroy {
  private grades: Grade[];
  private students: Student[];
  private dataSubscription: Subscription;

  public selectedStudent: Student;
  public selectedSubject: Subject;
  public subjects: Subject[];
  public studentsForTable: Student[];

  public dropdownData: DropdownGroup[];
  public dropdownOutput: DropdownOutputEntity[] = [];

  constructor(
    private dropdownService: DropdownService,
    private store: Store<AppState>,
  ) { }

  private getDropdownData(): void {
    this.dropdownService.initService();
    this.dropdownService.getSubjectDatesDropdownData()
      .subscribe(data => {
        this.dropdownData = [...data];
      });
  }

  private saveFromStore([students, subjects, grades]: [Student[], Subject[], Grade[]]): void {
    this.students = students;
    this.subjects = subjects;
    this.grades = grades;

    this.setStudentsForTable();
  }

  private getStudentIdsFromDropdown(): number[] {
    const studentsId: number[] = [];
    const subjectsIdByName: { [subjectName: string]: number } = this.subjects.reduce(
      (acc, subject) => {
        acc[subject.name] = subject.id;
        return acc;
      },
      {}
    );

    this.dropdownOutput.forEach(outputEntity => {
      const currentSubjectId: number = subjectsIdByName[outputEntity.groupName];

      outputEntity.selectedValues.forEach(date => {
        const dateTimestamp: number = getTimestampFromFormattedDate(date);
        const currentGrade: Grade = this.grades.find(grade => (grade.subjectId === currentSubjectId) && (grade.date === dateTimestamp));
        const currentStudentId: number = currentGrade.studentId;

        if (!studentsId.includes(currentStudentId)) {
          studentsId.push(currentStudentId);
        }
      });

    });

    return studentsId;
  }

  public ngOnInit(): void {
    this.store.dispatch(StudentsActions.getStudents());

    this.dataSubscription = zip(
      this.store.pipe(
        select(getStudentsData),
        filter(students => students.length !== 0),
      ),
      this.store.pipe(
        select(getSubjectsData),
        filter(subjects => subjects.length !== 0),
      ),
      this.store.pipe(
        select(getGradesData),
        filter(grades => grades.length !== 0),
      ),
    ).subscribe(data => this.saveFromStore(data));

    this.getDropdownData();
  }

  public selectStudent(student: Student): void {
    this.selectedStudent = student;
  }

  public selectSubject(subject: Subject): void {
    this.selectedSubject = subject;
  }

  public ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  public setStudentsForTable(): void {
    if (this.dropdownOutput.length === 0) {
      this.studentsForTable = this.students;
      return;
    }

    const includedStudentIds: number[] = this.getStudentIdsFromDropdown();

    if (includedStudentIds.length === 0) {
      this.studentsForTable = this.students;
      return;
    }

    this.studentsForTable = this.students.filter(student => includedStudentIds.includes(student.id));

    this.selectedStudent = null;
  }
}
