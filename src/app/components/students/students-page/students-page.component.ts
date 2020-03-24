import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription, Observable } from "rxjs";

import { Store, select } from "@ngrx/store";
import { AppState, StudentsState, getStudentsState } from "../../../store";
import * as StudentsActions from "../../../store/students/students.actions";

@Component({
  selector: "app-students-page",
  templateUrl: "./students-page.component.html",
  styleUrls: ["./students-page.component.scss"]
})
export class StudentsPageComponent implements OnDestroy, OnInit {
  private studentsState$: Observable<StudentsState>;
  private studentsStateSubscription: Subscription;

  public studentsLoaded: boolean = false;

  constructor(private store: Store<AppState>) { }

  private subscribeToStore(): void {
    this.studentsState$ = this.store.pipe(select(getStudentsState));
    this.studentsStateSubscription = this.studentsState$
      .subscribe(studentsState => {
        if (studentsState.loaded) {
          this.studentsLoaded = true;
        }
      });
  }

  private getStudents(): void {
    this.store.dispatch(new StudentsActions.GetStudents());
  }

  public ngOnInit(): void {
    this.subscribeToStore();
    this.getStudents();
  }

  public ngOnDestroy(): void {
    this.studentsStateSubscription.unsubscribe();
  }
}
