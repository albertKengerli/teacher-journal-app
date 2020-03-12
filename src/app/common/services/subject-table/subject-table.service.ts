import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, combineLatest, of } from "rxjs";

import { Student } from "../../entities/student";
import { Grade } from "../../entities/grades";

import { GradesService } from "../grades/grades.service";
import { StudentService } from "../student/student.service";

@Injectable({
  providedIn: "root"
})
export class SubjectTableService {
  private studentsWithGrades: BehaviorSubject<Student[]> = new BehaviorSubject([]);
  private subjectID: number;
  private dates: Date[] = [];
  private datesList: number[] = [];

  constructor(
    private gradesService: GradesService,
    private studentService: StudentService,
  ) {}

  private addGradesToStudents([students, subjectGrades]: [Student[], Grade[]]): void {
    const studentsWithGrades: Student[] = students.map(
      student => {
        const studentsGrades: Grade[] = subjectGrades.filter( grade => grade.studentID === +student.id);
        let gradesSum: number = 0;

        studentsGrades.forEach(grade => {
          if (!this.datesList.includes(grade.date)) {
            this.dates.push(new Date(grade.date));
            this.datesList.push(grade.date);
          }
          student[grade.date] = grade.grade.toString();
          gradesSum += grade.grade;
        });

        student.averageGrade = (gradesSum / studentsGrades.length).toFixed(1);

        return student;
    });

    this.studentsWithGrades.next(studentsWithGrades);
  }

  public serviceInit(subjectID: number): void {
    this.subjectID = subjectID;

    combineLatest(
      this.studentService.getStudents(),
      this.gradesService.getSubjectGrades(this.subjectID)
    ).subscribe((data) => this.addGradesToStudents(data));
  }

  public getStudentsWithGrades(): Observable<Student[]> {
    return this.studentsWithGrades.asObservable();
  }

  public getDates(): Date[] {
    return this.dates;
  }

}
