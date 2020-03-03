import { Component } from "@angular/core";

import { SubjectService } from "../../../common/services/subject/subject.service";

import { Subject } from "../../../common/entities/subject";
import { FormField, FormFieldCreator } from "../../../common/entities/formField";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})
export class SubjectFormComponent {
  private name: FormFieldCreator;
  private teacher: FormFieldCreator;
  private room: FormFieldCreator;
  private description: FormFieldCreator;

  public config: FormField[] = [];

  constructor(private subjectService: SubjectService) {
    this.name = new FormFieldCreator({
      name: "name",
      label: "Name",
      placeholder: "Mathematics",
      required: true,
      validation: true,
      expression: /^[a-z .-]+$/i,
      errorMessage: "Only a-z, space, ., - are allowed",
    });
    this.teacher = new FormFieldCreator({
      name: "teacher",
      label: "Teacher",
      placeholder: "M. Ivanovna",
      required: true,
      validation: true,
      expression: /^[a-z ,.'-]+$/i,
      errorMessage: "Only a-z, and special characters are allowed.",
    });
    this.room = new FormFieldCreator({
      name: "room",
      label: "Room",
      placeholder: "402",
      validation: true,
      expression: /[0-9]*/i,
      errorMessage: "Only 0-9 without spaces is valid room",
    });
    this.description = new FormFieldCreator({
      name: "description",
      type: "text-area",
      label: "Description",
      placeholder: "Will blow your mind...",
    });

    this.config.push(this.name.config);
    this.config.push(this.teacher.config);
    this.config.push(this.room.config);
    this.config.push(this.description.config);
  }

  public addSubject(subject: Subject): void {
    this.subjectService.addSubject(subject);
  }

}
