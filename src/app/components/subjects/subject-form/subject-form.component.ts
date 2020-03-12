import { Component } from "@angular/core";

import { SubjectService } from "../../../common/services/subject/subject.service";

import { Subject } from "../../../common/entities/subject";
import { FormField } from "../../../common/entities/formField";

import { validationExpressions, validationErrorMessages } from "../../../common/constants/validation";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})
export class SubjectFormComponent {
  private name: FormField;
  private teacher: FormField;
  private room: FormField;
  private description: FormField;

  public formFieldList: FormField[] = [];

  constructor(private subjectService: SubjectService) {
    this.name = new FormField({
      name: "name",
      label: "Name",
      placeholder: "Mathematics",
      required: true,
      validation: true,
      expression: validationExpressions.alphabetAndSpecialCharacters,
      errorMessage: validationErrorMessages.alphabetAndSpecialCharacters,
    });
    this.teacher = new FormField({
      name: "teacher",
      label: "Teacher",
      placeholder: "M. Ivanovna",
      required: true,
      validation: true,
      expression: validationExpressions.alphabetAndSpecialCharacters,
      errorMessage: validationErrorMessages.alphabetAndSpecialCharacters,
    });
    this.room = new FormField({
      name: "room",
      label: "Room",
      placeholder: "402",
      validation: true,
      expression: validationExpressions.numbers,
      errorMessage: validationErrorMessages.numbers,
    });
    this.description = new FormField({
      name: "description",
      type: "text-area",
      label: "Description",
      placeholder: "Will blow your mind...",
    });

    this.formFieldList.push(this.name);
    this.formFieldList.push(this.teacher);
    this.formFieldList.push(this.room);
    this.formFieldList.push(this.description);
  }

  public addSubject(subject: Subject): void {
    this.subjectService.addSubject(subject).subscribe();
  }

}
