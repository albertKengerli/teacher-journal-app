import { Component } from '@angular/core';

import { SubjectService } from '../../../common/services/subject/subject.service';

import { Subject } from '../../../common/entities/subject';
import { Field } from '../../../common/entities/field';
import { subjectsFormConfig } from '../../../common/configs/subjectsFormConfig';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent {

  config: Field[] = subjectsFormConfig;

  constructor(private subjectService: SubjectService) { }

  addSubject(subject: Subject) {
    this.subjectService.addSubject(subject);
  }

}
