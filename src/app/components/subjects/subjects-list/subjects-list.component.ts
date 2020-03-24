import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable, Subscription } from "rxjs";

import { Store, select } from "@ngrx/store";
import { AppState, SubjectsState, getSubjectsState } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";

import { GradesService } from "../../../common/services/grades/grades.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";
import { OverlayService } from "../../../common/services/overlay/overlay.service";
import { TranslateService } from "@ngx-translate/core";

import { Subject } from "../../../common/entities/subject";

@Component({
  selector: "app-subjects-list",
  templateUrl: "./subjects-list.component.html",
  styleUrls: ["./subjects-list.component.scss"]
})
export class SubjectsListComponent implements OnInit, OnDestroy {
  private subjectStateSubscription: Subscription;

  public subjectsState$: Observable<SubjectsState>;

  constructor(
    private gradesService: GradesService,
    private dialogService: DialogService,
    private overlayService: OverlayService,
    private translateService: TranslateService,
    private store: Store<AppState>,
  ) { }

  private getSubjects(): void {
    this.subjectsState$ = this.store.pipe(select(getSubjectsState));
    this.subjectStateSubscription = this.subjectsState$
      .subscribe(subjectsState => {
        if (subjectsState.loading) {
          this.overlayService.showSpinner();
        } else if (subjectsState.loaded) {
          this.overlayService.hideSpinner();
        }
      });
    this.store.dispatch(SubjectsActions.getSubjects());
  }

  public ngOnInit(): void {
    this.getSubjects();
  }

  public deleteSubject(subject: Subject): void {
    const confirmationMessage: string = this.translateService.instant("DIALOG.DELETE_SUBJECT", { subjectName: subject.name });
    this.dialogService.confirmAction(confirmationMessage)
      .subscribe(answer => {
        if (answer) {
          this.store.dispatch(SubjectsActions.deleteSubject({ id: subject.id }));
          this.gradesService.deleteSubjectGrades(subject.id);
        }
      });
  }

  public ngOnDestroy(): void {
    this.subjectStateSubscription.unsubscribe();
  }
}
