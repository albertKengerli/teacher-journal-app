import { Injectable } from '@angular/core';

import { Student } from '../entities/student';

import STUDENTS from '../data/STUDENTS.json';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  getStudents(): Student[] {
    return STUDENTS;
  }
}
