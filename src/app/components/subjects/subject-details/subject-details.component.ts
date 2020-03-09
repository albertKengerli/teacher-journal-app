import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { SubjectService } from "../../../common/services/subject/subject.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";
import { GradesService } from "../../../common/services/grades/grades.service";

import { Subject } from "../../../common/entities/subject";
import { Grade } from "../../../common/entities/grades";

@Component({
  selector: "app-subject-details",
  templateUrl: "./subject-details.component.html",
  styleUrls: ["./subject-details.component.scss"]
})
export class SubjectDetailsComponent implements OnInit {
  private gradesToSend: Grade[] = [];
  private newTeacherName: string;

  public subject: Subject;
  public teacherChanged: boolean;
  public gradesChanged: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
    private dialogService: DialogService,
    private gradesService: GradesService,
  ) { }

  private getSubject(): void {
    const name: string = this.route.snapshot.paramMap.get("name");
    this.subjectService.getSubjectByName(name)
      .subscribe(subject => this.subject = subject[0]);
  }

  private sendGrades(): void {
    this.gradesToSend.forEach(grade => {
      this.gradesService.getGradeByStudentSubjectDate(grade.studentID, grade.subjectID, grade.date)
        .subscribe(answer => {
          if (answer.length === 0) {
            this.gradesService.addGrade(grade).subscribe();
          } else {
            this.gradesService.updateGrade(answer[0].id, grade).subscribe();
          }
        });
    });
  }

  private updateTeacher(): void {
    const updatedSubject: Subject = Object.assign({}, this.subject);
    updatedSubject.teacher = this.newTeacherName;
    this.subjectService.updateSubject(this.subject.id, updatedSubject).subscribe();
  }

  public ngOnInit(): void {
    this.getSubject();
  }

  public addGradeToSend(newGrade: Grade): void {
    let gradeNotAdded: boolean = true;
    this.gradesToSend.forEach( (grade, index, array) => {
      if (grade.studentID === newGrade.studentID && grade.date === newGrade.date) {
        array[index] = newGrade;
        gradeNotAdded = false;
      } else if (index === array.length - 1 ) {
        gradeNotAdded = true;
      }
    });

    if (gradeNotAdded) {
      this.gradesToSend.push(newGrade);
    }

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
      this.sendGrades();
    }

    if (this.teacherChanged) {
      this.updateTeacher();
    }

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
      return this.dialogService.confirmAction(`Do you want to leave ${this.subject.name}? All changes will be discarded.`);
    }
  }

}
