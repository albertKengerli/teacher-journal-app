import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription, Observable } from "rxjs";

import { Store, select } from "@ngrx/store";
import { AppState, SubjectsState, getSubjectsState } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";

@Component({
  selector: "app-subjects-page",
  templateUrl: "./subjects-page.component.html",
  styleUrls: ["./subjects-page.component.scss"]
})
export class SubjectsPageComponent implements OnInit, OnDestroy {
  private subjectsState$: Observable<SubjectsState>;
  private subjectsStateSubscription: Subscription;

  public subjectsLoaded: boolean = false;

  constructor(private store: Store<AppState>) { }

  private subscribeToStore(): void {
    this.subjectsState$ = this.store.pipe(select(getSubjectsState));
    this.subjectsStateSubscription = this.subjectsState$
      .subscribe(subjectsState => {
        if (subjectsState.loaded) {
          this.subjectsLoaded = true;
        }
      });
  }

  private getSubjects(): void {
    this.store.dispatch(SubjectsActions.getSubjects());
  }

  public ngOnInit(): void {
    this.subscribeToStore();
    this.getSubjects();
  }

  public ngOnDestroy(): void {
    this.subjectsStateSubscription.unsubscribe();
  }
}
