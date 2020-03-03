import { Component } from "@angular/core";

import { StudentService } from "../../../common/services/student/student.service";

import { Student } from "../../../common/entities/student";
import { Field } from "../../../common/entities/field";
import { studentsFormConfig } from "../../../common/configs/studentsFormConfig";

@Component({
  selector: "app-students-form",
  templateUrl: "./students-form.component.html",
  styleUrls: ["./students-form.component.scss"]
})
export class StudentsFormComponent {
  public config: Field[] = studentsFormConfig;

  constructor(private studentService: StudentService) { }

  public addStudent(student: Student): void {
    this.studentService.addStudent(student);
  }
}
