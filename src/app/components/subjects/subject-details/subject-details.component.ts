import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SubjectService } from "../../../common/services/subject/subject.service";

import { Subject } from "../../../common/entities/subject";
import { StudentWithGrades } from "../../../common/entities/student";

@Component({
  selector: "app-subject-details",
  templateUrl: "./subject-details.component.html",
  styleUrls: ["./subject-details.component.scss"]
})
export class SubjectDetailsComponent implements OnInit {
  private dataToSend: StudentWithGrades[];

  public subject: Subject;
  public teacherChanged: boolean;
  public gradesChanged: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
  ) { }

  private getSubject(): void {
    const name: string = this.route.snapshot.paramMap.get("name");
    this.subject = this.subjectService.getSubjectByName(name);
  }

  public ngOnInit(): void {
    this.getSubject();
  }

  public saveNewGrades(data: StudentWithGrades[]): void {
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
    this.router.navigate(["subjects"]);
    console.log(this.dataToSend);
  }

  public cancel(): void {
    this.router.navigate(["subjects"]);
  }
}
