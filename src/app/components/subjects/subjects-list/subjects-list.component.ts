import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";
import { AppState, SubjectsState, getSubjectsState } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";

import { GradesService } from "../../../common/services/grades/grades.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";

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
    private store: Store<AppState>,
  ) { }

  private getSubjects(): void {
    this.subjectsState$ = this.store.pipe(select(getSubjectsState));
    this.store.dispatch(SubjectsActions.getSubjects());
  }

  public ngOnInit(): void {
    this.getSubjects();
  }

  public deleteSubject(subject: Subject): void {
    this.dialogService.confirmAction(`Do you really want to delete ${subject.name} from subjects list?`)
      .subscribe(answer => {
        if (answer) {
          this.store.dispatch(SubjectsActions.deleteSubject({ id: subject.id }));
          this.gradesService.deleteSubjectGrades(subject.id);
        }
      });
  }
}
