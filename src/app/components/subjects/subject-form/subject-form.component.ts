import { Component } from "@angular/core";

import { SubjectService } from "../../../common/services/subject/subject.service";

import { Subject } from "../../../common/entities/subject";
import { FormField } from "../../../common/entities/field";
import { subjectsFormConfig } from "../../../common/configs/subjectsFormConfig";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})
export class SubjectFormComponent {
  public config: FormField[] = subjectsFormConfig;

  constructor(private subjectService: SubjectService) { }

  public addSubject(subject: Subject): void {
    this.subjectService.addSubject(subject);
  }

}
