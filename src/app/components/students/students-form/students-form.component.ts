import { Component } from '@angular/core';

import { StudentService } from '../../../common/services/student/student.service';

import { Student } from '../../../common/entities/student';
import { Field } from '../../../common/entities/field';
import { studentsFormConfig } from '../../../common/configs/studentsFormConfig';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent {

  config: Field[] = studentsFormConfig;

  constructor(private studentService: StudentService) { }

  addStudent(student: Student) {
    this.studentService.addStudent(student);
  }
}
