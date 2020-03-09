import { Component, OnInit } from "@angular/core";

import { SubjectService } from "../../../common/services/subject/subject.service";
import { GradesService } from "../../../common/services/grades/grades.service";
import { DialogService } from "../../../common/services/dialog/dialog.service";

import { Subject } from "../../../common/entities/subject";

@Component({
  selector: "app-subjects-list",
  templateUrl: "./subjects-list.component.html",
  styleUrls: ["./subjects-list.component.scss"]
})
export class SubjectsListComponent implements OnInit {

  public subjects: Subject[];

  constructor(
    private subjectService: SubjectService,
    private gradesService: GradesService,
    private dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    this.getSubjects();
  }

  public getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }

  public deleteSubject(subject: Subject): void {
    this.dialogService.confirmAction(`Do you really want to delete ${subject.name} from subjects list?`)
      .subscribe(answer => {
        if (answer) {
          this.subjectService.deleteSubject(subject.id).subscribe(() => this.getSubjects());
          this.gradesService.deleteSubjectGrades(subject.id);
        }
      });
  }
}
