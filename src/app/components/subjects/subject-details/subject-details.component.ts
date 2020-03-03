import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubjectService } from '../../../common/services/subject/subject.service';

import { Subject } from '../../../common/entities/subject';
import { StudentWithGrades } from '../../../common/entities/student';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {
  subject: Subject;
  teacherChanged: boolean;
  gradesChanged: boolean;
  dataToSend: StudentWithGrades[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.getSubject();
  }

  private getSubject(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.subject = this.subjectService.getSubjectByName(name);
  }

  saveNewGrades(data: any): void {
    if (!this.gradesChanged) {
      this.gradesChanged = true;
    }
    this.dataToSend = data;
  }

  renameTeacher(event: Event): void {
    if (!this.teacherChanged) {
      this.teacherChanged = true;
    }
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.subject.teacher = newValue;
  }

  save(): void {
    this.router.navigate(['subjects']);
  }

  cancel(): void {
    this.router.navigate(['subjects']);
  }
}
