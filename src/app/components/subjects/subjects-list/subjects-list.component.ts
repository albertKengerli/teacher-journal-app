import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";
import { AppState, SubjectsState, getSubjectsState } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";

import { GradesService } from "../../../common/services/grades/grades.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";
import { TranslateService } from "@ngx-translate/core";

import { Subject } from "../../../common/entities/subject";

@Component({
  selector: "app-subjects-list",
  templateUrl: "./subjects-list.component.html",
  styleUrls: ["./subjects-list.component.scss"]
})
export class SubjectsListComponent implements OnInit {
  public subjectsState$: Observable<SubjectsState>;

  constructor(
    private gradesService: GradesService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private store: Store<AppState>,
  ) { }

  private getSubjects(): void {
    this.subjectsState$ = this.store.pipe(select(getSubjectsState));
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
}
