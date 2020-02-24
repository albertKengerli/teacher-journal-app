import { Component, OnInit, Input } from '@angular/core';

import { SubjectService } from '../../../common/services/subject.service';

import { Subject } from '../../../common/entities/subject';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
  subject: Subject;
  @Input() subjectName: string;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subject = this.subjectService.getSubjectByName(this.subjectName);
  }

}
