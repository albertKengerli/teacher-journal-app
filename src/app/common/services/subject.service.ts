import { Injectable } from '@angular/core';

import SUBJECTS from '../data/SUBJECTS.json';

import { Subject } from '../entities/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor() { }

  getSubjects(): Subject[] {
    return SUBJECTS;
  }

  addSubject(subject: Subject): void {
    console.log(subject);
  }
}
