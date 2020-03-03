import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Student } from '../../entities/student';

import STUDENTS from '../../data/STUDENTS.json';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentsSubject: BehaviorSubject<Student[]> = new BehaviorSubject(STUDENTS);

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Student): void {
    if (!student.id) {
      student.id = STUDENTS.length.toString();
    }
    STUDENTS.push(student);
    this.studentsSubject.next(STUDENTS);
  }
}
