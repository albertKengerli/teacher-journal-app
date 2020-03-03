import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { StudentWithGrades, Student } from '../../entities/student';
import { GradesObject } from '../../entities/grades';

import { GradesService } from '../grades/grades.service';
import { StudentService } from '../student/student.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectTableService {
  subjectID: string;
  dates: string[] = [];

  studentsWithGrades: BehaviorSubject<StudentWithGrades[]>;

  constructor(
    private gradesService: GradesService,
    private studentService: StudentService,
  ) {}

  serviceInit(subjectID: string): void {
    this.subjectID = subjectID;

    combineLatest(
      this.studentService.getStudents(),
      this.gradesService.getGrades()
    ).subscribe((data) => this.dataInit(data)).unsubscribe();
  }

  private dataInit([students, grades]: [Student[], GradesObject]): void {
    this.studentsWithGrades = new BehaviorSubject({} as StudentWithGrades[])

    const subjectGrades = GradesService.getSubjectGrades(grades, this.subjectID);

    const studentsGrades = subjectGrades.reduce( (acc, grade) => {
      if (!acc[grade.student]) {
        acc[grade.student] = {};
      }
      acc[grade.student][grade.date] = grade.grade;

      if (!this.dates.includes(grade.date)) {
        this.dates.push(grade.date);
      }

      return acc;
    }, {});

    const studentsWithGrades: StudentWithGrades[] = students.map( student => {
      const currentStudent: StudentWithGrades = {
        id: student.id,
        name: student.name,
        surname: student.surname,
        grades: studentsGrades[student.id],
      };
      return currentStudent;
    })

    this.studentsWithGrades.next(studentsWithGrades);
  }

  getStudentsWithGrades(): Observable<StudentWithGrades[]> {
    return this.studentsWithGrades.asObservable();
  }

  getDates(): string[] {
    return this.dates;
  }

}
