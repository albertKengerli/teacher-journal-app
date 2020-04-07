import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";

import { Subject } from "../../../common/entities/subject";
import { FormField } from "../../../common/entities/formField";

import { subjectFormFieldList } from "../../../common/configs/subjectFormConfig";

@Component({
  selector: "app-subject-form",
  templateUrl: "./subject-form.component.html",
  styleUrls: ["./subject-form.component.scss"]
})
export class SubjectFormComponent {
  public formFieldList: FormField[] = [...subjectFormFieldList];

  constructor(private store: Store<AppState>) { }

  public addSubject(subject: Subject): void {
    this.store.dispatch(SubjectsActions.addSubject({ subject }));
  }
}
