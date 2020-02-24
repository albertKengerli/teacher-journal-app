import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import SUBJECTS from '../data/SUBJECTS.json';

import { Subject } from '../entities/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjectsSubject: BehaviorSubject<Subject[]> = new BehaviorSubject(SUBJECTS);

  constructor() { }

  getSubjects(): Observable<Subject[]> {
    return this.subjectsSubject.asObservable();
  }

  getSubjectByName(name: string): Subject {
    return SUBJECTS.find( element => element.name = name);
  }

  addSubject(subject: Subject): void {
    if (!subject.id) {
      subject.id = SUBJECTS.length.toString();
    }
    SUBJECTS.push(subject);
    this.subjectsSubject.next(SUBJECTS);
  }
}
