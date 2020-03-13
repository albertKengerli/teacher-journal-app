import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../../store";
import * as StudentsActions from "../../../store/students/students.actions";

import { Student } from "../../../common/entities/student";
import { FormField } from "../../../common/entities/formField";

import { validationExpressions, validationErrorMessages } from "../../../common/constants/validation";

@Component({
  selector: "app-students-form",
  templateUrl: "./students-form.component.html",
  styleUrls: ["./students-form.component.scss"]
})
export class StudentsFormComponent {
  private name: FormField;
  private surname: FormField;
  private address: FormField;
  private description: FormField;

  public formFieldList: FormField[] = [];

  constructor(
    private store: Store<AppState>,
  ) {
    this.name = new FormField({
      name: "name",
      label: "Name",
      placeholder: "Jack",
      required: true,
      validation: true,
      expression: validationExpressions.alphabetAndSpecialCharacters,
      errorMessage: validationErrorMessages.alphabetAndSpecialCharacters,
    });
    this.surname = new FormField({
      name: "surname",
      label: "Last name",
      placeholder: "Black",
      required: true,
      validation: true,
      expression: validationExpressions.alphabetAndSpecialCharacters,
      errorMessage: validationErrorMessages.alphabetAndSpecialCharacters,
    });
    this.address = new FormField({
      name: "address",
      label: "Address",
      placeholder: "pr. Zhukova 2",
    });
    this.description = new FormField({
      name: "description",
      type: "text-area",
      label: "Description",
      placeholder: "Good guy, works hard",
    });

    this.formFieldList.push(this.name);
    this.formFieldList.push(this.surname);
    this.formFieldList.push(this.address);
    this.formFieldList.push(this.description);
  }

  public addStudent(student: Student): void {
    this.store.dispatch(new StudentsActions.AddStudent(student));
  }
}
