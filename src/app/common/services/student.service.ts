import { Injectable } from '@angular/core';

import { Student } from '../entities/student';

import STUDENTS from '../data/STUDENTS.json';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[];

  constructor() { }

  getStudents(): Student[] {
    this.students = STUDENTS;
    return this.students;
  }

  addStudent(student: Student): void {
    if (!student.id) {
      student.id = this.students.length + 1;
    }
    this.students.push(student);
  }
}
