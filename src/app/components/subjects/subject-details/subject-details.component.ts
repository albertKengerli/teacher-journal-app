import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubjectService } from '../../../common/services/subject.service';

import { Subject } from '../../../common/entities/subject';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
  subject: Subject;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getSubject();
  }

  getSubject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.subject = this.subjectService.getSubjectById(id);
  }
}
