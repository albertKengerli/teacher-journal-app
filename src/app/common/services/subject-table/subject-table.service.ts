import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";

import { Student } from "../../entities/student";
import { Grade, GradesObject } from "../../entities/grades";

import { GradesService } from "../grades/grades.service";
import { StudentService } from "../student/student.service";

@Injectable({
  providedIn: "root"
})
export class SubjectTableService {
  private studentsWithGrades: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  private subjectID: string;
  private dates: string[] = [];

  constructor(
    private gradesService: GradesService,
    private studentService: StudentService,
  ) {}

  private dataInit([students, grades]: [Student[], GradesObject]): void {
    const subjectGrades: Grade[] = GradesService.getSubjectGrades(grades, this.subjectID);
    const studentsGrades: object = subjectGrades.reduce(
      (acc, grade) => {
        if (!acc[grade.student]) {
          acc[grade.student] = {};
        }
        acc[grade.student][grade.date] = grade.grade;

        if (!this.dates.includes(grade.date)) {
          this.dates.push(grade.date);
        }

        return acc;
      },
      {}
    );

    const studentsWithGrades: Student[] = students.map( currentStudent => {
      const modifiedStudent: Student = Object.assign({}, currentStudent);

      const currentStudentGrades: number[] = Object.values(studentsGrades[currentStudent.id]);
      const gradesSum: number = currentStudentGrades.reduce( (acc, grade) => acc += grade, 0);
      modifiedStudent.averageGrade = (gradesSum / currentStudentGrades.length).toFixed(1);

      this.dates.forEach( date => {
        const grade: number = studentsGrades[currentStudent.id][date];
        if (grade) {
          modifiedStudent[date] = grade.toString();
        } else {
          modifiedStudent[date] = undefined;
        }
      });

      return modifiedStudent;
    });

    this.studentsWithGrades.next(studentsWithGrades);
  }

  public serviceInit(subjectID: string): void {
    this.subjectID = subjectID;

    combineLatest(
      this.studentService.getStudents(),
      this.gradesService.getGrades()
    ).subscribe((data) => this.dataInit(data)).unsubscribe();
  }

  public getStudentsWithGrades(): Observable<Student[]> {
    return this.studentsWithGrades.asObservable();
  }

  public getDates(): string[] {
    return this.dates;
  }

}
