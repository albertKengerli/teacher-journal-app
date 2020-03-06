import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { SubjectService } from "../../../common/services/subject/subject.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";

import { Subject } from "../../../common/entities/subject";
import { Student } from "../../../common/entities/student";

@Component({
  selector: "app-subject-details",
  templateUrl: "./subject-details.component.html",
  styleUrls: ["./subject-details.component.scss"]
})
export class SubjectDetailsComponent implements OnInit {
  private dataToSend: Student[];

  public subject: Subject;
  public teacherChanged: boolean;
  public gradesChanged: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private dialogService: DialogService,
  ) { }

  private getSubject(): void {
    const name: string = this.route.snapshot.paramMap.get("name");
    this.subjectService.getSubjectByName(name)
      .subscribe(subject => this.subject = subject[0]);
  }

  public ngOnInit(): void {
    this.getSubject();
  }

  public saveNewGrades(data: Student[]): void {
    if (!this.gradesChanged) {
      this.gradesChanged = true;
    }
    this.dataToSend = data;
  }

  public renameTeacher(event: Event): void {
    if (!this.teacherChanged) {
      this.teacherChanged = true;
    }
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const newValue: string = input.value;
    this.subject.teacher = newValue;
  }

  public save(): void {
    console.log(this.dataToSend);
    [ this.teacherChanged, this.gradesChanged ] = [ false, false ];
    this.router.navigate(["subjects"]);
  }

  public cancel(): void {
    this.router.navigate(["subjects"]);
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (!this.teacherChanged && !this.gradesChanged) {
      return true;
    } else {
      return this.dialogService.confirmLeaving(`Do you want to leave ${this.subject.name}? All changes will be discarded.`);
    }
  }

}
