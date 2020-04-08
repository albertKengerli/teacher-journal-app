import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";

import { StudentService } from "../../../common/services/student/student.service";
import { SubjectService } from "../../../common/services/subject/subject.service";
import { DropdownService } from "../../../common/services/dropdown/dropdown.service";
import { DropdownEntity } from "../../../common/entities/dropdown";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.scss"]
})
export class StatisticsPageComponent implements OnInit, OnDestroy {
  private studentSubscription: Subscription;
  private subjectSubscription: Subscription;

  public selectedStudent: Student;
  public selectedSubject: Subject;
  public students: Student[];
  public subjects: Subject[];

  public dropdownData: DropdownEntity[];

  constructor(
    private studentService: StudentService,
    private subjectService: SubjectService,
    private dropdownService: DropdownService,
  ) { }

  private getDropdownData(): void {
    this.dropdownService.initService();
    this.dropdownService.getDropdownData()
      .subscribe(data => {
        this.dropdownData = [...data];
      });
  }

  public ngOnInit(): void {
    this.studentSubscription = this.studentService.getStudents()
      .subscribe(students => this.students = students);
    this.subjectSubscription = this.subjectService.getSubjects()
      .subscribe(subjects => this.subjects = subjects);

    this.getDropdownData();
  }

  public selectStudent(student: Student): void {
    this.selectedStudent = student;
  }

  public selectSubject(subject: Subject): void {
    this.selectedSubject = subject;
  }

  public ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
    this.subjectSubscription.unsubscribe();
  }
}
