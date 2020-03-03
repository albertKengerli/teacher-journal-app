import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import SUBJECTS from "../../data/SUBJECTS.json";

import { Subject } from "../../entities/subject";

@Injectable({
  providedIn: "root"
})
export class SubjectService {
  public subjectsSubject: BehaviorSubject<Subject[]> = new BehaviorSubject(SUBJECTS);

  public getSubjects(): Observable<Subject[]> {
    return this.subjectsSubject.asObservable();
  }

  public getSubjectById(id: string): Subject {
    return SUBJECTS.find( subject => subject.id === id);
  }

  public getSubjectByName(name: string): Subject {
    return SUBJECTS.find( subject => subject.name === name);
  }

  public addSubject(subject: Subject): void {
    if (!subject.id) {
      subject.id = SUBJECTS.length.toString();
    }
    SUBJECTS.push(subject);
    this.subjectsSubject.next(SUBJECTS);
  }
}
