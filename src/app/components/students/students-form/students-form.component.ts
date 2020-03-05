import { Component } from "@angular/core";

import { StudentService } from "../../../common/services/student/student.service";

import { Student } from "../../../common/entities/student";
import { FormField, FormFieldCreator } from "../../../common/entities/formField";

@Component({
  selector: "app-students-form",
  templateUrl: "./students-form.component.html",
  styleUrls: ["./students-form.component.scss"]
})
export class StudentsFormComponent {
  private name: FormFieldCreator;
  private surname: FormFieldCreator;
  private address: FormFieldCreator;
  private description: FormFieldCreator;
  public config: FormField[] = [];

  constructor(private studentService: StudentService) {
    this.name = new FormFieldCreator({
      name: "name",
      label: "Name",
      placeholder: "Jack",
      required: true,
      validation: true,
      expression: /^[a-z ,.'-]+$/i,
      errorMessage: "Only a-z, and special characters are allowed.",
    });
    this.surname = new FormFieldCreator({
      name: "surname",
      label: "Last name",
      placeholder: "Black",
      required: true,
      validation: true,
      expression: /^[a-z ,.'-]+$/i,
      errorMessage: "Only a-z, and special characters are allowed.",
    });
    this.address = new FormFieldCreator({
      name: "address",
      label: "Address",
      placeholder: "pr. Zhukova 2",
    });
    this.description = new FormFieldCreator({
      name: "description",
      type: "text-area",
      label: "Description",
      placeholder: "Good guy, works hard",
    });

    this.config.push(this.name.config);
    this.config.push(this.surname.config);
    this.config.push(this.address.config);
    this.config.push(this.description.config);
  }

  public addStudent(student: Student): void {
    this.studentService.addStudent(student);
  }
}
