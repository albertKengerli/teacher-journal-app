import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../../../common/services/subject/subject.service';

import { Subject } from '../../../common/entities/subject';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  subjects: Subject[];

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }

}
