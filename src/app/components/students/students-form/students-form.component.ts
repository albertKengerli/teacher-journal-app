import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../../store";
import * as StudentsActions from "../../../store/students/students.actions";

import { Student } from "../../../common/entities/student";
import { FormField } from "../../../common/entities/formField";

import { studentFormFieldList } from "../../../common/configs/studentFormConfig";

@Component({
  selector: "app-students-form",
  templateUrl: "./students-form.component.html",
  styleUrls: ["./students-form.component.scss"]
})
export class StudentsFormComponent {
  public formFieldList: FormField[] = [...studentFormFieldList];

  constructor(private store: Store<AppState>) { }

  public addStudent(student: Student): void {
    this.store.dispatch(new StudentsActions.AddStudent(student));
  }
}
