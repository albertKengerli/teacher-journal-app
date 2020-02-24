import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import GRADES from '../data/GRADES.json';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  gradesSubject: BehaviorSubject<object> = new BehaviorSubject(GRADES);

  constructor() { }

  getGrades() {
    return this.gradesSubject.asObservable();
  }
}
