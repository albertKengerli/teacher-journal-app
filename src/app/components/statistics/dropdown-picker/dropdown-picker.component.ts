import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { Subject } from "../../../common/entities/subject";
import { SubjectService } from "../../../common/services/subject/subject.service";

import { Store, select } from "@ngrx/store";
import { AppState, getSubjectsState, SubjectsState } from "../../../store";
import * as SubjectsActions from "../../../store/subjects/subjects.actions";

@Component({
  selector: "app-dropdown-picker",
  templateUrl: "./dropdown-picker.component.html",
  styleUrls: ["./dropdown-picker.component.scss"]
})
export class DropdownPickerComponent implements OnInit {
  public subjectsState$: Observable<SubjectsState>;
  public dropdownOpened: boolean = false;
  public test: string = "googlegooglegooglegooglegooglegooglegoogle";

  constructor(
    private store: Store<AppState>,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(SubjectsActions.getSubjects());
    this.subjectsState$ = this.store.pipe(select(getSubjectsState));
  }

  public toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }
}
