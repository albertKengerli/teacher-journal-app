import { Component, OnInit } from '@angular/core';

import { Field } from '../../../common/entities/field';
import { studentsFormConfig } from '../../../common/configs/studentsFormConfig';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit {

  config: Field[] = studentsFormConfig;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(event: object) {
    console.log(event);
  }

}
