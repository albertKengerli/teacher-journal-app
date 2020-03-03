import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import SUBJECTS from '../../data/SUBJECTS.json';

import { Subject } from '../../entities/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  subjectsSubject: BehaviorSubject<Subject[]> = new BehaviorSubject(SUBJECTS);

  getSubjects(): Observable<Subject[]> {
    return this.subjectsSubject.asObservable();
  }

  getSubjectById(id: string): Subject {
    return SUBJECTS.find( subject => subject.id === id);
  }

  getSubjectByName(name: string): Subject {
    return SUBJECTS.find( subject => subject.name === name);
  }

  addSubject(subject: Subject): void {
    if (!subject.id) {
      subject.id = SUBJECTS.length.toString();
    }
    SUBJECTS.push(subject);
    this.subjectsSubject.next(SUBJECTS);
  }
}
