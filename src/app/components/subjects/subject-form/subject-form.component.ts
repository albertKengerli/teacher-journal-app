import { Component } from "@angular/core";

import { SubjectService } from "../../../common/services/subject/subject.service";

import { Subject } from "../../../common/entities/subject";
import { FormField } from "../../../common/entities/formField";

import { subjectFormFieldList } from "../../../common/configs/subjectFormConfig";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})
export class SubjectFormComponent {
  public formFieldList: FormField[] = [...subjectFormFieldList];

  constructor(private subjectService: SubjectService) { }

  public addSubject(subject: Subject): void {
    this.subjectService.addSubject(subject).subscribe();
  }
}
