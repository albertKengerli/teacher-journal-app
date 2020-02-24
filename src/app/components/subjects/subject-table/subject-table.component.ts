import { Component, OnInit, Input } from '@angular/core';

import { StudentService } from '../../../common/services/student.service';
import { GradesService } from '../../../common/services/grades.service';

import { Student } from '../../../common/entities/student';

import { Subject } from '../../../common/entities/subject';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.scss']
})
export class SubjectTableComponent implements OnInit {
  @Input() subject: Subject;
  students: Student[];
  grades: object;

  constructor(
    private studentService: StudentService,
    private gradesService: GradesService,
  ) { }

  ngOnInit(): void {
    this.getStudents();
    this.getGrades();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  getGrades(): void {
    this.gradesService.getGrades()
      .subscribe(grades => this.grades = grades[this.subject.id]);
  }

}
