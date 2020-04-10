import { Injectable } from "@angular/core";

import { Observable, combineLatest, BehaviorSubject, ReplaySubject } from "rxjs";
import { filter, take } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { AppState, getSubjectsData, getGradesData } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";
import * as GradesActions from "../../../store/grades/grades.actions";

import { DropdownEntity, DropdownSubgroup } from "../../entities/dropdown";
import { Grade } from "../../entities/grades";
import { Subject } from "../../entities/subject";

@Injectable({
  providedIn: "root"
})
export class DropdownService {
  private isServiceInited: boolean = false;
  private isDataReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private dropdownData: ReplaySubject<DropdownEntity[]> = new ReplaySubject();

  constructor(private store: Store<AppState>) { }

  private prepareDropdownData([subjects, grades]: [Subject[], Grade[]]): void {
    const datesForSubjects: { [subjectId: number]: number[] } = grades.reduce(
      (acc, currentGrade) => {
        const currentSubjectId: number = currentGrade.subjectId;
        const currentDate: number = currentGrade.date;
        const isSubjectInAcc: boolean = Boolean(acc[currentSubjectId]);

        if (!isSubjectInAcc) {
          acc[currentSubjectId] = [currentDate];
        } else if (!acc[currentSubjectId].includes(currentDate)) {
          acc[currentSubjectId].push(currentDate);
        }
        return acc;
      },
      {}
    );

    const dropdownEntities: DropdownEntity[] = subjects.map(currentSubject => {
      const currentSubgroup: DropdownSubgroup[] = datesForSubjects[currentSubject.id].map(currentDate => {
        return {
          value: currentDate,
          selected: false,
        };
      });

      return {
        subject: Object.assign({}, currentSubject),
        subgroups: currentSubgroup,
        opened: false,
        selected: false,
        partlySelected: false,
      };
    });

    this.dropdownData.next(dropdownEntities);
    this.isDataReady.next(true);
  }

  public initService(): void {
    this.store.dispatch(SubjectsActions.getSubjects());
    this.store.dispatch(GradesActions.getGrades());

    combineLatest(
      this.store.pipe(
        select(getSubjectsData),
        filter(subjects => subjects.length !== 0),
        take(1),
      ),
      this.store.pipe(
        select(getGradesData),
        filter(grades => grades.length !== 0),
        take(1),
      ),
    ).subscribe(data => this.prepareDropdownData(data));

    this.isServiceInited = true;
  }

  public getDropdownData(): Observable<DropdownEntity[]> {
    return this.dropdownData.asObservable();
  }
}
