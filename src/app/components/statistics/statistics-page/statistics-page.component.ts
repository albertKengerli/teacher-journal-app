import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Student } from "../../../common/entities/student";
import { Subject } from "../../../common/entities/subject";

import { StudentService } from "../../../common/services/student/student.service";
import { SubjectService } from "../../../common/services/subject/subject.service";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit, OnDestroy {
  selectedStudent: Student;
  selectedSubject: Subject;
  students: Student[];
  subjects: Subject[];

  studentSubscription: Subscription;
  subjectSubscription: Subscription;

  constructor(
    private studentService: StudentService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.studentSubscription = this.studentService.getStudents()
      .subscribe(students => this.students = students);
    this.subjectSubscription = this.subjectService.getSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }

  selectStudent(student: Student):void {
    this.selectedStudent = student;
  }

  selectSubject(subject: Subject): void {
    this.selectedSubject = subject;
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
    this.subjectSubscription.unsubscribe();
  }

  test(): void {
    console.log(this);
  }
}
