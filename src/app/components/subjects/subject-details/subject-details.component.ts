import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { AppState, getSubjectByName, getIsSubjectTableDataReady } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";

import { DialogService } from "../../../common/services/dialog/dialog.service";
import { GradesSenderService } from "../../../common/services/grades-sender/grades-sender.service";
import { SubjectTableDataService } from "../../../common/services/subject-table/SubjectTableData/SubjectTableData.service";
import { TranslateService } from "@ngx-translate/core";

import { Subject } from "../../../common/entities/subject";

@Component({
  selector: "app-subject-details",
  templateUrl: "./subject-details.component.html",
  styleUrls: ["./subject-details.component.scss"]
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
  private subjectSubscription: Subscription;
  private isTableLoadedSubscription: Subscription;
  private newTeacherName: string;

  public subject: Subject;
  public teacherChanged: boolean;
  public gradesChanged: boolean;
  public tableLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private gradesSenderService: GradesSenderService,
    private subjectTableService: SubjectTableDataService,
    private translateService: TranslateService,
    private store: Store<AppState>,
  ) { }

  private getSubject(): void {
    const subjectName: string = this.route.snapshot.paramMap.get("name");

    this.subjectSubscription = this.store.pipe(
      select(getSubjectByName, { subjectName }),
      filter( subject => subject !== undefined),
      take(1),
    ).subscribe(subject => {
      this.subject = subject;
      this.subjectTableService.initService(this.subject.id);
    });
  }

  private updateTeacher(): void {
    const updatedSubject: Subject = Object.assign({}, this.subject);
    updatedSubject.teacher = this.newTeacherName;
    this.store.dispatch(SubjectsActions.updateSubject({ id: this.subject.id, subject: updatedSubject }));
  }

  public ngOnInit(): void {
    this.store.dispatch(SubjectsActions.getSubjects());
    this.getSubject();

    this.isTableLoadedSubscription = this.store.pipe(
      select(getIsSubjectTableDataReady)
    ).subscribe( isDataReady => {
      this.tableLoaded = isDataReady;
    });
  }

  public onGradesChange(): void {
    this.gradesChanged = true;
  }

  public renameTeacher(event: Event): void {
    if (!this.teacherChanged) {
      this.teacherChanged = true;
    }
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const newValue: string = input.value;
    this.newTeacherName = newValue;
  }

  public save(): void {
    if (this.gradesChanged) {
      this.gradesSenderService.sendPreparedGrades();
    }

    if (this.teacherChanged) {
      this.updateTeacher();
    }

    [ this.teacherChanged, this.gradesChanged ] = [ false, false ];
    this.router.navigate(["subjects"]);
  }

  public cancel(): void {
    this.gradesSenderService.emptyPreparedGrades();
    this.router.navigate(["subjects"]);
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (!this.teacherChanged && !this.gradesChanged) {
      return true;
    } else {
      const confirmationMessage: string = this.translateService.instant("DIALOG.DISCARD_SUBJECT_CHANGES", {
        subjectName: this.subject.name
      });
      return this.dialogService.confirmAction(confirmationMessage);
    }
  }

  public ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
    this.isTableLoadedSubscription.unsubscribe();
    this.subjectTableService.resetService();
  }
}
